const express = require('express');
const router = express.Router();
const contractController = require('../controllers/contract');
const validate = require('./validation');
const auth = require('../middleware/auth');


router.post('/', auth.authenticateToken, (req, res, next) => {
    const { error } = validate.contractValidator(req.body);

    if(validate.handleValidationError(error, res))return;
    next();
    
},contractController.createContract);


router.get('/', contractController.listAllContracts);

module.exports = router;