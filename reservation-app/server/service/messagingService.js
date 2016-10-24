var Promise = require('promise'),
    config = require('../Config'),
    kafka = require('kafka-node');
var httpreq = require('httpreq');
var synchttpreq = require('sync-request');
var btoa = require('btoa');
var atob = require('atob');
var isEmpty = require('is-empty');
var url = require('url');

var messagingService = {
    urlMsgClient: config.url.messagingProducer,

    postMessage: function (topic, message) {

        var _self = this;
        var messageString = JSON.stringify(message);
        console.log(topic + ' - ' + messageString);

        var payloads = [
            {topic: topic, messages: messageString}
        ];
      // TODO : change to config
	      var messagingServiceBaseURL = process.env.MESSAGING_SERVICE;
	      /*if (isEmpty(messagingServiceBaseURL)) {
		      var errorMsg = "Set environment variable MESSAGING_SERVICE_BASE_URL to messaging service's base URL";
		          console.log(errorMsg);
		      throw(errorMsg);
	      }*/

        q = url.resolve(messagingServiceBaseURL, '/api/topic/' + topic);

	      var body = new Object();
        //body.message = btoa(JSON.stringify(m));
	      body.message = btoa(JSON.stringify(message));

        return new Promise(function (resolve, reject) {
	        httpreq.post(q, {
			      headers:{
				      'Content-Type': 'application/json'
			      },
			      body: JSON.stringify(body)
		      }, function (err, res){
			      if (err){
				      console.log(err);
              return reject(err);
			      }else{
				      console.log(res.body);
              console.log('MsgResponse:' + JSON.parse(res.body).message);

              resolve(JSON.parse(atob(JSON.parse(res.body).message)));
			      }
		       });
        })

     /*
        return new Promise(function (resolve, reject) {

            var kafkaProducer = new kafka.HighLevelProducer(new kafka.Client(_self.urlMsgClient));


            console.log('Creating Producer:' + kafkaProducer.client.clientId + ' ' + kafkaProducer.client.connectionString);
            kafkaProducer.on('ready', function () {
                console.log('Sending Payload:' + JSON.stringify(payloads));
                kafkaProducer.send(payloads,
                    function (err, data) {
                        if(err){
                            return reject(err);
                        }
                        console.log('MsgResponse:' + JSON.stringify(data));
                        resolve(data);
                    });
            });
        });
      */


    }


};


module.exports = messagingService;
