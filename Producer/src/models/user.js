  
const Mongoose = require('mongoose');

const userSchema = new Mongoose.Schema({
    username : {
        type : String,
        required : true
    }
},{ timestamps : true });



module.exports = Mongoose.model('User',userSchema)