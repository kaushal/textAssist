//twilio authentication
var twilio = require("twilio");
twilio.initialize("AC27ee1c3ad33b5a65196df1be692516ac","e597e20b27bdc19f0348ddfa46351caf");

//
var broNumbers = ["3474175102", "7324973029"];

// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
    response.success("Hello world!");
});

//endpoing to recieve text messages to twillio

/*
   Basic outline of the algorithm
   You will have n broNumbers stored in an array above^^
   These are the numbers that you could potentially text the girl from.
   When you initiate the conversation, you are randomly assigned one based
   on whether or not the girl exists in the database, and is already texting one of these numbers.
   */
Parse.Cloud.define("receiveSMS", function(request, response) {


    var GroupTable = Parse.Object.extend("Groups");
    var query = new Parse.Query(GroupTable);

    var targetParam = request.params.From.toString().substr(2);
    query.equalTo("target", "9084202938");          //  Found my group    
    console.log("test");
    console.log(targetParam);



    query.first({
         success: function(Row) {
            if(Row) {

                console.log('here2');
                var messages = Row.toJSON().targetChat;    //  Messages for that group
                var newMessage = request.params.Body;
                var currentMessage = targetParam + ": " + newMessage;
                messages.push(currentMessage);

                console.log('here3');
                Row.set("targetChat", messages);
                Row.save();
            }
         },
         error: function(object, error) {
            console.log("error bitch")
            console.log(error);
             // The object was not retrieved successfully.
             // error is a Parse.Error with an error code and description.
         }
     });

    console.log('here');
    console.log(request.params.Body);
    console.log("Received a new text: " + request.params.From);
});


//the following will serve as an endpoint to send a text message to twillio via post request


// Create the Cloud Function
Parse.Cloud.define("sendMessage", function(request, response) {
    // Use the Twilio Cloud Module to send an SMS
    var GroupObject = Parse.Object.extend('Groups');


    twilio.sendSMS({
        From: "7324973029",
        To: request.params.number,
        Body: request.params.body
    }, {
        success: function(httpResponse) { response.success("SMS sent!"); },
        error: function(httpResponse) { response.error("Uh oh, something went wrong"); }
    });
});
