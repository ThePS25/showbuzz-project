const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const {generateToken} = require('../utils/generateToken');

const prisma = new PrismaClient();

//----------------------------------create-user-----------------------------------//

const signup = async (req, res) => {
    const { first_name, last_name, email, password, role, favorite_sport, hint } = req.body;
  
    try {

      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = await prisma.user.create({
        data: { 
          first_name,
          last_name,
          full_name: `${first_name} ${last_name}`,
          email,
          password: hashedPassword,
          role,
          favorite_sport,
          hint 
        },
      });
  
      return res.status(201).send({ status: 'success', message: 'user created successfully. ', data: user });
	} catch (error) {
		console.error(error.stack);
		return res.status(422).send({ status: 'error', message: 'Something went wrong. Please check back again.' });
	
    }
  };

//----------------------------------login-user-----------------------------------//

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const token = generateToken(user.id, user.role, user.first_name, user.last_name, user.email);
    return res.status(200).send({ status: 'success', message: 'user logged in successfully. ', data: token });
	} catch (error) {
		console.error(error.stack);
		return res.status(422).send({ status: 'error', message: 'Something went wrong. Please check back again.' });
	
    }
  };


module.exports = { signup, login};