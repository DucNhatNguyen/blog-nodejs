const { verifyToken, isAdmin } = require('@middleware/authJwt')
module.exports = (app) => {
	app.use((req, res, next) => {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept'
		)
		next()
	})

	const blogControllers = require('@controllers/blog.controller.js')

	var router = require('express').Router()

	const multer = require('multer')
	// upload image for Blog
	var storage = multer.diskStorage({
		// destination: function (req, file, cb) {
		// 	cb(null, './public/uploads/')
		// },
		filename: function (req, file, cb) {
			cb(
				null,
				file.fieldname + '-' + Date.now() + '.' + file.mimetype.split(`\/`)[1]
			)
		},
	})

	var upload = multer({ storage: storage })

	// Create a new Tutorial
	router.post(
		'/',
		(req, res, next) => {
			verifyToken(req, res, next)
		},
		upload.single('file'),
		blogControllers.create
	)

	// Retrieve all Tutorials
	router.get(
		'/',
		(req, res, next) => {
			verifyToken(req, res, next)
		},
		blogControllers.findAll
	)

	// Retrieve all published Tutorials
	router.get(
		'/published',
		(req, res, next) => {
			verifyToken(req, res, next)
		},
		blogControllers.findAllPublished
	)

	// Retrieve a single Tutorial with id
	router.get(
		'/:slug',
		(req, res, next) => {
			verifyToken(req, res, next)
		},
		blogControllers.findOne
	)

	// Update a Tutorial with id
	router.put(
		'/:slug',
		(req, res, next) => {
			verifyToken(req, res, next)
		},
		blogControllers.update
	)

	router.post('/upload', upload.single('file'), blogControllers.uploadThumb)

	// Delete a Tutorial with id
	router.delete(
		'/:id',
		(req, res, next) => {
			verifyToken(req, res, next)
		},
		blogControllers.delete
	)

	// Create a new Tutorial
	router.delete(
		'/',
		(req, res, next) => {
			verifyToken(req, res, next)
		},
		blogControllers.softDelete
	)

	// change status
	router.post(
		'/change-status/:slug',
		(req, res, next) => {
			verifyToken(req, res, next)
		},
		blogControllers.changeStatus
	)

	router.post('/remove-img', blogControllers.removeImage)

	app.use('/api/blog', router)
}
