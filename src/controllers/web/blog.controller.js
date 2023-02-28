var initModels = require('@models/init-models')
const sequelize = require('@config/sequelize.config')
var models = initModels(sequelize)

exports.getHomePage = async (req, res) => {
	//const { page, pagesize } = req.query

	//const { limit, offset } = getPagination(page, pagesize)

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

	const { count, rows } = await models.blogs.findAndCountAll({
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
		where: { status: 1 },
		//offset: offset,
		//limit: limit,
	})

	res.send({
		features: featuresBlog,
		latestPosts: {
			posts: rows,
			total: count,
		},
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
					attributes: ['id', 'name', 'avatar', 'bio', 'facebook', 'youtube'],
				},
			],
			where: { slug: req.params.slug },
		})

		res.status(200).send(post[0])
	} catch (err) {
		res.status(500).send(err)
	}
}

exports.getBlogsWithManyViews = async (req, res) => {
	const blog = await models.blogs.findAll({
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
		order: [['view', 'DESC']],
		limit: 4,
	})

	res.send({
		data: blog,
	})
}
