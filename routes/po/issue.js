const controller = require('../../controller/issue')


module.exports = (router) => {
    router.route('/issue')
        .get(controller.get)
        .post(controller.add)
        .put(controller.update)
        .delete(controller.remove)
}