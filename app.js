'use strict';

require('dotenv').config();


const express = require('express');
const app = express();

const userRoutes = require('./routes/user.routes')
const dbConfig = require('./db.config.js');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');



//Setup Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Set Up Database
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.test_url, {useNewUrlParser: true});

//Routes
app.use('/api/users', userRoutes)

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Serverless Error');
});

module.exports = app;
