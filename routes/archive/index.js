const express = require('express')
const router = express.Router()

// import all the archive routes
const service = require('./service')
const department = require('./department')
const Class = require('./class')
const paymentTerm = require('./paymentTerm')

router.get('/', (req,res,next) => {
    res.status(400).json({message : "yay"})
})

router.use('/service' ,service)
router.use('/department' ,department)
router.use('/class', Class)
router.use('/payterm', paymentTerm) // Payment Term Route


module.exports = router