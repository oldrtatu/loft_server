const issue = require('./issue')
const po = require('./po')

module.exports = (router) => {
    issue(router)
    
    po(router)

    return router
}