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

    console.log("Received a new text: " + request.params.From);
    response.success();
});


//the following will serve as an endpoint to send a text message to twillio via post request

 
// Create the Cloud Function
Parse.Cloud.define("sendMessage", function(request, response) {
  // Use the Twilio Cloud Module to send an SMS
  var GroupObject = Parse.Object.extend('Groups');
  var query = new Parse.Query(LocationObject);

  query.equalTo('target', request.params.number);
  

  twilio.sendSMS({
    From: "7324973029",
    To: request.params.number,
    Body: request.params.body
  }, {
    success: function(httpResponse) { response.success("SMS sent!"); },
    error: function(httpResponse) { response.error("Uh oh, something went wrong"); }
  });
});
