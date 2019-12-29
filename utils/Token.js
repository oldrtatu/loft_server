const jwt = require('jsonwebtoken')

module.exports = {
    generateToken : (payload) => {

        const options = {
            expiresIn: '30d',
            issuer: 'http://xplicitsoftware.co'
        }

        const secret = process.env.JWT_SECRET

        const token = jwt.sign(payload, secret, options)

        return token

    }
}