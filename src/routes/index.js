module.exports = (app) => {
	require('./blog.routes')(app)
	require('./category.routers')(app)
	require('./tag.routers')(app)
	require('./auth.routes')(app)
}
