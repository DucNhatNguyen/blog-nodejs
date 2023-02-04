const jwt = require('jsonwebtoken')
const config = require('../config/auth.config.js')
var initModels = require('../models/init-models')
const sequelize = require('../config/sequelize.config')
var models = initModels(sequelize)

const verifyToken = (req, res, next) => {
	let token = req.headers['Bearer']

	if (!token) {
		return res.status(403).send({
			message: 'No token provided!',
		})
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) {
			return res.status(401).send({
				message: 'Unauthorized!',
			})
		}
		req.userId = decoded.id
		next()
	})
}

const isAdmin = (req, res, next) => {
	models.users.findByPk(req.userId).then((user) => {
		user.getRoles().then((roles) => {
			for (let i = 0; i < roles.length; i++) {
				if (roles[i].name === 'admin') {
					next()
					return
				}
			}

			res.status(403).send({
				message: 'Require Admin Role!',
			})
			return
		})
	})
}

const authJwt = {
	verifyToken: verifyToken,
	isAdmin: isAdmin,
}
module.exports = authJwt
