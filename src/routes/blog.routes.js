module.exports = (app) => {
	const blogControllers = require('../controllers/blog.controller.js')

	var router = require('express').Router()

	const multer = require('multer')

	// Create a new Tutorial
	router.post('/', blogControllers.create)

	// Retrieve all Tutorials
	router.get('/', blogControllers.findAll)

	// Retrieve all published Tutorials
	router.get('/published', blogControllers.findAllPublished)

	// Retrieve a single Tutorial with id
	router.get('/:slug', blogControllers.findOne)

	// Update a Tutorial with id
	router.put('/:slug', blogControllers.update)

	// Delete a Tutorial with id
	router.delete('/:id', blogControllers.delete)

	// Create a new Tutorial
	router.delete('/', blogControllers.softDelete)

	// upload image for Blog
	var storage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, './public/uploads/')
		},
		filename: function (req, file, cb) {
			cb(
				null,
				file.fieldname + '-' + Date.now() + '.' + file.mimetype.split(`\/`)[1]
			)
		},
	})

	var upload = multer({ storage: storage })

	router.post('/photo', upload.single('thumbnail'), (req, res, next) => {
		const file = req.file
		if (!file) {
			const error = new Error('Please upload a file')
			error.httpStatusCode = 400
			return next(error)
		}
		res.send(file)
	})

	app.use('/api/blog', router)
}
