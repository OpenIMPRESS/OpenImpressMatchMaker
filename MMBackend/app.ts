import express = require('express');
import path = require('path');
import bluebird = require('bluebird');
import mongoose = require('mongoose');
import favicon = require('serve-favicon');
import logger = require('morgan');
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');
import cors = require('cors');
import util = require('util');

import { Client } from './models/client.model';
import { Session } from './models/session.model';
import { Socket } from './models/socket.model';
import { Connection } from './models/connection.model';

import { MMService } from './services/mm.service';

var config = require('./mm.config.json');
var api = require('./routes/api.route');

mongoose.Promise = bluebird;

var app = express();
var mm = new MMService(config.mmServicePort);

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', express.static('../MMFrontend/dist'));
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).send("404 <3");
});

module.exports = app;

mongoose.connect(config.mongoUrl, { useMongoClient: true, user: config.user, pass: config.pass })
    .then(() =>  {
      console.log('Succesfully Connected to the Mongodb Database  at URL: '+config.mongoUrl);
    })
    .catch(() => { console.log('Error Connecting to the Mongodb Database at URL: '+config.mongoUrl); })