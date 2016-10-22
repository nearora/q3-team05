FROM node:argon

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app

RUN npm install

RUN npm install -g --force nodemon

COPY . /usr/src/app

EXPOSE 3002

CMD ["nodemon", "."]
