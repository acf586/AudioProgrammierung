var context = new AudioContext();

document.getElementById("mainContainer").addEventListener('mousemove', function(e){

    playSound(e);

});

document.getElementById("mainContainer").addEventListener("mouseenter", function(){
    console.log("enter");

    oscillatorNode = context.createOscillator();

    gainNode = context.createGain();

    oscillatorNode.connect(gainNode);

    gainNode.connect(context.destination);    
    
    oscillatorNode.start(context.currentTime);

});

document.getElementById("mainContainer").addEventListener("mouseleave", function(){
    console.log("leave");
    
    oscillatorNode.stop(context.currentTime);
    
});






function playSound(coordinates){
    gain = coordinates.clientY/ document.getElementById("mainContainer").clientHeight;

    frequency = coordinates.clientX / document.getElementById("mainContainer").clientWidth * 200 + 50;
    
    console.log("Gain: "+gain + " frequency: "+frequency)
    
    gainNode.gain.value = gain;
    
    oscillatorNode.frequency.value = frequency;

    //oscillatorNode.start(context.currentTime);
    //oscillatorNode.stop(context.currentTime + 1);
}


