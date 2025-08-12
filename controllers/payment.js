'use strict';

const models = require( '../models/index');
const mailer = require('../config/transporter');




const makePayment = async ( req ,  res ) => {
    try{
        const tenantId = req.params.id;
        const {paymentId, amount} = req.body;
        if(!paymentId || !amount){
            return res.status(400).json({ message: 'All fields are required.' });
        
        }
        const payment = await models.payments.findOne({where: { id: paymentId },
            include: {
                model: models.contracts,
                where: { tenant_id: tenantId },
                include: {
                    model: models.properties,
                    attributes: ['title'],
                }
            }}
        );
        if(!payment){
            return res.status(400).json({ message: 'Invalid payment ID or tenant ID.' });
        }
        payment.status = 'paid';
        payment.paymentDate = new Date();
        await payment.save();

        const tenantExists = await models.users.findOne({where: { id: tenantId, role: 'tenant'}});


        const tenantMail = await mailer.sendMail({
            from: '"Property Rental App" <no-reply@propertyapp.com>',
            to: tenantExists.email,
            subject: 'Payment recieved', 
            text: "We have received your payment for property: " + payment.contracts.properties.title + ".",
            html: "<b>We have received your payment for property: " + payment.contracts.properties.title + ".</b>",
        }); 

        console.log("Message sent tenant: %s", tenantMail.messageId);
        console.log("Preview URL (tenant): %s", nodemailer.getTestMessageUrl(tenantMail));


        return res.status(200).json({
            message: 'Payment made successfully.',
            payment
        });
    } catch{
        console.error('Error making payment:', error);
        return res.status(500).json({ message: 'Server error while making payment.' });
    }
};


// const createPayment = async ( req ,  res ) => {
//     const {amount, paymentDate, status, contractId} = req.body;
//     if(!amount || !paymentDate || !status || !contractId){
//         return res.status(400).json({ message: 'All fields are required.' });
//     }

// };

const listAllPayments = async (req, res) => {
    try{
    const payments = await models.payments.findAll({
        include: {
                model: models.contracts,
                include: {
                    model: models.users,
                    as: 'tenant',
                    attributes: ['name', 'email']
                ,
            }
        }
    });
    return res.status(200).json({
        message: 'Payments listed successfully.',
        payments: payments,
     });

    }catch{
        console.error('Error listing payments:', error);
        return res.status(500).json({ message: 'Server error during fetching payments.' });
    }
};

module.exports = {createPayment , listAllPayments, makePayment};