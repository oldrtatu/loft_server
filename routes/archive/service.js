const express = require('express')
const router = express.Router()
const model = require('../../models')


// get all services
router.get('/', async (req, res, next) => {
    let services = await model.service.findAll({}).catch(err => {
        res.status(400).json(err)
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
    }).catch(err => res.status(400).json(err))

    res.status(201).json(service)
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
    })

    console.log(service)

    res.status(400).json(service)
})


// delete a service
router.delete('/', async (req, res, next) => {
    let service = await model.service.destroy({
        where: { id: req.body.id }
    }).catch(err => console.log(err))

    console.log(service)

    res.status(400).json(d)

})

module.exports = router