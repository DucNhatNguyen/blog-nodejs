const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('roles', {
    id: {
      type: DataTypes.STRING(128),
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('gen_random_uuid'),
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'roles',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_roles",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
