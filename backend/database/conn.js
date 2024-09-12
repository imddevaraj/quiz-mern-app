const mongoose = require("mongoose");

async function connect(){
    const mongoURI ="mongodb+srv://imddevaraj:techscribbler@cluster0.jktmv.mongodb.net/?retryWrites=true&w=majority";
    try{
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
    }catch(err){
        console.error("MongoDB connection error: ", err);
    }
}


module.exports = connect;