const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const {generateToken} = require('../utils/generateToken');
const { hashPassword, findUser, checkPasswordValidity } = require("../helpers/user.helper");

//----------------------------------create-user-----------------------------------//

const signup = async (req, res) => {
    const { first_name, last_name, email, password, role, favorite_sport, hint } = req.body;
  
    try {

      const hashedPassword = await hashPassword(password);
  
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

    const isPasswordValid = await checkPasswordValidity(password, user.password);
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

//----------------------------------update-password-----------------------------------//

const forgotPassword = async (req, res) => {
  try{
  const { email, favorite_sport, new_password} = req.body;

  const user = await findUser(email);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user?.favorite_sport === favorite_sport) {
   
    const hashedPassword = await hashPassword(new_password);
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });
    return res.status(200).json({ message: "Password updated successfully" });

  } else {
    return res.status(400).json({
      message: "Incorrect favorite sport",
      hint: user.hint || "No hint available",
    });
  }}

  catch(error){
    console.error(error.stack);
    return res.status(422).send({ status: 'error', message: 'Something went wrong. Please check back again.' });
  }
};

//----------------------------------get-user-----------------------------------//

const getUser = async (req, res) => {
  try {
    const user = await prisma.user.findFirst({ where: { id: req.id } });

    return res.status(200).send({ status: 'success', message: 'user retrieved successfully. ', data: user });

  } catch (error) {
    console.error(error.stack);
    return res.status(422).send({ status: 'error', message: 'Something went wrong. Please check back again.' });
  }

};

//----------------------------------update-user-----------------------------------//

const updateUser = async (req, res) => {
  const { id } = req.params; 
  const { first_name, last_name, email,is_active, change_password, current_password, new_password } = req.body;

  try {

    const user = await findUser(id);
    const updatedData = { first_name, last_name, email,is_active };

    if (change_password) {
      
      const isPasswordValid = await checkPasswordValidity(current_password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid current password' });
      }

      const hashedPassword = await hashPassword(new_password);
      updatedData.password = hashedPassword;
    }

    await prisma.user.update({
      where: { id: id },
      data: updatedData,
    });

    return res.status(200).send({ status: 'success', message: 'user updated successfully. ' });

  } catch (error) {
    console.error(error.stack);
    return res.status(422).send({ status: 'error', message: 'Something went wrong. Please check back again.' });
  }
};

module.exports = { signup, login, forgotPassword, getUser, updateUser};