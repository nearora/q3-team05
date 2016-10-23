#!/bin/bash

service_name="reservation-app"
default_port="8090"
TEAM="team5"

# Services the app is linked to
reservation_service="reservation-service"
reservation_service_port="3001"
server_service="server-service"
server_service_port="3002"
message_service="messaging-service"

#look for defined vars for the team name and port
#else set to defaults
if [ -z ${TEAM} ]; then TEAM="team6";fi
if [ -z ${RESERVATION_APP_PORT} ]; then RESERVATION_APP_PORT=${default_port};fi


project_dir="$(dirname $(cd -P -- "$(dirname -- "$0")" && pwd -P))"

echo Starting ${service_name} Docker image for ${TEAM} from ${project_dir} on Port:${RESERVATION_APP_PORT}

docker run \
--env MESSAGING_SERVICE="10.162.231.12:2181" \
-p ${RESERVATION_APP_PORT}:${default_port} \
--name "${TEAM}-${service_name}" \
-d ${TEAM}/${service_name}
