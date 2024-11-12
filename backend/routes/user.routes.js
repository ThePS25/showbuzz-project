const express = require('express');
const path = require('path');
const { signup, login } = require('../controllers/user.controller');
const { signupValidator, loginValidator } = require('../validators/user.validator');
const { verifyRules } = require('../validators/index');

const userRouter = express.Router();

userRouter.post('/signup',[signupValidator, verifyRules], signup);
userRouter.post('/login', [loginValidator, verifyRules], login);

module.exports = userRouter;