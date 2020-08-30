
const BaseValidation = require('./BaseValidation');

const validateProduct = (req, res, next) => {
    const validationRule = {
        "category_id": "required|integer",
        "user_id": "required|integer",
        "size_id": "required|integer",
        "image": "required|string",
        "product_name" : "required|string|min:6",
        "quantity" : "required|integer",
        "description" : "required|text"
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

module.exports = { validateProduct }