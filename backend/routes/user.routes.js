const express = require('express');
const path = require('path');
const { signup, login, forgotPassword, getUser, updateUser } = require('../controllers/user.controller');
const { signupValidator, loginValidator, forgotPasswordValidator, idRules, userUpdateValidator } = require('../validators/user.validator');
const { verifyRules } = require('../validators/index');
const { verifyToken } = require('../middleware/verifyToken');

const userRouter = express.Router();

userRouter.post('/signup',[signupValidator, verifyRules], signup);
userRouter.post('/login', [loginValidator, verifyRules], login);
userRouter.put('/forgot-password',[forgotPasswordValidator,verifyRules],forgotPassword);
userRouter.get('/:id',[verifyToken,idRules,verifyRules],getUser);
userRouter.put('/:id',[verifyToken,idRules,userUpdateValidator, verifyRules],updateUser);

module.exports = userRouter;