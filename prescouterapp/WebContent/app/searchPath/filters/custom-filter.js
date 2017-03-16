/*
 * 
 * Custom filters defined for application
 * 
 */
define([ 'app' ], function(app) {
	'use strict';
	
	var appFilters = angular.module('appFilters', []);

	appFilters.filter('journeyDuration', function() {

		return function(timeinMinutes) {
			
			if (timeinMinutes != undefined) {
				var hours = Math.floor(timeinMinutes / 60);
			    var minutes = (timeinMinutes % 60);
				return hours + "h" +minutes;
			}
			else{
				return 0;
			}

		}

	});
});
