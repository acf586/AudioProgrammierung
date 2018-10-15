var context = new AudioContext(),
playStopButton = document.getElementById("playStopButton"),
isPlaying = false;
sound = new Audio("sound.wav"),
source = context.createMediaElementSource(sound),
gain = context.createGain();
stereoPanner = context.createStereoPanner();
delay = context.createDelay(4.0);

sound.loop = true;

source.connect(gain);
gain.connect(delay);
delay.connect(stereoPanner);
stereoPanner.connect(context.destination);

/* document.getElementById("gainSlider").addEventListener("input",function(e){
    console.log("Change")
    var gainValue = this.value/10;
    gain.gain.value = gainValue;
    document.getElementById("gainOutput").innerHtml = gainValue + "DB";
}); */

document.getElementById("panningSlider").addEventListener("input",function(e){
    
});

document.getElementById("delaySlider").addEventListener("input",function(e){
    
});