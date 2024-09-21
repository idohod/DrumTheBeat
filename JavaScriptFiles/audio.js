const HHElement = document.getElementById("HHAudio");
const SnareElement = document.getElementById("SnareAudio");
const BassElement = document.getElementById("BassAudio");
const Tom1Element = document.getElementById("Tom1Audio");
const Tom2Element = document.getElementById("Tom2Audio");
const FloorElement = document.getElementById("FloorAudio");
const CrashElement = document.getElementById("CrashAudio");

var errorrMassage = document.getElementById("errorMassage");

var stillPlaying;
var toPauseAll;

var beatInterval;
var fillInterval;

const volumes = {
    hhVolume: 0.1,
    snareVolume: 0.5,
    bassVolume: 1.0,
    FloorVolume: 0.7,
    tom1Volume: 0.7,
    tom2Volume: 0.7,
    crashVolume: 1.0
};


function getBMP() {

    const input = document.getElementById("BPM");
    var value = Number(input.value);

    if (value > 0) {
        errorrMassage.innerHTML = ""
        return 60000 / value;
    }

    else {
        errorrMassage.innerHTML = "must enter BPM!"
        return 0;
    }

}

function playBeatPattern(beatPattern, interval, level, allFill) {
    let i = 0;
    stillPlaying = true;
    console.log(beatPattern);
    HHElement.volume = volumes.hhVolume;
    SnareElement.volume = volumes.snareVolume;
    BassElement.volume = volumes.bassVolume;

    const playNextBeat = () => {

        if (i == SIZE) {
            clearInterval(beatInterval);
            HHElement.pause();
            SnareElement.pause();
            BassElement.pause();
            playFillPattern(allFill, interval);
        }
        CrashElement.pause();
        CrashElement.currentTime = 0;

        HHaudio(i, level);
        BassAndSnareAudio(i, beatPattern);
        i++;

    };

    beatInterval = setInterval(playNextBeat, interval);
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

function ClearPattern(fillPattern) {

    fillPattern.forEach(element => {
        element = 0;
    });
}

function playFillPattern(fillPattern, interval) {
    let i = 0;

    FloorElement.volume = volumes.FloorVolume;
    SnareElement.volume = volumes.snareVolume;
    Tom1Element.volume = volumes.tom1Volume;
    Tom2Element.volume = volumes.tom2Volume;
    CrashElement.volume = volumes.crashVolume;

    const playNextFill = () => {
        console.log(i);
        if (i < SIZE) {
            CrashElement.pause();
            CrashElement.currentTime = 0;

        }
        if (i == SIZE) {
            console.log("if");
            CrashElement.play();
            clearInterval(fillInterval);
            FloorElement.pause();
            SnareElement.pause();
            Tom1Element.pause();
            Tom2Element.pause();
            stillPlaying = false;
        }
        playTheFill(fillPattern, i);
        i++;

    };

    fillInterval = setInterval(playNextFill, interval);
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
    } else {
        Tom1Element.pause();
        Tom2Element.pause();
        FloorElement.pause();
        SnareElement.pause();
    }
}
function pauseAll() {

    HHElement.pause();
    SnareElement.pause();
    BassElement.pause();
    FloorElement.pause();
    Tom1Element.pause();
    Tom2Element.pause();

}