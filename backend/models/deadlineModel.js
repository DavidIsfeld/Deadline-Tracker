// this file contains the model of a deadline stored in a mongodb database using mongoose.

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const deadlineSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Deadline', deadlineSchema);