var context = new AudioContext();
var sound = new Audio("sound.wav");
var source = context.createMediaElementSource(sound);
var convolver = context.createConvolver();
var selectList = document.getElementById("selectList");
var playButton = document.getElementById("playButton");

isPlaying = false;

sound.loop = true;

selectList.addEventListener("change", function(){
    getImpulseConvolverData(this.value);
    console.log(this.value);
});


playButton.onclick = function(){
    isPlaying =!isPlaying;
    console.log("isPlaying"+isPlaying);
    if(isPlaying){
        sound.play();
        //document.getElementById("playContainer").innerHTML = "Pause";
    }
    else{
        sound.pause();
        //document.getElementById("playContainer").innerHTML = "Play";
    }
}



function getImpulseConvolverData(convolverValue) {

    console.log("Church");
    var request = new XMLHttpRequest();
    request.open("GET", "impulseResponses/" + convolverValue + ".wav", true);
    console.log("impulseResponses/" + convolverValue + ".wav");
    request.responseType = "arraybuffer";

    request.onload = function () {
        var undecodedAudio = request.response;
        context.decodeAudioData(undecodedAudio, function (buffer) {
            convolver.buffer = buffer;
            convolver.normalize = true;

            source.connect(convolver);
            convolver.connect(context.destination);
        });
    };
    request.send();

}