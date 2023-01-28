module.exports = (app) => {
	const cateControllers = require('../controllers/category.controller.js')

	var router = require('express').Router()

	router.post('/', cateControllers.create)

	router.get('/', cateControllers.findAll)

	router.get('/parent', cateControllers.getCateParent)

	router.get('/:id', cateControllers.findOne)

	router.put('/:id', cateControllers.update)

	router.delete('/:id', cateControllers.delete)

	app.use('/api/category', router)
}
