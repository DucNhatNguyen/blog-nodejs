const { verifySignUp } = require('../middleware')
const controller = require('../controllers/auth.controller')

module.exports = (app) => {
	app.use(function (req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'Bearer, Origin, Content-Type, Accept'
		)
		next()
	})

	var router = require('express').Router()

	router.post(
		'/sign-up',
		[
			verifySignUp.checkDuplicateUsernameOrEmail,
			verifySignUp.checkRolesExisted,
		],
		controller.signUp
	)

	router.post('/sign-in', controller.signIn)

	app.use('/api/auth', router)
}
