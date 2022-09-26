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

// get a single deadline
const getSingleDeadline = async (req, res) => {
    // get the id of the deadline we are trying to get from the request
    const {id} = req.params;

    // check that the id is in a valid format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such deadline exists'});
    }

    // attempt to find the deadline using the id
    // also make sure we are only looking at deadlines that belong to this user
    const user_id = req.user._id;
    const deadline = await Deadline.findOne({user_id: req.user._id, _id: id});

    // check if the deadline was actually found
    if (!deadline) {
        return res.status(404).json({error: 'No such deadline exists'});
    }

    // send back the deadline in json format
    res.status(200).json(deadline);
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
        // try to parse the date from the json file
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

// delete a deadline
const deleteDeadline = async (req, res) => {
    // get the id of the deadline we are trying to get from the request
    const {id} = req.params;

    // check that the id is in a valid format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such deadline exists'});
    }

    // attempt to find and delete the deadline using the id
    // also make sure we are only looking at deadlines that belong to this user
    const user_id = req.user._id;
    const deadline = await Deadline.findOneAndDelete({user_id: req.user._id, _id: id});

    // check if the deadline was actually found
    if (!deadline) {
        return res.status(404).json({error: 'No such deadline exists'});
    }

    // send back the deadline in json format
    res.status(200).json(deadline);
};

module.exports = {
    getAllDeadlines,
    createNewDeadline,
    getSingleDeadline,
    deleteDeadline
};