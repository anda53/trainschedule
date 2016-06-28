
  // Initialize Firebase
     var config = {
    apiKey: "AIzaSyCwYSf4kRPgNo7Rd2xW0cP4eQ6OCmBHgUg",
    authDomain: "train-schedule-d44d9.firebaseapp.com",
    databaseURL: "https://train-schedule-d44d9.firebaseio.com",
    storageBucket: "train-schedule-d44d9.appspot.com",
  };
  firebase.initializeApp(config);
  // Pseudocode
  //make a variable that references the database

  var db = firebase.database();

  //set your initial values for the form to empty

  var trainName = "";
  var destination = "";
  var firstTrainTime = "";
  var frequency = "";


    //capture the input values from the form on a click event and put value into 

    $('#addTrain').on("click", function(){
        trainName = $("#trainNameInput").val().trim();
        destination = $("#destinationInput").val().trim();
        firstTrainTime = $("#firstTrainTimeInput").val().trim();
        frequency = $("#frequencyInput").val().trim();


           //assign each input val of addTrain to the firebase temp variables (like temp folders/the yellow ones are Friebase side names)
       var newTrain = {
          trainName: trainName,
          destination: destination,
          firstTrainTime: firstTrainTime,
          frequency : frequency

       }

          //send those values to firebase database

        db.ref().push(newTrain);

        //log everything to console
        // console.log(newTrain.trainName);
        // console.log(newTrain.destination);
        // console.log(newTrain.firstTrainTime);
        // console.log(newTrain.frequency);



      //alert
       alert("employee successfully added");
       
        $("#trainNameInput").val('');
        $("#destinationInput").val('');
        $("#firstTrainTimeInput").val('');
        $("#frequencyInput").val('');      

        return false;

    })


  ////retrieve those values from firebase

  db.ref().on('child_added', function(snapShot){
      console.log(snapShot.val().trainName);
      console.log(snapShot.val().destination);
      console.log(snapShot.val().firstTrainTime);
      console.log(snapShot.val().frequency);

        //Current time
        var currentTime = moment().format('hh:mm');
      
        //freauency
        var tFrequency = $('#frequencyInput').val();
     

        var firstTime = $('#firstTrainTimeInput').val();
         console.log('firstTime' + firstTime);

        var firstTimeConverted= moment(firstTime, "hh:mm").subtract(1, "years");

            //difference between current time and first train time
        var diffTime = moment().diff(moment(firstTimeConverted), 'minutes');


        var tRemainder = diffTime % tFrequency;
    

        var tMinutesTilTrain = tFrequency - tRemainder;
   

        var nextTrainTime = moment().add(tMinutesTilTrain, 'minutes'); 

        var nextTrainTimeConverted = (nextTrainTime).format('HH:mm');


        console.log("current Time:" + currentTime);
        console.log('time of next train converted: ' + nextTrainTimeConverted);
        console.log("tFrequency" + tFrequency);
        console.log("firstTime Converted" + firstTimeConverted);
        console.log('difference in time' + diffTime);
        console.log('tRemainder' + tRemainder);
        console.log('minutes til train' + tMinutesTilTrain);


  
    //append it to the page
    $("#trainSchedTable").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>"+ nextTrainTimeConverted + "</td><td>" + tMinutesTilTrain + "</td></tr>");



 })


