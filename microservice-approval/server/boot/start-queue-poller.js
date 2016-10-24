// Approvals service

'use strict';

const reservationApprovalsRequestedQueue = 'reservation-approvals-requested';
const reservationApprovalsApprovedQueue = 'reservation-approvals-approved';
const approvalServiceURL =
	'http://approval.vmwaredevops.appspot.com/api/v1/approvables';

var httpreq = require('httpreq');
var atob = require('atob');
var btoa = require('btoa');
var isEmpty = require('is-empty');
var queueOperations = require('../../common/queueOperations.js');

module.exports = function(app, cb) {
	var delay = 5000;
	
	var timeoutId = setInterval(function() {
		console.log("Approvals queue poller called");
		// Check the approvals service for approved and denied approvals
		// and push to reservation-approvals-approved for approved reservations
		httpreq.get(approvalServiceURL,
			{
				parameters: { approved: true, teamID: 1987 },
			},
			function(err, res) {
				if (err){
        				console.log(err);
    				}else{
					console.log(res.body);
					var approvals = JSON.parse(res.body);
					for (var i = 0; i < approvals.length; i++) {
						queueOperations.writeToQueue(reservationApprovalsApprovedQueue, JSON.parse(atob(approvals[i].description)));
						httpreq.delete(approvalServiceURL + "/" + approvals[i].id,
							function (err, res){
								if (err){
									console.log(err);
								}else{
									console.log(res.body);
								}
							});
					}
				}	
			});
		
		// Do not care for denied approvals. They are by default disapproved till
		// approved. Thus, never query for approved = false
		
		// Check queue for messages in the following topics
		// reservation-approvals-requested
		// And push to the approvals service
		console.log("Checking for messages in queue " + reservationApprovalsRequestedQueue);
		while(true) {
			var m = queueOperations.readFromQueue(reservationApprovalsRequestedQueue);
			console.log(m);
			if (isEmpty(m)) {
				break;
			} else {
				var body = new Object();
				body.teamID = 1987;
				body.description = btoa(JSON.stringify(m));
				body.approved = false;
				body.blob = m.id;
				console.log(JSON.stringify(body))
				httpreq.post(approvalServiceURL,
					{
						headers:{ 'Content-Type': 'application/json' },
						body: JSON.stringify(body)
					},
					function (err, res){
						if (err){
							console.log(err);
						}else{
							console.log(res.body);
						}
					});
			}
		}
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
