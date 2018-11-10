//Initialize Firebase
console.log("hello");
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
var ref = database.ref('Railroad');

var initialData = {
    'Train Name': ['Long Island Railroad', "Amtrak", "Trainer"],
    'Train Destination': ['Penn Station', "New Jersey", "Babylon"],
    'Train Frequency': [4, 2, 3],
    'Train Time': ['12:00', '7:00', '4:30'],
    'Train Next Time': ['null', 'null', 'null']
}
ref.remove();
ref.push(initialData);
PutDataInDom();

function PutDataInDom() {
    for (var i = 0; i < initialData["Train Name"].length; i++) {
        $("#PutTrainName").prepend('<p>' + initialData["Train Name"][i] + '</p><hr>');
        $("#PutTrainDestination").prepend('<p>' + initialData["Train Destination"][i] + '</p><hr>');
        $("#PutTrainFrequency").prepend('<p>' + initialData["Train Frequency"][i] + '</p><hr>');
        $("#PutTrainTime").prepend('<p>' + initialData["Train Time"][i] + '</p><hr>');
        $("#PutNextTrainTime").prepend('<p>' + initialData["Train Next Time"][i] + '</p><hr>')
    }
}
//now be able to add new data into firebase and put in DOM on submit

$("#submitTrain").on("click", function () {
    event.preventDefault();

    var trainName = $("#Train-Name").val().trim();
    var trainDestination = $("#Train-Destination").val().trim();
    var trainFrequency = $("#Train-Frequency").val();
    var trainTime = $("#Train-Time").val().trim();

    initialData["Train Name"].push(trainName);
    initialData["Train Destination"].push(trainDestination);
    initialData["Train Frequency"].push(trainFrequency);
    initialData["Train Time"].push(trainTime);

    ref.remove();
    ref.push(initialData);
    $("#PutTrainName").empty();
    $("#PutTrainDestination").empty();
    $("#PutTrainFrequency").empty();
    $("#PutTrainTime").empty();
    $("#PutNextTrainTime").empty();
    PutDataInDom();
});
