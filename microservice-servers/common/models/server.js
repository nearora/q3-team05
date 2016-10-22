// Servers service

'use strict';

const serverCreateRequestsQueue =
	'http://localhost:8080/api/topic/server-create-requests';

var queueOperations = require('../queueOperations.js');
var blobOperations = require('../blobOperations.js');

module.exports = function(Server) {
	Server.find = function(f, cb) {
		console.log('Server.find called')
		// Get all servers from the blob service
		var c = blobOperations.readFromBlob();
		cb(null, c.servers);
	}
	
	Server.create = function(d, cb) {
		console.log('Server.create called')
		// Write a new server to the queue
		queueOperations.writeToQueue(serverCreateRequestsQueue, d);
		cb(null, d);
	}
};
