from flask import Flask

app = Flask(__name__)
app.config.from_envvar('LABRESERVED_SETTINGS')

### Flask API

from flask_restful import Api
from flask_restful_swagger import swagger


app = Flask(__name__)
api = swagger.docs(Api(app), apiVersion='1', api_spec_url="/api/v1/spec")

from labreserved.views.blob import BlobGetPutDelete, BlobPostList
api.add_resource(BlobGetPutDelete, '/api/v1/labreserved/<int:blob_id>')
api.add_resource(BlobPostList, '/api/v1/labreserved')

