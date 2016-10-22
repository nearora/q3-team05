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
