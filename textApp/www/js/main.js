(function ($, document, window, Parse) {
	"use strict";

	$(function() {
		var appId = "bGwXAzYa23yIkCfbpHMM6j2CD9iBfvJ1YBdVt9V5";
		var javascriptId = "DrmyAyt0zDPOlcraBEGBs6wcgOJvQtfCf3DC67OW";

		var ERROR_LOGIN = "Could not log in";
		Parse.initialize(appId, javascriptId);


		var login = function() {
			var number = getMyNumber();
			var name = getMyName();
			var loginStatus = Number(parseLogin(number, name));
			if(loginStatus === 1) {		//	Success logging in
				goToLoginScreen();
				return;
			}							//	Failed to log in
			else {					
				displayError(ERROR_LOGIN);
				return;
			}
		};

		//	Queries phone to get my phone number
		var getMyNumber = function() {

		};

		//	Gets the inputed user name from login screen
		var getMyName = function() {
			return $('#i-name').val();
		};

		//	Display error message
		var displayError = function(error) {
			$('#feedback').text(error);
		};

		//	Go to the login screen
		var goToLoginScreen = function() {
			
		};


	});


}(window.$, document, window, window.Parse));