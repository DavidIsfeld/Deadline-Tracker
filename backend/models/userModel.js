// Copyright (c) 2022 David Isfeld
// this file contains the model of a user stored in a mongodb database using mongoose.

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

// this outlines the structure of the model, consisting of a unqiue email and a hashed password.
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// static signup method to signup users
userSchema.statics.signup = async function(email, password) {
    // check that an email and password were sent with the request
    if (!email || !password) {
        throw Error('An email and password is needed to create an account');
    }

    // check that a properly formatted email was sent in the request
    if (!validator.isEmail(email)) {
        throw Error('The entered email is not a valid email');
    }

    // check that the password is a strong password
    // by default, a strong password is min 8 characters, at least 1 lower and upper case, at least 1 number and symbol
    if (!validator.isStrongPassword(password)) {
        throw Error('Password must be minimum 8 characters long, with at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol');
    }

    // check if the email has already been used
    const emailUsed = await this.findOne({ email });

    if (emailUsed) {
        throw Error('This email is already in use');
    }

    // Now that we know that the email is valid and can be used, we can store this user in the database,
    // thus creating a new user.
    // We will hash the password before storing it using bcrypt, in case the database is ever breached

    // add salt to the end of the password
    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(password, salt);

    // create a user in the database and return information about said user
    const user = this.create({ email, password: hash });
    
    return user;
};

// static login method to login users
userSchema.statics.login = async function(email, password) {
    // check that an email and password were sent with the request
    if (!email || !password) {
        throw Error('An email and password is needed to log into an account');
    }

    // check if the user's account exists in the database and get the user if it does
    const user = await this.findOne({ email });

    if (!user) {
        throw Error('An account under this email does not exist');
    }

    // check that the entered password matches the password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw Error('Incorrect password entered');
    }

    return user;
};

module.exports = mongoose.model('User', userSchema);