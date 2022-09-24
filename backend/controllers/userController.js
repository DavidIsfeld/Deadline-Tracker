// this file contains functions that deal with requests related to user activities (logging in etc)

const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// function to create a json web token
// the end of the token is "signed" with a string of characters generated using a secret string known only to the server
// this string is stored in the .env file of this project
// we create the token using the user's id in the database, as this is not sensitive information
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' });
};

// login user
const loginUser = async (req, res) => {
    console.log('login user');
};

// signup user
const signupUser = async (req, res) => {
    // request will be sent in json format thanks to the express.json() middleware in server.js
    // get the email and password used from the request
    const { email, password } = req.body;

    try {
        // signup the user
        const user = await User.signup(email, password);

        // json web tokens are used to verify that the user is logged in, after the user sign up we log them in, so we will send them back a token now
        // create a token using the user's id given to them by mongodb
        const token = createToken(user._id);

        // send a response back to the user containing the token and the user's email
        res.status(200).json({email, token});
    } catch (error) {
        // send a response back to the user containing the error if something goes wrong
        res.status(400).json({error: error.message})
    }
};

module.exports = { loginUser, signupUser }