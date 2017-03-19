define(
		[ 'app' ],
		function(app) {
			'use strict';

			/*
			 * @author: Naveen Guleria
			 * @name : searchPathUtils 
			 * @methodOf: searchPathUtils.searchPathUtils 
			 * @description : Constructor method used to create searchPathUtils object
			 * @return: {Object : searchPathUtils} 
			 * 
			 */
			var searchPathUtils = {
					
				/*
				 * @author: Naveen Guleria 
				 * @name : createMap 
				 * @methodOf: searchPathUtils.createMap 
				 * @description : Method used to create map object for all search deals
				 * Iterate over the list of search deals and check if dealwith same departure is in map (myMap)
				 * If deal is not in map (same departure) then create new pathelement and subpath element
				 * If deal is present in map (same departure) then get this deal out (pathElement) and check if
				 * pathElement already contains the deal with same arrival location.
				 * if path element does not contain deal with same arrival location then
				 * create new subPathElement and add new subPathElement to pathElement and then add pathElement to map 
				 * else if path element contains deal with same arrival location then get this deal out 
				 * and add new subPathElement in the list of pathElement and then add the pathElement to map
				 * 
				 * myMap will contain multiple departure locations as key and in value for each departure location 
				 * we have all the paths to where we can go from this departure location with cost and time info
				 * 
				 * @param {Object: searchDeals}
				 * @return: {Object : myMap} 
				 * 
				 */
				createMap : function(searchDeals) {

					// Object to store path information with weight
					var myMap = {};

					angular
							.forEach(
									searchDeals,
									function(eachLocation) {

										if (eachLocation.departure in myMap) {

											var pathElement = myMap[eachLocation.departure];
											var subPathElement = {};

											if (eachLocation.arrival in pathElement) {

												subPathElement = pathElement[eachLocation.arrival];
												var totalMins = parseInt(eachLocation.duration.h)
														* 60
														+ parseInt(eachLocation.duration.m);

												if (eachLocation.transport == 'train') {
													subPathElement.traincost = eachLocation.cost;
													subPathElement.train_reference = eachLocation.reference;
													subPathElement.traintime = totalMins;
													subPathElement.traintime_r = eachLocation.duration;
													pathElement[eachLocation.arrival] = subPathElement;
												} else if (eachLocation.transport == 'bus') {
													subPathElement.buscost = eachLocation.cost;
													subPathElement.bus_reference = eachLocation.reference;
													subPathElement.bustime = totalMins;
													subPathElement.bustime_r = eachLocation.duration;
													pathElement[eachLocation.arrival] = subPathElement;
												} else if (eachLocation.transport == 'car') {
													subPathElement.carcost = eachLocation.cost;
													subPathElement.car_reference = eachLocation.reference;
													subPathElement.cartime = totalMins;
													subPathElement.cartime_r = eachLocation.duration;
													pathElement[eachLocation.arrival] = subPathElement;
												}
											} else {
												var totalMins = parseInt(eachLocation.duration.h)
														* 60
														+ parseInt(eachLocation.duration.m);

												if (eachLocation.transport == 'train') {
													subPathElement.traincost = eachLocation.cost;
													subPathElement.train_reference = eachLocation.reference;
													subPathElement.traintime = totalMins;
													subPathElement.traintime_r = eachLocation.duration;
													pathElement[eachLocation.arrival] = subPathElement;
												} else if (eachLocation.transport == 'bus') {
													subPathElement.buscost = eachLocation.cost;
													subPathElement.bus_reference = eachLocation.reference;
													subPathElement.bustime = totalMins;
													subPathElement.bustime_r = eachLocation.duration;
													pathElement[eachLocation.arrival] = subPathElement;
												} else if (eachLocation.transport == 'car') {
													subPathElement.carcost = eachLocation.cost;
													subPathElement.car_reference = eachLocation.reference;
													subPathElement.cartime = totalMins;
													subPathElement.cartime_r = eachLocation.duration;
													pathElement[eachLocation.arrival] = subPathElement;
												}
											}

											myMap[eachLocation.departure] = pathElement;
										} else {
											var pathElement = {};
											var subPathElement = {};

											var totalMins = parseInt(eachLocation.duration.h)
													* 60
													+ parseInt(eachLocation.duration.m);

											if (eachLocation.transport == 'train') {
												subPathElement.traincost = eachLocation.cost;
												subPathElement.train_reference = eachLocation.reference;
												subPathElement.traintime = totalMins;
												subPathElement.traintime_r = eachLocation.duration;

												pathElement[eachLocation.arrival] = subPathElement;
											} else if (eachLocation.transport == 'bus') {
												subPathElement.buscost = eachLocation.cost;
												subPathElement.bus_reference = eachLocation.reference;
												subPathElement.bustime = totalMins;
												subPathElement.bustime_r = eachLocation.duration;
												pathElement[eachLocation.arrival] = subPathElement;
											} else if (eachLocation.transport == 'car') {
												subPathElement.carcost = eachLocation.cost;
												subPathElement.car_reference = eachLocation.reference;
												subPathElement.cartime = totalMins;
												subPathElement.cartime_r = eachLocation.duration;
												pathElement[eachLocation.arrival] = subPathElement;
											}
											myMap[eachLocation.departure] = pathElement;
										}

									});
					return myMap;

				},
				/*
				 * @author: Naveen Guleria
				 * @name : createGraph 
				 * @methodOf: searchPathUtils.createGraph 
				 * @description : Method used to create Graph dataMap for all search deals
				 * @param {String: departure}
				 * @param {String: arrival}
				 * @param {String: optionsRadios}
				 * @return: {Object : graph} 
				 * 
				 */
				createGraph : function(departure, arrival, optionsRadios,
						dataMap) {
					var graph = new searchPathUtils.graph();
					var graphData;
					for ( var key in dataMap) {
						graph.addVertex(key, dataMap[key]);
					}
					return graph;

				},
				/*
				 * @author: Naveen Guleria
				 * @name : containsObject 
				 * @methodOf: searchPathUtils.containsObject 
				 * @description : Method used to find object in list
				 * @param {Object: obj}
				 * @param {Object: list}
				 * @return: {boolean} 
				 * 
				 */
				containsObject : function(obj, list) {
					var i;
					for (i = 0; i < list.length; i++) {
						if (angular.equals(obj, list[i])) {
							return true;
						}
					}
					return false;

				},
				/*
				 * @author: Naveen Guleria
				 * @name : priorityQueue 
				 * @methodOf: searchPathUtils.priorityQueue 
				 * @description : Method used to create the array of objects with manipulation functions 
				 * to add, delete, sort and check if nodes array is empty or not
				 * 
				 * @reference: https://github.com/mburst/dijkstras-algorithm/blob/master/dijkstras.js
				 * 
				 * @param {Object: priority}
				 * @param {Object: key}
				 * @return: {Object: based on function called} 
				 * 
				 */
				priorityQueue : function() {
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

				},
				/*
				 * @author: Naveen Guleria
				 * @name : graph 
				 * @methodOf: searchPathUtils.graph 
				 * @description : Method used to create map according to dijkstra's algorithm and 
				 * modified the algo to incorporate multiple factors (COST, TIME etc) according to the requirement
				 * 
				 * @reference: https://github.com/mburst/dijkstras-algorithm/blob/master/dijkstras.js
				 * 
				 * @return: {Object: based on function called} 
				 * 
				 */
				graph : function() {

					var INFINITY = 1 / 0;

					this.vertices = {};

					//Add vertex to vertices
					this.addVertex = function(name, edges) {
						this.vertices[name] = edges;
					};

					/*
					 * @author: Naveen Guleria
					 * @name : shortestParameter 
					 * @methodOf: searchPathUtils.graph.shortestParameter 
					 * @description : CUSTOM Method used to return element with min weight according to factor (COST or TIME)
					 * modified the algo to incorporate multiple factors (COST, TIME etc) according to the requirement
					 * 
					 * @return: {Object: element at 0th position after sorting} 
					 * 
					 */
					this.shortestParameter = function(param, element) {
						if (param == "COST") {
							var costs = [ element.traincost, element.buscost,
									element.carcost ];
							return costs.sort()[0];
						} else if (param == "TIME") {
							// TIME
							var times = [ element.traintime, element.bustime,
									element.cartime ];
							var smallestTime = times.sort()[0];
							return times.sort()[0];
						} else {

						}

					};

					//Method to know the shortest path from departure to arrival location
					this.shortestPath = function(start, finish, measure) {

						var nodes = new searchPathUtils.priorityQueue(), distances = {}, previous = {}, path = [], smallest, vertex, neighbor, alt;

						//Add weight 0 or INFINITY to the vertices 0 = reachable vertex INFINITY is not reachable vertex
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

						//while we have nodes in priorityQueue
						while (!nodes.isEmpty()) {

							smallest = nodes.dequeue();

							if (smallest === finish) {
								path = [];

								while (previous[smallest]
										&& previous[smallest].smallest) {
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
								//Called the shortestParameter custom method to get smallest 
								//element according to (COST or TIME)
								var smallestParam = this.shortestParameter(
										measure,
										this.vertices[smallest][neighbor]);
								//default it takes single weight
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
				},
				/*
				 * @name : getShortestParameterInfo 
				 * @methodOf: searchPathUtils.getShortestParameterInfo 
				 * @description : Method used to return element with min weight according to factor (COST or TIME)
				 * Do processing according to factor (COST or TIME)
				 * 
				 * @param: {String: Option selected (COST or TIME)}
				 * @param: {Object: contains info about single destination (carcost, cartime etc...)}
				 * @return: {Object: shortestParamInfo } object with transport(car, bus, train etc) info according to factor (COST or TIME)
				 * 
				 */
				getShortestParameterInfo : function(param, element) {
					var shortestParamInfo = {};
					if (param == "COST") {

						if (element.traincost < element.buscost
								&& element.traincost < element.carcost) {
							// smallest = element.traincost;

							var duration = element.traintime_r.h + "h"
									+ element.traintime_r.m;
							shortestParamInfo["data"] = {
								"transport" : "train",
								"cost" : element.traincost,
								"reference" : element.train_reference,
								"duration" : duration,
								"time" : element.traintime
							};

						} else if (element.buscost < element.carcost
								&& element.buscost < element.traincost) {
							// smallest = element.buscost;

							var duration = element.bustime_r.h + "h"
									+ element.bustime_r.m;
							shortestParamInfo["data"] = {
								"transport" : "bus",
								"cost" : element.buscost,
								"reference" : element.bus_reference,
								"duration" : duration,
								"time" : element.bustime
							};

						} else {
							// smallest = element.carcost;

							var duration = element.cartime_r.h + "h"
									+ element.cartime_r.m;
							shortestParamInfo["data"] = {
								"transport" : "car",
								"cost" : element.carcost,
								"reference" : element.car_reference,
								"duration" : duration,
								"time" : element.cartime
							};
						}

					} else {
						// TIME
						if (element.traintime < element.bustime
								&& element.traintime < element.cartime) {
							// smallest = element.traintime;

							var duration = element.traintime_r.h + "h"
									+ element.traintime_r.m;
							shortestParamInfo["data"] = {
								"transport" : "train",
								"cost" : element.traincost,
								"reference" : element.train_reference,
								"duration" : duration,
								"time" : element.traintime
							};

						} else if (element.bustime < element.cartime
								&& element.bustime < element.traintime) {
							// smallest = element.bustime;

							var duration = element.bustime_r.h + "h"
									+ element.bustime_r.m;
							shortestParamInfo["data"] = {
								"transport" : "bus",
								"cost" : element.buscost,
								"reference" : element.bus_reference,
								"duration" : duration,
								"time" : element.bustime
							};

						} else {
							// smallest = element.cartime;

							var duration = element.cartime_r.h + "h"
									+ element.cartime_r.m;
							shortestParamInfo["data"] = {
								"transport" : "car",
								"cost" : element.carcost,
								"reference" : element.car_reference,
								"duration" : duration,
								"time" : element.cartime
							};
						}

					}

					return shortestParamInfo;
				}
			};

			searchPathUtils.$inject = [ '$scope', '$location', '$http' ];

			return searchPathUtils;
		});