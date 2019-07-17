const winston = require('winston')
const appRoot = require('app-root-path')


const options = {
    file : {
        level : 'info',
        filename : `${appRoot}/logs/app.log`,
        handleException : true,
        json : false,
        maxsize : 5242880, // 5MB
        maxFiles : 5,
        colorize : true
    },
    console : {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    }
}


// instantiate a new winston logger
const logger = winston.createLogger({
    transports : [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    exitOnError : false
})

// create a stream object to used by morgan
logger.stream = {
    write : function(message, encoding){
        // logger.info(message)
    }
}

//exports logger
module.exports = logger