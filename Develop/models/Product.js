// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    }, // added rb
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    }, // added rb
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    }, // added rb
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }, // added rb
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id',
      },
    }, // added rb 
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;