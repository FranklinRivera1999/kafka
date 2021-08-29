from kafka import KafkaConsumer 
import json

TOPIC_NAME="prueba"

consumer = KafkaConsumer(TOPIC_NAME,value_deserializer=lambda m: json.loads(m.decode('utf-8')))
print('A la espera')

for message in consumer:
    print(message)