const { verifyToken, isAdmin } = require('../middleware/authJwt')
module.exports = (app) => {
	const tagControllers = require('../controllers/tag.controller.js')

	var router = require('express').Router()

	router.post(
		'/',
		(req, res, next) => {
			verifyToken(req, res, next)
		},
		tagControllers.create
	)

	router.get(
		'/',
		(req, res, next) => {
			verifyToken(req, res, next)
		},
		tagControllers.findAll
	)

	router.get(
		'/:id',
		(req, res, next) => {
			verifyToken(req, res, next)
		},
		tagControllers.findOne
	)

	router.put(
		'/:id',
		(req, res, next) => {
			verifyToken(req, res, next)
		},
		tagControllers.update
	)

	router.delete(
		'/:id',
		(req, res, next) => {
			verifyToken(req, res, next)
		},
		tagControllers.delete
	)

	app.use('/api/tag', router)
}
