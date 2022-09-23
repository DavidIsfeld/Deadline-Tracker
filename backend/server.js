// this is the root file of the backend

// sensitive information is stored inside of a .env file within the backend folder.
// this .env file is ignored in this repository, so you must create your own if you wish to use this program.
require('dotenv').config();
const express = require('express');

// express app
const app = express();

// middleware
app.use(express.json());

