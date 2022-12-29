var DataTypes = require("sequelize").DataTypes;
var _author = require("./author");
var _blogs = require("./blogs");
var _blogtag = require("./blogtag");
var _category = require("./category");
var _comment = require("./comment");
var _functions = require("./functions");
var _tag = require("./tag");

function initModels(sequelize) {
  var author = _author(sequelize, DataTypes);
  var blogs = _blogs(sequelize, DataTypes);
  var blogtag = _blogtag(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var comment = _comment(sequelize, DataTypes);
  var functions = _functions(sequelize, DataTypes);
  var tag = _tag(sequelize, DataTypes);

  blogs.belongsTo(author, { as: "author_author", foreignKey: "author"});
  author.hasMany(blogs, { as: "blogs", foreignKey: "author"});
  blogs.belongsTo(category, { as: "cate", foreignKey: "cateid"});
  category.hasMany(blogs, { as: "blogs", foreignKey: "cateid"});
  blogtag.belongsTo(tag, { as: "tag", foreignKey: "tagid"});
  tag.hasMany(blogtag, { as: "blogtags", foreignKey: "tagid"});

  return {
    author,
    blogs,
    blogtag,
    category,
    comment,
    functions,
    tag,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
