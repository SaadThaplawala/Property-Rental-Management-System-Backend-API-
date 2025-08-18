'use strict';

const models = require( '../models/index');
const mailer = require('../config/transporter');
const sequelize = models.sequelize;
const nodemailer = require('nodemailer');


const createContract = async ( req ,  res ) => {
    const t = await sequelize.transaction();
    try{ 
        const {startDate, endDate, monthlyRent, propertyId} = req.body;
        const tenantId = req.user.id;
        // if(!startDate || !endDate || !monthlyRent || !propertyId || !tenantId){
        //     return res.status(400).json({ message: 'All fields are required.' });
        // } joi validation applied
        const start = new Date(startDate);
        const end = new Date(endDate);
        const monthDiff = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
        const amount = monthDiff * monthlyRent;

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


        const contract = await models.contracts.create({
            startDate, endDate, monthlyRent, tenant_id: tenantId, property_id: propertyId
        }, { transaction: t });
        const payment = await models.payments.create({
            amount, paymentDate: null, status: 'pending', contract_id: contract.id
        }, { transaction: t });

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

        await t.commit();
        return res.status(201).json({
            message: 'Contract with payment created successfully.',
            contract,
            payment
        }); 
    } catch(error){
        await t.rollback();
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
                    attributes: ['name', 'email']
                },
                {
                    model: models.properties,
                    attributes: ['title', 'address'],
                    include: {
                        model: models.users,
                        attributes: ['name', 'email']
                    }
                }
            ]
        });
        return res.status(200).json({
            message: 'Contracts listed successfully.',
            contracts: contracts
         });

    } catch(error){
        console.error('Error listing contracts:', error);
        return res.status(500).json({ message: 'Server error during fetching contracts.' });
    }
    

};

module.exports = {createContract , listAllContracts};