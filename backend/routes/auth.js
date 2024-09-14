// server/routes/auth.js
const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const  userController = require('../controllers/userController');
// Authentication endpoint
router.post('/login', async (req, res) => {
  const { emailId } = req.body;
  try{
    let user = await userController.getUser(emailId);
    if (user) {
      req.session.userId = user._id;
    } else {
      user = await userController.createUser(emailId);
      req.session.userId = user._id;
    }
    console.log(user)
    res.status(200).json({ name: user.name, emailId: user.emailId });
  } catch (error) {
    console.error('Error during authentication:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Logout failed');
    }
    res.clearCookie('connect.sid');
    res.status(200).send('Logout successful');
  });
});

module.exports = router;