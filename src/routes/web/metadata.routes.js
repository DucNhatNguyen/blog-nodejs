module.exports = (app) => {
	const controller = require('../../controllers/web/metadata.controller')
	var router = require('express').Router()

	router.get('/get', controller.getMetadata)

	app.use('/api/web/metadata', router)
}
