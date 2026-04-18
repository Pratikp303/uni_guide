const jwt = require('jsonwebtoken');

// 🔐 VERIFY TOKEN
const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // check token exists
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    // extract token
    const token = authHeader.split(' ')[1];

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach user info
    req.user = decoded;

    next();

  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = protect;