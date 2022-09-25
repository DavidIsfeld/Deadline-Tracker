// this file contains the logic that handles requests concerning deadlines

const Deadline = require('../models/deadlineModel');
const mongoose = require('mongoose');
const dateAndTime = require('date-and-time');

// get all of a particular user's deadlines
const getAllDeadlines = async (req, res) => {
    // get the user's id from the request, the user's id was attached to the request in requireAuthentication
    const user_id = req.user._id;
    
    // use the user's id to get only the deadlines belonging to that user and send them back in json format
    const deadlines = await Deadline.find({ user_id });
    res.status(200).json(deadlines);
};

// create a new deadline
const createNewDeadline = async (req, res) => {
    // get the title, date, and description from the user's request, if either is not there return an error
    const { title, date, description } = req.body;

    if (!title || !date || !description) {
        return res.status(400).json({error: 'All fields must be filled in'});
    }

    // add the new deadline to the database
    try {
        // dates will be stored in the json file as strings in the YYYY/MM/DD format
        //try to parse the date from the json file
        const formattedDate = dateAndTime.parse(date, 'YYYY/MM/DD');

        // get the user's id as we will need it to create a new deadline
        const user_id = req.user._id;

        // create the document in the database and send it to the user as a response in json format
        const deadline = await Deadline.create({title, date: formattedDate, description, user_id});
        res.status(200).json(deadline);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

module.exports = {
    getAllDeadlines,
    createNewDeadline
};