const controller = require('../controller/user');

module.exports = (router) => {
    router.route('/users')
        .post(controller.add)
        .put(controller.update)
        .get(controller.get)
        .delete(controller.delete)

    router.route('/login')
        .post(controller.login)

    router.route('/changePassword')
        .post(controller.changePassword)

    return router
}