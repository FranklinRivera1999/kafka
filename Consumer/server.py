from flask import Flask, jsonify, request,Response
from database import getLogs
from bson import json_util
from multiprocessing import Process 
from lib import client_kafka

app = Flask(__name__)

# Testing Route
@app.route('/ping', methods=['GET'])
def ping():
    return jsonify({'response': 'pong!'})

@app.route('/api/logs',methods=['GET'])
def getAll():
    users = getLogs()
    response = json_util.dumps(users)
    return Response(response, mimetype="application/json")


if __name__ == '__main__':
    watcher_thread = Process(target=client_kafka)
    watcher_thread.start()
    print("Server Python Ready")
    app.run(debug=True, port=4001)
    watcher_thread.join()
    
    

