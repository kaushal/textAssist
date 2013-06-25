(function (document, window) {
	"use strict";

	var serverUrl = "http://kparikh:8080/user";


	$(document).ready(function() {
		$("#b-login").click(function() {
			var name = document.getElementById("i-name");
			postLogin(name);
		});
	});

	var loadXMLDoc = function(sendData)
	{
		"use strict";
		var xmlhttp;
		if (window.XMLHttpRequest)
		{// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp = new XMLHttpRequest();
		}
		else
		{// code for IE6, IE5
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange=function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
			{
				alert(xmlhttp.responseText);
			}
		}
		xmlhttp.open("POST",serverUrl,true);
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xmlhttp.send(sendData);
	};


	var postLogin = function() {
		var loginInfo = {};
		loginInfo.name="Test";

		var info = JSON.stringify(loginInfo);
		loadXMLDoc("info="+info);
		return;
	};

	var getGroups = function() {


	};

}(document, window));