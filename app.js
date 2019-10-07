const express = require("express")
const morgan =require("morgan")
const bodyParser = require("body-parser")
const app = express()
const logger = require('./logger/logger')

// import routes
const archive = require('./routes/archive/')
const root = require('./routes/')
// const attachment = require('./routes/attachment.js')
const attachment = require('./routes/attachment.js')

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


// cors enabled
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    // if(req.method === "OPTIONS") {
    //     res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    //     res.status(200).json({})
    // }
    next()
})

global.__basedir = __dirname;


/**
 * @routes implementation
 * 1. root Route
 * 2. archive Route
 * 3. Attachment Route
 *
 */


app.use('/', root)
app.use('/archive', archive)
app.use('/attachment', attachment)

// on ubuntu
// exports the app
module.exports = app
