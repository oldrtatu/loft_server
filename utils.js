const jwt = require('jsonwebtoken')

module.exports = {
    validateToken: (req, res, next) => {

        const authorizationHeader = req.headers.authorization

        let result

        if (authorizationHeader) {

            const token = authorizationHeader.split(' ')[1] // Bearer Token

            const options = {
                expiresIn: '30d',
                issuer: 'http://xplicitsoftware.co'
            }

            
            try {
                result = jwt.verify(token, process.env.JWT_SECRET, options);
            } catch (err) {
                res.status(401).json({
                    code : "TOKEN_ERROR",
                    message : err.message
                })
            }

            req.decodedToken = result

            next()
            
        } else {
            let result = {
                code: "TOKEN_NOT_FOUND",
                message: 'Authentication error. Token required',
            }

            res.status(401).send(result);
        }
    }
}