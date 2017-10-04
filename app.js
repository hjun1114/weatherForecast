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
						.controller('homeController', function($scope){

						})
						.controller('forecastController', function($scope){

						});
