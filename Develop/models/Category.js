const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js'); // moved up one rb

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    }, // added rb
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    }, // added rb
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;