(function ($, document, window, magic) {
	"use strict";

	$(function() {
		var ERROR_LOGIN = "Could not log in";
		var curScreen = "login";

		//	Bindings
		$('#b-login').click(function(){
			var loginStatus = verifyLogin();
			if(loginStatus === 1) {		//	Success logging in
				goTo("groups");
				return true;
			}							
			else {						//	Failed to log in
				displayError(ERROR_LOGIN);
				return false;
			}
		});

		//	Login to the app
		var verifyLogin = function() {
			var number = getMyNumber();
			var name = getMyName();
			return Number(magic.parseLogin(number, name));
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
		var goTo = function(page) {
			curScreen = page;

		};


	});


}(window.$, document, window, window.magic));