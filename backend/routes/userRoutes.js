// Copyright (c) 2022 David Isfeld
// this file routes requests related to the user to their appropriate controller functions

const express = require('express');

// controller functions
const { loginUser, signupUser } = require('../controllers/userController');

// get express router
const router = express.Router();

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

module.exports = router;