import json
import bottle
from bottle import route, run, request, abort
from pymongo import Connection

connection = Connection('localhost', 27017)
if connection:
    print 'adsf'
db = connection.mydatabase

@route('/documents', method='PUT')
def put_documentat():
    print 'in the put route'
    data = request.body.readline()
    if not data:
        abort(400, 'No _id recieved')
    
    entity = json.loads(data)
    
    if not  entity.has_key('_id'):
        abort(400, 'No _id specified')
    try:
        db['documents'].save(entity)
    except ValidationError as ve:
        abooort(400, str(ve))
@route('/documents/:id', method='GET')
def get_document(id):
    print 'in get route'
    entity = db['test'].find_one({'_id':id})
    if not entity:
        abort(404, 'No document with id %s' % id)
    return entity

run(host='localhost', port=8080)
