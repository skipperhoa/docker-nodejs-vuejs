const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Đường dẫn tới file kết nối sequelize
const User = require('./User');
const Role = require('./Role'); 
const UserRole = sequelize.define('UserRole', {
  Note: {
    type: DataTypes.STRING,
    allowNull: true, // Cho phép null
  },
}, {
  timestamps: false, // Không cần trường `createdAt` và `updatedAt`
  tableName: 'user_role', // Đặt tên bảng nếu cần
});
// Thiết lập quan hệ many-to-many với bảng trung gian
User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });
module.exports = UserRole;
