var initModels = require('../models/init-models')
const sequelize = require('../config/sequelize.config')
const { getPagination } = require('../commons/helpers')
var models = initModels(sequelize)

exports.create = (req, res) => {
	var params = req.body

	// Validate input
	if (!params.key) {
		res.status(400).send({
			message: 'Key can not be empty!',
		})
		return
	}
	if (!params.value) {
		res.status(400).send({
			message: 'Value can not be empty!',
		})
		return
	}

	// Create Blog model
	const metadata = {
		key: params.key,
		value: params.value,
		description: params.description,
	}

	models.metadata
		.create(metadata)
		.then((data) => {
			res.status(200).send(data)
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || 'Some error occurred while creating the MetaData.',
			})
		})
}

exports.findAll = (req, res) => {
	const { page, pagesize } = req.query

	const { limit, offset } = getPagination(page, pagesize)

	models.metadata
		.findAndCountAll({
			attributes: ['id', 'key', 'value', 'description'],
			offset: offset,
			limit: limit,
		})
		.then(({ count, rows }) => {
			res.send({ data: rows, total: count })
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || 'Some error occurred while retrieving metadata.',
			})
		})
}

exports.findOne = (req, res) => {
	const id = req.params.id

	if (!req.params.id) {
		res.status(400).send({
			message: 'id can not be empty!',
		})
		return
	}

	models.metadata
		.findOne({
			where: { id: id },
		})
		.then((data) => {
			if (data) {
				res.send(data)
			} else {
				res.status(404).send({
					message: `Cannot find MetaData with id=${id}.`,
				})
			}
		})
		.catch((err) => {
			res.status(500).send(err)
		})
}

exports.update = (req, res) => {
	const id = req.params.id
	if (!id) {
		res.status(400).send({
			message: 'id can not be empty!',
		})
		return
	}

	models.metadata
		.update(req.body, {
			where: { id: id },
			returning: true,
		})
		.then(([num, data]) => {
			if (num != 1) {
				res.status(500).send({
					message: `Cannot update MetaData with slug=${slug}. Maybe Meta was not found or req.body is empty!`,
				})
			} else {
				res.status(200).send(data[0].dataValues)
			}
		})
		.catch((err) => {
			res.status(500).send(err)
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

	models.metadata
		.destroy({
			where: { id: id },
		})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: 'MetaData was deleted successfully!',
				})
			} else {
				res.send({
					message: `Cannot delete Metadata with id=${id}. Maybe Metadata was not found!`,
				})
			}
		})
		.catch((err) => {
			res.status(500).send(err)
		})
}
