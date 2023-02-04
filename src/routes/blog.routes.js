module.exports = (app) => {
	const blogControllers = require('../controllers/blog.controller.js')

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
	router.get('/', blogControllers.findAll)

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

	app.use('/api/blog', router)
}
