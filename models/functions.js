const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('functions', {
    id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    text: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    link: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    target: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    orderby: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cssclass: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    islocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isdeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    parentid: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    createddate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    createdby: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    updateddate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedby: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    slug: {
      type: DataTypes.STRING(256),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'functions',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_functions",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
