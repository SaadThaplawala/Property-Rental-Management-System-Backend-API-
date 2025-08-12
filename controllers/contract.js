'use strict';

const models = require( '../models/index');
const mailer = require('../config/transporter');


const createContract = async ( req ,  res ) => {

    try{ 
        const {startDate, endDate, monthlyRent, propertyId, amount} = req.body;
        //taking in params so from frontend id of current user is sent.
        const tenantId = req.params.id;
        if(!startDate || !endDate || !monthlyRent || !propertyId || !tenantId){
            return res.status(400).json({ message: 'All fields are required.' });
        }
        if( !amount || amount <= 0){
            return res.status(400).json({ message: 'Amount was not correctly passed.' });
        }
        const propertyExists = await models.properties.findOne({where: { id: propertyId }});
        if(!propertyExists){
            return res.status(400).json({ message: 'Invalid property ID.' });
        }
        const tenantExists = await models.users.findOne({where: { id: tenantId, role: 'tenant'}});
        if(!tenantExists){
            return res.status(400).json({ message: 'Invalid tenant ID.' });
        }


        const contract = await models.contracts.create({startDate, endDate, monthlyRent, tenant_id: tenantId, property_id: propertyId});
        const payment = await models.payments.create({amount, paymentDate: NULL, status: 'pending', contract_id: contract.id});

        const propertyName = propertyExists.title;

        const landlord = await models.users.findOne({
            where: { id: propertyExists.landlord_id, role: 'landlord' },
            attributes: ['name', 'email']
        });
        
        const tenantMail = await mailer.sendMail({
            from: '"Property Rental App" <no-reply@propertyapp.com>',
            to: tenantExists.email,
            subject: 'Contract created', 
            text: "Your rental contract has been created for property: " + propertyName + ".",
            html: "<b>Your rental contract has been created for property: " + propertyName + ".</b>",
        });

        const landlordMail = await mailer.sendMail({
            from: '"Property Rental App" <no-reply@propertyapp.com>',
            to: landlord.email,
            subject: 'Contract created', 
            text: "A new tenant has signed a contract for property: " + propertyName + ".",
            html: "<b>A new tenant has signed a contract for property: " + propertyName + ".</b>",
        });
        
        console.log("Message sent tenant: %s", tenantMail.messageId);
        console.log("Preview URL (tenant): %s", nodemailer.getTestMessageUrl(tenantMail));


        console.log("Message sent landlord: %s", landlordMail.messageId);
        console.log("Preview URL (landlord): %s", nodemailer.getTestMessageUrl(landlordMail));


        return res.status(201).json({
            message: 'Contract with payment created successfully.',
            contract,
            payment
        }); 
    } catch{
        console.error('Error creating contract:', error);
        return res.status(500).json({ message: 'Server error while creating contract.' });
    }
};

const listAllContracts = async (req, res) => {
    try{
        const contracts = await models.contracts.findAll({
            include: [
                {
                    model: models.users,
                    as: 'tenant',
                    attributes: ['name', 'email']
                },
                {
                    model: models.properties,
                    attributes: ['title', 'address'],
                    include: {
                        model: models.users,
                        as: 'landlord',
                        attributes: ['name', 'email']
                    }
                }
            ]
        });
        return res.status(200).json({
            message: 'Contracts listed successfully.',
            contracts: contracts
         });

    } catch{
        console.error('Error listing contracts:', error);
        return res.status(500).json({ message: 'Server error during fetching contracts.' });
    }
    

};

module.exports = {createContract , listAllContracts};