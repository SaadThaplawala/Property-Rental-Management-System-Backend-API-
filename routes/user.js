const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
// const validate = require('./validation')
// const auth = require('../middleware/auth');

// router.post('/', (req, res) => {
//     const { error } = validate.userValidator(req.body);

//     if(validate.handleValidationError(error, res))return;  // sign up command in login is new create user
//     next();
    
// },userController.createUsers);

router.get('/', userController.listAllUsers);

module.exports = router;   