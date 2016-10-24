FROM node:argon

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY client /usr/src/app/client
COPY common /usr/src/app/common
COPY server /usr/src/app/server

RUN cd /usr/src/app && npm install
RUN npm install -g nodemon

EXPOSE 3003

CMD ["nodemon", "."]
