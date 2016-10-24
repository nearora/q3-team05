'use strict';

var httpreq = require('httpreq');
var synchttpreq = require('sync-request');
var btoa = require('btoa');
var atob = require('atob');
var isEmpty = require('is-empty');
var url = require('url');

module.exports.readFromQueue = function(q) {
	var messagingServiceBaseURL = process.env.MESSAGING_SERVICE_BASE_URL;
	console.log('messagingServiceBaseURL=' + messagingServiceBaseURL);
	if (isEmpty(messagingServiceBaseURL)) {
		var errorMsg = "Set environment variable MESSAGING_SERVICE_BASE_URL to messaging service's base URL";
		console.log(errorMsg);
		throw(errorMsg);
	}
	
	q = url.resolve(messagingServiceBaseURL, '/api/topic/' + q);
	console.log('Derived message queue URL ' + q);
	
	var c = new Object();
	
	try {
		var r = JSON.parse(synchttpreq('GET', q).getBody());
		
		if (!isEmpty(r.message)) {
			c = JSON.parse(atob(r.message));	
		}
		
		console.log(c);		
	} catch (e) {
		console.log(e);
	}

	return c;
};

module.exports.writeToQueue = function(q, m) {
	var messagingServiceBaseURL = process.env.MESSAGING_SERVICE_BASE_URL;
	if (isEmpty(messagingServiceBaseURL)) {
		var errorMsg = "Set environment variable MESSAGING_SERVICE_BASE_URL to messaging service's base URL";
		console.log(errorMsg);
		throw(errorMsg);
	}
	
	q = url.resolve(messagingServiceBaseURL, '/api/topic/' + q);
	
	var body = new Object();
	body.message = btoa(JSON.stringify(m));
	
	httpreq.post(q, {
			headers:{
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		}, function (err, res){
			if (err){
				console.log(err);
			}else{
				console.log(res.body);
			}
		});
}
