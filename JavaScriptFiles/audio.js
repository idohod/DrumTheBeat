const HHElement = document.getElementById("HHAudio");
const SnareElement = document.getElementById("SnareAudio");
const BassElement = document.getElementById("BassAudio");
const Tom1Element = document.getElementById("Tom1Audio");
const Tom2Element = document.getElementById("Tom2Audio");
const FloorElement = document.getElementById("FloorAudio");


const volumes = {
    hhVolume: 0.1,
    snareVolume: 0.5,
    bassVolume: 1.0,
    FloorVolume: 0.7,
    tom1Volume: 0.7,
    tom2Volume: 0.7
};


function getBMP() {

    const input = document.getElementById("BPM");
    var value = Number(input.value);

    if (value > 0)
        return 60000 / value;

    else {
        alert("must enter BPM");
        return 0;
    }

}

function playBeatPattern(beatPattern, interval, level,allFill) {
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
            playFillPattern(allFill,interval);
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
        BassElement.pause();

    } else if (beatPattern[i] === 1) {
        BassElement.currentTime = 0;
        SnareElement.pause();
        BassElement.play();

    } else {

        SnareElement.pause();
        BassElement.pause();
    }
}

function playFillPattern(fillPattern, interval) {
    let i = 0;

    FloorElement.volume = volumes.FloorVolume;
    SnareElement.volume = volumes.snareVolume;
    Tom1Element.volume = volumes.tom1Volume;
    Tom2Element.volume = volumes.tom2Volume;

    const playNextFill = () => {

        playTheFill(fillPattern, i);
        i++;

        if (i > fillPattern.length) {
            clearInterval(fillInterval);
            FloorElement.pause();
            SnareElement.pause();
            Tom1Element.pause();
            Tom2Element.pause();
        }

    };

    const fillInterval = setInterval(playNextFill, interval);
}

function playTheFill(fillPattern, i) {
    // 1 = tom1
    // 2 = tom2
    // 3 = snare
    // 4 = floor
    if (fillPattern[i] === 1) {
        Tom1Element.currentTime = 0;
        Tom1Element.play();
        Tom2Element.pause();
        FloorElement.pause();
        SnareElement.pause();
    } else if (fillPattern[i] === 2) {
        Tom2Element.currentTime = 0;
        Tom1Element.pause();
        Tom2Element.play();
        FloorElement.pause();
        SnareElement.pause();
    } else if (fillPattern[i] === 3) {
        SnareElement.currentTime = 0;
        Tom1Element.pause();
        Tom2Element.pause();
        FloorElement.pause();
        SnareElement.play();
    } else if (fillPattern[i] === 4) {
        FloorElement.currentTime = 0;
        Tom1Element.pause();
        Tom2Element.pause();
        FloorElement.play();
        SnareElement.pause();
    } else if (fillPattern[i] === 0) {
        Tom1Element.pause();
        Tom2Element.pause();
        FloorElement.pause();
        SnareElement.pause();
    }
}
