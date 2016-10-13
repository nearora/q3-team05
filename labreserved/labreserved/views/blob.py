from flask_restful import reqparse, Resource, fields
from labreserved import app
from flask_restful_swagger import swagger

import requests
import json
import base64


BLOB_FIELDS = {
    'id': fields.Integer,
    'content': fields.String,
    'name': fields.String,
    'version': fields.String,
    'tag': fields.String
}


class Blob(object):
    def __init__(self, content, version='v1'):
        self.content = content
        self.version = version

        # static blob values for team05
        self.id = app.config.get('BLOB_ID')
        self.name = 'team05_blob'
        self.tag = 'team05'

    def to_s(self):
        return json.dumps(self.__dict__)


class BlobGetPutDelete(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()

    @swagger.operation()
    def get(self, blob_id):
        blob_store = app.config.get('BLOB_ENDPOINT')
        blob_id = app.config.get('BLOB_ID')
        url = "{}/{}".format(blob_store, blob_id)
        response = requests.get(url)

        json_response = json.loads(response.content)

        if response.status_code == 200:
            content = base64.b64decode(json_response['content'])
            return content, 200
        elif json_response.get('error') and (json_response.get('error') == "{datastore: no such entity 500}"):
            return "Blob with id {} does not exist".format(blob_id), response.status_code


class BlobPostList(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()

    def post(self):
        self.reqparse.add_argument('data', required=True, type=unicode, help='Blob data required', location='json')
        self.reqparse.add_argument('version', required=False, type=unicode, help='Blob version', location='json')
        args = self.reqparse.parse_args()

        blob_store = app.config.get('BLOB_ENDPOINT')

        encoded_data = base64.b64encode(args['data'].encode('ascii'))

        if args['version']:
            version = args['version']
        else:
            version = 'v1'
        blob = Blob(content=encoded_data, version=version)

        headers = {
            'content-type': "application/json"
        }

        response = requests.request(method="POST", url=blob_store, data=blob.to_s(), headers=headers)

        if response.status_code == 200:
            return "success", 200
        else:
            return response.content, response.status_code
