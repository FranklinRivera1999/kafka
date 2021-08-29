const express = require('express')
const routes = require('./routes')

require('./database')
require('./lib/kafka')

let app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(routes)

app.listen(4000,()=>{
    console.log('SERVER IS READY')
})