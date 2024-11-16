const { param, body } = require('express-validator');
const checkUuidRegex = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}$/
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const allowedOrderByFields = ['created_at','title','description'];

const titleRules = body('title')
                   .exists().withMessage('title is required')
                   .isString().withMessage('title must be a string')
                   .notEmpty().withMessage('title cannot be empty')
                   .trim()

const descriptionRules = body('description')
                          .exists().withMessage('description is required')
                          .isString().withMessage('description must be a string')
                          .notEmpty().withMessage('description cannot be empty')
                          .trim()

const idRules = param('id')
                .exists().withMessage('id is required')
                .isString().withMessage('id must be a string')
                .matches(checkUuidRegex).withMessage('id must be a valid UUID')
                .custom(async (id) => {
                    const event = await prisma.event.findUnique({ where: { id } });
                    if (!event) {
                        throw new Error('Event not found');
                    }
                });

const title2Rules = body('title')
                .optional()
                .isString().withMessage('title must be a string')
                .notEmpty().withMessage('title cannot be empty')
                .trim()

const description2Rules = body('description')
                       .optional() 
                       .isString().withMessage('description must be a string')
                       .notEmpty().withMessage('description cannot be empty')
                       .trim()

            
const pageRules = body('page')
    .optional({ nullable: true })
    .isNumeric().withMessage('page must be a number')
    .notEmpty().withMessage('page cannot be empty')
    .trim()

const pageLimitRules = body('limit')
    .optional({ nullable: true })
    .isNumeric().withMessage('limit must be a number')
    .notEmpty().withMessage('limit cannot be empty')
    .trim()

const orderByRules = body('orderBy')
    .optional({ nullable: true })
    .notEmpty().withMessage('orderBy cannot be empty.')
    .trim()
    .isIn(allowedOrderByFields).withMessage(`Invalid orderBy parameter.Allowed values are: ${allowedOrderByFields} `)

const orderRules = body('order')
    .optional({ nullable: true })
    .notEmpty().withMessage('order cannot be empty.')
    .trim()
    .isIn(['asc','desc']).withMessage('Invalid order parameter. Allowed values are: asc, desc')

const roleAccessValidator = (req, res, next) => {
        const { user } = req;
        if (!user || !['ADMIN', 'SUPERADMIN'].includes(user.role)) {
          return res.status(403).json({ message: 'Access forbidden: insufficient permissions.' });
        }
        next();
      };

const creatorUserIdRules = body('creator_user_id')
    .optional({ nullable: true })
    .isString().withMessage('creator_user_id must be a string')
    .notEmpty().withMessage('creator_user_id cannot be empty')
    .matches(checkUuidRegex).withMessage('creator_user_id must be a valid UUID')
    .custom(async (creator_user_id) => {
        const user = await prisma.user.findUnique({ where: { id: creator_user_id } });
        if (!user) {
            throw new Error('User not found for creator_user_id');
        }
    });

const createEventValidator = [ titleRules, descriptionRules ];
const updateEventValidator = [ idRules, title2Rules, description2Rules ];
const indexEventsValidator = [ pageRules, pageLimitRules, orderByRules, orderRules, creatorUserIdRules];

module.exports = { createEventValidator, updateEventValidator, idRules, indexEventsValidator, roleAccessValidator};

