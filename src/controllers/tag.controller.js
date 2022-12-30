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
	
	if (!params.slug) {
		res.status(400).send({
			message: 'Slug can not be empty!',
		})
		return
	}

	const tag = {
		slug: params.slug,
		title: params.title,
	}

	models.tag
		.create(tag)
		.then((data) => {
			res.send(data)
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the Tag.',
			})
		})
}

exports.findAll = (req, res) => {
	models.tag
		.findAll()
		.then((data) => {
			res.send(data)
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || 'Some error occurred while retrieving tag.',
			})
		})
}

exports.findOne = (req, res) => {
	const id = req.params.id

	if (!req.params.id) {
		res.status(400).send({
			message: 'Id can not be empty!',
		})
		return
	}

	models.tag
		.findByPk(id)
		.then((data) => {
			if (data) {
				res.send(data)
			} else {
				res.status(404).send({
					message: `Cannot find Tag with id=${id}.`,
				})
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Error retrieving Tag with id=' + id,
			})
		})
}

exports.update = (req, res) => {
	const id = req.params.id

	if (!id) {
		res.status(400).send({
			message: 'Id can not be empty!',
		})
		return
	}

	models.tag
		.update(req.body, {
			where: { id: id },
			returning: true,
		})
		.then(([num, data]) => {
			if (num != 1) {
				res.send({
					message: `Cannot update Tag with id=${id}. Maybe Tag was not found or req.body is empty!`,
				})
			} else {
				res.send(data[0].dataValues)
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Error updating Tag with id=' + id,
			})
		})
}

exports.delete = (req, res) => {
	const id = req.params.id

	if (!id) {
		res.status(400).send({
			message: 'Id can not be empty!',
		})
		return
	}

	models.tag
		.destroy({
			where: { id: id },
		})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: 'Tag was deleted successfully!',
				})
			} else {
				res.send({
					message: `Cannot delete Tag with id=${id}. Maybe Tag was not found!`,
				})
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Could not delete Tag with id=' + id,
			})
		})
}