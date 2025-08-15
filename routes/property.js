const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/property');
const validate = require('./validation')

router.post('/:id',(req, res) => {
    const { error } = validate.propertyValidator(req.body);

    if(validate.handleValidationError(error, res))return;
    next();
    
}, propertyController.createProperty);
router.get('/', propertyController.listAllPropertiesWithLandlord);

module.exports = router;