'use strict';

var async = require('async');

var blobOperations = require('../../common/blobOperations.js')

module.exports = function(app) {
	/*
	 * The `app` object provides access to a variety of LoopBack resources such as
	 * models (e.g. `app.models.YourModelName`) or data sources (e.g.
	 * `app.datasources.YourDataSource`). See
	 * http://docs.strongloop.com/display/public/LB/Working+with+LoopBack+objects
	 * for more info.
	 */
	
	async.parallel({
    		updaters: async.apply(createUpdaters),
		resetBlob: async.apply(resetBlob)
	});
	
	function createUpdaters(cb) {
		app.models.Updater.create([{
			id: 1,
			active: true
		}]);
	}
	
	function resetBlob(cb) {
		var c = new Object();
		c.servers = new Array();
		c.reservations = new Array();
		blobOperations.writeToBlob(c)
	}
};
