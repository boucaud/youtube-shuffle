# youtube-shuffle

### Work in progress

Youtube's playlist randomizer breaks for very large lists.

This is the front-end for a Youtube playlist shuffle service that works around the issue.

* If you wish to run this, you need a youtube API key, specified in the YOUTUBE_API_KEY environment variable.

* If running out of docker, you need to specify the project root in the YOUTUBE_SHUFFLER_ROOT environment variable.

[Demo link](https://youtube-shuffle.boucaud.dev/)

## Docker setup

```
git pull boucaud/youtube-shuffle:latest
docker run --name youtube-shuffle -p 8080:$YOUR_PORT -e YOUTUBE_API_KEY=$YOUR_API_KEY -e YOUTUBE_SHUFFLER_ROOT='/root' youtube-shuffle
```

## Standalone setup
```
npm install
npm run build
pip install -r requirements.txt
python ./api.py
```

## Development server
```
# Note this expects the api to be accessible at localhost:8080. If not, change the proxy url in vue.config.js
npm run serve
```
