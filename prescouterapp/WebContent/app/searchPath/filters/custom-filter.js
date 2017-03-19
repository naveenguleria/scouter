/*
 * Custom filters defined for application
 * 
 */
define([ 'app' ], function(app) {
	'use strict';
	
	var appFilters = angular.module('appFilters', []);

	/*
	 * @author: Naveen Guleria
	 * @name : filter 
	 * @methodOf: appFilters.filter 
	 * @description : Method used to return total time in minutes to format 18h15 
	 * 18h15 => where 18 = No of hours and 15 = No of minutes
	 * 
	 * @param: {int: timeinMinutes}
	 * @return: {String: hoursAndMinutes } 18h15 format
	 * 
	 */
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
