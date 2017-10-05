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

						.controller('forecastController', function($scope, cityService){
							$scope.city = cityService.city;
						});

// http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=4e57b5e64064ea5cab3cb2b7e56449d0
