module.exports = (app) => {
	const tagControllers = require('../controllers/tag.controller.js')

	var router = require('express').Router()

	router.post('/', tagControllers.create)

	router.get('/', tagControllers.findAll)

	router.get('/:id', tagControllers.findOne)

	router.put('/:id', tagControllers.update)

	router.delete('/:id', tagControllers.delete)

	app.use('/api/tag', router)
}