var context = new AudioContext();
var audioBuffers = [];


for (let i = 0; i < 3; i++)
    getAudioData(i);

function getAudioData(i) {
    var audioBuffer;
    var request = new XMLHttpRequest();
    request.open('GET', "sounds/sound" + (i + 1) + ".wav", true);
    request.responseType = 'arraybuffer';

    request.onload = function () {
        var undecodedAudio = request.response;
        context.decodeAudioData(undecodedAudio, function (buffer) {
            audioBuffers[i] = buffer;
        });
    };
    request.send();
}


var context = new AudioContext();

function playSound(buffer, time) {
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(time);
};

function playBeat(){
    var tempo = 90; // BPM (beats per minute)
    var eighthNoteTime = (60 / tempo) / 2;
    var startTime = context.currentTime;

    for (var takt = 0; takt < 2; takt++) {
        var time = startTime + takt * context.currentTime;
        var bassdrum = audioBuffers[0];
        var snaredrum = audioBuffers[1];
        var highHat = audioBuffers[2];

        playSound(bassdrum, time + 0 * eighthNoteTime);
        playSound(bassdrum, time + 1 * eighthNoteTime);
        playSound(bassdrum, time + 4 * eighthNoteTime);

        playSound(snaredrum, time + 2 * eighthNoteTime);
        playSound(snaredrum, time + 4.5 * eighthNoteTime);
        playSound(snaredrum, time + 6 * eighthNoteTime);
        playSound(snaredrum, time + 7.5 * eighthNoteTime);

        for (let i = 0; i < 8; i++) {
            playSound(highHat, time + i * eighthNoteTime);
        }

    }


}

document.getElementById("Play").addEventListener("click", function(){
    playBeat();
});

