import datetime
import json
import os


import cherrypy

import googleapiclient.discovery
import googleapiclient.errors

import requests

client = None


def isPlaylistItemAVideo(item):
    return item['snippet']['resourceId']['kind'] == 'youtube#video'


def mapPlaylistItem(item):
    return {
        'id': item['snippet']['resourceId']['videoId'],
        'title': item['snippet']['title'],
        'channel': item['snippet']['channelTitle'],
        'position': item['snippet']['position']
    }


def extractPlaylistInformation(response):
    if len(response['items']) > 0:
        return {
            'title': response['items'][0]['snippet']['title'],
            'channel': response['items'][0]['snippet']['channelTitle'],
        }
    return {}


def memoizeWeekly(f):
    memo = {}

    def helper(x=None):
        if x not in memo or memo[x]['time'] + datetime.timedelta(weeks=1) < datetime.datetime.now():
            memoized = {
                'item': f(x),
                'time': datetime.datetime.now()
            }
            memo[x] = memoized
        return memo[x]['item']
    return helper


def get_youtube_client():
    api_service_name = "youtube"
    api_version = "v3"
    api_key = os.environ.get('YOUTUBE_API_KEY', None)
    if not api_key:
        print("'YOUTUBE_API_KEY' environment variable is required but not set")
        return None

    return googleapiclient.discovery.build(
        api_service_name, api_version, developerKey=api_key)


@memoizeWeekly
def get_playlist_information(playlistId):
    part = 'id,snippet'

    youtube = get_youtube_client()
    request = youtube.playlists().list(
        part=part, id=playlistId, maxResults='50')
    response = request.execute()
    if response:
        return extractPlaylistInformation(response)
    return {}


@memoizeWeekly
def get_playlist_items(playlistId):
    part = 'id,snippet'

    youtube = get_youtube_client()
    try:
        request = youtube.playlistItems().list(
        part=part, playlistId=playlistId, maxResults='50')
    except:
        return []
    response = request.execute()

    items = []
    if response and 'items' in response:
        items.extend(response['items'])

    while response and 'nextPageToken' in response:
        try:
            request = youtube.playlistItems().list(part=part, playlistId=playlistId,
                                               maxResults='50', pageToken=response['nextPageToken'])
        except:
            continue                                               
        response = request.execute()
        if response and 'items' in response:
            items.extend(response['items'])
    return [mapPlaylistItem(item) for item in items if isPlaylistItemAVideo(item)]


class StaticWebsiteService(object):
    pass


class YoutubePlaylistService(object):
    @cherrypy.expose
    def items(self, playlistId):
        return json.dumps(get_playlist_items(playlistId))

    @cherrypy.expose
    def info(self, playlistId):
        return json.dumps(get_playlist_information(playlistId))


if __name__ == '__main__':
    project_root = os.environ.get('YOUTUBE_SHUFFLE_ROOT', None)
    if not project_root:
        print("'YOUTUBE_SHUFFLE_ROOT' environment variable is required but not set")
        exit

    client = get_youtube_client()
    if not client:
        print('Failed to initialize Google API client.')
        exit

    log_dir = os.environ.get('YOUTUBE_SHUFFLE_LOG_DIR', '.')
    cherrypy.config.update({
        'log.screen': False,
        'log.access_file': os.path.join(log_dir, 'access.log'),
        'log.error_file': os.path.join(log_dir, 'error.log'),
        'tools.staticdir.root': project_root

    })

    cherrypy.server.socket_host = '0.0.0.0'
    cherrypy.tree.mount(StaticWebsiteService(), '/', 'config/static.cfg')
    try:
        cherrypy.quickstart(YoutubePlaylistService(), '/api')
    except:
        print('======')

    print('blocking')
    cherrypy.engine.start()
    cherrypy.engine.block()
