var config = {
    apiKey: "AIzaSyAuM_9DKTYc0dky-rsgD3fg2zSBbhf6j_4",
    authDomain: "train-scheduler-6f621.firebaseapp.com",
    databaseURL: "https://train-scheduler-6f621.firebaseio.com",
    projectId: "train-scheduler-6f621",
    storageBucket: "train-scheduler-6f621.appspot.com",
    messagingSenderId: "239938085285"
  };

firebase.initializeApp(config);

var database = firebase.database();


// --------------------------------------------------------------

database.ref().on("child_added", function(childSnapshot) {

	var trainFreq = childSnapshot.val().frequencyInput;
	var firstTrain = childSnapshot.val().firstTrainInput;
  
	var timeArr = firstTrain.split(":");
	var trainTime = moment()
	  .hours(timeArr[0])
	  .minutes(timeArr[1]);
	
	var maxMoment = moment.max(moment(), trainTime);
	var trainMins;
	var trainArrival;
  
	
	if (maxMoment === trainTime) {
		trainArrival = trainTime.format("hh:mm A");
	  trainMins = trainTime.diff(moment(), "minutes");

	} else {
		
	  var diffTime = moment().diff(trainTime, "minutes");
	  var timeRem = diffTime % trainFreq;
	  

	  trainMins = trainFreq - timeRem;

	  console.log("freq" + trainFreq)
	  console.log("rem" + timeRem)
	
	  
	 
	  trainArrival = moment()
		.add(trainMins, "m")
		.format("hh:mm A");
		console.log(trainArrival);
		
	}


        $("#userInfo").append("<tr>" +
            "<td>" + childSnapshot.val().trainNameInput + "</td>" +
            "<td>" + childSnapshot.val().destinationInput + "</td>" +
            "<td>" + childSnapshot.val().frequencyInput + "</td>" +
            "<td>" + trainArrival + "</td>" +
            "<td>" + trainMins + "</td>" +
            + "</tr>"
            );

    //}


});


$("#submitButton").on("click", function (event) {
    event.preventDefault();

 
    var trainNameInput = $("#name").val().trim();
    var destinationInput = $("#destination").val().trim();
    var firstTrainInput = $("#firstTrain").val().trim();
    var frequencyInput = $("#frequency").val().trim();

    database.ref().push({
        trainNameInput: trainNameInput,
        destinationInput: destinationInput,
        firstTrainInput: firstTrainInput,
        frequencyInput: frequencyInput,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });


});