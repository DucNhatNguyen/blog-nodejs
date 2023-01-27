const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		'category',
		{
			id: {
				autoIncrement: true,
				autoIncrementIdentity: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			title: {
				type: DataTypes.STRING(100),
				allowNull: true,
			},
			status: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			createddate: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			createdby: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
			parentid: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			isparentcate: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
			slug: {
				type: DataTypes.STRING(256),
				allowNull: false,
				unique: 'cate_slug_unique',
			},
		},
		{
			sequelize,
			tableName: 'category',
			schema: 'public',
			timestamps: false,
			indexes: [
				{
					name: 'cate_slug_unique',
					unique: true,
					fields: [{ name: 'slug' }],
				},
				{
					name: 'pk_category',
					unique: true,
					fields: [{ name: 'id' }],
				},
			],
		}
	)
}
