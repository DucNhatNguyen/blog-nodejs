const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      type: DataTypes.STRING(128),
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('gen_random_uuid'),
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_users",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
