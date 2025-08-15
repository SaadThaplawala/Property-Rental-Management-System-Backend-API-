const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const validate = require('./validation')

router.post('/', (req, res) => {
    const { error } = validate.userValidator(req.body);

    if(validate.handleValidationError(error, res))return;
    next();
    
},userController.createUsers);

router.get('/', userController.listAllUsers);

module.exports = router;   