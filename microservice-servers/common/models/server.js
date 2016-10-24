// Servers service

'use strict';

const serverCreateRequestsQueue = 'server-create-requests';

var queueOperations = require('../queueOperations.js');
var blobOperations = require('../blobOperations.js');

module.exports = function(Server) {
	Server.find = function(f, cb) {
		console.log('Server.find called');
		// Get all servers from the blob service
		var c = blobOperations.readFromBlob();
		cb(null, c.servers);
	};
	
	Server.create = function(d, cb) {
		console.log('Server.create called');
		// Write a new server to the queue
		queueOperations.writeToQueue(serverCreateRequestsQueue, d);
		cb(null, d);
	};
	
	Server.findById = function(id, f, cb) {
		console.log('Server.findById	 called');
		console.log('Searching for server with id ' + id);
		// Get all servers from the blob service
		var c = blobOperations.readFromBlob();
		// Find the server in the array of servers
		var r;
		for (var i = 0; i < c.servers.length; i++) {
			if (id == c.servers[i].id) {
				r = c.servers[i];
			}
		}
		cb(null, r);
	};
};
