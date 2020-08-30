
const BaseValidation = require('./BaseValidation');

const validateBlog = (req, res, next) => {
    const validationRule = {
        "category_id": "required|integer",
        "title": "required|string|min:2",
        "image": "required|string",
        "content": "required|string|min:50"
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

module.exports = { validateBlog }