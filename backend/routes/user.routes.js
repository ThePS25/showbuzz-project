const express = require('express');
const path = require('path');
const { signup, login, forgotPassword } = require('../controllers/user.controller');
const { signupValidator, loginValidator, forgotPasswordValidator } = require('../validators/user.validator');
const { verifyRules } = require('../validators/index');

const userRouter = express.Router();

userRouter.post('/signup',[signupValidator, verifyRules], signup);
userRouter.post('/login', [loginValidator, verifyRules], login);
userRouter.put('/forgot-password',[forgotPasswordValidator,verifyRules],forgotPassword);

module.exports = userRouter;