import express from 'express';
const router = express.Router();
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

router.post('/register', async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(400).json({ message: '用户名已存在' });
    }

    const user = new User({
      username: req.body.username,
      password: req.body.password
    });
    
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({ message: '用户名和密码不能为空' });
    }
    // 对密码进行加密
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // 触发密码加密中间件
    await user.save({ validateBeforeSave: true });
    res.status(201).json({ message: '注册成功' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({ message: '认证失败' });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(401).json({ message: '认证失败' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'development_secret',
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;