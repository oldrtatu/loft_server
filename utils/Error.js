const Error = {

    formatError : function(err){
        // get all the keys of error object
        let keys = Object.keys(err)

        let data = {}

        // get all the values of coresponding keys
        for (let key of keys) {
            
            // add the key value pair to data array
            data[key] = err[key]
        }

        return data
    },

    SequelizeErrorFormat : function(err) {
        let error = {

        }

        let ErrorObject = this.formatError(err)

        console.log(ErrorObject)


        // set the code of the error
        if(ErrorObject.original) {
            error['code'] = ErrorObject.original.code
            error['message'] = ErrorObject.original.sqlMessage
        }

        if(ErrorObject.fields) {
            error['fields'] = {...ErrorObject.fields}
        }

        return this.displayOnlyError(error)
    },

    displayOnlyError : function(errObj) {
        switch(errObj.code) {
            case "ER_NO_SUCH_TABLE":
                return {
                    name : "DatabaseError",
                    code : errObj.code
                }
            default:
                return {
                    name : "DatabaseError",
                    ...errObj
                }
        }
    }

}

module.exports = Error