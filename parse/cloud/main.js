
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

Parse.Cloud.define("receiveSMS", function(request, response) {
      console.log("Received a new text: " + request.params.From);
        response.success();
});
