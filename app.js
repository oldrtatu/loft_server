const express = require("express")

// setup environment variables
const dotenv = require("dotenv")
dotenv.config()

// middleware to see incoming request in terminal
const morgan =require("morgan")

// body parser
const bodyParser = require("body-parser")
const app = express()

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// cors enabled
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        res.status(200).json({})
    }
    next()
})


/*
* @implementation
*/


app.use('/', (req, res, next) => {
    res.status(200).json({
        "res" : "it works"
    })
})




module.exports = app