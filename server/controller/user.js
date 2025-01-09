const bcrypt = require("bcrypt");
const User = require("../models/user");
const { generateToken } = require("../services/auth");

const register = async ({ name, email, password }) => {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    // Generate token
    const token = generateToken(user);

    return { user, token };
};

const login = async (email, password) => {
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid password");
    }

    // Generate token
    const token = generateToken(user);

    return { user, token };
};

const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const { user, token } = await register({ name, email, password });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

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

        const { user, token } = await login(email, password);

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

module.exports = { registerUser, loginUser };
