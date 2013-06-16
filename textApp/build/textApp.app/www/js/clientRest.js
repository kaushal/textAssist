var serverUrl = "http://174.129.246.126:8080/user";

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
	xmlhttp.onreadystatechange=function() 
	{
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
	"use strict";
	var loginInfo = new Object();
	loginInfo.name="Test";

	var info = JSON.stringify(loginInfo);
	loadXMLDoc("info="+info);
	return;
};