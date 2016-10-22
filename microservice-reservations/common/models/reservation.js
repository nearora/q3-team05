// Reservations service

'use strict';

const reservationCreateRequestsQueue = 'reservation-create-requests';
	
var queueOperations = require('../queueOperations.js');
var blobOperations = require('../blobOperations.js');

module.exports = function(Reservation) {
	Reservation.find = function(f, cb) {
		console.log('Reservation.find called')
		// Get all reservations from the blob service
		var c = blobOperations.readFromBlob();
		cb(null, c.reservations);
	}
	
	Reservation.create = function(d, cb) {
		console.log('Reservation.create called')
		// Write a new reservation to the queue
		queueOperations.writeToQueue(reservationCreateRequestsQueue, d);
		cb(null, d);
	}
};
