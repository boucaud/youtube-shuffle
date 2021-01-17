# youtube-shuffle

### [Demo link](https://youtube-shuffle.boucaud.dev/)

Youtube's playlist randomizer breaks for very large lists.

This is a basic implementation for a Youtube playlist shuffle service that works around the issue.

* If you wish to run this, you need a youtube API key, specified in the YOUTUBE_API_KEY environment variable.

* If running out of docker, you need to specify the project root in the YOUTUBE_SHUFFLE_ROOT environment variable.


## Docker setup

```
docker pull boucaud/youtube-shuffle:latest
docker run \
  -d \
  --name youtube-shuffle \
  -p $YOUR_PORT:8080 \
  -e YOUTUBE_API_KEY=$YOUR_API_KEY \
  -e YOUTUBE_SHUFFLE_ROOT='/root' \
  -e YOUTUBE_SHUFFLE_LOG_DIR='/root/log' \
  -v $YOUR_LOG_DIR:'/root/log' \
  boucaud/youtube-shuffle
```

## Standalone setup
```
yarn install
yarn run build
pip install -r requirements.txt
python ./api.py
```

## Development server
```
# Note this expects the api to be accessible at localhost:8080. If not, change the proxy url in vue.config.js
yarn run serve
```
