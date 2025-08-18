const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');
const validate = require('./validation');


router.post('/signin', (req, res) => {
    const { error } = validate.signInValidator(req.body);

    if (validate.handleValidationError(error, res)) return;
    next();

}, loginController.signIn);

router.post('/signup', (req, res) => {
    const { error } = validate.signUpValidator(req.body);

    if (validate.handleValidationError(error, res)) return;
    next();

}, loginController.signUp);

module.exports = router;    