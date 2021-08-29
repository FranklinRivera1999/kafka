const mongoose = require('mongoose')
const {URI_DATABASE} = require('./config')
class Database {
    constructor(){
        mongoose.connect(URI_DATABASE, {
            useNewUrlParser: true
        })
            .then(db => console.log('Conexion lista a la base de Datos'))
            .catch(err => console.error('Error al conectarse a la base de datos',err));
    }
}

const database = new Database()
module.exports = database