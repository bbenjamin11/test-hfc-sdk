/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require("express");

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require("cfenv");

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + "/public"));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, "0.0.0.0", function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});



////////////////////////////////////////////////////////

var hfc = require("hfc");
var fs = require("fs");
//var config = JSON.parse(fs.readFileSync(__dirname + "/config.json", "utf8"));

console.log("0000000000000000000000000000");
console.log("-_-_-_-_-_-_-_-_-_-_-_-_-_-_");
console.log("-_-_-_-_-_-_-_-_-_-_-_-_-_-_");

var chain = hfc.newChain("94b82bfc9b1eced38a9a3f489fcbc6735cdc27d83ba09edac0d941a5b22b7820f92868e2a4b81cd7d59504565b8d650afa1b974f5819f7eb1b99a9e9e03e44e3");
chain.setECDSAModeForGRPC(true);
//var certPath = __dirname + "/certificate.pem";

//var network = JSON.parse(fs.readFileSync(__dirname + '/configBcDev0-1.json', 'utf8'));

console.log("1111111111111111111111111111");
console.log("-_-_-_-_-_-_-_-_-_-_-_-_-_-_");
console.log("-_-_-_-_-_-_-_-_-_-_-_-_-_-_");

chain.setKeyValStore( hfc.newFileKeyValStore(__dirname + "/keyValStore-") );

// Set the URL for member services
chain.setMemberServicesUrl("grpc://39c3c57244b2494384cc719a33522255-ca.us.blockchain.ibm.com:30003");

// Add a peer's URL
chain.addPeer("grpc://39c3c57244b2494384cc719a33522255-vp0.us.blockchain.ibm.com:5003");

// Enroll "WebAppAdmin" which is already registered because it is
// listed in fabric/membersrvc/membersrvc.yaml with it's one time password.
chain.enroll("WebAppAdmin2", "011599709b", function(err, webAppAdmin) {
	if (err) {
		console.log("ERROR: failed to register %s: %s",err);
		return null;
	}
	// Set this user as the chain's registrar which is authorized to register other users.
	console.log("webAppAdmim : ", webAppAdmin);
	chain.setRegistrar(webAppAdmin);
	// Begin listening for web app requests
	//  listenForUserRequests();
});


