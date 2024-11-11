const express = require('express');
const path = require('path');
const { signup } = require('../controllers/user.controller');
const { signupValidator } = require('../validators/user.validator');
const { verifyRules } = require('../validators/index');

const userRouter = express.Router();

userRouter.post('/signup',[signupValidator, verifyRules], signup);

module.exports = userRouter;