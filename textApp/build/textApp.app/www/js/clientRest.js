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
			type: "POST",
			url: url,
			dataType: "jsonp",
			data: settings
		})
		.success( function(data) { 
			console.dir(data);
			if(callback) {
				callback(data); 
			}
		});
	};


	var postLogin = function(data) {
		var loginInfo = {};
		var settings = {
			name : data
		};

		ajax(serverUrl, settings, null );
		return;
	};

	var getGroups = function() {


	};

}(window.$, document, window));