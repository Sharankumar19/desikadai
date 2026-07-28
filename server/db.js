// // local
// require('dotenv').config();
// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     dialect: 'mysql',
//     logging: false,
//   }
// );

// module.exports = sequelize;


// production
// require('dotenv').config();
// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   dialect: "mysql",
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
// });

// production for avien 
require('dotenv').config();
const fs = require('fs');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'mysql',
    logging: false,

    dialectOptions: {
      ssl: {
        ca: fs.readFileSync(process.env.DB_SSL_CA),
        rejectUnauthorized: true,
      },
    },
  }
);

module.exports = sequelize;
