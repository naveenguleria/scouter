define(['app', 'searchPathService'], function(app, searchPathService){
    'use strict';

    function searchPathCtrl( $scope, $location, $http){
    	
    	searchPathService.$inject = [ '$scope', '$location', '$http' ];
    	
    	$scope.searchDeals;
    	$scope.dataMap;
    	$scope.shortestPathToDestination={};
    	$scope.totalCost = 0;
    	$scope.duration = 0;
    	$scope.showResults = false;
    	$scope.optionsRadios = "COST";
    	
    	$scope.travelData = searchPathService($scope, $location, $http);
    	
    	$scope.diffPath = [];
    	
    	$scope.searchPaths = function(departure, arrival, optionsRadios) {
    		$scope.showResults = true;
    		$scope.totalCost= 0;
    		$scope.duration = 0;
    		$scope.optionSelected = $scope.optionsRadios;
    		
    		if (departure == undefined || departure == "") {
    			alert("Please select departure location");
    			return false;
    		}

    		if (arrival == undefined || arrival == "") {
    			alert("Please select arrival location");
    			return false;
    		}

    		if (departure != undefined && arrival != undefined
    				&& departure == arrival) {
    			alert("Departure and Arrival location need to be different");
    			return false;
    		}
    		
    		$scope.dataMap=$scope.createMap();
    		
    		$scope.dataGraph = $scope.createGraph(departure, arrival, optionsRadios);
    		//console.log($scope.g); 
    		$scope.shortestPathToDestination = $scope.dataGraph.shortestPath(departure, arrival, optionsRadios).concat([departure]).reverse()
    	};
    	
    	$scope.calCostTotal = function(newCost) {
    		$scope.totalCost = $scope.totalCost + parseInt(newCost);
    	}
    	
    	$scope.calDurationTotal = function(newDuration) {
    		$scope.duration = $scope.duration + parseInt(newDuration);
    	}
    	
    	
    	$scope.getShortestParameterInfo = function(param, element) {
    		var shortestParamInfo={};
    		if (param == "COST") {
    			
    			if(element.traincost < element.buscost && element.traincost < element.carcost){
    				//smallest = element.traincost;
    			    
    				var duration=element.traintime_r.h + "h"+ element.traintime_r.m;
    			    shortestParamInfo["data"]={"transport":"train","cost":element.traincost,"reference":element.train_reference,"duration":duration,"time":element.traintime};
    			    
    			}else if(element.buscost < element.carcost && element.buscost < element.traincost){
    				//smallest = element.buscost;
    				
    			    var duration=element.bustime_r.h + "h"+ element.bustime_r.m;
    			    shortestParamInfo["data"]={"transport":"bus","cost":element.buscost,"reference":element.bus_reference,"duration":duration,"time":element.bustime};
    			    
    			}else{
    			    //smallest = element.carcost;
    			    
    			    var duration=element.cartime_r.h + "h"+ element.cartime_r.m;
    			    shortestParamInfo["data"]={"transport":"car","cost":element.carcost,"reference":element.car_reference,"duration":duration,"time":element.cartime};
    			}
    			
    		} else {
    			//TIME
    			if(element.traintime < element.bustime && element.traintime < element.cartime){
    				//smallest = element.traintime;
    			    
    				var duration=element.traintime_r.h + "h"+ element.traintime_r.m;
    			    shortestParamInfo["data"]={"transport":"train","cost":element.traincost,"reference":element.train_reference,"duration":duration,"time":element.traintime};
    			    
    			}else if(element.bustime < element.cartime && element.bustime < element.traintime){
    				//smallest = element.bustime;
    				
    			    var duration=element.bustime_r.h + "h"+ element.bustime_r.m;
    			    shortestParamInfo["data"]={"transport":"bus","cost":element.buscost,"reference":element.bus_reference,"duration":duration,"time":element.bustime};
    			    
    			}else{
    			    //smallest = element.cartime;
    			    
    			    var duration=element.cartime_r.h + "h"+ element.cartime_r.m;
    			    shortestParamInfo["data"]={"transport":"car","cost":element.carcost,"reference":element.car_reference,"duration":duration,"time":element.cartime};
    			}

    		}
    		
    		return shortestParamInfo;
    	};
    	
    	
    	$scope.createMap = function(){
    		//Object to store path information with weight
    		var myMap = {};
    		
    		angular.forEach($scope.searchDeals, function(eachLocation){
    			
    			if(eachLocation.departure in myMap){
    				
    				var pathElement = myMap[eachLocation.departure];
    				var subPathElement = {};
    				
    				if(eachLocation.arrival in pathElement){
    					
    					subPathElement = pathElement[eachLocation.arrival];
    					var totalMins=parseInt(eachLocation.duration.h)*60+parseInt(eachLocation.duration.m);
    					
    					if(eachLocation.transport=='train'){
    						subPathElement.traincost=eachLocation.cost;
    						subPathElement.train_reference=eachLocation.reference;
    						subPathElement.traintime=totalMins;
    						subPathElement.traintime_r=eachLocation.duration;
    						pathElement[eachLocation.arrival]=subPathElement;
    					}
    					else if(eachLocation.transport=='bus'){
    						subPathElement.buscost=eachLocation.cost;
    						subPathElement.bus_reference=eachLocation.reference;
    						subPathElement.bustime=totalMins;
    						subPathElement.bustime_r=eachLocation.duration;
    						pathElement[eachLocation.arrival]=subPathElement;
    					}
    					else if(eachLocation.transport=='car'){
    						subPathElement.carcost=eachLocation.cost;
    						subPathElement.car_reference=eachLocation.reference;
    						subPathElement.cartime=totalMins;
    						subPathElement.cartime_r=eachLocation.duration;
    						pathElement[eachLocation.arrival]=subPathElement;
    					}
    				}
    				else{
    					var totalMins=parseInt(eachLocation.duration.h)*60+parseInt(eachLocation.duration.m);
    					
    					if(eachLocation.transport=='train'){
    						subPathElement.traincost=eachLocation.cost;
    						subPathElement.train_reference=eachLocation.reference;
    						subPathElement.traintime=totalMins;
    						subPathElement.traintime_r=eachLocation.duration;
    						pathElement[eachLocation.arrival]=subPathElement;
    					}
    					else if(eachLocation.transport=='bus'){
    						subPathElement.buscost=eachLocation.cost;
    						subPathElement.bus_reference=eachLocation.reference;
    						subPathElement.bustime=totalMins;
    						subPathElement.bustime_r=eachLocation.duration;
    						pathElement[eachLocation.arrival]=subPathElement;
    					}
    					else if(eachLocation.transport=='car'){
    						subPathElement.carcost=eachLocation.cost;
    						subPathElement.car_reference=eachLocation.reference;
    						subPathElement.cartime=totalMins;
    						subPathElement.cartime_r=eachLocation.duration;
    						pathElement[eachLocation.arrival]=subPathElement;
    					}
    				}
    				
    				myMap[eachLocation.departure]= pathElement;
    			}
    			else{
    				var pathElement = {};
    				var subPathElement = {};
    				
    				var totalMins=parseInt(eachLocation.duration.h)*60+parseInt(eachLocation.duration.m);
    				
    				if(eachLocation.transport=='train'){
    					subPathElement.traincost=eachLocation.cost;
    					subPathElement.train_reference=eachLocation.reference;
    					subPathElement.traintime=totalMins;
    					subPathElement.traintime_r=eachLocation.duration;
    					
    					pathElement[eachLocation.arrival]=subPathElement;
    				}
    				else if(eachLocation.transport=='bus'){
    					subPathElement.buscost=eachLocation.cost;
    					subPathElement.bus_reference=eachLocation.reference;
    					subPathElement.bustime=totalMins;
    					subPathElement.bustime_r=eachLocation.duration;
    					pathElement[eachLocation.arrival]=subPathElement;
    				}
    				else if(eachLocation.transport=='car'){
    					subPathElement.carcost=eachLocation.cost;
    					subPathElement.car_reference=eachLocation.reference;
    					subPathElement.cartime=totalMins;
    					subPathElement.cartime_r=eachLocation.duration;
    					pathElement[eachLocation.arrival]=subPathElement;
    				}
    				myMap[eachLocation.departure]= pathElement;
    			}
    			
    		});
    		return myMap;
    	};
    	
    	
    	$scope.createGraph = function(departure, arrival, optionsRadios) {
    		var g = new Graph();
    		
    		var graphData;
    		
    		for (var key in $scope.dataMap) {
    		    g.addVertex(key, $scope.dataMap[key]);
    		}
    		
    		
    		return g;
    		
    	};
    	
    	$scope.containsObject = function(obj, list) {
    	    var i;
    	    for (i = 0; i < list.length; i++) {
    	        if (angular.equals(obj, list[i])) {
    	            return true;
    	        }
    	    }

    	    return false;
    	};
    	
    	
    	/**
    	 * Created priority queue
    	 */
    	function PriorityQueue() {
    		
    		this._nodes = [];

    		this.enqueue = function(priority, key) {
    			this._nodes.push({
    				key : key,
    				priority : priority
    			});
    			this.sort();
    		};
    		this.dequeue = function() {
    			return this._nodes.shift().key;
    		};
    		this.sort = function() {
    			this._nodes.sort(function(a, b) {
    				return a.priority - b.priority;
    			});
    		};
    		this.isEmpty = function() {
    			return !this._nodes.length;
    		};
    	};
    	
    	/**
    	 * Path finding function starts here
    	 */
    	function Graph() {
    		
    		var INFINITY = 1 / 0;
    		
    		this.vertices = {};

    		this.addVertex = function(name, edges) {
    			this.vertices[name] = edges;
    		};

    		this.shortestParameter = function(param, element) {
    			if (param == "COST") {
    				var costs = [ element.traincost, element.buscost, element.carcost ];
    				return costs.sort()[0];
    			} 
    			else if(param == "TIME"){
    				//TIME
    				var times = [ element.traintime, element.bustime, element.cartime ];
    				var smallestTime = times.sort()[0];
    				return times.sort()[0];
    			}
    			else {
    				
    			}

    		};
    		
    		
    		this.shortestPath = function(start, finish, measure) {
    			
    			var nodes = new PriorityQueue(), distances = {}, previous = {}, path = [], smallest, vertex, neighbor, alt;

    			for (vertex in this.vertices) {
    				if (vertex === start) {
    					distances[vertex] = 0;
    					nodes.enqueue(0, vertex);
    				} else {
    					distances[vertex] = INFINITY;
    					nodes.enqueue(INFINITY, vertex);
    				}

    				previous[vertex] = null;
    			}

    			while (!nodes.isEmpty()) {
    				
    				smallest = nodes.dequeue();

    				if (smallest === finish) {
    					path = [];

    					while (previous[smallest] && previous[smallest].smallest) {
    						path.push({
    							destination : smallest,
    							details : previous[smallest]
    						});
    						smallest = previous[smallest].smallest;
    					}

    					break;
    				}

    				if (!smallest || distances[smallest] === INFINITY) {
    					continue;
    				}

    				for (neighbor in this.vertices[smallest]) {
    					var smallestParam = this.shortestParameter(measure,
    							this.vertices[smallest][neighbor]);
    					alt = distances[smallest] + smallestParam;

    					if (alt < distances[neighbor]) {
    						distances[neighbor] = alt;
    						previous[neighbor] = {
    							smallest : smallest,
    							obj : this.vertices[smallest][neighbor]
    						};

    						nodes.enqueue(alt, neighbor);
    					}
    				}
    			}

    			return path;
    		};
    	};
    	
    }
    
    

    searchPathCtrl.$inject=['$scope','$location','$http'];

    return searchPathCtrl;
});



