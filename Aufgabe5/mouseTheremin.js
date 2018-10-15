var context = new AudioContext();
var oscillator = null;
var gainNode = context.createGain();

var minFrequency = 20;
var maxFrequency = 500;

document.getElementById("mainContainer").addEventListener('mousemove', function (e) {

    playSound(e);

});

document.getElementById("mainContainer").addEventListener("mouseenter", function () {
    console.log("enter");

    oscillatorNode = context.createOscillator();

    oscillatorNode.connect(gainNode);

    gainNode.connect(context.destination);

    oscillatorNode.start(context.currentTime);

});

document.getElementById("mainContainer").addEventListener("mouseleave", function () {
    console.log("leave");


    oscillatorNode.stop(context.currentTime); // nach stop kann der  oscillator nicht mehr gestartet werden.

    oscillatorNode.disconnect();

});






function playSound(event) {
    gain = event.clientY / document.getElementById("mainContainer").clientHeight;

    frequency = event.clientX / document.getElementById("mainContainer").clientWidth * (maxFrequency-minFrequency) + minFrequency;

    document.getElementById("outputText").innerHTML = "Gain: " + gain + " Frequency:" + frequency;
    console.log("Gain: " + gain + " frequency: " + frequency)

    gainNode.gain.value = gain;

    oscillatorNode.frequency.value = frequency;

    oscillator.frequency.setTargetAtTime(((mousePositionX / windowWidth) * maxFrequency) + minFrequency, context.currentTime, 0.01);
    gainNode.gain.setTargetAtTime(1 - ((mousePositionY / windowHeight) * maxGain) + minGain, context.currentTime, 0.01);
}


