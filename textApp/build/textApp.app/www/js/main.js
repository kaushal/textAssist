(function ($, document, window, magic) {
	"use strict";

	$(function() {
		var ERROR_LOGIN = "Could not log in";

		//	Bindings

		//	Login to the app
		var login = function() {
			var number = getMyNumber();
			var name = getMyName();
			var loginStatus = Number(magic.parseLogin(number, name));
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


}(window.$, document, window, window.magic));