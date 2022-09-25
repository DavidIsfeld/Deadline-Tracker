const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuthentication = async (req, res, next) => {
    // get authorization token from header of request
    const { authorization } = req.headers;

    // make there that the request had an authorization token
    if (!authorization) {
        return res.status(401).json({error: 'Authentication token required'});
    }

    // get the jwt out of the authorization header which has a format of "bearer jwt" by splitting at the space between "bearer" and the token
    const token = authorization.split(' ')[1];

    // verify that the token sent matches the token generated for this user
    try {
        jwt.verify(token, process.env.SECRET);
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({error: 'Request is not authorized'});
    }
};

module.exports = requireAuthentication;