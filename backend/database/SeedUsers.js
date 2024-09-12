// server/seedUsers.js
const mongoose = require('mongoose');
const User = require('../models/User');

const mongoURI = "mongodb+srv://imddevaraj:techscribbler@cluster0.jktmv.mongodb.net/?retryWrites=true&w=majority";

const sampleUsers = [
  {
    userId: '1',
    name: 'John Doe',
    emailId: 'john.doe@example.com',
  },
  {
    userId: '2',
    name: 'Jane Smith',
    emailId: 'devaraj.durairaj@hidglobal.com',
  },
  {
    userId: '3',
    name: 'Alice Johnson',
    emailId: 'alice.johnson@example.com',
  },
];

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log("MongoDB connected successfully");

    // Clear existing users
    await User.deleteMany({});

    // Insert sample users
    await User.insertMany(sampleUsers);

    console.log("Sample users inserted successfully");
    mongoose.connection.close();
  })
  .catch(err => {
    console.error("MongoDB connection error: ", err);
  });