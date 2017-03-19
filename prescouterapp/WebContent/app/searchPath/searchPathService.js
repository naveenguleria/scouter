define([ 'app' ], function(app) {
	'use strict';

	function searchPathService($scope, $location, $http) {

		//Get the JSON data from the JSON file and fill the scope objects
		$http.get('data/response.json').then(function(res) {
			$scope.travelData = res.data;
			$scope.searchDeals = $scope.travelData.deals;
		});
	}

	searchPathService.$inject = [ '$scope', '$location', '$http' ];

	return searchPathService;
});