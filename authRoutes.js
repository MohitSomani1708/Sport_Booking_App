const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    console.log(user);
    if (user) return res.status(400).json({ msg: 'User already exists' });
    user = new User({ email, password });
    console.log(user);
    await user.save();

    const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });
    console.log(token);
    res.json({ token, user: { id: user._id,email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, username: user.username, email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Verify token
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, 'secretKey');
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = router;
