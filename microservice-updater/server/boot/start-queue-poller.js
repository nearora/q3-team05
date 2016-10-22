// Updater service

'use strict';
const serverCreateRequestsQueue = 'server-create-requests';
const reservationCreateRequestsQueue = 'reservation-create-requests';
const reservationApprovalsRequestedQueue = 'reservation-approvals-requested';
const reservationApprovalsApprovedQueue = 'reservation-approvals-approved';

var isEmpty = require('is-empty');		
var queueOperations = require('../../common/queueOperations.js');
var blobOperations = require('../../common/blobOperations.js');

module.exports = function(app, cb) {
	var delay = 5000;
	
	var timeoutId = setInterval(function() {
		app.models.Updater.findById(1, function(err, u) {
			console.log("Updater queue poller called");
			
			if (!u.active) {
				console.log("Updater is set to inactive. Skipping this run...")
				return;
			}
			
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
			console.log("Checking for messages in queue " + serverCreateRequestsQueue);
			while(true) {
				var m = queueOperations.readFromQueue(serverCreateRequestsQueue);
				console.log(m);
				if (isEmpty(m)) {
					break;
				} else {
					m.id = servers.length;
					servers.push(m);
				}
			}
			
			// reservation-approvals-approved
			// and update the reservations that were approved
			console.log("Checking for messages in queue " + reservationApprovalsApprovedQueue);
			while(true) {
				var m = queueOperations.readFromQueue(reservationApprovalsApprovedQueue);
				console.log(m);
				if (isEmpty(m)) {
					break;
				} else {
					for (var i = 0; i < reservations.length; i++) {
						if (reservations[i].id == m.id) {
							reservations[i].approved = true;
							break;
						}
					}
				}
			}
			
			// reservation-create-requests
			// Add message to topic reservation-approvals-requested
			// Create the reservations requested
			console.log("Checking for messages in queue " + reservationCreateRequestsQueue);
			while(true) {
				var m = queueOperations.readFromQueue(reservationCreateRequestsQueue);
				console.log(m);
				if (isEmpty(m)) {
					break;
				} else {
					m.id = reservations.length;
					reservations.push(m);
					queueOperations.writeToQueue(reservationApprovalsRequestedQueue, m);
				}
			}
			
			// Add servers to new blob data
			blobContent.servers = servers;
			// Add reservations to new blob data
			blobContent.reservations = reservations;
			// Write the new blob data, replacing the older blob data
			blobOperations.writeToBlob(blobContent);
		})	
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
