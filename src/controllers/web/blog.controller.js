var initModels = require('../../models/init-models')
const sequelize = require('../../config/sequelize.config')
const multer = require('multer')
const moment = require('moment')
var models = initModels(sequelize)

exports.getHomePage = async (req, res) => {
	const featuresBlog = await models.blogs.findAll({
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
			'ishotblog',
			'createdAt',
			[
				sequelize.literal(
					"(case blogs.status when 1 then 'Hoạt động' else 'Tạm ẩn' end)"
				),
				'statusname',
			],
		],
		include: [
			{
				model: models.category,
				as: 'cate',
				required: true,
				right: true,
				attributes: ['id', 'title'],
			},
			{
				model: models.author,
				as: 'author_author',
				required: true,
				right: true,
				attributes: ['id', 'name'],
			},
		],
		where: { ishotblog: true },
		limit: 2,
	})

	const netBlog = await models.blogs.findAll({
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
			[
				sequelize.literal(
					"(case blogs.status when 1 then 'Hoạt động' else 'Tạm ẩn' end)"
				),
				'statusname',
			],
		],
		include: [
			{
				model: models.category,
				as: 'cate',
				required: true,
				right: true,
				attributes: ['id', 'title'],
			},
			{
				model: models.author,
				as: 'author_author',
				required: true,
				right: true,
				attributes: ['id', 'name'],
			},
		],
		where: { cateid: 6 },
		limit: 2,
	})

	const relaxBlog = await models.blogs.findAll({
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
			[
				sequelize.literal(
					"(case blogs.status when 1 then 'Hoạt động' else 'Tạm ẩn' end)"
				),
				'statusname',
			],
		],
		include: [
			{
				model: models.category,
				as: 'cate',
				required: true,
				right: true,
				attributes: ['id', 'title'],
			},
			{
				model: models.author,
				as: 'author_author',
				required: true,
				right: true,
				attributes: ['id', 'name'],
			},
		],
		where: { cateid: 5 },
		limit: 2,
	})

	res.send({
		features: featuresBlog,
		netBlog: netBlog,
		relaxBlog: relaxBlog,
	})
}

exports.getStaticPath = async (req, res) => {
	const allSLugPosts = await models.blogs.findAll({
		attributes: ['slug'],
	})

	res.send(
		allSLugPosts.map((s) => {
			return {
				params: s,
			}
		})
	)
}

exports.postDetail = async (req, res) => {
	try {
		if (!req.params.slug) {
			res.status(400).send({
				message: 'Slug can not be empty!',
			})
			return
		}
		const post = await models.blogs.findAll({
			attributes: [
				'id',
				'author',
				'publicdate',
				'status',
				'thumbnail',
				'view',
				'slug',
				'cateid',
				'title',
				'content',
			],
			include: [
				{
					model: models.category,
					as: 'cate',
					required: true,
					right: true,
					attributes: ['id', 'title'],
				},
				{
					model: models.author,
					as: 'author_author',
					required: true,
					right: true,
					attributes: ['id', 'name'],
				},
			],
			where: { slug: req.params.slug },
		})

		res.status(200).send(post[0])
	} catch (err) {
		res.status(500).send(err)
	}
}
