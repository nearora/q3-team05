FROM ubuntu:latest
MAINTAINER Curtis Stewart "stewartc@vmware.com"
RUN apt-get update -y
RUN apt-get install -y python-pip python-dev build-essential
COPY . /app
WORKDIR /app
RUN pip install -r requirements.txt
RUN python setup.py install

ADD api-start.sh /app/api-start.sh

RUN chmod +x /app/api-start.sh

EXPOSE 5000

ENTRYPOINT ["/app/api-start.sh"]
