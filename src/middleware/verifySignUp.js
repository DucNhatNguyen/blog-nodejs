var initModels = require('../models/init-models')
const sequelize = require('../config/sequelize.config')
var models = initModels(sequelize)

const verifySignUp = (req, res) => {
	models.users
		.findOne({
			where: {
				username: req.body.username,
			},
		})
		.then((user) => {
			if (user) {
				return res.status(400).send({
					message: 'Failed! Username is already in use!',
				})
			}
			models.users
				.findOne({
					where: {
						email: req.body.email,
					},
				})
				.then((user) => {
					if (user) {
						res.status(400).send({
							message: 'Failed! Email is already in use!',
						})
						return
					}
					models.roles
						.findOne({
							where: {
								id: req.body.roleid,
							},
						})
						.then((role) => {
							if (!role) {
								res.status(400).send({
									message: `Failed! Role-id ${req.body.roleid} does not exist`,
								})
								return
							}
						})
				})
		})
}

module.exports = verifySignUp
