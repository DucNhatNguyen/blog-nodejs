const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('metadata', {
    id: {
      type: DataTypes.STRING(128),
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('gen_random_uuid'),
      primaryKey: true
    },
    key: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    value: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'metadata',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_metadata",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
