// module
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource'])

						.config(function ($routeProvider){

							$routeProvider

							.when('/', {
								templateUrl: './pages/searchForecast.html',
								controller: 'searchController'
							})

							.when('/resultForecast', {
								templateUrl: './pages/resultForecast.html',
								controller: 'resultController'
							})

							.when('/resultForecast/:days', {
								templateUrl: "./pages/resultForecast.html",
								controller: 'resultController'
							})

						})

						.controller('searchController', function($scope, cityService){

							$scope.city = cityService.city;

							$scope.$watch('city', function(){
								cityService.city = $scope.city;
							});

						})

						.controller('resultController', function($scope, cityService, $routeParams, weatherAPIService){
							

							$scope.city = cityService.city;

							$scope.days = $routeParams.days || '5'

							$scope.weatherResult = weatherAPIService.getWeather($scope.city, $scope.days);

							$scope.toCelsius = function(klvin) {
								return Math.round(klvin - 273.15);
							}

							$scope.toDate = function(dateNum) {
								return new Date(dateNum*1000); //its in milisecond, so multiply by 1000
							}
							
						})

						.directive('weatherResult', function(){
							return {
								restrict: 'E',
								templateUrl: './directive/weatherResult.html',
								replace: true,
								scope: {
									weatherResult: "=",
									toCelsius: "&",
									toDate: "&",
									formatDate: "@",
									specificTime: "@"
								}
							}
						});

// http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=4e57b5e64064ea5cab3cb2b7e56449d0
