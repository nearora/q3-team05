var Promise = require('promise'),
    request = require('request'),
    jsonUtils = require('./util/JsonUtils'),
    errorHandler = require('./util/errorHandler'),
    config = require('../Config');



var approval;
approval = {

    urlBase: config.url.approvalService,


    /**
     * Gets an array of approval.
     * Can be filtered by the approval id, if implemented
     * @param id
     * @returns {*}
     */
    getReservations: function (id) {

        var options = {
            url: this.urlBase,
            method: 'GET'
        };

        if (id) {
            options.url = this.urlBase + '/' + id;
        }

        return new Promise(function (resolve, reject) {

            request.get(options, function (error, response, body) {

                var errorsFound = errorHandler.hasErrors(options, error, response);
                if (errorsFound) {
                    return reject(errorsFound);
                }

                var parsedResponse = jsonUtils.parseResponseBody(options, body);
                if (parsedResponse.error) {
                    return reject(parsedResponse.error);
                }

                console.log("Approvals from Server service Approvals: " + parsedResponse.data );
                resolve(parsedResponse.data);
            });

        });
    }


};


module.exports = approval;
