weatherApp.service('cityService', function(){

	this.city = "Montreal, QC";

});

// Use of service here is to bind the city variable with a singleton object: cityService. 
// when you want to change multiple data at once, you need to understand this concept. 

weatherApp.service('weatherAPIService', function($resource){

	this.getWeather = function(city, days){

		var weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=4e57b5e64064ea5cab3cb2b7e56449d0", 
		{
			callback: "JSON_CALLBACK"
		},
		{
			get: {method: "JSONP"}
		});
		// resource services makes it easier for us to go out and get data.
		// basically wraps up the http service 

		return weatherAPI.get({ q: city, cnt: days });
		// call the api and save it in a scope variable with some options.
	}
	
});
