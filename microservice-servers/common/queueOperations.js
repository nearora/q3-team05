'use strict';

var httpreq = require('httpreq');
var btoa = require('btoa');

module.exports.writeToQueue = function(q, m) {
	var body = '{"message": "' + btoa(JSON.stringify(m)) + '"}';
	httpreq.post(q, {
		headers:{
			'Content-Type': 'application/json'
		},
		body: body
		}, function (err, res){
			if (err){
				console.log(err);
			}else{
				console.log(res.body);
			}
		});
}