var context = new AudioContext();
var sound = new Audio("sound.wav");
sound.loop = true;

source = context.createMediaElementSource(sound);

gain = context.createGain();
stereoPanner = context.createStereoPanner();
delay = context.createDelay(1.0);

isPlaying = false;

source.connect(gain);
gain.connect(delay);
delay.connect(stereoPanner);
stereoPanner.connect(context.destination);

var playStopButton = document.getElementById("playStopButton");
var panningSlider = document.getElementById("panningSlider");
var delaySlider = document.getElementById("delaySlider");
var gainSlider = document.getElementById("gainSlider");

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

panningSlider.oninput = function(){
    console.log("Panning "+this.value);
    var panningValue = this.value /50 - 1;
    stereoPanner.pan.value = panningValue;
    document.getElementById("panningOutput").innerHTML = panningValue;
}

delaySlider.oninput = function(){
    console.log("Delay "+ this.value);
    var delayValue = this.value/25;
    delay.delayTime.value = delayValue;
    document.getElementById("delayOutput").innerHTML = delayValue +" s";
}

gainSlider.oninput = function(){
    
    var gainValue = this.value/10;
    console.log("Gain "+ gainValue);
    gain.gain.value = gainValue;
    document.getElementById("gainOutput").innerHTML = gainValue + " dB";
}