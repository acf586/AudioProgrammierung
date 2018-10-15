var context = new AudioContext();
var drumPads = document.getElementsByClassName("drumpad");
var soundBuffer = [];


console.log(drumPads.length);

for (let i = 0; i < drumPads.length; i++) {

    getData(i);

    drumPads[i].addEventListener("mousedown", function (e) {
        playSound(i);
    });
}

//holt die SoundDateien vom Server und lädt sie in den soundBuffer
function getData(i) {
    var request = new XMLHttpRequest();
    request.open('GET', "sounds/Drum" + (i + 1) + ".wav", true);
    request.responseType = 'arraybuffer';

    request.onload = function () {
        var undecodedAudio = request.response;

        //Buffer werden erstellt
        context.decodeAudioData(undecodedAudio, function (buffer) {
            soundBuffer[i] = buffer;
        });

    };
    request.send();
}


//lädt die soundbuffer in den sourcebuffer und verbindet mit dem Lautsprechern und spielt sie ab
function playSound(i) {
    var sourceBuffer = context.createBufferSource();
    sourceBuffer.buffer = soundBuffer[i];
    sourceBuffer.connect(context.destination);
    sourceBuffer.start(context.currentTime);
}