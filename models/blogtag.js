const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('blogtag', {
    blogid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tagid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tag',
        key: 'id'
      }
    },
    createddate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'blogtag',
    schema: 'public',
    timestamps: false
  });
};
