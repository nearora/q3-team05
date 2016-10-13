
class Blob(object):
    def __init__(self):
        self.content = ''
        self.id = None
        self.version = '1'
        self.name = ''
        self.tag = ''

    def to_json(self):
        json = {
            'content': self.content,
            'id': self.id,
            'version': self.version,
            'name': self.name,
            'tag': self.tag
        }

        return json