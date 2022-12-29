const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('author', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    intro: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    youtube: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    facebook: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'author',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_author",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
