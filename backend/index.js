// server/index.js
require('dotenv').config();
const session = require('express-session');
const express = require('express');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const cors = require('cors');

const path = require('path');
const quizRoutes = require('./routes/quiz');
const authRoutes = require('./routes/auth');
const connect = require('./database/conn');
const bodyParser = require('body-parser');
const responseRoutes = require('./routes/response'); // Import the response routes
const app = express();


/** appliation port */
const port = process.env.PORT || 5000;
console.log("__dirname",path.join(__dirname));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use(cors({
    origin: process.env.CORS_ORIGIN // Replace with your frontend's public IP or domain
}));
app.use(bodyParser.json());

app.use(session({
    secret: process.env.SECERT_KEY, // Replace with a strong secret key
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: 'sessions',
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  }));

// Define routes here
app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/responses', responseRoutes); // Use the response routes

// start server only when we have valid connection
connect().then(() =>{
    try {
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`)   
        })  
        } catch (error) {
        console.log("cannot connect to server");
        }
}).catch(error => {
    console.log("invalid database connection");
})