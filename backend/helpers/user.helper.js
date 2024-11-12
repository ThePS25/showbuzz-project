const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const checkPasswordValidity = async (password, user_password) => {
    try{
        const isPasswordValid = await bcrypt.compare(password, user_password);
        return isPasswordValid;
    }catch(error){
        console.error(error.stack);
        return false;
    }
}

const hashPassword = async (password) => {
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    }catch(error){
        console.error(error.stack);
        return false;
    }
}

const findUserByEmail = async (email) => {
    try{
        const user = await prisma.user.findFirst({ where: { email } });
        return user;
    }catch(error){
        console.error(error.stack);
        return false;
    }
}

module.exports = { checkPasswordValidity, hashPassword, findUserByEmail };