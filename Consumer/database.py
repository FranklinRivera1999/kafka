from pymongo import MongoClient 
from datetime import datetime 
from bson.objectid import ObjectId

MONGO_URI = "mongodb://localhost"

client = MongoClient(MONGO_URI)

db = client["kafka"]
collection = db['logs']

def getLogs():
    return collection.find()

def insert(userId):
    data = {
        "mensaje":"Se eliminino el usuario con ID ->"+userId,
        "createdAt": datetime.now(),
        "updatedAt": datetime.now()
    }

    print('SE INSERTARA UN NUEVO REGISTRO')
    collection.insert_one(data)
    return "Success!!"
