const bcrypt = require("bcrypt");
const User = require("../models/user");


const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign(
        { 
            id: user._id,
            email: user.email,
            
        },
        process.env.JWT_SECRET || "secret",
        { expiresIn: "24h" }
    );
};

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
        return decoded;
    } catch (error) {
        throw new Error("Invalid token");
    }
};

module.exports = { 
    generateToken, 
    verifyToken, 

};
