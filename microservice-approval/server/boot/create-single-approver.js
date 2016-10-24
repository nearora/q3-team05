'use strict';

var async = require('async');

module.exports = function(app) {
	/*
	 * The `app` object provides access to a variety of LoopBack resources such as
	 * models (e.g. `app.models.YourModelName`) or data sources (e.g.
	 * `app.datasources.YourDataSource`). See
	 * http://docs.strongloop.com/display/public/LB/Working+with+LoopBack+objects
	 * for more info.
	 */

	async.parallel({
    		updaters: async.apply(createApprovers)
	});
	
	function createApprovers(cb) {
		app.models.Approver.create([{
			id: 1,
			active: true
		}]);
	}
};
