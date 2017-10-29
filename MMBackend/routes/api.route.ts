var express = require('express');
var router = express.Router();

var client = require('./api/client.route')
var session = require('./api/session.route')
router.use('/client', client);
router.use('/session', session);

module.exports = router;
