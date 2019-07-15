const express = require('express')
const router = express.Router()

// import all the archive routes
const service = require('./service')

router.get('/', (req,res,next) => {
    res.status(400).json({message : "yay"})
})

router.use('/service' ,service)


module.exports = router