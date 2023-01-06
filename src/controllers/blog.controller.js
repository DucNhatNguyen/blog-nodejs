var initModels = require('../models/init-models')
const sequelize = require('../config/sequelize.config')
const date = require('date-and-time')
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
	if (!params.author) {
		res.status(400).send({
			message: 'Author can not be empty!',
		})
		return
	}
	if (!params.publicdate) {
		res.status(400).send({
			message: 'Public date can not be empty!',
		})
		return
	}
	if (!params.thumbnail) {
		res.status(400).send({
			message: 'Thumbnail can not be empty!',
		})
		return
	}
	if (!params.slug) {
		res.status(400).send({
			message: 'Slug can not be empty!',
		})
		return
	}
	if (!params.cateid) {
		res.status(400).send({
			message: 'CateID can not be empty!',
		})
		return
	}

	// Create Blog model
	const blog = {
		author: params.author,
		publicdate: params.publicdate,
		sortdesc: params.sortdesc,
		status: 1,
		thumbnail: params.thumbnail,
		slug: params.slug,
		ishotblog: params.ishotblog,
		cateid: params.cateid,
		title: params.title,
		filegoogledriveid: params.filegoogledriveid,
		content: params.content,
	}

	models.blogs
		.create(blog)
		.then((data) => {
			res.send(data)
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the Blog.',
			})
		})
}

exports.findAll = (req, res) => {
	const { page, pagesize } = req.query

	const { limit, offset } = getPagination(page, pagesize)

	models.blogs
		.findAndCountAll({
			attributes: [
				'id',
				'author',
				'publicdate',
				'sortdesc',
				'status',
				'thumbnail',
				'view',
				'slug',
				'cateid',
				'title',
				'createdAt',
			],
			offset: offset,
			limit: limit,
		})
		.then(({ count, rows }) => {
			res.send({ data: rows, total: count })
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || 'Some error occurred while retrieving blog.',
			})
		})
}

exports.findOne = (req, res) => {
	const slug = req.params.slug

	if (!req.params.slug) {
		res.status(400).send({
			message: 'slug can not be empty!',
		})
		return
	}

	models.blogs
		.findOne({
			where: { slug: slug },
		})
		.then((data) => {
			if (data) {
				res.send({
					...data.dataValues,
					publicdate: date.format(data.publicdate, 'YYYY-MM-DD'),
				})
			} else {
				res.status(404).send({
					message: `Cannot find Blog with id=${id}.`,
				})
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Error retrieving Tutorial with id=' + slug,
			})
		})
}

exports.update = (req, res) => {
	const slug = req.params.slug
	console.log(req.body)
	if (!slug) {
		res.status(400).send({
			message: 'Slug can not be empty!',
		})
		return
	}

	models.blogs
		.update(req.body, {
			where: { slug: slug },
			returning: true,
		})
		.then(([num, data]) => {
			if (num != 1) {
				res.status(500).send({
					message: `Cannot update Blog with slug=${slug}. Maybe Blog was not found or req.body is empty!`,
				})
			} else {
				res.status(200).send(data[0].dataValues)
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Error updating Blog with slug=' + slug,
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

	models.blogs
		.destroy({
			where: { id: id },
		})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: 'Blog was deleted successfully!',
				})
			} else {
				res.send({
					message: `Cannot delete Tutorial with id=${id}. Maybe Blog was not found!`,
				})
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Could not delete Blog with id=' + id,
			})
		})
}

exports.softDelete = (req, res) => {}

exports.findAllPublished = (req, res) => {}
