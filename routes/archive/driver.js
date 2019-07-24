const express = require('express')
const router = express.Router()
const model = require('../../models')
const logger = require('../../logger/logger')
const util = require('util')
const Error = require('../../utils/Error')


// get all drivers
router.get('/', async (req, res, next) => {
    let queryResult = await model.driver.findAll({
        include : model.address
    }).catch(err => {
        let response = Error.SequelizeErrorFormat(err)
        console.log(response)
        res.status(400).send(response)
    })

    // send the response
    res.status(200).json(queryResult)
})



// create a driver
router.post('/', async (req, res, next) => {

    /**
     *  add the driver including address
     */
    let driver = await model.driver.create( req.body , {
        include : [model.address]
    }).catch(err => {
        let response = Error.SequelizeErrorFormat(err)
        res.status(400).send(response)
        res.end()
    })

    // send the response
    if(driver) {
        res.status(201).json({
            "code" : "ADD_SUCC",
            response : driver
        })
    }

})


// update a driver
router.put('/', async (req, res, next) => {

    // update only driver
    let queryResult = await model.driver.update(req.body, {
        where: {
            id: req.body.id
        }
    }).catch(err => {
        let response = Error.SequelizeErrorFormat(err)
        res.status(400).send(response)
    })

    // now get related to the address if request body object has address object
    let driver = (req.body.address) ? await model.driver.findByPk(req.body.id, {
        include : model.address
    }).catch(err => {
        let response = Error.SequelizeErrorFormat(err)
        res.status(400).send(response)
    }) : undefined


    // if driver !== undefined
    if(driver) {

        if(driver.address === null) {
            address = await driver.createAddress(req.body.address).catch(err => {
                let response = Error.SequelizeErrorFormat(err)
                res.status(400).send(response)
            })
        } else {
            address = await model.address.update(req.body.address, {
                where : {
                    id : driver.address.id
                }
            }).catch(err => {
                let response = Error.SequelizeErrorFormat(err)
                res.status(400).send(response)
            })
        }

    }


    // send the response
    if( queryResult[0] === 1 ) {
        res.status(200).json({
            'code' : "UPDATE_SUCC"
        })
    } else {
        res.status(200).json({
            'code' : "UPDATE_FAIL",
            'message' : 'ID doesn\'t exist'
        })
    }

})


// delete a driver
router.delete('/', async (req, res, next) => {

    let queryResult = await model.driver.destroy({
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