var DataTypes = require("sequelize").DataTypes;
var _author = require("./author");
var _blogs = require("./blogs");
var _blogtag = require("./blogtag");
var _category = require("./category");
var _comment = require("./comment");
var _functions = require("./functions");
var _metadata = require("./metadata");
var _roles = require("./roles");
var _tag = require("./tag");
var _users = require("./users");

function initModels(sequelize) {
  var author = _author(sequelize, DataTypes);
  var blogs = _blogs(sequelize, DataTypes);
  var blogtag = _blogtag(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var comment = _comment(sequelize, DataTypes);
  var functions = _functions(sequelize, DataTypes);
  var metadata = _metadata(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var tag = _tag(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  blogs.belongsTo(author, { as: "author_author", foreignKey: "author"});
  author.hasMany(blogs, { as: "blogs", foreignKey: "author"});
  blogs.belongsTo(category, { as: "cate", foreignKey: "cateid"});
  category.hasMany(blogs, { as: "blogs", foreignKey: "cateid"});
  users.belongsTo(roles, { as: "role", foreignKey: "roleid"});
  roles.hasMany(users, { as: "users", foreignKey: "roleid"});
  blogtag.belongsTo(tag, { as: "tag", foreignKey: "tagid"});
  tag.hasMany(blogtag, { as: "blogtags", foreignKey: "tagid"});

  return {
    author,
    blogs,
    blogtag,
    category,
    comment,
    functions,
    metadata,
    roles,
    tag,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
