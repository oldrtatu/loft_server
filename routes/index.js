const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(400).send("you are at https://localhost:8000/")
})

module.exports = router