const model = require('../models')
const Error = require('../utils/Error')

module.exports = {
    get: async (req, res) => {
        let issues = await model.issue.findAll({
            include: [
                {
                    model: model.class,
                    as: 'category',
                    attributes: ["id", "name"]
                },
                {
                    model: model.subsidiary,
                    as: "division",
                    attributes: ["id", "name"]
                }
            ],
            attributes: {
                exclude: [
                    "categoryId",
                    "divisionId",
                    "createdAt",
                    "updatedAt"
                ]
            }
        }).catch(err => {
            let response = Error.SequelizeErrorFormat(err)
            res.status(400).send(response)
        })
        res.status(200).json(issues)
    },
    add: async (req, res) => {
        let issue = await model.issue.create(req.body).catch(err => {
            let response = Error.SequelizeErrorFormat(err)
            res.status(400).send(response)
            res.end();
        })

        if (issue) {
            res.status(200).json({
                code: "ADD_SUCC",
                response: issue
            })
        }
    },
    remove: async (req, res) => {
        let issue = await model.issue.destroy({
            where : {
                id : req.body.id
            }
        }).catch(err => {
            let response = Error.SequelizeErrorFormat(err);
            res.status(400).send(response)
        })

        if(issue == 1) {
            res.status(200).json({
                code : "DELETE_SUCC",
                response : {
                    id : req.body.id
                }
            })
        } else {
            res.status(200).json( {
                code : "DELETE_FAIL",
                message : "Id doesn't exist"
            })
        }
    },
    update: async (req, res) => {
        let issue = await model.issue.update(req.body, {
            where: {
                id: req.body.id
            }
        }).catch(err => {
            let response = Error.SequelizeErrorFormat(err)
            res.status(400).send(response)
            res.end()
        })

        if (issue[0] == 1) {
            res.status(200).json({
                code: "UPDATE_SUCC",
                response: req.body
            })
        } else {
            res.status(200).json({
                code: "UPDATE_FAIL",
                message: "ID doesn't exist"
            })
        }
    },
}