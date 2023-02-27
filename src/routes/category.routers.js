const { verifyToken, isAdmin } = require('@middleware/authJwt')
module.exports = (app) => {
	app.use((req, res, next) => {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept'
		)
		next()
	})

	const cateControllers = require('@controllers/category.controller.js')

	var router = require('express').Router()

	router.post(
		'/',
		(req, res, next) => {
			verifyToken(req, res, next)
		},
		cateControllers.create
	)

	router.get(
		'/',
		(req, res, next) => {
			verifyToken(req, res, next)
		},
		cateControllers.findAll
	)

	router.get(
		'/parent',
		(req, res, next) => {
			verifyToken(req, res, next)
		},
		cateControllers.getCateParent
	)

	router.get(
		'/child',
		(req, res, next) => {
			verifyToken(req, res, next)
		},
		cateControllers.getCateChild
	)

	router.get(
		'/:id',
		(req, res, next) => {
			verifyToken(req, res, next)
		},
		cateControllers.findOne
	)

	router.put(
		'/:id',
		(req, res, next) => {
			verifyToken(req, res, next)
		},
		cateControllers.update
	)

	router.delete(
		'/:id',
		(req, res, next) => {
			verifyToken(req, res, next)
		},
		cateControllers.delete
	)

	app.use('/api/category', router)
}
