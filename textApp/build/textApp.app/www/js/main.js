(function ($, document, window, Parse) {
	"use strict";

	$(function() {
		var appId = "bGwXAzYa23yIkCfbpHMM6j2CD9iBfvJ1YBdVt9V5";
		var javascriptId = "DrmyAyt0zDPOlcraBEGBs6wcgOJvQtfCf3DC67OW";
		Parse.initialize(appId, javascriptId);


		var login = function() {
			var number = getMyNumber();
			var name = getMyName();
		};

		//	Queries phone to get my phone number
		var getMyNumber = function() {

		};

		//	Gets the inputed user name from login screen
		var getMyName = function() {
			return $('#i-name').val();
		};


	});


}(window.$, document, window, window.Parse));