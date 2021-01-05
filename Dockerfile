FROM node:latest AS build

WORKDIR /usr/src/youtube-shuffle/

# Setup npm project
COPY package*.json ./
RUN npm install -g @vue/cli
RUN npm install

# Bundle app source
COPY . .
RUN npm run build

FROM python:3
WORKDIR /root/

COPY --from=build /usr/src/youtube-shuffle/dist ./dist/

RUN mkdir .config

COPY requirements.txt api.py ./
COPY config ./config/

RUN pip install --no-cache -r requirements.txt

EXPOSE 8080

CMD ["python", "./api.py"]
