/*********************************************************************************
 *********************************************************************************
 *
 * Healthereum - Miduso Alpha release
 * Javascript Front-End
 *
 *********************************************************************************
 ********************************************************************************/

// Enforce JavaScript 1.8.5 (ECMAScript version 5
'use strict';


/*********************************************************************************
 *
 * Data - Functions
 *
 *********************************************************************************/

function hex2a(hex) {
  var str = '';
  for (var i = 0; i < hex.length; i += 2) {
    var v = parseInt(hex.substr(i, 2), 16);
    if (v) str += String.fromCharCode(v);
  }
  return str;
}


/*********************************************************************************
 *
 * Page Initialization
 *
 *********************************************************************************/

var Web3;             // web3 library
var web3;             // web3 provider
var contractInstance; // handle to contract

var statuses = {"0":"Pending" , "9":"Showed up" , "8":"Rescheduled" , "7":"Cancelled" , "6":"No show"};
 /*********************************************************************************
 *
 * Page Initialization
 *
 *********************************************************************************/

//get contract abstraction
 //import '../../build/contracts/Miduso.json';
        
$(document).ready(function () {

    // connect with provider
    Web3 = require('web3');
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  
    var coinbase = web3.eth.coinbase;
    document.getElementById('coinbase').innerText = coinbase;
  
    // get provider data
    var coinbaseBalanceETH = web3.fromWei(web3.eth.getBalance(web3.eth.coinbase));
    document.getElementById('coinbaseBalance').innerText = coinbaseBalanceETH;
  
    var blockNumber = web3.eth.blockNumber;
    document.getElementById('blockNumber').innerText = blockNumber;

    var MidusoAddress = '0x3cfbdb66ca6e15f1e12e4b01f45a3528cb99c109';
    document.getElementById('contractAddressString').innerText = MidusoAddress;
	var MidusoAbiString = '[{"constant":true,"inputs":[],"name":"getInitialPatientRewardHTH","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_patient","type":"address"},{"name":"_doctor","type":"address"},{"name":"_oldAppointmentDateTime","type":"uint256"},{"name":"_newAppointmentDateTime","type":"uint256"}],"name":"rescheduleAppointment","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractCreator","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getShowUpRewardHTH","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"patientRegistration","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"fundDoctorAccount","outputs":[],"payable":true,"type":"function"},{"constant":false,"inputs":[{"name":"_patient","type":"address"},{"name":"_doctor","type":"address"},{"name":"_appointmentDateTime","type":"uint256"}],"name":"scheduleAppointment","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_patient","type":"address"}],"name":"getPatientAppointments","outputs":[{"name":"doctor1","type":"address"},{"name":"timestamp1","type":"uint256"},{"name":"doctor2","type":"address"},{"name":"timestamp2","type":"uint256"},{"name":"doctor3","type":"address"},{"name":"timestamp3","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_doctorNPI","type":"uint256"}],"name":"doctorRegistration","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_patient","type":"address"},{"name":"_doctor","type":"address"},{"name":"_appointmentDateTime","type":"uint256"}],"name":"noShow","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getInitialDoctorRewardHTH","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getPenaltyAmountHTH","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_patient","type":"address"},{"name":"_doctor","type":"address"},{"name":"_appointmentDateTime","type":"uint256"}],"name":"cancelAppointment","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_patient","type":"address"},{"name":"_doctor","type":"address"},{"name":"_appointmentDateTime","type":"uint256"}],"name":"confirmAppointment","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_healthereumContract","type":"address"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_initialPatientRewardAmountHTH","type":"uint256"},{"indexed":false,"name":"_initialDoctorRewardAmountHTH","type":"uint256"},{"indexed":false,"name":"_showUprewardAmountHTH","type":"uint256"},{"indexed":false,"name":"_penaltyAmountHTH","type":"uint256"}],"name":"ContractCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_lastFunderAddress","type":"address"},{"indexed":false,"name":"_amountReceived","type":"uint256"},{"indexed":false,"name":"_balance","type":"uint256"}],"name":"FundsReceived","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_patient","type":"address"}],"name":"PatientRegistration","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_doctor","type":"address"}],"name":"DoctorRegistration","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_patient","type":"address"},{"indexed":false,"name":"_doctor","type":"address"},{"indexed":false,"name":"_appointmentDateTime","type":"uint256"}],"name":"ScheduleAppointment","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_patient","type":"address"},{"indexed":false,"name":"_doctor","type":"address"},{"indexed":false,"name":"_dateTime","type":"uint256"},{"indexed":false,"name":"_reward","type":"uint256"}],"name":"ConfirmAppointment","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_patient","type":"address"},{"indexed":false,"name":"_doctor","type":"address"},{"indexed":false,"name":"_dateTime","type":"uint256"}],"name":"CancelAppointment","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_patient","type":"address"},{"indexed":false,"name":"_doctor","type":"address"},{"indexed":false,"name":"_appointmentDateTime","type":"uint256"}],"name":"RescheduleAppointment","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_patient","type":"address"},{"indexed":false,"name":"_doctor","type":"address"},{"indexed":false,"name":"_dateTime","type":"uint256"}],"name":"NoShow","type":"event"}]';
    document.getElementById('contractAbiString').innerText = MidusoAbiString;
    
    var MidusoAbi = JSON.parse(MidusoAbiString);
    contractInstance = web3.eth.contract(MidusoAbi).at(MidusoAddress);

   // New API method:
   // var contractInstance = new web3.eth.Contract( MidusoAbi, MidusoAddress);


// var Miduso = web3.eth.contract(MidusoAbi);
// var contractInstance = MyContract.at(<address>);

    // get contract data
    var contractAddress = contractInstance.address;
    document.getElementById('contractAddressInstance').innerText = contractInstance.address;

    var contractAbiStringified = JSON.stringify(contractInstance.abi);
    document.getElementById('contractAbiInstance').innerText = contractAbiStringified;


/*********************************************************************************
 *
 * Contract Interaction - Calls
 *
 *********************************************************************************/

    //document.getElementById('contractBalanceInstanceReal').innerText = contractInstance.getBalance.getData().toString(10);
    var balance = contractInstance.getBalance.call();
    document.getElementById('contractBalanceInstanceReal').innerText = balance;

    var patientReward = contractInstance.getInitialPatientRewardHTH.call();
    document.getElementById('patientRewardHTH').innerText = patientReward;

    var doctorReward  = contractInstance.getInitialDoctorRewardHTH.call();
    document.getElementById('doctorRewardHTH').innerText = doctorReward;
 
    // just for debugging
    document.getElementById('lastCodeExecuted').innerText = 'contractInstance.getInitialDoctorRewardHTH.call();';    

    // Miduso.deployed().then(function (contractInstance) {
    //MidusoFrontEnd.updateFrontendData();
       // var v = contractInstance.getPatientAppointmentsTest.call(); // .then(function (v) {
       // 	console.log(v);
      // document.getElementById('candidate-name-0').innerText    = hex2a(v[0]);
      // document.getElementById('candidate-address-0').innerText = v[1];
      // document.getElementById('candidate-votes-0').innerText   = v[2];
      // document.getElementById('candidate-name-1').innerText    = hex2a(v[3]);
      // document.getElementById('candidate-address-1').innerText = v[4];
      // document.getElementById('candidate-votes-1').innerText   = v[5];
      // document.getElementById('candidate-name-2').innerText    = hex2a(v[6]);
      // document.getElementById('candidate-address-2').innerText = v[7];
      // document.getElementById('candidate-votes-2').innerText   = v[8];
      // document.getElementById('candidate-name-3').innerText    = hex2a(v[9]);
      // document.getElementById('candidate-address-3').innerText = v[10];
      // document.getElementById('candidate-votes-3').innerText   = v[11];
     // });
      //});

    // Log contract events  
     // Miduso.deployed().then(function(contractInstance) {
       var events = contractInstance.allEvents({fromBlock: 0, toBlock: 'latest'});
       console.log(events);
       events.get((error, logs) => {
          // we have the logs, now print them
           logs.forEach(log => console.log(log.args));
         });
     //  });
 
  });

  
/*********************************************************************************
 *
 * Contract Interaction - Transactions
 *
 *********************************************************************************/

window.MidusoFrontEnd = {

  setStatus: function(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
  },

  scheduleAppointment : function(_patient, _doctor, _appointmentDateTime) {
    var patientAddress      = document.getElementById("patientInput");
    var doctorAddress       = document.getElementById("doctorInput");
    var appointmentDateTime = document.getElementById("timeStampInput");
    console.log("appointment data: " + patientAddress.value +" "+ doctorAddress.value +" "+ appointmentDateTime.value);
    contractInstance.scheduleAppointment.sendTransaction(patientAddress.value,
                                                         doctorAddress.value,
                                                         appointmentDateTime.value,
                                                         {gas:500000, from:web3.eth.accounts[0]});
  },

  confirmAppointment : function(_patient, _doctor, _appointmentDateTime) {
    var patientAddress      = document.getElementById("patientInput");
    var doctorAddress       = document.getElementById("doctorInput");
    var appointmentDateTime = document.getElementById("timeStampInput");
    console.log("appointment data: " + patientAddress.value +" "+ doctorAddress.value +" "+ appointmentDateTime.value);
    contractInstance.confirmAppointment.sendTransaction(patientAddress.value,
                                                        doctorAddress.value,
                                                        appointmentDateTime.value,
                                                        {gas:500000, from:web3.eth.accounts[0]});
  },

  rescheduleAppointment : function(_patient, _doctor, _OldAppointmentDateTime, _NewAppointmentDateTime) {
    var patientAddress         = document.getElementById("patientInput");
    var doctorAddress          = document.getElementById("doctorInput");
    var oldAppointmentDateTime = document.getElementById("timeStampInput");
    var newAppointmentDateTime = document.getElementById("newTimeStampInput");
    console.log("appointment data: " + patientAddress.value +" "+ doctorAddress.value +" "+ newAppointmentDateTime.value);
    contractInstance.rescheduleAppointment.sendTransaction(patientAddress.value,
                                                           doctorAddress.value,
                                                           oldAppointmentDateTime.value,
                                                           newAppointmentDateTime.value,
                                                           {gas:500000, from:web3.eth.accounts[0]});
  },

  cancelAppointment : function(_patient, _doctor, _appointmentDateTime) {
    var patientAddress      = document.getElementById("patientInput");
    var doctorAddress       = document.getElementById("doctorInput");
    var appointmentDateTime = document.getElementById("timeStampInput");
    console.log("appointment data: " + patientAddress.value +" "+ doctorAddress.value +" "+ appointmentDateTime.value);
    contractInstance.cancelAppointment.sendTransaction(patientAddress.value,
                                                       doctorAddress.value,
                                                       appointmentDateTime.value,
                                                       {gas:500000, from:web3.eth.accounts[0]});
  },

  noShow : function(_patient, _doctor, _appointmentDateTime) {
    var patientAddress      = document.getElementById("patientInput");
    var doctorAddress       = document.getElementById("doctorInput");
    var appointmentDateTime = document.getElementById("timeStampInput");
    console.log("appointment data: " + patientAddress.value +" "+ doctorAddress.value +" "+ appointmentDateTime.value);
    contractInstance.noShow.sendTransaction(patientAddress.value,
                                            doctorAddress.value,
                                            appointmentDateTime.value,
                                            {gas:500000, from:web3.eth.accounts[0]});
  },

  getPatientAppointments : function() {
  	var patientAddress      = document.getElementById("patientInput");
	  var v = contractInstance.getPatientAppointments.call(patientAddress.value);
		      console.log("Patient appointments for " + patientAddress.value + ":");
      	  console.log(v);
    //   	var a = [0,1,2,3];
     //  	a.forEach(function ( item , i ) {
      if ( v[1] > 0 ) {
      		document.getElementById('appointment-doctor-0' ).innerText    = v[0];
      		document.getElementById('appointment-date-0' ).innerText = v[1];
      		//document.getElementById('appointment-status-0' ).innerText   = statuses[v[2]];
          } else {
            document.getElementById('appointment-doctor-0' ).innerText    = "";
            document.getElementById('appointment-date-0' ).innerText = "";
            }

      if ( v[2] > 0 ) {
          document.getElementById('appointment-doctor-1' ).innerText    = v[2];
          document.getElementById('appointment-date-1' ).innerText = v[3];
          //document.getElementById('appointment-status-1' ).innerText   = statuses[v[5]];
          } else {
            document.getElementById('appointment-doctor-1' ).innerText    = "";
            document.getElementById('appointment-date-1' ).innerText = "";
            }
      if ( v[4] > 0 ) {
          document.getElementById('appointment-doctor-2' ).innerText    = v[4];
          document.getElementById('appointment-date-2' ).innerText = v[5];
          //document.getElementById('appointment-status-2' ).innerText   = statuses[v[8]];
          } else {
            document.getElementById('appointment-doctor-2' ).innerText    = "";
            document.getElementById('appointment-date-2' ).innerText = "";
            }


  }
}


/*********************************************************************************
 *
 * end of source
 *
 ********************************************************************************/


