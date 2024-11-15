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
                      .trim()

const passwordRules = body('password')
                      .exists().withMessage('password is required')
                        .isString().withMessage('password must be a string')
                        .notEmpty().withMessage('password cannot be empty')
                        .trim()

const roleRules = body('role')
                    .exists().withMessage('role is required')
                    .isString().withMessage('role must be a string')
                    .notEmpty().withMessage('role cannot be empty')
                    .isIn(['SUPERADMIN', 'ADMIN', 'USER']).withMessage('role must be either SUPERADMIN, ADMIN or USER')
                    .trim()

const favoriteSportRules = body('favorite_sport')
                            .exists().withMessage('favorite_sport is required')
                            .isString().withMessage('favorite_sport must be a string')
                            .notEmpty().withMessage('favorite_sport cannot be empty')
                            .trim()

const hintRules = body('hint')
                    .exists().withMessage('hint is required')
                    .isString().withMessage('hint must be a string')
                    .notEmpty().withMessage('hint cannot be empty')
                    .trim()

const userExistsRule= body('email')
                      .custom(async (email) => {
                      const user = await prisma.user.findFirst({ where: { email } });
                       if (user) {
                      throw new Error('User already exists');
                       }
                      });


const newPasswordRules = body('new_password')
                      .exists().withMessage('new_password is required')
                      .isString().withMessage('new_password must be a string')
                      .notEmpty().withMessage('new_password cannot be empty')
                      .trim()

const idRules= param('id')
                      .matches(checkUuidRegex).withMessage('id should be a uuid')
                      .custom(async (id) => {
                      const user = await prisma.user.findUnique({ where: { id } });
                       if (!user) {
                      throw new Error('User does not exist');
                       }
                      });

const changePasswordRules = body('change_password')
                      .optional({ nullable: true })
                      .isBoolean().withMessage('change_password must be a boolean')
                      .customSanitizer(value => value?.toString() === 'true');//converts to true or false
                      
                    
const currentPasswordRules = body('current_password')
                      .if(body('change_password').equals('true'))
                      .exists().withMessage('current_password is required when change_password is true')
                      .isString().withMessage('current_password must be a string')
                      .notEmpty().withMessage('current_password cannot be empty');
                      
                    
const newPassword2Rules = body('new_password')
                      .if(body('change_password').equals('true'))
                      .exists().withMessage('new_password is required when change_password is true')
                      .isString().withMessage('new_password must be a string')
                      .notEmpty().withMessage('new_password cannot be empty')
                      .custom((new_password, { req }) => {
                        if (new_password === req?.body?.current_password) {
                          throw new Error('new_password cannot be the same as current_password');
                        }
                        return true;
                      });
                    
const isActiveRules = body('is_active')
                      .optional({ nullable: true })
                      .isBoolean().withMessage('is_active must be a boolean')
                      .customSanitizer(value => value?.toString() === 'true'); 

const firstName2Rules = body('first_name')
                      .optional({ nullable: true })
                      .isString().withMessage('first_name must be a string')
                      .notEmpty().withMessage('first_name cannot be empty')
                      .trim()

const lastName2Rules = body('last_name')
                      .optional({ nullable: true })
                     .isString().withMessage('last_name must be a string')
                     .notEmpty().withMessage('last_name cannot be empty')
                     .trim()
                   
const email2Rules = body('email')
                      .optional({ nullable: true })
                     .isEmail().withMessage('email must be a valid email')
                     .notEmpty().withMessage('email cannot be empty')
                      .trim()

const signupValidator = [
  firstNameRules,
  lastNameRules,
  emailRules,
  passwordRules,
  roleRules,
  favoriteSportRules,
  hintRules,
  userExistsRule
]

const loginValidator = [
  emailRules,
  passwordRules
]

const forgotPasswordValidator = [ 
  emailRules,
  favoriteSportRules,
  newPasswordRules
]

const userUpdateValidator = [
  firstName2Rules,
  lastName2Rules,
  email2Rules,
  changePasswordRules,
  currentPasswordRules,
  newPassword2Rules,
  isActiveRules
]

module.exports = {  signupValidator, loginValidator, forgotPasswordValidator, idRules, userUpdateValidator };
