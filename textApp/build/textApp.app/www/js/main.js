(function ($, document, window, magic) {
	"use strict";

	$(function() {
		var ERROR_LOGIN = "Could not log in";
		var curPage = "loginPage";

		//	Queries phone to get my phone number
		var getMyNumber = function() {
			return "1234567890";
		};

		//	Gets the inputed user name from login screen
		var getMyName = function() {
			return $('#i-name').val();
		};

		//	Get the targets phone number
		var getTargetNumber = function() {
			return $('#targetNumber').val();
		};

		//	Get a list of contact phone numbers
		var getGroupMembers = function() {
			return magic.getMyFriends();
		};

		//	Get the group name
		var getGroupName = function() {
			return $('#groupName').val();
		};

		//	Get all of my phones contacts
		var getAllContacts = function() {

			// onSuccess: Get a snapshot of the current contacts
			var onSuccess = function(contacts) {
				window.console.log(JSON.stringify(contacts));
				for (var i = 0; i < contacts.length; i++) {
					console.log(contacts.length);
					var number = [];
					if( contacts[i].phoneNumbers && contacts[i].phoneNumbers.length > 0) {
						number[] = contacts[i].phoneNumbers[0].value;
					}
				}
			};

			// onError: Failed to get the contacts
			var onError = function(contactError) {
				window.console.log('onError!');
			};

			var options = new ContactFindOptions();
			options.filter = "";
			var fields = ["phoneNumbers", "displayName"];
			navigator.contacts.find(fields, onSuccess, onError, options);

		};

		//	Display error message
		var displayError = function(error) {
			$('#feedback').text(error);
		};

		//	Go to screen
		var goTo = function(page) {
			curPage = page;
			showPage(page);
		};

		//	Show the current page
		var showPage = function(page) {
			$('.page').hide();
			var pageId = '#'+page;
			$(pageId).show();
		};

		//	Populate contact list with friends who have the app
		var populateContactList = function() {
			var friends = magic.getMyFriends();
			$('#contactList').empty();
			for (var i = 0; i < friends.length; i++) {
				$('#contactList').append('<li><p>'+ friends[i] +'</p></li>');
			}
		};

		//	Bind all of the click events
		var bindButtons = function() {
			//	Login button on Login Page
			$('#b-login').click(function() {
				getAllContacts();
				var number = getMyNumber();
				var name = getMyName();
				magic.parseLogin(number, name)
					.then(function(loginStatus) {
						loginStatus = Number(loginStatus);
						if(loginStatus === 1) {		//	Success logging in
							//	Store my name
							goTo("groupPage");
							return true;
						}							
						else {						//	Failed to log in
							displayError(ERROR_LOGIN);
							return false;
						}
					});
			});

			//	Previous button on chat page
			$('#chatPrev').click(function() {
				curPage = "groupPage";
				goTo("groupPage");
				return;
			});

			//	Previous button on group page
			$('#groupNext').click(function() {
				curPage = "chatPage";

				if(curPage === "groupPage") {
					populateContactList();
				}

				goTo("chatPage");
				return;
			});

			//	Make button on group page
			$('#groupMake').click(function() {
				var number = getMyNumber();
				var name = getMyName();
				var target = getTargetNumber();
				var groupMembers = getGroupMembers();
				var groupName = getGroupName();

				magic.bindGroup(groupName, number, groupMembers, target);
				curPage = "chatPage";
				goTo("chatPage");
				return;
			});

		};


		//	Start the app
		bindButtons();
		showPage(curPage);
	});


}(window.$, document, window, window.magic));