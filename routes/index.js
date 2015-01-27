var express = require('express');
var router = express.Router();
var config = require('../config.js');
var serialPort = require('serialport');

function listPorts() {
	return new Promise(function(resolve, reject) {
	  serialPort.list(function(err, ports) {
	  	if(err !== null) reject(err);
	  	else resolve(ports);
	  });
	});
}

var sentAlong = {
	'dbaddress' : config.databaseAddress,
	'title'     : config.title
  };

router.get('/', function(req, res) {
	listPorts().then(function(ports) {
		sentAlong.ports = ports;
    res.render('index', sentAlong);
	},
	function(err) {
		res.send('failed to grab ports');
	});
});

module.exports = router;
