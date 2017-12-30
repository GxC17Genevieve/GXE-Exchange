// Stuff normally present in JavaScript
// but needing to be declared here
require('console');

// contract to test
var Miduso = artifacts.require("./Miduso.sol");

// test
contract('Miduso', function(accounts) {
	it("should do a prize drawing", function() {

                // data - contract instance
		var Miduso;

                // data - accounts to use
		var account_0 = accounts[0];
		var account_1 = accounts[1];
		var account_2 = accounts[2];
		var account_3 = accounts[3];

                console.log(" ");
                console.log(" Accounts being used :");
                console.log(" -- Account 0 : " + accounts[0]);
                console.log(" -- Account 1 : " + accounts[1]);
                console.log(" -- Account 2 : " + accounts[2]);
                console.log(" -- Account 3 : " + accounts[3]);
                console.log(" ");

                // get contract instance
		return Miduso.deployed().then(function(instance) {
			Miduso = instance;

                // test account 0
                console.log(" ");

			return Miduso.enter.call(account_0);
		}).then(function(returnCode) {
			console.log(" -- enter 0 -- " + account_0 + " " + returnCode);
			assert(returnCode, true, "Should enter: account 0 " + account_0);

			return Miduso.isPresent.call(account_0);
		}).then(function(returnCode) {
			console.log(" -- isPresent 0 -- " + account_0 + " " + returnCode);
			assert(returnCode, true, "Should be present: account 0 " + account_0);

			return Miduso.isEntered.call(account_0);
		}).then(function(returnCode) {
			console.log(" -- isEntered 0 -- " + account_0 + " " + returnCode);
			assert(returnCode, true, "Should be entered: account 0 " + account_0);

			return Miduso.enter.call(account_0);
		}).then(function(returnCode) {
			console.log(" -- Enter 0 -- " + account_0 + " " + returnCode);
			assert(returnCode, true, "Should enter: account 0 " + account_0);

			return;
		});
	});
});

