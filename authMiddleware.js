const jwt = require('jsonwebtoken');
const User = require('./User'); // ✅ Path fixed to main folder

// 🔐 VERIFY TOKEN
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 1. Check if token exists
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    // 2. Extract token
    const token = authHeader.split(' ')[1];

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach actual User from DB (excluding password)
    req.user = await User.findById(decoded.id).select('-password');

    next();

  } catch (error) {
    res.status(401).json({ message: 'Not authorized, invalid token' });
  }
};

module.exports = protect;
