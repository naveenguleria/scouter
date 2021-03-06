/*
 *  Config file for routing 
 * 
 * */
define([], function() {
	'use strict';

	function config($routeProvider, $locationProvider) {
		
		$routeProvider.when('/', {
			templateUrl : 'templates/home.html',
			controller : 'searchPathCtrl'
		}).otherwise({
			redirectTo : '/'
		});
	}

	config.$inject = [ '$routeProvider', '$locationProvider' ];

	return config;
});