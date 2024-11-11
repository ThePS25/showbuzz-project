const { validationResult } = require('express-validator');

//Method to verify the above rules.
const verifyRules = function (req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const error = errors.array().shift()
        const payload = {
            statusCode: 422,
            message: error.msg,
            param: error.param,
            value: error.value,
        }
        return res.status(422).send(payload)
    } else {
        next()
    }
}

module.exports = { verifyRules }