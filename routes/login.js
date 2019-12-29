const controller = require('../controller/user');

module.exports = (router) => {
    router.route('/')
        .post(controller.login)

    return router
}