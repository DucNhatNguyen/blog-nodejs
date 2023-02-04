var initModels = require('../models/init-models')
const sequelize = require('../config/sequelize.config')
var models = initModels(sequelize)
const config = require('../config/auth.config.js')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')

exports.signUp = (req, res) => {
	// validate params
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
							// add user
							models.users
								.create({
									username: req.body.username,
									email: req.body.email,
									password: bcrypt.hashSync(req.body.password, 8),
									roleid: req.body.roleid,
								})
								.then((user) => {
									res.send({ status: 'Sign up success', data: user })
								})
								.catch((err) => {
									res.status(500).send({ message: err.message })
								})
						})
				})
		})
}

exports.signIn = (req, res) => {
	models.users
		.findOne({
			where: {
				username: req.body.username,
			},
			include: {
				model: models.roles,
				as: 'role',
			},
		})
		.then((user) => {
			if (!user) {
				return res.status(404).send({ message: 'User Not found.' })
			}

			var passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

			if (!passwordIsValid) {
				return res.status(401).send({
					accessToken: null,
					message: 'Invalid Password!',
				})
			}

			var token = jwt.sign({ id: user.id }, config.secret, {
				expiresIn: config.tokenExpire, // 15 minutes
			})
			var refreshToken = jwt.sign({ id: user.id }, config.refreshTokenSecret, {
				expiresIn: config.refreshTokenExpire, // 15 minutes
			})

			res.status(200).send({
				status: 'Login success',
				data: {
					id: user.id,
					username: user.username,
					email: user.email,
					role: user.dataValues.role.dataValues,
					accessToken: token,
					refreshToken: refreshToken,
				},
			})
		})
		.catch((err) => {
			res.status(500).send({ message: err.message })
		})
}
