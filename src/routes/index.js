module.exports = (app) => {
	require('./blog.routes')(app)
	require('./category.routers')(app)
	require('./tag.routers')(app)
	require('./auth.routes')(app)
	require('./metadata.routes')(app)

	//web
	require('./web/blog.routes')(app)
	require('./web/metadata.routes')(app)
	require('./web/page.routes')(app)
}
