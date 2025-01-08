const User = require("../models/user");
const jwt = require("jsonwebtoken");
const {generateToken} = require("../services/auth");
const bcrypt = require("bcrypt");

const registerUser = async (req, res, next) => {

        const {name,email,password} = req.body;
        try {
            const existingUser = await User.findOne({email});
            if(existingUser){
                return res.status(400).json({message:"User already exists"});
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            
            const newUser = new User({name,email,password:hashedPassword});
            await newUser.save();
            res.status(201).json({message:"User registered successfully"});



        } catch (error) {
            next(error);
        }

}
const loginUser = async (req, res, next) => {
   try {
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(401).json({message:"User not found"});
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect) return res.status(401).json({message:"Invalid password"});
    const token = generateToken(user);
    res.cookie("token",token,{httpOnly:true,secure:true,sameSite:"none"}).json({message:"Login successful"});
   } catch (error) {
      console.log(error);
   }
}

module.exports = {registerUser,loginUser};