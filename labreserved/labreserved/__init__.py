from flask import Flask

app = Flask(__name__)
app.config.from_envvar('LABRESERVED_SETTINGS')

### Flask API

from flask_restful import Api
from flask_restful_swagger import swagger

api = swagger.docs(Api(app), apiVersion='1', api_spec_url="/api/v1/spec")

from labreserved.views.server import ServerGetPutDelete, ServerPostList
api.add_resource(ServerGetPutDelete, '/api/servers/<string:name>')
api.add_resource(ServerPostList, '/api/servers/')
