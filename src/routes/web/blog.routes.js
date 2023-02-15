module.exports = (app) => {
	const controller = require('../../controllers/web/blog.controller')
	var router = require('express').Router()

	router.get('/home-page', controller.getHomePage)

	app.use('/api/web', router)
}
