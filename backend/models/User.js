// server/models/Quiz.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: String,
  name: String,
  emailId: String,
  
});


module.exports = mongoose.model('User', userSchema);