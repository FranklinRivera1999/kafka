const  userModel =  require('../models/user');
const kafka = require ('../lib/kafka')

exports.getById = async (req,res)=>{
    try{

        const userId = req.params.userId;
    
        const userCollection = await userModel.findOne({
            _id:userId
        });

        res.status(200).send({
            success : true,
            data : userCollection,
            error : null
        })

    }
    catch(e){

        console.log(e);

        res.status.send({
            success : false,
            data : null,
            error : e
        })

    }
}

exports.createUser = async (req,res)=>{
    const user = {
        username : req.body.username
    }

    try {

        const userCollection = await userModel.create(user);

        res.status(200).send({
            success : true,
            data : userCollection,
            error : null
        })

    }
    catch(e) {
        console.log(e);

        res.status(500).send({
            success : false,
            data : null,
            error : e
        })

    }
}

exports.delete = async (req,res)=>{
    try {

        const userId = req.params.userId;

        let userCollection = await userModel.findOne({
            _id:userId
        });

        if(userCollection) {
            userCollection = userCollection.toObject();

            kafka.publish({ type : "DELETE_USER",
                         data : userCollection._id},"prueba",(err,data) => {
                if(err) {
                    console.log('[kafka-producer -> '+"prueba"+']: broker update failed')
                }
                console.log('[kafka-producer -> '+"prueba"+']: broker update success');
            })

            await userModel.deleteOne({
                _id:userId
            })
        
            res.status(200).send({
                success : true,
                data : "Deleted Successfully",
                error : null
            })

        }
        else{

            res.status(404).send({
                success : false,
                data: null,
                error : "Not Found"
            })

        }



    }
    catch(e) {
        console.log(e);

        res.status(500).send({
            success : false,
            data : null,
            error : e
        })

    }
    
}