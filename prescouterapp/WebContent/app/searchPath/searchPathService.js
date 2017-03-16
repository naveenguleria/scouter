define([ 'app' ], function(app) {
	'use strict';

	function searchPathService($scope, $location, $http) {

		$http.get('data/response.json').then(function(res) {
			$scope.travelData = res.data;
			$scope.searchDeals = $scope.travelData.deals;
		});
	}

	searchPathService.$inject = [ '$scope', '$location', '$http' ];

	return searchPathService;
});