var context = new AudioContext();
var sound = new Audio("sound.wav");
sound.loop = true;

source = context.createMediaElementSource(sound);

var distortion = context.createWaveShaper();

source.connect(distortion);
distortion.connect(context.destination);

distortion.curve = makeDistortionCurve(200);
distortion.oversample = "4x";

isPlaying = false;

var playStopButton = document.getElementById("playStopButton");
var intensitySlider = document.getElementById("intensitySlider");


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

intensitySlider.oninput = function () {
    distortion.curve = makeDistortionCurve(this.value);
    document.getElementById("intensityOutput").innerHTML = this.value ;
}


//Beispielcode: Funktion zur Berechnung einer Sigmoid Kurve (Parameter: Integer mit der Stärke der Sigmoid-Funktion, Return: ein Array mit allen Werten der Sigmoid-Funktion von -1 bis 1, das return value ist ein Array mit n_samples Anzahl von Werten)

function makeDistortionCurve(amount) {    
    var n_samples = 44100,
        curve = new Float32Array(n_samples);
    
    for (var i = 0; i < n_samples; ++i ) {
        var x = i * 2 / n_samples - 1;
        curve[i] = (Math.PI + amount) * x / (Math.PI + (amount * Math.abs(x)));
    }
    
    return curve;
};

