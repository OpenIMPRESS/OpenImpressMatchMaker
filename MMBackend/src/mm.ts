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

import { MMService } from './services/mm.service';
import { UpdateDNSService } from './services/updatedns_google.service';

// Start match making service & dns service
var mm = new MMService(config.mmServicePort);
var dns = new UpdateDNSService(config.dns_google);

var udpater = setInterval(function(){ dns.UpdateDNS(); }, 30*60*1000);
dns.UpdateDNS();

// Connect to DB
mongoose.connection.on('connected', function () {  
  console.log('! Mongoose mm connection open to ' + config.mongoUrl);
}); 

mongoose.connection.on('error',function (err) {  
  console.log('! Mongoose mm connection error: ' + err);
}); 

mongoose.connection.on('disconnected', function () {  
  console.log('! Mongoose mm connection disconnected'); 
});

mongoose.connect(config.mongoUrl, { useMongoClient: true, user: config.user, pass: config.pass });

module.exports = { mm:mm, dns:dns };
