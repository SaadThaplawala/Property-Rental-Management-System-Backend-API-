const joi = require('joi');

const validator = (schema) => (payload) => schema.validate(payload, {abortEarly: false});

const user = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    role: joi.string().valid('landlord', 'tenant', 'admin').required(),
});

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

module.exports = {userValidator: validator(user), propertyValidator: validator(property), paymentValidator: validator(payment), contractValidator: validator(contract)};