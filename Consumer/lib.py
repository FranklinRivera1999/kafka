from kafka import KafkaConsumer 
import json
from database import insert

import multiprocessing 

TOPIC_NAME="prueba"

def client_kafka():
    client = KafkaConsumer(TOPIC_NAME,value_deserializer=lambda m: json.loads(m.decode('utf-8')))
    for i in client:  
            print(multiprocessing.current_process().name)
            print('SE RECIBIO UN NUEVO MENSAJE')
            print(i)
            print(i[6]['type'])
            last_id=i[6]['data']
            print(last_id)
            insert(last_id)