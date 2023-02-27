var initModels = require('@models/init-models')
const sequelize = require('@config/sequelize.config')
var models = initModels(sequelize)

exports.getMetadata = (req, res) => {
	models.metadata
		.findAll({
			attributes: ['id', 'key', 'value', 'description'],
		})
		.then((data) => {
			res.send({ data: data })
		})
		.catch((err) => {
			res.status(500).send(err)
		})
}
