var context = new AudioContext(),
    drumpads = document.getElementsByClassName("drumpad"),
    soundBuffer = [];

for (let i = 0; i < drumpads.length; i++) {
    getData(i);
    
    drumpads[i].addEventListener("mousedown", function (e) {playSound(i)});
}

function getData(i){
    var request = new XMLHttpRequest();
    request.open('GET', "sounds/Drum" + (i+1) + ".wav", true);
    request.responseType = 'arraybuffer';
    request.onload = function () {
        var undecodedAudio = request.response;
        //folgender zeile ruft nur die AudioDaten aus der Wav Datei auf
        context.decodeAudioData(undecodedAudio, function (buffer) {
            soundBuffer[i] = buffer;
        });
    };
    request.send();

}

function playSound(i) {
    var sourceBuffer = context.createBufferSource();
    sourceBuffer.buffer = soundBuffer[i];
    sourceBuffer.connect(context.destination);
    sourceBuffer.start(context.currentTime);


}
