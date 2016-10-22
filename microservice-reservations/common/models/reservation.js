// Reservations service

'use strict';

const reservationCreateRequestsQueue = 'reservation-create-requests';
	
var queueOperations = require('../queueOperations.js');
var blobOperations = require('../blobOperations.js');

module.exports = function(Reservation) {
	Reservation.find = function(f, cb) {
		console.log('Reservation.find called');
		// Get all reservations from the blob service
		var c = blobOperations.readFromBlob();
		cb(null, c.reservations);
	};
	
	Reservation.create = function(d, cb) {
		console.log('Reservation.create called');
		// Write a new reservation to the queue
		queueOperations.writeToQueue(reservationCreateRequestsQueue, d);
		cb(null, d);
	};

	Reservation.findById = function(id, f, cb) {
		console.log('Reservation.findById	 called');
		console.log('Searching for reservation with id ' + id);
		// Get all reservations from the blob service
		var c = blobOperations.readFromBlob();
		// Find the reservation in the array of reservations
		var r;
		for (var i = 0; i < c.reservations.length; i++) {
			if (id == c.reservations[i].id) {
				r = c.reservations[i];
			}
		}
		cb(null, r);
	};	
};
