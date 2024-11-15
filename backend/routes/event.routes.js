const express = require('express');
const path = require('path');
const { createEvent, updateEvent,getEventById, deleteEvent, indexEvents } = require('../controllers/event.controller');
const { createEventValidator, updateEventValidator, idRules, indexEventsValidator, roleAccessValidator } = require('../validators/event.validator');
const { verifyRules } = require('../validators/index');
const { verifyToken } = require('../middleware/verifyToken');

const eventRouter = express.Router();

eventRouter.post('/',[verifyToken,roleAccessValidator,createEventValidator, verifyRules], createEvent);
eventRouter.put('/:id',[verifyToken,roleAccessValidator,updateEventValidator, verifyRules], updateEvent);
eventRouter.get('/:id',[verifyToken, idRules, verifyRules], getEventById);
eventRouter.post('/all',[verifyToken,indexEventsValidator, verifyRules], indexEvents);
eventRouter.delete('/:id',[verifyToken,roleAccessValidator, idRules, verifyRules], deleteEvent);


module.exports = eventRouter;