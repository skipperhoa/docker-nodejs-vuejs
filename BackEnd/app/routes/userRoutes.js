const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import model User
const Role = require('../models/Role'); 
const bcrypt = require('bcrypt');

// Lấy danh sách tất cả người dùng
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Đã xảy ra lỗi' });
  }
});

// Tạo mới một người dùng
router.post('/', async (req, res) => {
  const { username, email, password, roleName , note} = req.body;
 
  
 // return res.status(201).json({ username, email, password, role });
  try {
    // Kiểm tra email đã tồn tại chưa
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email đã tồn tại' });
    }

    // Tạo người dùng mới
    const newUser = await User.create({ username, email, password });

    const role = await Role.findOne({ where: { name: roleName || 'user' } }); // Mặc định là 'user'
    if (role) {
      await newUser.addRole(role,{ through: { Note: note || '' } });
    }

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Đã xảy ra lỗi' });
  }
});

// Lấy thông tin chi tiết một người dùng theo ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Người dùng không tồn tại' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Đã xảy ra lỗi' });
  }
});

// Cập nhật thông tin người dùng
router.put('/:id', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Người dùng không tồn tại' });
    }

    // Cập nhật thông tin
    user.username = username || user.username;
    user.email = email || user.email;
    if (password) {
      user.password = await bcrypt.hash(password, 10); // Băm mật khẩu mới nếu có
    }
    user.role = role || user.role;

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Đã xảy ra lỗi' });
  }
});

module.exports = router;