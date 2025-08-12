require('dotenv').config();
const Sequelize = require('sequelize');
 
const sequelize = new Sequelize(
process.env.DB_DATABASE,
process.env.DB_USER,
process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});
 
const auth = sequelize.authenticate()
  .then(() => console.log('Connection to MySQL has been established.'))
  .catch(err => console.error('Unable to connect to MySQL:', err));
 
module.exports = { sequelize, Sequelize, auth };