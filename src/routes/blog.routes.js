module.exports = (app) => {
	const { authJwt } = require('../middleware')
	const blogControllers = require('../controllers/blog.controller.js')

	app.use(function (req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'Bearer, Origin, Content-Type, Accept'
		)
		next()
	})

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
	router.post('/', upload.single('file'), blogControllers.create)

	// Retrieve all Tutorials
	router.get('/', [authJwt.verifyToken], blogControllers.findAll)

	// Retrieve all published Tutorials
	router.get('/published', blogControllers.findAllPublished)

	// Retrieve a single Tutorial with id
	router.get('/:slug', blogControllers.findOne)

	// Update a Tutorial with id
	router.put('/:slug', blogControllers.update)

	router.post('/upload', upload.single('file'), blogControllers.uploadThumb)

	// Delete a Tutorial with id
	router.delete('/:id', blogControllers.delete)

	// Create a new Tutorial
	router.delete('/', blogControllers.softDelete)

	// change status
	router.post('/change-status/:slug', blogControllers.changeStatus)

	app.use('/api/blog', router)
}
