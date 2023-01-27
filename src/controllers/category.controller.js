var initModels = require('../models/init-models')
var moment = require('moment')
const sequelize = require('../config/sequelize.config')
const { getPagination } = require('../commons/helpers')
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
	}
	// Create Blog model
	const category = {
		title: params.title,
		status: 1,
		parentid: params.parentid,
		isparentcate: params.isparentcate,
		slug: params.slug,
		createddate: moment(),
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

exports.findAll = (req, res) => {
	const { page, pagesize } = req.query

	const { limit, offset } = getPagination(page, pagesize)

	models.category
		.findAndCountAll({
			attributes: [
				'id',
				'title',
				'slug',
				'status',
				'createddate',
				'createdby',
				'parentid',
				'isparentcate',
				[
					sequelize.literal(
						"(case status when 1 then 'Hoạt động' else 'Tạm ẩn' end)"
					),
					'statusname',
				],
			],
			order: sequelize.literal('title ASC'),
			offset: offset,
			limit: limit,
		})
		.then(({ count, rows }) => {
			res.send({ data: rows, total: count })
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || 'Some error occurred while retrieving category.',
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

	models.category
		.findByPk(id, {
			attributes: [
				'id',
				'title',
				'slug',
				'status',
				'createddate',
				'createdby',
				'parentid',
				'isparentcate',
				[
					sequelize.literal(
						"(case status when 1 then 'Hoạt động' else 'Tạm ẩn' end)"
					),
					'statusname',
				],
			],
		})
		.then((data) => {
			if (data) {
				res.send(data)
			} else {
				res.status(404).send({
					message: `Cannot find Category with id=${id}.`,
				})
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Error retrieving Category with id=' + id,
			})
		})
}

exports.update = (req, res) => {
	const id = req.params.id
	const slug = req.body.slug

	if (!id) {
		res.status(400).send({
			message: 'Id can not be empty!',
		})
		return
	}

	if (!slug) {
		res.status(400).send({
			message: 'Slug can not be empty!',
		})
	}

	models.category
		.update(req.body, {
			where: { id: id },
			returning: true,
		})
		.then(([num, data]) => {
			if (num != 1) {
				res.send({
					message: `Cannot update Category with id=${id}. Maybe Category was not found or req.body is empty!`,
				})
			} else {
				res.send(data[0].dataValues)
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Error updating Category with id=' + id,
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

	models.category
		.destroy({
			where: { id: id },
		})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: 'Category was deleted successfully!',
				})
			} else {
				res.send({
					message: `Cannot delete Category with id=${id}. Maybe Category was not found!`,
				})
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Could not delete Category with id=' + id,
			})
		})
}
