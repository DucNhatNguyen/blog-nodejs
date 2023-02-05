const jwt = require('jsonwebtoken')
const config = require('../config/auth.config.js')
var initModels = require('../models/init-models')
const sequelize = require('../config/sequelize.config')
var models = initModels(sequelize)

const verifyToken = (req, res, next) => {
	if (!req.header('Authorization')) {
		return res.status(403).send({
			message: 'No token provided!',
		})
	}
	let token = req.header('Authorization').replace('Bearer ', '')

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) {
			return res.status(401).send({
				message: 'Unauthorized!',
			})
		}
		req.userId = decoded.id
		//next()
	})
}

const isAdmin = (req, res, next) => {
	models.users
		.findByPk(req.userId, {
			include: {
				model: models.roles,
				as: 'role',
			},
		})
		.then(({ role }) => {
			console.log('role haha', role.name)
			if (role.name != 'admin') {
				return res.status(403).send({
					message: 'Yêu cầu quyền Admin! Vui lòng kiểm tra lại',
				})
			}
			next()
		})
		.catch((err) => {
			res.status(500).send({ message: err.message })
		})
}

const authJwt = {
	verifyToken: verifyToken,
	isAdmin: isAdmin,
}
module.exports = authJwt
