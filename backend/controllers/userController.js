// this file contains functions that deal with requests related to user activities (logging in etc)

const User = require('../models/userModel');

// login user
const loginUser = async (req, res) => {
    console.log('login user');
};

// signup user
const signupUser = async (req, res) => {
    console.log('signup user');
};

module.exports = { loginUser, signupUser }