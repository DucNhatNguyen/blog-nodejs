module.exports = (app) => {
	const blogControllers = require('../controllers/blog.controller.js')

	var router = require('express').Router()

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

	app.use('/api/blog', router)
}
