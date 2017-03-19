/*
 * Config file for routing but not used as of now
 * 
 * */
define([], function() {
	'use strict';

	function config($routeProvider, $locationProvider) {
		
		$routeProvider.when('/', {
			templateUrl : 'templates/home.html',
			controller : 'searchPathCtrl'
		}).when('/search', {
			templateUrl : 'templates/search.html',
			controller : 'searchPathCtrl'
		}).otherwise({
			redirectTo : '/'
		});
	}

	config.$inject = [ '$routeProvider', '$locationProvider' ];

	return config;
});