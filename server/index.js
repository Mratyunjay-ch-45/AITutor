const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

//routes imports
const userRoutes = require("./routes/user");
const quizRoutes = require("./routes/quiz"); 
const reelRoutes = require("./routes/reel");

const app = express();

// Remove duplicate cookieParser middleware
app.use(cookieParser());
app.use(cors({
    origin: "*",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/AITutor")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

//routes
app.use("/user", userRoutes);
app.use("/quiz", quizRoutes);
app.use("/reel", reelRoutes);

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
