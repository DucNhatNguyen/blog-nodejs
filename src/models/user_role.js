const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_role', {
    user_id: {
      type: DataTypes.STRING(128),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    role_id: {
      type: DataTypes.STRING(128),
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_role',
    schema: 'public',
    timestamps: false
  });
};
