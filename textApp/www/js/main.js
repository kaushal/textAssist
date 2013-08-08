(function ($, document, window, magic) {
	"use strict";

	$(function() {
		var ERROR_LOGIN = "Could not log in";
		var curPage = "loginPage";
		var curGroupId = null;

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

		//	Get a list of all of my friends who use the app
		var getFriends = function() {
			var myNumber = getMyNumber();
			return magic.getMyFriends(myNumber)
				.then(function(friends) {
					return friends;
				});
		};

		//	Get a list of selected contact phone numbers selected to form group
		var getSelectedFriends = function() {
			var friends = [];
			$('#contactList input:checkbox').each(function () {
				if(this.checked) {
					friends.push($(this).val());
				}
			});
			return friends;
		};

		//	Get the group name
		var getGroupName = function() {
			return $('#groupName').val();
		};

		//	Get all of my phones contacts
		var getContactsAndLogin = function(number, name) {
			// onSuccess: Get a snapshot of the current contacts
			var onSuccess = function(contacts) {
				var numbers = [];
				for (var i = 0; i < contacts.length; i++) {
					if( contacts[i].phoneNumbers && contacts[i].phoneNumbers.length > 0) {
						numbers[i] = contacts[i].phoneNumbers[0].value;
					}
				}
				numbers = ["1234567891","(222) 333-4444"];	//	Fake it
				magic.parseLogin(number, name, numbers)
					.then(function(loginStatus) {
						loginStatus = Number(loginStatus);
						if(loginStatus === 1) {		//	Success logging in
							goTo("groupPage");
							return true;
						}							
						else {						//	Failed to log in
							displayError(ERROR_LOGIN);
							return false;
						}
				});
			};

			var onError = function() {
				window.console.log("error");
				return false;
			};

			var options = new ContactFindOptions();
			options.filter = "";
			var fields = ["phoneNumbers"];
			onSuccess([]);
			//navigator.contacts.find(fields, onSuccess, onError, options);

		};

		//	Display error message
		var displayError = function(error) {
			$('#feedback').text(error);
		};

		//	Go to screen
		var goTo = function(page) {
			curPage = page;
			if(curPage === "groupPage") {
				populateGroupsList();
			}
			else if(curPage === "makeGroupPage") {
				populateContactList();
			}
			else if(curPage === "groupChatPage") {
				// populateMessages();
			}
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
			var myNumber = getMyNumber();
			magic.getMyFriends(myNumber)
				.then(function(friendsObj) {
					if(!magic.isset(friendsObj)) {
						return;
					}
					var friends = friendsObj[0];
					$('#contactList').empty();
					for (var i = 0; i < friends.length; i++) {
						var friendsNumber = friends[i];
						var newLi = '<li>'+"<input class='listCheckbox' type='checkbox' name='selectedFriends' value='"+ friendsNumber +"'>"+'<p>'+friendsNumber+'</p>'+'</li>';
						$('#contactList').append(newLi);
					}
				});
		};

		//	Populate group list with all your groups
		var populateGroupsList = function() {
			var myNumber = getMyNumber();
			magic.getMyGroups(myNumber).then(function(groups) {
				$('#groupList').empty();
				for (var i = 0; i < groups.length; i++) {
					var groupId = groups[i];
					$('#groupList').append("<li class='groupListItem' id='"+ groupId +"'><a>" + groupId + "<span class='chevron'></span></a></li>");
					$('.groupListItem').click(function() {
						var groupId = this.id;
						curPage = "groupChatPage";
						curGroupId = groupId;
						goTo("groupChatPage");
					});
				}
			});
		};

		//	Poll for chat data
		var pollForChatData = function() {
			var groupMessages = magic.getGroupMessages();
			var targetMessages = magic.getTargetMessages();

			

		};

		//	Bind all of the click events
		var bindButtons = function() {
			//	Login button on Login Page
			$('#b-login').click(function() {
				var number = getMyNumber();
				var name = getMyName();
				getContactsAndLogin(number, name);
			});

			//	Previous button on group chat page
			$('#groupChatPrev').click(function() {
				curPage = "groupPage";
				goTo("groupPage");
				return;
			});

			//	Previous button on target chat page
			$('#targetChatPrev').click(function() {
				curPage = "groupPage";
				goTo("groupPage");
				return;
			});

			//	Previous button on group page
			$('#groupNext').click(function() {
				curPage = "groupChatPage";
				goTo("groupChatPage");
				return;
			});

			//	Next button on make group page
			$('#makeGroupNext').click(function() {
				curPage = "groupChatPage";
				goTo("groupChatPage");
				return;
			});

			//	Go to make group tab in groups
			$('#makeGroupGo').click(function() {
				curPage = "makeGroupPage";
				goTo("makeGroupPage");
				return;
			});

			//	Go to group tab in groups
			$('#groupGo').click(function() {
				curPage = "groupPage";
				goTo("groupPage");
				return;
			});

			//	Go to group chat tab in Chats
			$('#groupChatGo').click(function() {
				curPage = "groupChatPage";
				goTo("groupChatPage");
				return;
			});

			//	Go to group tab in groups
			$('#targetChatGo').click(function() {
				curPage = "targetChatPage";
				goTo("targetChatPage");
				return;
			});

			//	Make button on group page
			$('#groupMake').click(function() {
				var number = getMyNumber();
				var name = getMyName();
				var target = getTargetNumber();
				var groupName = getGroupName();
				var groupMembers = getSelectedFriends();
				magic.bindGroup(groupName, number, groupMembers, target);
				curPage = "groupChatPage";
				goTo("groupChatPage");
				return;
			});

			//	Send a message to the group
			$('#groupChatSend').click(function() {
				var myNumber = getMyNumber();
				var message = $('#groupChatMessages').val();
				var groupId = curGroupId;
				if(!magic.isset(message) || !magic.isset(myNumber) || !magic.isset(groupId)) {
					return;
				}
				magic.sendMessageTo("group", myNumber, message, groupId);
			});
			//	Send a message to the target
			$('#targetChatSend').click(function() {
				var myNumber = getMyNumber();
				var message = $('#targetChatMessages').val();
				var groupId = curGroupId;
				if(!magic.isset(message) || !magic.isset(myNumber) || !magic.isset(groupId)) {
					return;
				}
				magic.sendMessageTo("target", myNumber, message, groupId);
				
			});

		};


		//	Start the app
		bindButtons();
		showPage(curPage);
	});


}(window.$, document, window, window.magic));