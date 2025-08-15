const jwt = require('jsonwebtoken');
require('dotenv').config();
const models = require( '../models/index');




async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const userId = req.headers.userid;
    
    let dec;
    try {
        if (!authHeader || !userId) {
            return res.status(401).json({ message: 'Access Denied.' });
        }

        dec = jwt.verify(authHeader, process.env.TOKEN_SECRET);
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token.' });
    }
    console.log("decoded token: ",dec);
    const userExists = await models.logins.findOne({
        where: { email: dec.email }, include: [{
            model: models.users,
        }]
    });
    console.log('user.id', userExists.user.id );

    if (userExists.User.id != userId) {
        // console.log('uservals', userExists);
        // console.log('userId', userId);
        // console.log('User.id', userExists?.User?.id);
        return res.status(401).json({ message: 'Access Denied.' });
    };

    next();

}

module.exports = { authenticateToken };