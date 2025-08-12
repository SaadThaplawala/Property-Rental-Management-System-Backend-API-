const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/property');

router.post('/:id', propertyController.createProperty);
router.get('/', propertyController.listAllPropertiesWithLandlord);

module.exports = router;