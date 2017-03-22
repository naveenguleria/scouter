define(
		[ 'app', 'searchPathService', 'searchPathUtils' ],
		function(app, searchPathService, searchPathUtils) {
			'use strict';

			/*
			 * @author: Naveen Guleria
			 * @name : searchPathCtrl 
			 * @methodOf: searchPathCtrl.searchPathCtrl 
			 * @description : Constructor method used to create searchPathCtrl object
			 * @param: {String : newCost} time taken for each route is added to total time
			 * @param {Object: $scope}
			 * @param {Object: $location}
			 * @param {Object: $http}
			 * @param {Object: $sce}
			 * 
			 * @return: {Object : searchPathCtrl} 
			 * 
			 */
			function searchPathCtrl($scope, $location, $http, $sce) {

				searchPathService.$inject = [ '$scope', '$location', '$http' ];

				$scope.searchDeals;
				$scope.dataMap;
				$scope.shortestPathToDestination = {};
				$scope.totalCost = 0;
				$scope.duration = 0;
				$scope.showResults = false;
				$scope.optionsRadios = "COST";
				$scope.infoMessage = "";
				$scope.travelData = searchPathService($scope, $location, $http);
				$scope.showError = false;
				$scope.diffPath = [];

				/*
				 * @author: Naveen Guleria
				 * @name : searchPaths 
				 * @methodOf: searchPathCtrl.searchPaths 
				 * @description : Scope method is used to find the shortest path
				 * This method is called when user clicks the Search button on UI 
				 * @param: {String : departure} departure location selected by user on UI
				 * @param: {String : arrival} arrival location selected by user on UI
				 * @param: {String : optionsRadios} optionsRadios selected by user on UI 
				 * for Cheapest, fastest and all means
				 * @return: updates the UI using models binded 
				 * 
				 */
				$scope.searchPaths = function(departure, arrival, optionsRadios) {
					$scope.totalCost = 0;
					$scope.duration = 0;
					$scope.infoMessage= "";
					$scope.optionSelected = "";
					$scope.departureSelected = departure;
					$scope.arrivalSelected = arrival;
					
					if ((departure == undefined || departure == "") && (arrival == undefined || arrival == "")) {
						$scope.showError = true;
						$scope.showResults = false;
						$scope.infoMessage = $sce
								.trustAsHtml("Please select <b>departure</b> and <b>arrival</b> locations");
						return false;
					}
					

					if (departure == undefined || departure == "") {
						$scope.showError = true;
						$scope.showResults = false;
						$scope.infoMessage = $sce
								.trustAsHtml("Please select <b>departure</b> location");
						return false;
					}

					if (arrival == undefined || arrival == "") {
						$scope.showError = true;
						$scope.showResults = false;
						$scope.infoMessage = $sce
								.trustAsHtml("Please select <b>arrival</b> location");
						return false;
					}

					
					if (departure != undefined && arrival != undefined
							&& departure == arrival) {
						$scope.showError = true;
						$scope.showResults = false;
						$scope.infoMessage = $sce
								.trustAsHtml("<b>Departure</b> and <b>Arrival</b> locations should be different!!!");
						return false;
					}
					
					$scope.showError = false;
					$scope.showResults = true;
					
					if($scope.optionsRadios=="COST"){
						$scope.optionSelected = "Cheapest";
					}
					else if($scope.optionsRadios=="TIME"){
						$scope.optionSelected = "Fastest";
					}
					else{
						$scope.optionSelected = "All";
					}

					//Create data map in a way so that we can use dijkstras algorithm for finding shortest path
					$scope.dataMap = searchPathUtils.createMap($scope.searchDeals);

					//Create main graph by using dijkstras algorithm and call the methods to find shortest path
					$scope.dataGraph = searchPathUtils.createGraph(departure, arrival, optionsRadios, $scope.dataMap);
					// Need to call reverse on result (shortestPathToDestination) to make all the locations in ascending order
					$scope.shortestPathToDestination = $scope.dataGraph
							.shortestPath(departure, arrival, optionsRadios)
							.concat([ departure ]).reverse()
				};

				/*
				 * @author: Naveen Guleria
				 * @name : calCostTotal 
				 * @methodOf: searchPathCtrl.calCostTotal 
				 * @description : Scope method is used to calculate the total cost of all the 
				 * routes and set the cost to model $scope.totalCost 
				 * @param: {String : newCost} time taken for each route is added to total time
				 * @return: {String : totalCost} 
				 * 
				 */
				$scope.calCostTotal = function(newCost) {
					$scope.totalCost = $scope.totalCost + parseInt(newCost);
				}

				/*
				 * @author: Naveen Guleria
				 * @name : calDurationTotals 
				 * @methodOf: searchPathCtrl.calDurationTotals 
				 * @description : Scope method is used to calculate the total time of all the 
				 * routes and set the time to model $scope.duration 
				 * @param: {String : newDuration} time taken for each route is added to total time
				 * @return: {String : duration}
				 * 
				 */
				$scope.calDurationTotal = function(newDuration) {
					$scope.duration = $scope.duration + parseInt(newDuration);
				}

				/*
				 * @author: Naveen Guleria
				 * @name : getShortestParameterInfo 
				 * @methodOf: searchPathCtrl.getShortestParameterInfo 
				 * @description : Scope method is used to get shortest pat information  (Called from index.html)
				 * @param: {String : optionsRadios, Object: JSONArray}
				 * @return: {Object : shortestParamInfo}
				 * 
				 */
				$scope.getShortestParameterInfo = function(param, element) {
					return searchPathUtils.getShortestParameterInfo(param, element);
				};

			}

			searchPathCtrl.$inject = [ '$scope', '$location', '$http', '$sce' ];

			return searchPathCtrl;
		});
