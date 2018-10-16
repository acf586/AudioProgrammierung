var context = new AudioContext();
var sound = new Audio("sound.wav");
sound.loop = true;

source = context.createMediaElementSource(sound);

var compressor = context.createDynamicsCompressor();

source.connect(compressor);
compressor.connect(context.destination);

isPlaying = false;

var playStopButton = document.getElementById("playStopButton");
var thresholdSlider = document.getElementById("thresholdSlider");
var ratioSlider = document.getElementById("ratioSlider");
var kneeSlider = document.getElementById("kneeSlider");
var attackSlider = document.getElementById("attackSlider");
var releaseSlider = document.getElementById("releaseSlider");

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

thresholdSlider.oninput = function () {

    compressor.threshold.value = this.value - 100;
    document.getElementById("thresholdOutput").innerHTML = compressor.threshold.value + "dB";
}
ratioSlider.oninput = function () {
    compressor.ratio.value = this.value / 5;
    document.getElementById("ratioOutput").innerHTML = compressor.ratio.value;
}
kneeSlider.oninput = function () {

    compressor.ratio.value = this.value / 2.5;
    document.getElementById("kneeOutput").innerHTML = compressor.ratio.value;
}
attackSlider.oninput = function () {

    compressor.attack.value = this.value / 100;
    document.getElementById("attackOutput").innerHTML = compressor.attack.value
}
releaseSlider.oninput = function () {

    compressor.release.value = this.value / 100;
    document.getElementById("releaseOutput").innerHTML = compressor.release.value;
}

sound.addEventListener("timeupdate", function(){
    document.getElementById("reductionOutput").innerHTML = "Reduction: "+ compressor.reduction+ "dB";
})