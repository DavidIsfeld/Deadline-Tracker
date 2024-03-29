// Copyright (c) 2023 David Isfeld
// this is the root file of the backend

// sensitive information is stored inside of a .env file within the backend folder.
// this .env file is ignored in this repository, so you must create your own if you wish to use this program.
require('dotenv').config();
const express = require('express');
const { default: mongoose } = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const deadlineRoutes = require('./routes/deadlineRoutes');

// express app
const app = express();

// middleware
app.use(express.json());

// routes
app.use('/api/user', userRoutes);
app.use('/api/deadline', deadlineRoutes);

// connect to the database before the server starts listening to a certain port
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    // listen to requests from a certain port
    app.listen(process.env.PORT, () => {
        console.log('Server listening');
    });
})
.catch((err) => {
    console.log(err);
});