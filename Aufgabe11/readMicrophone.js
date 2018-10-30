


navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(function (stream) {
        var context = new AudioContext();
        var analyser = context.createAnalyser();
        analyser.fftSize = 2048;
        var liveInput = context.createMediaStreamSource(stream);
        liveInput.connect(analyser);
        console.log("Microphone");
        var array = new Uint8Array(analyser.frequencyBinCount);

        window.setInterval(function () {
            console.log("ich schreibe alle 75 ms = jede Sekunde yeah!")
            analyser.getByteFrequencyData(array);
            var volume = getAverageVolume(array);
            document.getElementById("outputLabel").innerHTML = volume +" dB";
        }, 75);

    });




function getAverageVolume(array) {
    var values = 0;
    
    for (var i = 0; i < array.length; i++)
        values += array[i];
    
    return values / array.length;
}

