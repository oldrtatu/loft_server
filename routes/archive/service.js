const express = require('express')
const router = express.Router()
const model = require('../../models')
const logger = require('../../logger/logger')
const util = require('util')
const Error = require('../../utils/Error')

// get all services
router.get('/', async (req, res, next) => {
    let services = await model.service.findAll({}).catch(err => {
        let response = Error.SequelizeErrorFormat(err)
        console.log(response)
        res.status(400).send(response)
    })
    res.status(200).json(services)
})

// create a service
router.post('/', async (req, res, next) => {

    let service = await model.service.create({
        name: req.body.name,
        textField: req.body.textField,
        associationWith: req.body.associationWith,
        status: req.body.status
    }).catch(err => {
        let response = Error.SequelizeErrorFormat(err)
        res.status(400).send(response)
        res.end()
    })
    
    if(service) {
        res.status(201).json({
            "code" : "ADD_SUCC",
            response : service
        })
    }

})


// update a service
router.put('/', async (req, res, next) => {

    let service = await model.service.update({
        name: req.body.name,
        textField: req.body.textField,
        associationWith: req.body.associationWith,
        status: req.body.status
    }, {
        where: {
            id: req.body.id
        }
    }).catch(err => {
        let response = Error.SequelizeErrorFormat(err)
        res.status(400).send(response)
    })

    if(service[0] === 1) {
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


// delete a service
router.delete('/', async (req, res, next) => {

    let service = await model.service.destroy({
        where: { id: req.body.id }
    }).catch(err => {
        let response = Error.SequelizeErrorFormat(err)
        res.status(400).send(response)
    })


    if(service === 1) {
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



module.exports = router