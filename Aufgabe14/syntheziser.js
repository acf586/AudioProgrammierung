var context = new AudioContext();
var buttons = document.getElementsByClassName("button");
var oscillators = [];
var gainNode = context.createGain();
gainNode.connect(context.destination);


for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("mousedown", function () {
        startNote(i);
    });
    buttons[i].addEventListener("mouseup", function () {
        stopNote(i);
    });

    function startNote(arrayIndex) {

        let oscillator = context.createOscillator();
        oscillator.frequency.value = 110 * (arrayIndex + 1);
        oscillator.connect(gainNode);
        oscillator.start();
        oscillators[arrayIndex] = oscillator;
    }
    function stopNote(arrayIndex) {
        //erst wird die Volume heruntergesetzt und dann der Oszi gestoppt dadurch entfällt das knacken
        gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 1);

        setTimeout(function () {
            console.log("Stop");
            oscillators[arrayIndex].stop();
        }, 1000);
    }

}

//virtual midi Keyboard vmpk.sourgeforge.net
