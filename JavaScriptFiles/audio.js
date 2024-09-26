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

function playBeatPattern(beatPattern, interval, level, fillPattern, counter) {
    let i = 0;
    stillPlaying = true;
    HHElement.volume = volumes.hhVolume;
    SnareElement.volume = volumes.snareVolume;
    BassElement.volume = volumes.bassVolume;
   /* if(counter == 3){
        clearInterval(beatInterval);
        HHElement.pause();
        SnareElement.pause();
        BassElement.pause();
        playFillPattern(beatPattern,interval,level,fillPattern);
        return;

    }
*/    const playNextBeat = () => {

        if (i < SIZE) {
            marker(i, false);
            HHaudio(i, level);
            BassAndSnareAudio(i, beatPattern);
        }
        if (i == SIZE) {
            playFillPattern(beatPattern, interval, level, fillPattern);

            clearInterval(beatInterval);
            HHElement.pause();
            SnareElement.pause();
            BassElement.pause();
            //   playBeatPattern(beatPattern, interval, level, fillPattern,counter+1);
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

function playFillPattern(beatPattern, interval, level, fillPattern) {
    let i = 0;

    FloorElement.volume = volumes.FloorVolume;
    SnareElement.volume = volumes.snareVolume;
    Tom1Element.volume = volumes.tom1Volume;
    Tom2Element.volume = volumes.tom2Volume;
    CrashElement.volume = volumes.crashVolume;

    const playNextFill = () => {
        marker(i, true);

        if (i < SIZE) {
            CrashElement.pause();
            CrashElement.currentTime = 0;

        }
        if (i == SIZE) {
            CrashElement.play();
            clearInterval(fillInterval);
            FloorElement.pause();
            SnareElement.pause();
            Tom1Element.pause();
            Tom2Element.pause();
            stillPlaying = false;

            //  playBeatPattern(beatPattern, interval, level, fillPattern,0);
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

function marker(i, fromFill) {

    if (fromFill == false) {
        theMarker.style.transform = `translateX(${77 * i}px) translateY(0px)`;
    }
    else {
        if (i != SIZE)
            theMarker.style.transform = `translateX(${77 * i}px) translateY(130px)`;
        else {
            theMarker.style.transform = `translateX(${77 * i - 10}px) translateY(130px)`;
        }
    }
    theMarker.style.visibility = "visible";
}
