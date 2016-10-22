'use strict';

const blobServicePostURL = 'http://blobs.vmwaredevops.appspot.com/api/v1/blobs';
const blobServiceGetURL = blobServicePostURL + '/1987';

var httpreq = require('httpreq');
var synchttpreq = require('sync-request');
var btoa = require('btoa');
var atob = require('atob');
var isEmpty = require('is-empty');

module.exports.readFromBlob = function() {
	var c = new Object();
	
	try {
		var r = JSON.parse(
			synchttpreq('GET', blobServiceGetURL)
			.getBody());
	
		if (!isEmpty(r.content)) {
			c = JSON.parse(atob(r.content));	
		}
		
		console.log(c);		
	} catch (e) {
		console.log(e);
	}
	
	return c;
};

module.exports.writeToBlob = function(c) {
	var body = new Object();
	body.id = 1987;
	body.name = "team05_blob";
	body.version = "v1";
	body.content = btoa(JSON.stringify(c));
	
	try {
		var r = synchttpreq('POST', blobServicePostURL,
			{
				headers:{ 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			});
		
		console.log(JSON.parse(r.getBody()));		
	} catch(e) {
		console.log("Error POSTing to " + blobServicePostURL);
		console.log(e);
	}
};
