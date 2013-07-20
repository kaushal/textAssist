(function ($, document, window, magic) {
	"use strict";

	$(function() {
		var ERROR_LOGIN = "Could not log in";
		var curPage = "loginPage";

		//	Login to the app
		var verifyLogin = function() {
			var number = getMyNumber();
			var name = getMyName();
			return Number(magic.parseLogin(number, name));
		};

		//	Queries phone to get my phone number
		var getMyNumber = function() {
			return "1234567890";
		};

		//	Gets the inputed user name from login screen
		var getMyName = function() {
			return $('#i-name').val();
		};

		var getTargetNumber = function() {
			return $('#targetNumber').val();
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

		//	Bind all of the click events
		var bindButtons = function() {
			//	Login button on Login Page
			$('#b-login').click(function(){
				var loginStatus = verifyLogin();
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

			//	Previous button on chat page
			$('#chatPrev').click(function() {
				curPage = "groupPage";
				goTo("groupPage");
				return;
			});

			//	Previous button on group page
			$('#groupNext').click(function() {
				curPage = "chatPage";
				goTo("chatPage");
				return;
			});

			//	Make button on group page
			$('#groupMake').click(function() {
				var number = getMyNumber();
				var name = getMyName();
				var target = getTarget();
				var groupMembers = getGroupMembers();
				var groupName = getGroupName();

				//magic.bindGroup(groupName, number, groupMembers, target);

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