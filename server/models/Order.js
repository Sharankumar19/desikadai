const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  customer: {
    type: DataTypes.JSON, // Object with name, phone, address, email
    allowNull: false,
  },
  items: {
    type: DataTypes.JSON, // Array of order items
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.STRING,
    defaultValue: 'UPI',
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'shipped', 'delivered'),
    defaultValue: 'pending',
  },
  orderId: {
    type: DataTypes.STRING,
    unique: true,
  },
  paymentId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  razorpayOrderId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  razorpaySignature: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: true,
  hooks: {
    beforeCreate: (order) => {
      if (!order.orderId) {
        order.orderId = 'ORD-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
      }
    },
  },
});

module.exports = Order;
