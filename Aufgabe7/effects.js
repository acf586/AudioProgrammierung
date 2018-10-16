var playStopButton = document.getElementById("playContainer");
var caveButton = document.getElementById("caveContainer");
var churchButton = document.getElementById("churchContainer");
var garageButton = document.getElementById("garageContainer");
var roomButton = document.getElementById("roomContainer");

var isPlaying = false;
var convolverName  = ["cave","church","garage","room"];

var context = new AudioContext();
var sound = new Audio("sound.wav");
sound.loop = true;

var source = context.createMediaElementSource(sound);
var convolver = context.createConvolver();

source.connect(convolver);
convolver.connect(context.destination);


playStopButton.onclick = function(){
    isPlaying =!isPlaying;
    console.log("isPlaying"+isPlaying);
    if(isPlaying){
        sound.play();
    }
    else{
        sound.pause();
    }
}

caveButton.onclick = function(){
  console.log("Cave");
  getImpulseConvolverData(0)

}

churchButton.onclick = function(){
    console.log("Church");
    getImpulseConvolverData(1)
}

garageButton.onclick = function(){
    console.log("Garage");
    getImpulseConvolverData(2)
}

roomButton.onclick = function(){
    console.log("Room");
    getImpulseConvolverData(3)
}

function getImpulseConvolverData(i){
    
        console.log("Church");
        var request = new XMLHttpRequest();
      request.open("GET", "impulseResponses/"+convolverName[i]+".wav", true);
      console.log("impulseResponses/"+convolverName[i]+".wav");
      request.responseType = "arraybuffer";
    
      request.onload = function () {
          var undecodedAudio = request.response;
          context.decodeAudioData(undecodedAudio, function (buffer) {
              convolver.buffer = buffer;
              convolver.normalize = true;
          });
      };
      request.send();
    
}