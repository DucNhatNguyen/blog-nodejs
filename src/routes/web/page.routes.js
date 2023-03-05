module.exports = (app) => {
	const controller = require('../../controllers/web/page.controller')
	var router = require('express').Router()

	router.get('/author', controller.getYourself)

	app.use('/api/web/page', router)
}
