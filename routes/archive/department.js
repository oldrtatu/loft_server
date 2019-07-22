const express = require('express')
const router = express.Router()
const model = require('../../models')
const logger = require('../../logger/logger')
const util = require('util')
const Error = require('../../utils/Error')


// get all departments
router.get('/', async (req, res, next) => {
    let departments = await model.department.findAll({}).catch(err => {
        let response = Error.SequelizeErrorFormat(err)
        console.log(response)
        res.status(400).send(response)
    })
    res.status(200).json(departments)
})

// create a service
router.post('/', async (req, res, next) => {

    let department = await model.department.create({
        name: req.body.name,
        associationWith: req.body.associationWith,
        status: req.body.status
    }).catch(err => {
        let response = Error.SequelizeErrorFormat(err)
        res.status(400).send(response)
        res.end()
    })

    if(department) {
        res.status(201).json({
            "code" : "ADD_SUCC",
            response : department
        })
    }

})


// update a service
router.put('/', async (req, res, next) => {

    let department = await model.department.update({
        name: req.body.name,
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

    if(department[0] === 1) {
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

    let department = await model.department.destroy({
        where: { id: req.body.id }
    }).catch(err => {
        let response = Error.SequelizeErrorFormat(err)
        res.status(400).send(response)
    })


    if(department === 1) {
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