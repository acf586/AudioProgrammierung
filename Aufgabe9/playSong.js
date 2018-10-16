var context = new AudioContext();
var sound = new Audio("sound.wav");
sound.loop = true;

source = context.createMediaElementSource(sound);

var filter = context.createBiquadFilter();
source.connect(filter);
filter.connect(context.destination);

selectList.addEventListener("change", function(){
    filter.type = this.value;
    console.log(filter.type);
});


isPlaying = false;

var playStopButton = document.getElementById("playStopButton");
var frequencydSlider = document.getElementById("frequencySlider");
var detuneSlider = document.getElementById("detuneSlider");
var qualitySlider = document.getElementById("qualitySlider");
var gainSlider = document.getElementById("gainSlider");


playStopButton.onclick = function(){
    isPlaying =!isPlaying;
    console.log("isPlaying"+isPlaying);
    if(isPlaying){
        sound.play();
        this.innerHTML = "Pause";
    }
    else{
        sound.pause();
        this.innerHTML = "Play";
    }
}

frequencySlider.oninput = function () {

    filter.frequency.value = this.value;
    document.getElementById("frequencyOutput").innerHTML = filter.frequency.value + "Hz";
}

detuneSlider.oninput = function () {

    filter.detune.value = this.value
    document.getElementById("detuneOutput").innerHTML = filter.detune.value + "Cents";
}

qualitySlider.oninput = function () {

    filter.Q.value = this.value;
    document.getElementById("qualityOutput").innerHTML = filter.Q.value;
}

gainSlider.oninput = function () {

    filter.gain.value = this.value;
    document.getElementById("gainOutput").innerHTML = filter.gain.value + "dB";
}


