const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Middleware to verify token
const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header is missing.' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access token is required.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid or expired token.' });
      }

      req.user = {
        id: user.id,
        role: user.role,
        first_name:user.first_name,
        last_name:user.last_name,
        email:user.email
      };

      next();
    });
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};


module.exports = { verifyToken };