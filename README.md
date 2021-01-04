# youtube-shuffler

### Work in progress

Youtube's playlist randomizer breaks for very large lists.

This is the front-end for a Youtube playlist shuffle service that works around the issue.

Note: the configuration files in the config folder need to be completed with the path to the project, and a Google API Key.

## Docker setup

```
git pull boucaud/youtube-shuffle:latest
docker run --name youtube-shuffle -p 8080:$YOUR_PORT -e YOUTUBE_API_KEY=$YOUR_API_KEY -e YOUTUBE_SHUFFLER_ROOT='/root' youtube-shuffle
```
