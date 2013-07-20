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
    magic.parseLogin = function (myNumber, myName) {
        //  Returns a promise with success or failure
        var userTable = Parse.Object.extend("Fuckers");
        var query = new Parse.Query(userTable);

        var newUser = new userTable();
        query.equalTo("number", "1234567890");

        query.find({
            success: function (Table) {
                if (!magic.isset(Table)) {
                    console.log(Table);
                    console.dir(query);
                    console.log("User not found");
                    newUser.set("number", myNumber);
                    newUser.set("name", myName);
                    newUser.save(null, {
                        success: function (newUser) {
                            newUser.save();

                        },
                        error: function(){
                            return false;      
                        }
                    });
                } else {
                    for (var i = 0; i < Table.length; i++) {
                        console.log(Table[i])
                    }
                    console.log(userTable);
                    console.log("success");
                }
                return true;
            },
            error: function (userTable) {
                return false;
            }

        });
        var promise;
        return promise;
    };

    /*
     *  Get my groups
     *  Returns: Array( Array(groupName, groupId) , ... )
     */
    magic.getMyGroups = function (myNumber) {

    };


    /*
     *  Get all of my friends who use the app
     *  Takes in:   List of all the numbers in my contact list
     *  Returns:    List of my friends numbers who use the app - Array( number1, number2, ...)
     */
    magic.getMyFriends = function (listOfMyFriendsNumbers) {

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
