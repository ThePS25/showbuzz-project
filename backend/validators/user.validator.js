const { param, body } = require('express-validator');
const checkUuidRegex = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}$/
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const firstNameRules = body('first_name')
                       .exists().withMessage('first_name is required')
                       .isString().withMessage('first_name must be a string')
                       .notEmpty().withMessage('first_name cannot be empty')
                       .trim()

const lastNameRules = body('last_name')
                      .exists().withMessage('last_name is required')
                      .isString().withMessage('last_name must be a string')
                      .notEmpty().withMessage('last_name cannot be empty')
                      .trim()
                    
const emailRules = body('email')
                      .exists().withMessage('email is required')
                      .isEmail().withMessage('email must be a valid email')
                      .notEmpty().withMessage('email cannot be empty')
                      .custom(async (email) => {
                        const user = await prisma.user.findFirst({ where: { email } });
                        if (user) {
                          throw new Error('User already exists');
                        }
                      });

const passwordRules = body('password')
                      .exists().withMessage('password is required')
                        .isString().withMessage('password must be a string')
                        .notEmpty().withMessage('password cannot be empty')

const roleRules = body('role')
                    .exists().withMessage('role is required')
                    .isString().withMessage('role must be a string')
                    .notEmpty().withMessage('role cannot be empty')
                    .isIn(['SUPERADMIN', 'ADMIN', 'USER']).withMessage('role must be either SUPERADMIN, ADMIN or USER')

const favoriteSportRules = body('favorite_sport')
                            .exists().withMessage('favorite_sport is required')
                            .isString().withMessage('favorite_sport must be a string')
                            .notEmpty().withMessage('favorite_sport cannot be empty')

const hintRules = body('hint')
                    .exists().withMessage('hint is required')
                    .isString().withMessage('hint must be a string')
                    .notEmpty().withMessage('hint cannot be empty')
                     
const signupValidator = [
  firstNameRules,
  lastNameRules,
  emailRules,
  passwordRules,
  roleRules,
  favoriteSportRules,
  hintRules
]

module.exports = {  signupValidator };
