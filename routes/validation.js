const joi = require('joi');

const validator = (schema) => (payload) => schema.validate(payload, {abortEarly: false});

function handleValidationError(error, res) {
    if (error && error.details && error.details[0]) {
        const message = error.details.map(detail => detail.message);
        return res.status(400).json({ errors: message });
    }
    return false;
}

const signIn = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
});

const signUp = joi.object({
    name: joi.string().required(),
    role: joi.string().valid('landlord', 'tenant', 'admin').required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required().equal(joi.ref('password')),
})

const property = joi.object({
    title: joi.string().required(),
    address: joi.string().required(),
});

const payment = joi.object({
    amount: joi.number().required(),
    paymentId: joi.number().required(),
});

const contract = joi.object({
    startDate: joi.date().required(),
    endDate: joi.date().required(),
    monthlyRent: joi.number().required(),
    propertyId: joi.number().required(),

})

module.exports = {handleValidationError, signInValidator: validator(signIn), signUpValidator: validator(signUp), propertyValidator: validator(property), paymentValidator: validator(payment), contractValidator: validator(contract)};