'use strict';

var httpreq = require('httpreq');
var synchttpreq = require('sync-request');
var btoa = require('btoa');
var atob = require('atob');
var isEmpty = require('is-empty');

module.exports.readFromQueue = function(q) {
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

/*
module.exports.readFromQueue = function(q) {
	var c = new Object();
	
	httpreq.get(q,
		function (err, res){
			if (err){
				console.log(err);
			}else{
				console.log(res.body);
				
				var r = JSON.parse(res.body);
				if (!isEmpty(r.message)) {
					c = JSON.parse(atob(r.message));	
				}
				
				console.log(c);
			}
			return c;
		});
}
*/

module.exports.writeToQueue = function(q, m) {
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