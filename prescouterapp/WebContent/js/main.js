/*
 * Main js file to be loaded which specifies dependencies
 * 
 * */
require.config({

	baseUrl : '/prescouterapp/',
	// waitSeconds: 0,
	paths : {
		'jquery' : 'lib/jquery1.11.3.min',
		'angular' : 'lib/angular.min',
		'angular-route' : 'lib/angular-route.min',
		'angular-resource' : 'lib/angular-resource.min',
		'angular-filter' : 'lib/angular-filter.min',
		'searchPathCtrl' : 'app/searchPath/searchPathCtrl',
		'searchPathService' : 'app/searchPath/searchPathService',
		'appFilters' : 'app/searchPath/filters/custom-filter',
		'config' : 'app/config',
		'app' : 'app/app'
			

	},
	shim : {
		'angular' : {
			deps : [ 'jquery' ],
			exports : 'angular'
		},
		'angular-route' : {
			deps : [ 'angular' ],
			exports : 'ngRoute'
		},
		'angular-resource' : {
			deps : [ 'angular' ],
			exports : 'ngResource'
		},
		'angular-filter' : {
			deps : [ 'angular' ],
			exports : 'angular.filter'
		},
		
		'config' : {
			deps : [ 'angular-route', 'angular-resource', 'angular-filter' ],
			exports : 'config'
		},
		'app' : {
			deps : [ 'angular-route', 'angular-resource', 'angular-filter',
					'config'],
			exports : 'app'
		}

	}
});

require([ 'app', 'searchPathCtrl', 'searchPathService', 'appFilters' ], function(app) {
	'use strict';

	angular.bootstrap(document, [ 'prescouterApp' ]);
})();
