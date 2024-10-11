const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db_hoanguyencoder', 'hoanguyencoder', '12345678', {
  host: 'postgres',
  dialect: 'postgres',
});

module.exports = sequelize;
