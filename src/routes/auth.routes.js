//const { verifySignUp } = require('../middleware')

module.exports = (app) => {
	const controller = require('../controllers/auth.controller')
	// app.use(function (req, res, next) {
	// 	res.header(
	// 		'Access-Control-Allow-Headers',
	// 		'Bearer, Origin, Content-Type, Accept'
	// 	)
	// 	next()
	// })

	var router = require('express').Router()

	router.post('/sign-up', controller.signUp)

	router.post('/sign-in', controller.signIn)

	router.post('/refresh-token', controller.refreshToken)

	router.use(controller.TokenCheckMiddleware)

	app.use('/api/auth', router)
}
