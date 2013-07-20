window.magic = (function ($, document, window, Parse) {
	"use strict";

	var magic = {};

	//	Setup parse
	var parseAppId = "bGwXAzYa23yIkCfbpHMM6j2CD9iBfvJ1YBdVt9V5";
	var parseJavascriptId = "DrmyAyt0zDPOlcraBEGBs6wcgOJvQtfCf3DC67OW";
	Parse.initialize(parseAppId, parseJavascriptId);

	//	Verify login with parse
	magic.parseLogin = function(myNumber, myName) {
		//	Returns a promise with success or failure
		var promise;
		return promise;
	};


	/*
	*	Get my groups
	*	Returns: Array(	Array(groupName, groupId) , ... )
	*/
	magic.getMyGroups = function(myNumber) {

	};


	/*
	*	Get all of my friends who use the app
	*	Takes in:	List of all the numbers in my contact list
	*	Returns:	List of my friends numbers who use the app - Array( number1, number2, ...)
	*/
	magic.getMyFriends = function(listOfMyFriendsNumbers) {

	};

	/*
	*	Binds together the group name, owners number,
	*		list of friends ids in the group, targets number, 
	*		and the owners twilio number for this group
	*	Returns:	The group Id for this group
	*/
	magic.bindGroup = function(groupName, myNumber, friendIds, targetNumber) {
		var twilioNumber = getATwilioNumber();

		var groupId;
		return groupId;
	};

	/*
	*	Creates or gets a new twilio number
	*	Returns the twilio number to use
	*/
	magic.getATwilioNumber = function() {

	};

	/*
	*	Sends a message to the group or target
	*	If target: Use the twilio number to message target, then send message to group
	*	If group: Only send message to the group
	*
	*	string sendType: "group"/"target"
	*	Return: true/false on success	
	*/
	magic.sendMessageTo = function(sendType, message, groupId) {
		if(sendType === 'target') {
			//	Send message to target
			//	Code here

			//	then send message to group...
			return magic.sendMessageTo('group', message, groupId);
		}
		else {
			//	Send message to group 
			//	Code here

			return true;
		}
		return false;
	};

	return magic;

}(window.$, document, window, window.Parse));