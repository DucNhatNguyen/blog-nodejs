const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comment', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    rootcommentid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    blogid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    senderid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    receiverid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    createddate: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'comment',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_comment",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
