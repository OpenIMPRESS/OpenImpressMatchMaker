import mongoose = require('mongoose');
import bluebird = require('bluebird');
var config = require('../mm.config.json');
mongoose.Promise = bluebird;
import path = require('path');
import util = require('util');

import { Client } from './models/client.model';
import { Session } from './models/session.model';
import { Socket } from './models/socket.model';
import { Connection } from './models/connection.model';

// ===  THIS PART FORCES ALL MODELS TO BE INITIALIZED ===================
var len = Client.length+Session.length+Socket.length+Connection.length;
console.log("Checking Models... "+len)
mongoose.model('Client');
mongoose.model('Session');
mongoose.model('Socket');
mongoose.model('Connection');
// =======================================================================

var api = require('./routes/api.route');

import express = require('express');
import favicon = require('serve-favicon');
import logger = require('morgan');
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');
import cors = require('cors');

var app = express();
app.use(logger('dev'));

// Host Frontend
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
app.use(cookieParser());
app.use(cors());
app.use('/', express.static('../MMFrontend/dist'));

// Host HTTP REST API Service
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).send("404");
});

// Connect to DB
mongoose.connection.on('connected', function () {  
  console.log('! Mongoose backendAPI connection open to ' + config.mongoUrl);
}); 

mongoose.connection.on('error',function (err) {  
  console.log('! Mongoose backendAPI connection error: ' + err);
}); 

mongoose.connection.on('disconnected', function () {  
  console.log('! Mongoose backendAPI connection disconnected'); 
});

mongoose.connect(config.mongoUrl, { useMongoClient: true, user: config.user, pass: config.pass });

module.exports = app;