const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');
const validate = require('./validation');


router.post('/signin', (req, res, next) => {
    const { error } = validate.signInValidator(req.body);

    if (validate.handleValidationError(error, res)) return;
    next();

}, loginController.signIn);

router.post('/signup', (req, res, next) => {
    const { error } = validate.signUpValidator(req.body);

    if (validate.handleValidationError(error, res)) return;
    next();

}, loginController.signUp);

module.exports = router;    