const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment');

router.post('/', paymentController.createPayment);
router.post('/:id', paymentController.makePayment);
router.get('/', paymentController.listAllPayments);

module.exports = router;