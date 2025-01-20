const bcrypt = require("bcrypt");
const User = require("../models/user");
const { generateToken } = require("../services/auth");



const registerUser = async (req, res, next) => {
    
    const { name, email, password } = req.body;


    try {
       
        
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({message:"User registered successfully"});

       

    } catch (error) {
        if (error.message === "User already exists") {
            return res.status(400).json({ message: error.message });
        }
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const user =  await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) return res.status(401).json({message:"Invalid password"});
        const token = generateToken(user);


        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        if (error.message === "User not found" || error.message === "Invalid password") {
            return res.status(401).json({ message: error.message });
        }
        next(error);
    }
};
const logoutUser = async (req, res) => {
    try {
        // Clear the token cookie
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error logging out" });
    }
}; 




module.exports = { registerUser, loginUser, logoutUser };
