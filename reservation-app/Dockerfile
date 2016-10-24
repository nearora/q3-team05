FROM uwehale/alpine-node-bower-git-python:latest
MAINTAINER Uwe hale "uwehale@gmail.com"


WORKDIR /home/app

COPY . /home/app

RUN npm run clean

RUN cd /home/app && npm install
RUN npm install -g nodemon

RUN cd client && bower --allow-root install

RUN npm run client

EXPOSE 8081

CMD [ "npm", "run", "server"]
