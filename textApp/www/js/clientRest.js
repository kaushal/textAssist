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
			dataType: "json",
			data: settings,
			contentType: "application/json"
		})
		.success( function(data) { 
			console.dir(data);
			if(callback) {
				callback(data); 
			}
		});
	};


	var postLogin = function() {
		var loginInfo = {};
		var settings = {
			test : "testcraseeeep"
		};

		ajax(serverUrl, settings, null );
		return;
	};

	var getGroups = function() {


	};

}(window.$, document, window));