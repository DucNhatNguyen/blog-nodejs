var initModels = require('@models/init-models')
const sequelize = require('@config/sequelize.config')
var models = initModels(sequelize)

exports.getYourself = async (req, res) => {
	try {
		const author = await models.author.findAll({
			where: { id: 1 },
		})
		res.status(200).send(author[0])
	} catch (err) {
		res.status(500).send(err)
	}
}
