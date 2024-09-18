


const HHElement = document.getElementById("HHAudio");
const SnareElement = document.getElementById("SnareAudio");
const BassElement = document.getElementById("BassAudio");

const volumes = {
    hhVolume: 0.5,    // 70% volume for Hi-Hat
    snareVolume: 0.5, // 80% volume for Snare
    bassVolume: 1.0   // 60% volume for Bass
};




function playBeatPattern(beatPattern, interval, level) {
    let i = 0;
    //  let temp = BPM/60;
    //let interval = 1000/temp; 
    HHElement.volume = volumes.hhVolume;
    SnareElement.volume = volumes.snareVolume;
    BassElement.volume = volumes.bassVolume;
    // Play the Hi-Hat, Snare, and Bass together based on the beat pattern
    const playNextBeat = () => {
        HHElement.currentTime = 0; // Reset hi-hat to the start
        if (level == "beginner") {
            if (i % 2 == 0)
                HHElement.play(); // Play hi-hat every second            
            else
                HHElement.pause();
        }
        else
            HHElement.play();

        // Check for snare hit
        if (beatPattern[i] === 2) {
            SnareElement.currentTime = 0;
            SnareElement.play(); 
            BassElement.pause();  
        }
        // Check for bass hit
        else if (beatPattern[i] === 1) {
            BassElement.currentTime = 0;
            BassElement.play(); 
            SnareElement.pause();
        }
        else {
            SnareElement.pause();
            BassElement.pause();
        }    
        i++;        
        if (i > beatPattern.length) {
            clearInterval(beatInterval); // Stop the interval
            HHElement.pause();
            SnareElement.pause();
            BassElement.pause();
        }
    };
    const beatInterval = setInterval(playNextBeat, interval);
}