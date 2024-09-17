require('dotenv').config();
const session = require('express-session');
const express = require('express');
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
console.log("Cors Origin",process.env.CORS_ORIGIN);
app.use(cors({
	origin: `${process.env.CORS_ORIGIN}` // Replace with your frontend's public IP or domain
}));
app.use(bodyParser.json());

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