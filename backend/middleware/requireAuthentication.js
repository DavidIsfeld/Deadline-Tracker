// Copyright (c) 2022 David Isfeld
// this file checks the token that a user tries to log in with and makes sure that it is correct.
// it also attaches the user's id in the mongodb database to the request object.

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
        // at the same time as verifying we get the user's id out of the token, as it is created with the user's id
        const {_id} = jwt.verify(token, process.env.SECRET);

        // get the user's id and attach it to the request so we can use it later to view only a specific user's deadlines
        req.user = await User.findOne({_id}).select('_id');
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({error: 'Request is not authorized'});
    }
};

module.exports = requireAuthentication;