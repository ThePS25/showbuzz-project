const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const generateToken = (userId,role,first_name, last_name, email) => {
    return jwt.sign({ id: userId, role:role, first_name:first_name, last_name:last_name,email:email }, JWT_SECRET, { expiresIn: '5d' });
  };
  
module.exports = { generateToken };