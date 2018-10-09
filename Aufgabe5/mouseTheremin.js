var context = new AudioContext(),
    gainNode = context.createGain();

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

    frequency = event.clientX / document.getElementById("mainContainer").clientWidth * 200 + 50;

    document.getElementById("outputText").innerHTML = "Gain: " + gain + " Frequency:" + frequency;
    console.log("Gain: " + gain + " frequency: " + frequency)

    gainNode.gain.value = gain;

    oscillatorNode.frequency.value = frequency;

    //oscillatorNode.start(context.currentTime);
    //oscillatorNode.stop(context.currentTime + 1);
}


