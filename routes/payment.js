const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment');
const validate = require('./validation')
const auth = require('../middleware/auth');

// router.post('/', paymentController.createPayment);
router.post('/', auth.authenticateToken, (req, res, next) => {
    const { error } = validate.paymentValidator(req.body);

    if(validate.handleValidationError(error, res))return;
    next();

}, paymentController.makePayment);

router.get('/', paymentController.listAllPayments);

module.exports = router;