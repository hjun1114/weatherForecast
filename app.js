// module
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource'])

						.config(function ($routeProvider, $routeParams){

							$routeProvider

							.when('/', {
								templateUrl: './pages/home.html',
								controller: 'homeController'
							})

							.when('/forecast', {
								templateUrl: './pages/forecast.html',
								controller: 'forecastController'
							})

							.when('/forecast/:days', {
								templateUrl: "./pages/forecast.html"
								controller: 'forecastController'
							})

						})

						.service('cityService', function(){
							this.city = "Montreal, QC";
						})
						// Use of service here is to bind the city variable with a singleton object: cityService. 
						// when you want to change multiple data at once, you need to understand this concept. 

						.controller('homeController', function($scope, cityService){
							$scope.city = cityService.city;
							$scope.$watch('city', function(){
								cityService.city = $scope.city;
							});
						})

						.controller('forecastController', function($scope, $resource, cityService, $routeParams){
							
							$scope.days = $routeParams.days || 2; 

							$scope.city = cityService.city;

							$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=4e57b5e64064ea5cab3cb2b7e56449d0", 
							{
								callback: "JSON_CALLBACK"
							},
							{
								get: {method: "JSONP"}
							});
							// resource services makes it easier for us to go out and get data.
							// basically wraps up the http service 

							$scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days });
							// call the api and save it in a scope variable with some options.

							var temp1 = $scope.weatherResult.list
							console.log($scope.weatherResult);

							$scope.toCelsius = function(klvin) {
								return Math.round(klvin - 273.15);
							}

							$scope.toDate = function(dateNum) {
								return new Date(dateNum*1000); //its in milisecond, so multiply by 1000
							}
							
						});

// http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=4e57b5e64064ea5cab3cb2b7e56449d0
