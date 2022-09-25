// this file routes requests related to user's deadline to their appropriate controller functions

const express = require('express');
const requireAuthentication = require('../middleware/requireAuthentication');

// get express router
const router = express.Router();

// before any information is accessed, make sure that the user making the request has a valid token
router.use(requireAuthentication);

// placeholder get request handler
router.get('/', (req, res) => {
    res.status(200).json({mssg: 'Made it past authentication'});
});

module.exports = router;