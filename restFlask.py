from flask import Flask, request
from pymongo import Connection
import json

app = Flask(__name__)
connection = Connection('localhost', 27017)
db = connection.ufo

@app.route('/user', methods=['GET', 'POST'])
def user():
    if request.method == 'POST':
        if request.headers['Content-Type'] == 'application/json':
            print db.collection_names()
            print json.loads(request.data)
        else:
            print 'failed'
        return 'post'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
