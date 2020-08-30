/**
 * @description require library validate
 * @type {Validator}
 */
const Validator = require('validatorjs');

/**
 * @function BaseValidation
 * @description this function base validate receive and pay data
 * @param body
 * @param rules
 * @param customMessages
 * @param callback
 * @constructor
 */
const BaseValidation = (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};

module.exports = BaseValidation;