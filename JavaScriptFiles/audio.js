const HHElement = document.getElementById("HHAudio");
const SnareElement = document.getElementById("SnareAudio");
const BassElement = document.getElementById("BassAudio");
const Tom1Element = document.getElementById("Tom1Audio");
const Tom2Element = document.getElementById("Tom2Audio");
const FloorElement = document.getElementById("FloorAudio");


const volumes = {
    hhVolume: 1.0,    // 50% volume for Hi-Hat
    snareVolume: 1.0, // 50% volume for Snare
    bassVolume: 1.0   // 100% volume for Bass
    };


function getBMP() {

    const input = document.getElementById("BPM");
    var value = Number(input.value);

    if (value > 0)
        return 60000 / value;

    else{
        alert("must enter BPM");
       return 0;
    }

}

function playBeatPattern(beatPattern, interval, level) {
    let i = 0;

    HHElement.volume = volumes.hhVolume;
    SnareElement.volume = volumes.snareVolume;
    BassElement.volume = volumes.bassVolume;

    const playNextBeat = () => {
        
        HHaudio(i, level);
        BassAndSnareAudio(i, beatPattern);
        i++;           

        if (i > beatPattern.length) {
            clearInterval(beatInterval);
            HHElement.pause();
            SnareElement.pause();
            BassElement.pause();
        }
       
    };

    const beatInterval = setInterval(playNextBeat, interval);
}


function HHaudio(i, level) {
    HHElement.currentTime = 0;

    if (level != "Expert") {
        if (i % 2 === 0)
            HHElement.play();
        else
            HHElement.pause();
    }

    else
        HHElement.play();
}

function BassAndSnareAudio(i, beatPattern) { 

    if (beatPattern[i] === 2) {
        SnareElement.currentTime = 0;
        SnareElement.play();
      //  BassElement.pause();

    } else if (beatPattern[i] === 1) {
        BassElement.currentTime = 0;
      //  SnareElement.pause();
        BassElement.play();

    } else {

     //   SnareElement.pause();
     //   BassElement.pause();
    }
}