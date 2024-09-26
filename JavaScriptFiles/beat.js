var randomBeat;
var easyBeat;

function genBeat() {
    var fullHH = generate('HHcontainer', 'HH', 'X');
    var fullSnare = generate('SnareContainer', 'Snare', 'O');
    var fullBass = generate('BassContainer', 'Bass', 'O');

    return [fullHH, fullSnare, fullBass];
}

//show HH 8 or 16 times
function setHHVis(fullHH, level) {
    if (level == "Expert")
        HH16(fullHH);
    else
        HH8(fullHH);
}

function HH8(fullHH) {
    for (let i = 0; i < SIZE; i++) {
        if (i % 2 == 0)
            fullHH[i].style.visibility = "visible";
        else
            fullHH[i].style.visibility = "hidden";
    }
}
function HH16(fullHH) {
    for (let i = 0; i < SIZE; i++)
        fullHH[i].style.visibility = "visible";
}

// Show or hide beats by level
function BeatVisibility(fullSnare, fullBass, level, flag, fillPattern) {

    var BPM = getBMP();

    if (!flag) {
        randomBeat = randBeat(level);
        easyBeat = easyBeats();
    }

    if (level == "beginner") {

        var tempo = BPM / 4;
        BeatResalt(easyBeat, fullSnare, fullBass);
        playBeatPattern(easyBeat, tempo, level, fillPattern);
    }
    else if (level == "advance") {

        var tempo = BPM / 4;
        var resBeat = checkBeatRandom(randomBeat, level);
        BeatResalt(resBeat, fullSnare, fullBass);
        playBeatPattern(resBeat, tempo, level, fillPattern);
    }
    else {
        
        var tempo = BPM / 4;
        var exBeat = checkBeatRandom(randomBeat, level);
        BeatResalt(exBeat, fullSnare, fullBass);
        playBeatPattern(randomBeat, tempo, level, fillPattern);
    }
}

// get randomly one of the beat patterns
function easyBeats() {
    var b1  = [1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0];
    var b2  = [1, 0, 1, 0, 2, 0, 0, 0, 1, 0, 1, 0, 2, 0, 0, 0];
    var b3  = [1, 0, 1, 0, 2, 0, 2, 0, 1, 0, 1, 0, 2, 0, 2, 0];
    var b4  = [1, 0, 1, 0, 2, 0, 1, 0, 1, 0, 0, 0, 2, 0, 1, 0];
    var b5  = [1, 1, 0, 0, 2, 0, 0, 0, 1, 1, 0, 0, 2, 0, 0, 0];
    var b6  = [1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 1, 0, 2, 0, 2, 0];
    var b7  = [1, 0, 0, 0, 2, 0, 1, 0, 0, 0, 1, 0, 2, 0, 2, 0];
    var b8  = [1, 0, 0, 0, 2, 0, 1, 0, 1, 0, 2, 0, 2, 0, 0, 0];
    var b9  = [1, 0, 1, 0, 2, 0, 2, 0, 0, 0, 1, 0, 2, 0, 2, 0];
    var b10 = [1, 0, 0, 0, 2, 0, 1, 0, 1, 0, 2, 0, 2, 0, 2, 0];
    var b11 = [1, 0, 1, 0, 2, 0, 1, 0, 1, 0, 0, 0, 2, 0, 0, 0];
    var b12 = [1, 0, 0, 1, 2, 0, 0, 0, 1, 0, 0, 1, 2, 0, 0, 0];
    var b13 = [1, 0, 0, 0, 2, 0, 0, 1, 1, 0, 0, 0, 2, 0, 0, 1];
    var b14 = [1, 0, 0, 0, 2, 0, 2, 0, 1, 0, 0, 0, 2, 0, 2, 0];

    var all = [b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14];

    let randomIndex = Math.floor(Math.random() * all.length);

    return all[randomIndex];
}
//show the beat 
function BeatResalt(checkedArr, randSnare, randBass) {
    for (let i = 0; i < SIZE; i++) {
        if (checkedArr[i] == 1) {
            randSnare[i].style.visibility = "hidden";
            randBass[i].style.visibility = "visible";
        } else if (checkedArr[i] == 2) {
            randSnare[i].style.visibility = "visible";
            randBass[i].style.visibility = "hidden";
        } else {
            randBass[i].style.visibility = "hidden";
        }
    }
}

// Generate random beats
function randBeat(level) {

    if (level == "Expert")
        return randExpert();
    return randAdvance();
}

function randExpert() {
    var randArray = [];
    for (let i = 0; i < SIZE; i++)
        randArray[i] = Math.floor(Math.random() * 3);
    return randArray;
}

function randAdvance() {
    var randArray = [];
    for (let i = 0; i < SIZE; i++) {
        if (i == 0 || i == 8) {
            randArray[i] = 1;
        } else if (i == 4 || i == 12) {
            randArray[i] = 2;
        } else {
            randArray[i] = Math.floor(Math.random() * 3);
        }
    }
    return randArray;
}

// Prevent too many repetitions
function checkBeatRandom(randArray, level) {
    let stackNums = [4, 8, 12];
    for (let i = 0; i < SIZE - 2; i++) {
        if (randArray[i] == randArray[i + 1] && randArray[i + 1] == randArray[i + 2]) {

            if (level == "advance") {
                if (stackNums.includes(i + 2))
                    randArray[i] = 0;
                else
                    randArray[i + 2] = 0;
            }
            else
                randArray[i + 2] = 0;
        }
    }
    if (level == "advance")
        prevent3RepsInEnd(randArray)

    return randArray;
}

function prevent3RepsInEnd(randArray) {
    if (randArray[SIZE - 2] == randArray[SIZE - 1] && randArray[SIZE - 2] == randArray[0]) {
        randArray[SIZE - 1] = 0;
    }

    else if (randArray[SIZE - 1] == randArray[0] && randArray[1] == randArray[0]) {
        randArray[1] = 0;
    }
    return randArray;
}