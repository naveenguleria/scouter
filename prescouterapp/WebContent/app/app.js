/*
 * Application js file for creating 'prescouterApp' module and dependencies for module
 * 
 * */
define([ 'config', 'searchPathCtrl', 'searchPathService' ],

function(config, searchPathCtrl, searchPathService) {
	'use strict';

	var app = angular.module('prescouterApp', [ 'ngRoute', 'ngResource',
			'angular.filter', 'appFilters' ]);

	app.config(config);

	app.controller('searchPathCtrl', searchPathCtrl);
	// DI for Controller
	searchPathCtrl.$inject = [ '$scope', '$location', '$http' ];

	app.factory('searchPathService', searchPathService);
	searchPathService.$inject = [ '$scope', '$location', '$http' ];

	//app.factory('utilsService', utilsService);
	//utilsService.$inject = [ '$scope', '$location', '$http' ];
	/*
	 * app.factory('ideasDataSvc',ideasDataSvc);
	 * app.controller('ideasHomeController', ideasHomeController);
	 * app.controller('ideaDetailsController',ideaDetailsController);
	 */
});