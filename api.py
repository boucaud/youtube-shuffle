import datetime
import json
import os


import cherrypy

import googleapiclient.discovery
import googleapiclient.errors

import requests

api_key = os.environ['YOUTUBE_API_KEY']
project_root = os.environ['YOUTUBE_SHUFFLER_ROOT']


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


def memoizeDaily(f):
    memo = {}

    def helper(x=None):
        if x not in memo or memo[x]['time'] + datetime.timedelta(days=1) < datetime.datetime.now():
            memoized = {
                'item': f(x),
                'time': datetime.datetime.now()
            }
            memo[x] = memoized
        return memo[x]['item']
    return helper


# TODO: check success, api key existence
# TODO: this should simply be done on startup
@memoizeDaily
def get_youtube_client(api_key):
    api_service_name = "youtube"
    api_version = "v3"
    return googleapiclient.discovery.build(
        api_service_name, api_version, developerKey=api_key)


@memoizeDaily
def get_playlist_information(playlistId):
    part = 'id,snippet'

    youtube = get_youtube_client()
    request = youtube.playlists().list(
        part=part, id=playlistId, maxResults='50')
    response = request.execute()
    if response:
        return extractPlaylistInformation(response)
    return {}


@memoizeDaily
def get_playlist_items(playlistId):
    part = 'id,snippet'

    youtube = get_youtube_client()
    request = youtube.playlistItems().list(
        part=part, playlistId=playlistId, maxResults='50')
    response = request.execute()

    items = []
    if response and 'items' in response:
        items.extend(response['items'])

    while response and 'nextPageToken' in response:
        request = youtube.playlistItems().list(part=part, playlistId=playlistId,
                                               maxResults='50', pageToken=response['nextPageToken'])
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


if __name__ == '__main__':
    if not api_key:
        print("'YOUTUBE_API_KEY' environment variable is required but not set")
        exit
    if not project_root:
        print("'YOUTUBE_SHUFFLER_ROOT' environment variable is required but not set")
        exit

    cherrypy.tree.mount(StaticWebsiteService(), '/', 'config/static.cfg')
    cherrypy.quickstart(YoutubePlaylistService(), '/api')

    cherrypy.config.update({
        'log.screen': False,
        'log.access_file': 'access.log',
        'log.error_file': 'error.log',
        'tools.staticdir.root': project_root

    })
    cherrypy.engine.start()
    cherrypy.engine.block()
