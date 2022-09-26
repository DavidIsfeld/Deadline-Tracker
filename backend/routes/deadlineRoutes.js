// this file routes requests related to user's deadlines to their appropriate controller functions

const express = require('express');
const requireAuthentication = require('../middleware/requireAuthentication');
const {
    getAllDeadlines,
    createNewDeadline,
    getSingleDeadline
} = require('../controllers/deadlineController');

// get express router
const router = express.Router();

// before any information is accessed, make sure that the user making the request has a valid token
router.use(requireAuthentication);

// this handles a request to get all of a user's deadlines
router.get('/', getAllDeadlines);

// this handles a request to get a single deadline
router.get('/:id', getSingleDeadline);

// this handles a request to create a new deadline
router.post('/', createNewDeadline);

module.exports = router;