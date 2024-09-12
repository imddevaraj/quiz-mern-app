// server/models/Answer.js
const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  text: String
});

module.exports = mongoose.model('Answer', answerSchema);