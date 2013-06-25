(function ($, document, window) {
	"use strict";

	var serverUrl = "http://kparikh.com:8080/user";


	$(document).ready(function() {
		$("#b-login").click(function() {
			var name = document.getElementById("#i-name");
			postLogin(name);
		});
	});

	//Shared functions
	var ajax = function(url, settings, callback) {
		$.ajax({
			type: "GET",
			url: url,
			dataType: "json",
			data: settings
		})
		.success( function(data) { 
			if(callback) {
				callback(data); 
			}
		});
	};


	var postLogin = function() {
		var loginInfo = {};
		var settings = {
			test : "testcrap"
		};

		ajax(serverUrl, settings, null );
		return;
	};

	var getGroups = function() {


	};

}(window.$, document, window));