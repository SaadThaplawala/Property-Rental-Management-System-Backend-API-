const express = require('express');
const router = express.Router();
const contractController = require('../controllers/contract');

router.post('/:id', contractController.createContract);
router.get('/', contractController.listAllContracts);

module.exports = router;