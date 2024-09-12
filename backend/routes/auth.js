// server/routes/auth.js
const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const  userController = require('../controllers/userController');
// Authentication endpoint
router.post('/', async (req, res) => {
  const { emailId } = req.body;
  try{
    let user = await userController.getUser(emailId);
    if (!user) {
      user = await userController.createUser(emailId);
    }
    console.log(user)
    res.json({ name: user.name, emailId: user.emailId });
  } catch (error) {
    console.error('Error during authentication:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;