const Error = require('./Error')

module.exports = {

    /**
     * @param res -> res object
     * @param data -> data to be sent (object)
     */
    OK: (res, data) => {

        res.status(200).json(data)
        res.end()

    },

    /**
     * @param res -> res object 
     * @param data -> data that gets added
     */

    ADDED: (res, data) => {

        res.status(201).json({
            code: "ADD_SUCC",
            response: data
        })
        res.end()

    },

    /**
     * @param res -> res object
     * @param data -> data that gets updated
     */

    UPDATED: (res, data) => {
        res.status(200).json({
            code: "UPDATE_SUCC",
            response: data
        })
        res.end()

    },

    /**
     * @param res -> res object
     * @param id -> id of the object that gets removed
     */
    REMOVED: (res, id) => {
        res.status(200).json({
            code: "DELETE_SUCC",
            response: {
                id
            }
        })
        res.end()

    },

    /**
     * @param res -> res object
     * @param err -> error object to be sent
     */
    DB_ERROR: (res, err) => {

        let response = Error.SequelizeErrorFormat(err)

        res.status(400).json({
            code: "DATABASE_ERROR",
            response
        })

        res.end()

    },


    FORBIDDEN: (res, data) => {

    },


    BAD_REQ: (res, data) => {

    },

    /**
     * @param res -> res object
     * @param message -> message to be sent
     */
    NOT_FOUND: (res, message = "Id doesn't exist") => {

        res.status(400).json({
            code: "OPERATION_FAILED",
            message
        })
        res.end()

    }

}