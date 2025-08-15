const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');

router.post('/signin', loginController.signIn);
router.post('/signup', loginController.signUp);

module.exports = router;    