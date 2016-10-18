'use strict';
var httpreq = require('../../node_modules/httpreq/lib/httpreq');
var btoa = require('btoa')

module.exports = function(Reservation) {
  Reservation.beforeRemote('create', function(ctx, reservation, next) {
    // TODO: About to create a reservation.
    console.log('TODO: Opportunity for statistics/logging.');
    next();
  });
  Reservation.afterRemote('create', function(ctx, reservation, next) {
    // TODO: Have created a reservation.
    console.log('TODO: Opportunity for statistics/logging.');
    next();
  });
  Reservation.observe('before save', function enqueue(ctx, next) {
	    if (ctx.instance) {
	    		// Write to a Kafka style queue for processing.
			var body = '{"message": "' + btoa(JSON.stringify(ctx.instance)) + '"}';
			console.log(body);
			httpreq.post('http://localhost:8080/api/topic/Reservations', {	
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
			console.log('TODO: Should write to a queue here.');
    		}
    next();
  });
};
