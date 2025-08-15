const express = require('express');
const router = express.Router();
const contractController = require('../controllers/contract');
const validate = require('./validation');


router.post('/:id', (req, res) => {
    const { error } = validate.contractValidator(req.body);
    if(error){
        const message  =  error.details[0].message;
        return res.status(400).json({message});
    }else{
        contractController.createContract
    }
});


router.get('/', contractController.listAllContracts);

module.exports = router;