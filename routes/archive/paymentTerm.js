const express = require('express')
const router = express.Router()
const model = require('../../models')
const logger = require('../../logger/logger')
const util = require('util')
const Error = require('../../utils/Error')


// get all payment terms
router.get('/', async (req, res, next) => {
    let queryResult = await model.paymentTerm.findAll({}).catch(err => {
        let response = Error.SequelizeErrorFormat(err)
        console.log(response)
        res.status(400).send(response)
    })
    res.status(200).json(queryResult)
})

// create a payment terms
router.post('/', async (req, res, next) => {

    let queryResult = await model.paymentTerm.create({
        termCode : req.body.termCode,
        dueAfter : req.body.dueAfter,
        dueUnit : req.body.dueUnit,
        description: req.body.description,
        status: req.body.status
    }).catch(err => {
        let response = Error.SequelizeErrorFormat(err)
        res.status(400).send(response)
        res.end()
    })

    if(queryResult) {
        res.status(201).json({
            "code" : "ADD_SUCC",
            response : queryResult
        })
    }

})


// update a payment term
router.put('/', async (req, res, next) => {

    let queryResult = await model.paymentTerm.update({
        termCode : req.body.termCode,
        dueAfter : req.body.dueAfter,
        dueUnit : req.body.dueUnit,
        description: req.body.description,
        status: req.body.status
    }, {
        where: {
            id: req.body.id
        }
    }).catch(err => {
        let response = Error.SequelizeErrorFormat(err)
        res.status(400).send(response)
    })

    if(queryResult[0] === 1) {
        res.status(200).json({
            'code' : "UPDATE_SUCC",
            response : req.body
        })
    } else {
        res.status(200).json({
            'code' : "UPDATE_FAIL",
            'message' : 'ID doesn\'t exist'
        })
    }

})


// delete a payment term
router.delete('/', async (req, res, next) => {

    let queryResult = await model.paymentTerm.destroy({
        where: { id: req.body.id }
    }).catch(err => {
        let response = Error.SequelizeErrorFormat(err)
        res.status(400).send(response)
    })


    if(queryResult === 1) {
        res.status(200).json({
            'code' : "DELETE_SUCC",
            'response' : {
                id : req.body.id
            }
        })
    } else {
        res.status(200).json({
            'code' : "DELETE_FAIL",
            'message' : 'ID doesn\'t exist'
        })
    }

})

// exports the router
module.exports = router