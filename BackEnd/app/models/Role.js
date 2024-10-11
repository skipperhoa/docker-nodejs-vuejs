const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Role = sequelize.define('Role', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  timestamps: false,
  tableName: 'roles',
});

module.exports = Role;
