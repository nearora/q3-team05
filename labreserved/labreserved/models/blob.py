from labreserved import app

import requests
import json
import base64

BLOB_ENDPOINT = app.config.get('BLOB_ENDPOINT')


class Blob(object):
    def __init__(self, retrieve=True):
        # static blob values for team05
        self.id = app.config.get('TEAM_ID')
        self.name = 'team05_blob'
        self.tag = 'team05'

        if retrieve:
            self._get_blob()

    def _get_blob(self):
        url = "{}/{}".format(BLOB_ENDPOINT, self.id)
        response = requests.get(url)
        self._format_blob(response)

    def update(self, data, version='v1'):
        req_data = self._prep_request(data, version)
        headers = {
            'content-type': "application/json"
        }

        response = requests.request(method="POST", url=BLOB_ENDPOINT, data=req_data, headers=headers)

        if response.status_code == 200:
            self._format_blob(response)
            return True
        else:
            raise ValueError('Unable to update blob: {}'.format(response.content))

    def _format_blob(self, response):
        json_response = json.loads(response.content)
        decoded_response = base64.b64decode(json_response['content'])
        self.content = json.loads(decoded_response)
        self.version = json_response['version']

    def _prep_request(self, data, version):
        req = {}
        req['name'] = self.name
        req['id'] = self.id
        req['tag'] = self.tag
        req['version'] = version

        str_data = json.dumps(data)
        encoded_data = base64.b64encode(str_data.encode('ascii'))

        req['content'] = encoded_data

        return json.dumps(req)
