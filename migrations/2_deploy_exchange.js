/*
 * original deployment
 */

//var Miduso = artifacts.require("./Miduso.sol");

//module.exports = function(deployer) {
//  deployer.deploy(Miduso, {gas: 4712388});
//};

/*
 * new deployment (cloned from Silverback)
 */
var Healthereum = artifacts.require("Healthereum");
var Miduso = artifacts.require("Miduso");

module.exports = function(deployer) {
  deployer.deploy(Healthereum, 1000000).then(function() {
      return deployer.deploy(Miduso, Healthereum.address, {gas: 2000000});
  });
};

