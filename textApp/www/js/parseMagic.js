window.magic = (function ($, document, window, Parse) {
    "use strict";

    var magic = {};

    //  Setup parse
    var parseAppId = "bGwXAzYa23yIkCfbpHMM6j2CD9iBfvJ1YBdVt9V5";
    var parseJavascriptId = "DrmyAyt0zDPOlcraBEGBs6wcgOJvQtfCf3DC67OW";
    Parse.initialize(parseAppId, parseJavascriptId);

    magic.isset = function (check) {
        var test = (typeof check !== 'undefined' && check !== null && check !== "");
        if (check instanceof Array) {
            test = test && (check.length > 0);
        }
        return test;
    };

    //  Verify login with parse
    magic.parseLogin = function (myNumber, myName, myContacts) {
        var UserTable = Parse.Object.extend("test2");
        var query = new Parse.Query(UserTable);
        var newUser = new UserTable();

        query.equalTo("number", "1234567890");
        return query.find().then(function (Table) {
            if (!magic.isset(Table)) {
                newUser.set("number", myNumber);
                newUser.set("name", myName);
                newUser.set("contacts", myContacts);
                newUser.set("groups", []);
                return newUser.save()
                    .then(function(){
                        return true;
                    });
            }
            else {
                return true;
            }
        });

        // return result;
    };

    /*
     *  Get my groups
     *  Returns: Array( Array(groupName, groupId) , ... )
     */
    magic.getMyGroups = function (myNumber) {
        
        var UserTable = Parse.Object.extend("test2");
        var query = new Parse.Query(UserTable);

        
        query .equalTo("number", myNumber);

        return query.find().then(function (Table){
            if(magic.isset(Table)){
                var table = Table[0];
                console.log(table._serverData.groups);
                return Table[0]._serverData.groups;
            }
            else
                return [];

        });

    };


    /*
     *  Get all of my friends who use the app
     *  Takes in:   List of all the numbers in my contact list
     *  Returns:    List of my friends numbers who use the app - Array( number1, number2, ...)
     */
    magic.getMyFriends = function (myNumber) {
        var finalList = [];
        var UserTable = Parse.Object.extend("test2");
        var query = new Parse.Query(UserTable);

        query.equalTo("number", myNumber);  //   Find myself

        query.find().then(function (Table){
            var listOfMyFriendsNumbers = Table[0]._serverData.contacts;
            if(listOfMyFriendsNumbers === 'undefined')
                return finalList;
            for(var i = 0; i < listOfMyFriendsNumbers.length; i++) {
                query.equalTo("number", listOfMyFriendsNumbers[i]);
                query.find().then(function (Table2){
                    if(magic.isset(Table2)) {
                        finalList.push(Table2[0]._serverData.number);
                    }
                });
            }
        });
        return finalList;
    };

    /*
     *  Binds together the group name, owners number,
     *      list of friends ids in the group, targets number,
     *      and the owners twilio number for this group
     *  Returns:    The group Id for this group
     */
    magic.bindGroup = function (groupName, myNumber, friendIds, targetNumber) {
        var twilioNumber = magic.getATwilioNumber();

        var groupId;
        return groupId;
    };

    /*
     *  Creates or gets a new twilio number
     *  Returns the twilio number to use
     */
    magic.getATwilioNumber = function () {

    };

    /*
     *  Sends a message to the group or target
     *  If target: Use the twilio number to message target, then send message to group
     *  If group: Only send message to the group
     *
     *  string sendType: "group"/"target"
     *  Return: true/false on success
     */
    magic.sendMessageTo = function (sendType, message, groupId) {
        if (sendType === 'target') {
            //  Send message to target
            //  Code here

            //  then send message to group...
            return magic.sendMessageTo('group', message, groupId);
        } else {
            //  Send message to group 
            //  Code here

            return true;
        }
        return false;
    };

    return magic;

}(window.$, document, window, window.Parse));
