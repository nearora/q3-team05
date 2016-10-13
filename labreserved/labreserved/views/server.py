from labreserved.models.blob import Blob

from flask_restful import reqparse, Resource
from flask_restful_swagger import swagger


class ServerGetPutDelete(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()

    @swagger.operation(
        summary='Get single server',
        notes='Get single server',
        nickname='GetServer',
        parameters=[
            {
              "name": "name",
              "description": "server name",
              "required": True
            }
          ],
        responseMessages=[
            {
              "code": 200,
              "message": "Server object is returned"
            },
            {
              "code": 404,
              "message": "Server not found"
            }
          ]
    )
    def get(self, name):
        blob = Blob()
        server = blob.content.get(name)
        if server is not None:
            return server, 200
        else:
            return "{} does not exist".format(name), 404

    @swagger.operation(
        summary='Delete server',
        notes='Delete server',
        nickname='DeleteServer',
        parameters=[
            {
              "name": "name",
              "required": True
            }
          ],
        responseMessages=[
            {
              "code": 200,
              "message": "Return remaining servers"
            },
            {
              "code": 404,
              "message": "Server not found"
            }
          ]
    )
    def delete(self, name):
        blob = Blob()
        if blob.content.get(name) is not None:
            del blob.content[name]
            blob.update(blob.content)
            return blob.content, 200
        else:
            return "{} does not exist".format(name), 404

class ServerPostList(Resource):
    def __init__(self):
        self.reqparse = reqparse.RequestParser()

    @swagger.operation(
        summary='List all servers',
        notes='List all servers',
        nickname='ListServers',
        responseMessages=[
            {
              "code": 200,
              "message": "All servers"
            },
            {
              "code": 500,
              "message": "Unable to access servers"
            }
          ]
    )
    @swagger.operation()
    def get(self):
        blob = Blob()
        return blob.content, 200

    @swagger.operation(
        summary='Add server',
        notes='Add server',
        nickname='AddServer',
        parameters=[
            {
              "name": "name",
              "description": "server name",
              "required": True
            },
            {
              "name": "description",
              "description": "server description",
              "required": True
            }
          ],
        responseMessages=[
            {
              "code": 200,
              "message": "Server object is returned"
            },
            {
              "code": 500,
              "message": "Server already exists"
            }
          ]
    )
    @swagger.operation()
    def post(self):
        self.reqparse.add_argument('name', required=True, type=unicode, help='Server name required', location='json')
        self.reqparse.add_argument('description', required=True, type=unicode, help='Server description required', location='json')
        args = self.reqparse.parse_args()

        server_name = args['name']
        server_desc = args['description']

        blob = Blob()
        content = blob.content

        if content.get(server_name):
            return "{} already exists".format(server_name), 500
        else:
            content[server_name] = {
                'name': server_name,
                'description': server_desc
            }

            blob.update(content)
            return blob.content[server_name], 200
