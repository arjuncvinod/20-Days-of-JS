const jwt = require('jsonwebtoken');
const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new Error('Authentication failed');
        }

        const token = authHeader.split(' ')[1]; 
        if (!token) {
            throw new Error('Authentication failed');
        }

        const decodedToken = jwt.verify(token, 'supersecret_dont_share'); 
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (error) {
        return next(new HttpError('Authentication failed', 403));
    }
};
