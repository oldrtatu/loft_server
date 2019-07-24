const express = require('express')
const router = express.Router()
const model = require('../../models')
const logger = require('../../logger/logger')
const util = require('util')
const Error = require('../../utils/Error')


// get all locations
router.get('/', async (req, res, next) => {
    let queryResult = await model.location.findAll({
        include : model.address
    }).catch(err => {
        let response = Error.SequelizeErrorFormat(err)
        console.log(response)
        res.status(400).send(response)
    })

    // send the response
    res.status(200).json(queryResult)
})



// create a location
router.post('/', async (req, res, next) => {

    /**
     *  add the location including address
     */
    let location = await model.location.create( req.body , {
        include : [model.address]
    }).catch(err => {
        console.log(err)
        let response = Error.SequelizeErrorFormat(err)
        res.status(400).send(response)
        res.end()
    })

    // send the response
    if(location) {
        res.status(201).json({
            "code" : "ADD_SUCC",
            response : location
        })
    }

})


// update a location
router.put('/', async (req, res, next) => {

    // update only location
    let queryResult = await model.location.update(req.body, {
        where: {
            id: req.body.id
        }
    }).catch(err => {
        let response = Error.SequelizeErrorFormat(err)
        res.status(400).send(response)
    })

    // now get related to the address if request body object has address object
    let location = (req.body.address) ? await model.location.findByPk(req.body.id, {
        include : model.address
    }).catch(err => {
        let response = Error.SequelizeErrorFormat(err)
        res.status(400).send(response)
    }) : undefined


    // if location !== undefined
    if(location) {

        if(location.address === null) {
            address = await location.createAddress(req.body.address).catch(err => {
                let response = Error.SequelizeErrorFormat(err)
                res.status(400).send(response)
            })
        } else {
            address = await model.address.update(req.body.address, {
                where : {
                    id : location.address.id
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


// delete a location
router.delete('/', async (req, res, next) => {

    let queryResult = await model.location.destroy({
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