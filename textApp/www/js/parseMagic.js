(function ($, document, window, Parse) {
	"use strict";

	$(function() {
		//	Verify login with parse
		var parseLogin = function(myNumber, myName) {
			//	Returns a promise with success or failure
			var promise;
			return promise;
		};


		/*
		*	Get my groups
		*	Returns: Array(	Array(groupName, groupId) , ... )
		*/
		var getMyGroups = function(myNumber) {

		};


		/*
		*	Get all of my friends who use the app
		*	Takes in:	List of all the numbers in my contact list
		*	Returns:	List of my friends numbers who use the app - Array( number1, number2, ...)
		*/
		var getMyFriends = function(listOfMyFriendsNumbers) {

		};

		/*
		*	Binds together the group name, owners number,
		*		list of friends ids in the group, targets number, 
		*		and the owners twilio number for this group
		*	Returns:	The group Id for this group
		*/
		var bindGroup = function(groupName, myNumber, friendIds, targetNumber) {
			var twilioNumber = getATwilioNumber();

			var groupId;
			return groupId;
		};

		/*
		*	Creates or gets a new twilio number
		*	Returns the twilio number to use
		*/
		var getATwilioNumber = function() {

		};

		/*
		*	Sends a message to the group or target
		*	If target: Use the twilio number to message target, then send message to group
		*	If group: Only send message to the group
		*
		*	string sendType: "group"/"target"
		*	Return: true/false on success	
		*/
		var sendMessageTo = function(sendType, message, groupId) {
			if(sendType === 'target') {
				//	Send message to target
				//	Code here

				//	then send message to group...
				return sendMessageTo('group', message, groupId);
			}
			else {
				//	Send message to group 
				//	Code here

				return true;
			}
			return false;
		};

	});


}(window.$, document, window, window.Parse));