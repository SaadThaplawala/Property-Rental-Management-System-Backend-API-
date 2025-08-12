const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/', userController.createUsers);
router.get('/', userController.listAllUsers);

module.exports = router;   