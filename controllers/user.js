'use strict';

const models = require( '../models/index');

// const createUsers = async ( req ,  res ) => {
//     try{

//         const {name, email, role} = req.body;
//         // if(!name || !email || !role){
//         //     return res.status(400).json({ message: 'All fields are required.' });
//         // }
//         // if(role !== 'landlord' && role !== 'tenant' && role !== 'admin'){
//         //     return res.status(400).json({ message: 'Invalid role.' });
//         // }
//         const userexists = await models.users.findOne({where: { email }});
//         if (userexists){
//         return res.status(400).json({message: 'User with this email already exists.'});
//         }
//         const user = await models.users.create({name, email, role});
//         return res.status(201).json({
//             message: 'User created successfully.',
//             user:{
//                 id: user.id,
//                 name: user.name,
//                 email: user.email,
//                 role: user.role
//             },
//         });
//     } catch{
//         console.error('Error creating user:', error);
//         return res.status(500).json({ message: 'Server error while creating users.' });
//     }
// }

const listAllUsers = async (req, res) => {
    try {
        const users = await models.users.findAll();
        return res.status(200).json({
            message: 'Users listed successfully.',
            users: users
         });
    } catch (error){
        console.error('Error listing users:', error);
        return res.status(500).json({ message: 'Server error during fetching users.' });
    }
}

module.exports = { listAllUsers};