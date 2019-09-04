const express = require('express')
const router = express.Router()
const model = require('../../models')
const logger = require('../../logger/logger')
const util = require('util')
const Error = require('../../utils/Error')

// get all classes
router.get('/', async (req, res, next) => {
    let Class = await model.class.findAll({}).catch(err => {
        let response = Error.SequelizeErrorFormat(err)
        console.log(response)
        res.status(400).send(response)
    })
    res.status(200).json(Class)
})

// create a class
router.post('/', async (req, res, next) => {

    let Class = await model.class.create({
        name: req.body.name,
        associationWith: req.body.associationWith,
        status: req.body.status,
        colorCode : req.body.colorCode
    }).catch(err => {
        console.log(err)
        let response = Error.SequelizeErrorFormat(err)
        res.status(400).send(response)
        res.end()
    })

    if(Class) {
        res.status(201).json({
            "code" : "ADD_SUCC",
            response : Class
        })
    }

})


// update a class
router.put('/', async (req, res, next) => {

    let Class = await model.class.update({
        name: req.body.name,
        associationWith: req.body.associationWith,
        status: req.body.status,
        colorCode : req.body.colorCode
    }, {
        where: {
            id: req.body.id
        }
    }).catch(err => {
        let response = Error.SequelizeErrorFormat(err)
        res.status(400).send(response)
    })

    if(Class[0] === 1) {
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


// delete a class
router.delete('/', async (req, res, next) => {

    let Class = await model.class.destroy({
        where: { id: req.body.id }
    }).catch(err => {
        let response = Error.SequelizeErrorFormat(err)
        res.status(400).send(response)
    })


    if(Class === 1) {
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