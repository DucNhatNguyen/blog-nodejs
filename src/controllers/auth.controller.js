var initModels = require('../models/init-models')
const sequelize = require('../config/sequelize.config')
var models = initModels(sequelize)
const config = require('../config/auth.config.js')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
const utils = require('../utils/verifyToken.js')
const refreshTokenList = {}

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

			// luu refresh token vao bien chung
			refreshTokenList[refreshToken] = user

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

exports.refreshToken = (req, res) => {
	const refreshToken = req.body.refreshToken

	console.log('token', refreshTokenList)
	if (refreshToken && refreshToken in refreshTokenList) {
		try {
			// Kiểm tra mã Refresh token
			utils.verifyJwtToken(refreshToken, config.refreshTokenSecret)
			// Lấy lại thông tin user
			const user = refreshTokenList[refreshToken]
			// Tạo mới mã token và trả lại cho user
			const token = jwt.sign({ id: user.id }, config.secret, {
				expiresIn: config.tokenExpire,
			})
			const response = {
				token,
			}
			res.status(200).json(response)
		} catch (err) {
			console.error(err)
			res.status(403).json({
				message: 'Invalid refresh token',
			})
		}
	} else {
		res.status(400).json({
			message: 'Invalid request',
		})
	}
}

exports.TokenCheckMiddleware = async (req, res, next) => {
	// Lấy thông tin mã token được đính kèm trong request
	const token =
		req.body.token || req.query.token || req.headers['x-access-token']
	// decode token
	if (token) {
		// Xác thực mã token và kiểm tra thời gian hết hạn của mã
		try {
			const decoded = await utils.verifyJwtToken(token, config.secret)
			// Lưu thông tin giã mã được vào đối tượng req, dùng cho các xử lý ở sau
			req.decoded = decoded
			next()
		} catch (err) {
			// Giải mã gặp lỗi: Không đúng, hết hạn...
			console.error(err)
			return res.status(401).json({
				message: 'Unauthorized access.',
			})
		}
	} else {
		// Không tìm thấy token trong request
		return res.status(403).send({
			message: 'No token provided.',
		})
	}
}
