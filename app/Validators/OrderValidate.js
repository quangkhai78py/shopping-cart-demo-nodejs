
const BaseValidation = require('./BaseValidation');

const validateOrders = (req, res, next) => {
    const validationRule = {
        "user_id": "required|integer",
        "product_id": "required|integer",
        "quantity": "required|integer",
        "sub_total": "required|integer"
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

const validateShipments = (req, res, next) => {
    const validationRule = {
        "user_id": "required|integer",
        "order_id": "required|integer",
        "carrier_company": "required|string",
        "carrier_id": "required|integer",
        "tracking_id" : 'required|integer',
        "status" : 'required|string'
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

module.exports = { validateOrders, validateShipments }