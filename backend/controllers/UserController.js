const User = require('../models/User');
const { default: mongoose } = require('mongoose');
 createUser = async (emailId, name) => {
    const user = new User({ userId: new mongoose.Types.ObjectId().toString(),
        name:emailId,
        emailId: emailId });

    await user.save();
   return user
}

const getUser = async(emailId) => {
   return await User.findOne({ emailId:emailId});
 
}

module.exports = { createUser, getUser };