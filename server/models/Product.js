const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  points: {
    type: DataTypes.JSON, // Array of strings
    defaultValue: [],
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  images: {
    type: DataTypes.JSON, // Array of strings
    defaultValue: [],
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: true,
});

module.exports = Product;
