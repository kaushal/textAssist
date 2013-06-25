from flask import Flask, request
from pymongo import Connection
import json
import logging
import sys
logging.basicConfig(stream=sys.stderr, level=logging.DEBUG)
logging.debug("work or i kill you ")
app = Flask(__name__)
app.config.from_pyfile('config.py')
connection = Connection('localhost', 27017)
db = connection.users

@app.route('/user', methods=['GET', 'POST'])
def user():
    phoneNumber = 9082082212
    name = 'kaushal'
    group = 'test'
    if request.method == 'POST':
        if request.headers['Content-Type'] == 'application/json':
            payload = json.loads(request.data)
            print payload
            try:
                number = payload['number']
                name = payload['name']
                group = payload['group']
                db.users.insert({"_id":number, "name": name, "group": group})
                return 'success'
            except KeyError:
                return 'Error: invalid json for requested path: /user'
        else:
            return 'Error: data entered is not valid json'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
