const controller = require('../../controller/archive/vendor')


module.exports = (router) => {
    router.route('/vendor')
        .get(controller.get)
        .post(controller.add)
        .put(controller.update)
        .delete(controller.remove)
}