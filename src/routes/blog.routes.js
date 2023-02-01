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

	var cloudinary = require('cloudinary').v2
	cloudinary.config({
		cloud_name: 'droaa5vpq',
		api_key: '278164842727274',
		api_secret: 'EXsxgnPt8fxX5KzaE1IvbzjAFSM',
	})
	router.post('/upload', upload.single('file'), (req, res, next) => {
		const file = req.file
		cloudinary.uploader
			.upload(file.path, { folder: 'blog-upload' })
			.then((result) => {
				console.log(result)
				res.send({ image_url: result.secure_url })
			})
			.catch((err) => console.log(err))
	})

	app.use('/api/blog', router)
}
