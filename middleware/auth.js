const jwt = require('jsonwebtoken');
require('dotenv').config();
const models = require( '../models/index');




async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'Access Denied.' });

    const token = authHeader.split(' ')[1];
    try {
        const dec = jwt.verify(token, process.env.TOKEN_SECRET);
        
        const user = await models.users.findByPk(dec.id);
        if (!user) return res.status(401).json({ message: 'User not found.' });

        req.user = { id: user.id, email: user.email, role: user.role };
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token.' });
    }
}


module.exports = { authenticateToken };