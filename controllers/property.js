'use strict';

const models = require( '../models/index');

const createProperty = async ( req ,  res ) => {
    try{
        //taking in params so from frontend id of current user is sent.
        const landlordId = req.params.id;
        const {title, address} = req.body;
        if(!title || !address){
            return res.status(400).json({ message: 'All fields are required.' });
        }
        if(!landlordId){
            return res.status(400).json({ message: 'Landlord ID was not passed.' });
        }
        const userExists = await models.users.findOne({where: { id: landlordId, role: 'landlord'}});
        if(!userExists){
            return res.status(400).json({ message: 'Invalid landlord ID.' });
        }
        const property = await models.properties.create({title, address, landlord_id: landlordId});
        return res.status(201).json({
            message: 'Property created successfully.',
            property:{
                id: property.id,
                title: property.title,
                address: property.address,
                landlord_id: property.landlord_id
            },
        });
    } catch{
        console.error('Error creating property:', error);
        return res.status(500).json({ message: 'Server error while creating property.' });
    }
};

const listAllPropertiesWithLandlord = async (req, res) => {
    try {
        const properties = await models.properties.findAll({
            include: [
                {
                    model: models.users,
                    as: 'landlord',
                    attributes: ['name', 'email']
                }
            ]
        });
        return res.status(200).json({
            message: 'Properties listed successfully.',
            properties: properties
         });

        
    } catch{
        console.error('Error listing properties:', error);
        return res.status(500).json({ message: 'Server error during fetching properties.' });
    }
};

module.exports = {createProperty , listAllPropertiesWithLandlord};