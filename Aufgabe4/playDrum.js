var context = new AudioContext(),
    drumpads = document.getElementsByClassName("drumpad"),
    soundBuffers = [];
    console.log(drumpads.length);

for (let i = 0; i < drumpads.length; i++) {
    soundBuffers[i] = new Audio("sounds/Drum" + (i+1) + ".wav");
    var soundNode = context.createMediaElementSource(soundBuffers[i]);
    var gainNode = context.createGain();

    gainNode.gain.value = 0.8;

    soundNode.connect(gainNode);
    gainNode.connect(context.destination); // nimmt als Output den im Browser eingestellten Output

    drumpads[i].addEventListener("mousedown", function (e) {playSound(i)});
}


function playSound(i) {
    soundBuffers[i].play();

}