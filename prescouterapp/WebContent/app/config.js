/*
 * Config file for routing
 * 
 * */
define(['angular-route', 'angular-resource'], function($routeProvider, $locationProvider) {
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