const kafka = require('kafka-node') 

class Kafka {

    constructor(){
        this.client = new kafka.KafkaClient('localhost:2181')
        this.producer = new kafka.Producer(this.client);
        this.start()
    }

    start(){
        this.producer.on('ready',async function() {

            console.log('Kafka Producer esta Listo');
        })

        this.producer.on('error', function(err) {
            console.log(err);
            console.log('[kafka-producer -> '+"prueba"+']: error en la conexion');
            throw err;
          });
    }

    publish(data,topic, callback){
        let payload = [{
            topic,
            messages : JSON.stringify(data)
        }]
        console.log('Datos a enviar',payload)
        this.producer.send(payload,callback)
    }
}

const kafkaInstance = new Kafka()
module.exports = kafkaInstance
