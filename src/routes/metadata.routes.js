const { verifyToken, isAdmin } = require('@middleware/authJwt')
module.exports = (app) => {
	app.use((req, res, next) => {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept'
		)
		next()
	})

	const metaControllers = require('@controllers/metadata.controller')

	var router = require('express').Router()

	router.post(
		'/',
		(req, res, next) => {
			verifyToken(req, res, next)
		},
		metaControllers.create
	)

	router.get(
		'/',
		(req, res, next) => {
			verifyToken(req, res, next)
		},
		metaControllers.findAll
	)

	router.get(
		'/:id',
		(req, res, next) => {
			verifyToken(req, res, next)
		},
		metaControllers.findOne
	)

	router.put(
		'/:id',
		(req, res, next) => {
			verifyToken(req, res, next)
		},
		metaControllers.update
	)

	router.delete(
		'/:id',
		(req, res, next) => {
			verifyToken(req, res, next)
		},
		metaControllers.delete
	)

	app.use('/api/metadata', router)
}
