// this file contains the model of a user stored in a mongodb database using mongoose.

const mongoose = require('mongoose');

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

module.exports = mongoose.model('User', userSchema);