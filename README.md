# youtube-shuffler

### Work in progress

Youtube's playlist randomizer breaks for very large lists.

This is the front-end for a Youtube playlist shuffle service that works around the issue.

Note: the configuration files in the config folder need to be completed with the path to the project, and a Google API Key.

## Server dependencies
```
# Setup
pip install cherrypy googleapiclient requests
# Start the server
python api.py
```

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
