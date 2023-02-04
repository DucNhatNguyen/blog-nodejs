var DataTypes = require("sequelize").DataTypes;
var _author = require("./author");
var _blogs = require("./blogs");
var _blogtag = require("./blogtag");
var _category = require("./category");
var _comment = require("./comment");
var _functions = require("./functions");
var _roles = require("./roles");
var _tag = require("./tag");
var _user_role = require("./user_role");
var _users = require("./users");

function initModels(sequelize) {
  var author = _author(sequelize, DataTypes);
  var blogs = _blogs(sequelize, DataTypes);
  var blogtag = _blogtag(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var comment = _comment(sequelize, DataTypes);
  var functions = _functions(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var tag = _tag(sequelize, DataTypes);
  var user_role = _user_role(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  blogs.belongsTo(author, { as: "author_author", foreignKey: "author"});
  author.hasMany(blogs, { as: "blogs", foreignKey: "author"});
  blogs.belongsTo(category, { as: "cate", foreignKey: "cateid"});
  category.hasMany(blogs, { as: "blogs", foreignKey: "cateid"});
  user_role.belongsTo(roles, { as: "role", foreignKey: "role_id"});
  roles.hasMany(user_role, { as: "user_roles", foreignKey: "role_id"});
  blogtag.belongsTo(tag, { as: "tag", foreignKey: "tagid"});
  tag.hasMany(blogtag, { as: "blogtags", foreignKey: "tagid"});
  user_role.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_role, { as: "user_roles", foreignKey: "user_id"});

  return {
    author,
    blogs,
    blogtag,
    category,
    comment,
    functions,
    roles,
    tag,
    user_role,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
