// Updater service

'use strict';
const serverCreateRequestsQueueURL =
	'http://localhost:8080/api/topic/server-create-requests';
const reservationCreateRequestsQueueURL =
	'http://localhost:8080/api/topic/reservation-create-requests';
const reservationApprovalsRequestedQueueURL =
	'http://localhost:8080/api/topic/reservation-approvals-requested';

var isEmpty = require('is-empty');		
var queueOperations = require('../../common/queueOperations.js');
var blobOperations = require('../../common/blobOperations.js');

module.exports = function(app, cb) {
	var delay = 5000;
	
	var timeoutId = setInterval(function() {
		console.log("Updater queue poller called");
		// Read the current blob data
		var blobContent = blobOperations.readFromBlob();
		// Parse servers section into servers array
		var servers = blobContent.servers;
		if (isEmpty(servers)) {
			console.log("Found empty servers. Initializing...");
			servers = new Array();
		} else {
			console.log("Found servers: " + servers);
		}
		// Parse reservations section into reservations array
		var reservations = blobContent.reservations;
		if (isEmpty(reservations)) {
			console.log("Found empty reservations. Initializing...");
			reservations = new Array();
		} else {
			console.log("Found reservations: " + reservations);
		}
				
		// Check queue for messages in the following topics
		
		// server-create-requests and create the servers requested
		console.log("Checking for messages in queue " + serverCreateRequestsQueueURL);
		while(true) {
			var m = queueOperations.readFromQueue(serverCreateRequestsQueueURL);
			console.log(m);
			if (isEmpty(m)) {
				break;
			} else {
				servers.push(m);
			}
		}
		
		// reservation-approvals-approved
		// and update the reservations that were approved
		
		// reservation-create-requests
		// Add message to topic reservation-approvals-requested
		// Create the reservations requested
		console.log("Checking for messages in queue " + reservationCreateRequestsQueueURL);
		while(true) {
			var m = queueOperations.readFromQueue(reservationCreateRequestsQueueURL);
			console.log(m);
			if (isEmpty(m)) {
				break;
			} else {
				reservations.push(m);
				queueOperations.writeToQueue(reservationApprovalsRequestedQueueURL, m);
			}
		}
		
		// Add servers to new blob data
		blobContent.servers = servers;
		// Add reservations to new blob data
		blobContent.reservations = reservations;
		// Write the new blob data, replacing the older blob data
		blobOperations.writeToBlob(blobContent);
	}, delay);

	/*
	 * The `app` object provides access to a variety of LoopBack resources such as
	 * models (e.g. `app.models.YourModelName`) or data sources (e.g.
	 * `app.datasources.YourDataSource`). See
	 * http://docs.strongloop.com/display/public/LB/Working+with+LoopBack+objects
	 * for more info.
	 */
	process.nextTick(cb); // Remove if you pass `cb` to an async function yourself
};
