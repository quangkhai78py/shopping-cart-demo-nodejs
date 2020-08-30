/**
 * @description require function base validate from file BaseValidation
 * @type {BaseValidation}
 */
const BaseValidation = require('./BaseValidation');

/**
 * @function validateSignup
 * @description this is function config rule validate req.body when user login
 * @param req
 * @param res
 * @param next
 */
const validateSignup = (req, res, next) => {
    const validationRule = {
        "email": "required|email",
        "password": "required|string|min:2",
    }
    BaseValidation(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

/**
 * @function validateRegister
 * @description this is function config rule validate req.body when user create
 * @param req
 * @param res
 * @param next
 */
const validateRegister = (req, res, next) => {
    const validationRule = {
        "email": "required|email",
        "password": "required|string|min:6",
        "name" : "required|string|min:2",
        "street" : "required|string|min:2",
        "phone" : "required|string|min:9",
        "city" : "required|string|min:2",
        "country" : "required|string|min:2",
    }
    BaseValidation(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

/**
 * @function validateUpdate
 * @description this is function config rule validate req.body when user update data
 * @param req
 * @param res
 * @param next
 */
const validateUpdate = (req, res, next) => {
    const validationRule = {
        "email": "required|email",
        "name" : "required|string|min:2",
        "street" : "required|string|min:2",
        "phone" : "required|string|min:9",
        "city" : "required|string|min:2",
        "country" : "required|string|min:2",
    }
    BaseValidation(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

const validateUserPermission = (req, res, next) => {
    const validationRule = {
        "user_id": "required|integer",
        "role_id" : "required|integer",
    }
    BaseValidation(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

const validateRole = (req, res, next) => {
    const validationRule = {
        "role": "required|string",
    }
    BaseValidation(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

module.exports = {
    validateSignup,
    validateRegister,
    validateUpdate,
    validateUserPermission,
    validateRole
}