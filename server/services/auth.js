const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET || "Rvjmj456@";  // Use an env variable in production

function generateToken(user) {
    const payload = {
        name: user.name,
        email: user.email,
        userId: user._id,
        
    };
    return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}

function verifyToken(req, res, next) {
    const token = req.cookies.token;
  
    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }
  
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Failed to authenticate token' });
      }
  
      // Attach the user data to the request object
      req.user = decoded;
      console.log("user verified:",req.user);
      next();
    });
  }
module.exports = { generateToken, verifyToken };