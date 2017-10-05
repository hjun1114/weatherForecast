// module
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource'])

						.config(function ($routeProvider){

							$routeProvider

							.when('/', {
								templateUrl: './pages/home.html',
								controller: 'homeController'
							})

							.when('/forecast', {
								templateUrl: './pages/forecast.html',
								controller: 'forecastController'
							})

						})

						.service('cityService', function(){
							this.city = "Montreal, QC";
						})

						.controller('homeController', function($scope, cityService){
							$scope.city = cityService.city;
							$scope.$watch('city', function(){
								cityService.city = $scope.city;
							});
						})

						.controller('forecastController', function($scope, $resource, cityService){
							// resource services makes it easier for us to go out and get data.
							// basically wraps up the http service 
							$scope.city = cityService.city;

							$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=4e57b5e64064ea5cab3cb2b7e56449d0", 
							{
								callback: "JSON_CALLBACK"
							},
							{
								get: {method: "JSONP"}
							})
							$scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt:2 });
							console.log($scope.weatherResult);
						});

// http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=4e57b5e64064ea5cab3cb2b7e56449d0
