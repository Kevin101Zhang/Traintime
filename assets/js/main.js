//Initialize Firebase
var config = {
    apiKey: "AIzaSyDqarUHPHMKM3Megflg4nVgQ-p3wpLT2Yo",
    authDomain: "traintime-9b0db.firebaseapp.com",
    databaseURL: "https://traintime-9b0db.firebaseio.com",
    projectId: "traintime-9b0db",
    storageBucket: "traintime-9b0db.appspot.com",
    messagingSenderId: "796285759353"
};
firebase.initializeApp(config);

var database = firebase.database();
var Tref = database.ref('Railroad');
database.ref().on("value", function (snapshot) {
    // console.log(snapshot);
    // console.log(snapshot.val().Railroad);

    // database.ref("Railroad").set({
    //     1: {
    //         Train: 'Long-Island-Railroad',
    //         Destination: 'Penn Station',
    //         Frequency: 4,
    //         Time: '5:00',
    //     }, 2: {
    //         Train: 'Amktrak',
    //         Destination: 'Babylon',
    //         Frequency: 3,
    //         Time: '6:15',
    //     }, 3: {
    //         Train: 'Acela',
    //         Destination: 'Long Island',
    //         Frequency: 2,
    //         Time: '12:45',
    //     }, 4: {
    //         Train: 'Spencer',
    //         Destination: 'Astoria',
    //         Frequency: 9999,
    //         Time: '3:30',
    //     },
    // });

    const trainData = snapshot.val().Railroad;

    Object.keys(trainData).forEach(function (key) {

        $("#PutTrainName").prepend('<p>' + trainData[key]['Train'] + '</p><hr>');
        $("#PutTrainDestination").prepend('<p>' + trainData[key]['Destination'] + '</p><hr>');
        $("#PutTrainFrequency").prepend('<p>' + trainData[key]['Frequency'] + '</p><hr>');
        $("#PutTrainTime").prepend('<p>' + trainData[key]['Time'] + '</p><hr>');

        // Live Time Converted to Mins
        var realCurrentTimeHours = parseInt((moment().format('H') * 60));
        var realCurrentTimeMins = parseInt((moment().format('mm')));

        var totalMins = realCurrentTimeHours + realCurrentTimeMins;


        // Train Time Converted to Mins
        var Traintime = trainData[key]['Time'];
        TraintimeHours = parseInt(Traintime);
        TraintimeMins = TraintimeHours * 60;
        
        //Mins Leftover For Train to Arrive
        var MinsLeftOver = Math.abs(TraintimeMins - totalMins);
        console.log(MinsLeftOver);

        // Converting Back to Mins and Hours
        var HoursLeft = Math.round(MinsLeftOver / 60);
        var MinsLeft = 60 - (MinsLeftOver % 60);

        // Time LeftOver
        $("#PutNextTrainTime").prepend('<p>' + HoursLeft + ':' + MinsLeft + '</p><hr>');
    });

    $("#submitTrain").on("click", function () {
        event.preventDefault();

        var trainName = $("#Train-Name").val().trim();
        var trainDestination = $("#Train-Destination").val().trim();
        var trainFrequency = $("#Train-Frequency").val();
        var trainTime = $("#Train-Time").val().trim();

        var NewData = {
            'Train': trainName,
            'Destination': trainDestination,
            'Frequency': trainFrequency,
            'Time': trainTime,
        }
        $("#PutTrainName").empty();
        $("#PutTrainDestination").empty();
        $("#PutTrainFrequency").empty();
        $("#PutTrainTime").empty();
        $("#PutNextTrainTime").empty();
        Tref.push(NewData);
    });

    //lets do moment.js
    function updateTime() {
        $('#clock').html(moment().format('D. MMMM YYYY H:mm:ss'));
    }
    setInterval(updateTime, 1000);

});


