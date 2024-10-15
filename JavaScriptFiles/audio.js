const HHElement = document.getElementById("HHAudio");
const SnareElement = document.getElementById("SnareAudio");
const BassElement = document.getElementById("BassAudio");
const Tom1Element = document.getElementById("Tom1Audio");
const Tom2Element = document.getElementById("Tom2Audio");
const FloorElement = document.getElementById("FloorAudio");
const CrashElement = document.getElementById("CrashAudio");

var errorrMassage = document.getElementById("errorMassage");
var theMarker = document.getElementById("marker");

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

function playBeatPattern(beatPattern, interval, level, fillPattern) {
    let i = 0;
    stillPlaying = true;
    HHElement.volume = volumes.hhVolume;
    SnareElement.volume = volumes.snareVolume;
    BassElement.volume = volumes.bassVolume;
    const playNextBeat = () => {

        if (i < SIZE) {
            marker(i, false);
            HHaudio(i, level);
            BassAndSnareAudio(i, beatPattern);
        }
        if (i == SIZE) {
            playFillPattern(interval, fillPattern);

            clearInterval(beatInterval);
           
        }
        CrashElement.pause();
        CrashElement.currentTime = 0;
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

    switch (beatPattern[i]) {
        case 1:
            BassElement.currentTime = 0;
            BassElement.play();
            break;
        case 2:
            SnareElement.currentTime = 0;
            SnareElement.play();
            break;
    }
}

function ClearPattern(fillPattern) {

    fillPattern.forEach(element => {
        element = 0;
    });
}

function playFillPattern(interval, fillPattern) {
    let i = 0;

    FloorElement.volume = volumes.FloorVolume;
    SnareElement.volume = volumes.snareVolume;
    Tom1Element.volume = volumes.tom1Volume;
    Tom2Element.volume = volumes.tom2Volume;
    CrashElement.volume = volumes.crashVolume;

    const playNextFill = () => {
        marker(i, true);

        if (i == SIZE) {
            CrashElement.currentTime = 0;
            CrashElement.play();
            clearInterval(fillInterval);

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
    switch (fillPattern[i]) {
        case 1:
            Tom1Element.currentTime = 0;
            Tom1Element.play();
            break;
        case 2:
            Tom2Element.currentTime = 0;
            Tom2Element.play();
            break;
        case 3:
            SnareElement.currentTime = 0;
            SnareElement.play();
            break;
        case 4:
            FloorElement.currentTime = 0;
            FloorElement.play();
            break;
    }
}

function marker(i, fromFill) {

    if (fromFill == false)
        theMarker.style.transform = `translateX(${77 * i}px) translateY(0px)`;
    else {
        if (i != SIZE)
            theMarker.style.transform = `translateX(${77 * i}px) translateY(130px)`;
        else
            theMarker.style.transform = `translateX(${77 * i - 10}px) translateY(130px)`;
    }
    theMarker.style.visibility = "visible";
}