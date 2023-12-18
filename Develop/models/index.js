// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
}); // added rb

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
}); // added rb 

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id',
}); // added rb

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id',
}); // added rb

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
