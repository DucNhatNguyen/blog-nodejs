module.exports = (app) => {
	const controller = require('../../controllers/web/blog.controller')
	var router = require('express').Router()

	router.get('/home-page', controller.getHomePage)
	router.get('/static-post-path', controller.getStaticPath)
	router.get('/post/get-with-view', controller.getBlogsWithManyViews)
	router.get('/post/:slug', controller.postDetail)

	app.use('/api/web', router)
}
