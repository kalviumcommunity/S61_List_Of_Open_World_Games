const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const port = 3000

app.get('/ping', (req, res) => {
    res.send("This is a basic express app with ping route")
})

mongoose.connect(process.env.MONGODB_URI).then(() => console.log("MongoDB connected")).catch((err) => console.log("MongoDB connection error: ", err))

app.get('/', (req, res) => {
    if(mongoose.connection.readyState === 1){
        res.send("Conneted to MongoDB Successfully✅")
    }else{
        res.send("Did not connect to MongoDB😔")
    }
})
  

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})