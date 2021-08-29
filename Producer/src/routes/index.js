const {Router}= require('express')
const userController = require('../controllers/user.controller')
let router = Router()

router.get('/api/users/:userId',userController.getById)
router.post('/api/users',userController.createUser)
router.delete('/api/users/:userId',userController.delete)

module.exports=router