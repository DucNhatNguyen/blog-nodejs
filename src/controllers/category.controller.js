var initModels = require('../models/init-models')
const sequelize = require('../config/sequelize.config')
var models = initModels(sequelize)

exports.create = (req, res) => {
	var params = req.body
	// Validate input
	if (!params.title) {
		res.status(400).send({
			message: 'Title can not be empty!',
		})
		return
	}

	// Create Blog model
	const category = {
		title: params.title,
		status: 1,
		parentid: params.parentid,
		isparentcate: params.isparentcate,
	}

	models.category
		.create(category)
		.then((data) => {
			res.send(data)
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || 'Some error occurred while creating the Category.',
			})
		})
}
