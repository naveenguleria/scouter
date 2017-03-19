/*
 * Application js file for creating 'prescouterApp' module and dependencies for module
 * 
 * */
define([ 'config', 'searchPathCtrl', 'searchPathService', 'searchPathUtils' ],

function(config, searchPathCtrl, searchPathService, searchPathUtils) {
	'use strict';

	var app = angular.module('prescouterApp', [ 'ngRoute', 'ngResource',
			'angular.filter', 'appFilters' ]);

	app.config(config);

	// Create controller
	app.controller('searchPathCtrl', searchPathCtrl);
	// DI for Controller
	searchPathCtrl.$inject = [ '$scope', '$location', '$http', '$sce' ];

	//Create service
	app.factory('searchPathService', searchPathService);
	// DI for service
	searchPathService.$inject = [ '$scope', '$location', '$http' ];

	// Create utility factory
	app.factory('searchPathUtils', searchPathUtils);
	// DI for utils
	searchPathUtils.$inject = [ '$scope', '$location', '$http' ];

});