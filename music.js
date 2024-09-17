const SIZE = 16;



const HHElement = document.getElementById("HHAudio");
const SnareElement = document.getElementById("SnareAudio");
const BassElement = document.getElementById("BassAudio");

const volumes = {
    hhVolume: 0.5,    // 70% volume for Hi-Hat
    snareVolume: 0.5, // 80% volume for Snare
    bassVolume: 1.0   // 60% volume for Bass
};



// Generate all parts 

function generate(id, name, text) {
    const container = document.getElementById(id);
    container.innerHTML = '';

    for (let i = 0; i < SIZE; i++) {
        const div = document.createElement('div');
        div.className = name;
        div.textContent = text;
        container.appendChild(div);
    }
    return container.children;
}

function genBegginer() {

    var fullTom1 = generate('Tom1container', 'Tom1', 'T1');
    var fullTom2 = generate('Tom2container', 'Tom2', 'T2');
    var fullSnare1 = generate('Snare1Container', 'Snare1', 'S');
    var fullFloor = generate('FloorContainer', 'floor', 'F');

    return [fullTom1, fullTom2, fullSnare1, fullFloor];
}

function genAdvanceOrExpert() {
    var fullTom1 = generate('Tom1container', 'Tom1', 'O');
    var fullTom2 = generate('Tom2container', 'Tom2', 'O');
    var fullSnare1 = generate('Snare1Container', 'Snare1', 'O');
    var fullFloor = generate('FloorContainer', 'floor', 'O');

    return [fullTom1, fullTom2, fullSnare1, fullFloor];

}

function genBeat() {

    var fullHH = generate('HHcontainer', 'HH', 'X');
    var fullSnare = generate('SnareContainer', 'Snare', 'O');
    var fullBass = generate('BassContainer', 'Bass', 'O');

    return [fullHH, fullSnare, fullBass];
}

// beats
function playBeatPattern(beatPattern, interval, level) {
    let i = 0;
    //  let temp = BPM/60;
    //let interval = 1000/temp; // Play HH every second (1000ms)


    HHElement.volume = volumes.hhVolume;
    SnareElement.volume = volumes.snareVolume;
    BassElement.volume = volumes.bassVolume;

    // Play the Hi-Hat, Snare, and Bass together based on the beat pattern
    const playNextBeat = () => {
        HHElement.currentTime = 0; // Reset hi-hat to the start
        if (level == "beginner") {
            if (i % 2 == 0) {                
                HHElement.play(); // Play hi-hat every second
            }
            else{
                HHElement.pause();
            }
        }
        else{
            HHElement.play();
        }
        // Check for snare hit
        if (beatPattern[i] === 2) {
            SnareElement.currentTime = 0;
            SnareElement.play(); // Play Snare
            BassElement.pause();  // Ensure Bass is paused if Snare plays
        }
        // Check for bass hit
        else if (beatPattern[i] === 1) {
            BassElement.currentTime = 0;
            BassElement.play(); // Play Bass
            SnareElement.pause(); // Ensure Snare is paused if Bass plays
        }
        // If no snare or bass hit, just play Hi-Hat
        else {
            SnareElement.pause();
            BassElement.pause();
        }

        // Increment to the next beat
        i++;
        // Check if the pattern has reached its end and stop all elements
        if (i > beatPattern.length) {
            clearInterval(beatInterval); // Stop the interval
            HHElement.pause();
            SnareElement.pause();
            BassElement.pause();
            //i = 0; // Reset to the beginning if needed
        }
    };

    // Set interval to play HH every second and check for snare or bass
    const beatInterval = setInterval(playNextBeat, interval);
}



function setHHVis(fullHH, level) {
    if (level == "beginner") {
        HH8(fullHH);

    }
    else {
        HH16(fullHH);
    }

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

// Show or hide all beats
function BeatVisibility(fullHH, fullSnare, fullBass, level) {
    var randomBeat = randBeat(level);
    if (level == "beginner") {
        var res = easyBeats();
        BeatResalt(res, fullSnare, fullBass);
        playBeatPattern(res, 400,level)

    }
    else if (level == "advance") {
        var resBeat = checkBeatRandom(randomBeat);
        BeatResalt(resBeat, fullSnare, fullBass);
        playBeatPattern(resBeat,level);
    }
    else {
        BeatResalt(randomBeat, fullSnare, fullBass);
        playBeatPattern(randomBeat, 500,level)
    }
}


function easyBeats() {
    var b1 = [1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0];
    var b2 = [1, 0, 1, 0, 2, 0, 0, 0, 1, 0, 1, 0, 2, 0, 0, 0];
    var b3 = [1, 0, 1, 0, 2, 0, 2, 0, 1, 0, 1, 0, 2, 0, 2, 0];
    var b4 = [1, 0, 1, 0, 2, 0, 1, 0, 1, 0, 0, 0, 2, 0, 1, 0];
    var b5 = [1, 1, 0, 0, 2, 0, 0, 0, 1, 1, 0, 0, 2, 0, 0, 0];
    var b6 = [1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 1, 0, 2, 0, 2, 0];
    var b7 = [1, 0, 0, 0, 2, 0, 1, 0, 0, 0, 1, 0, 2, 0, 2, 0];
    var b8 = [1, 0, 0, 0, 2, 0, 1, 0, 1, 0, 2, 0, 2, 0, 0, 0];
    var b9 = [1, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 2, 0, 2, 0];
    var b10 = [1, 0, 0, 0, 2, 0, 1, 0, 1, 0, 2, 0, 0, 0, 2, 0];
    var b11 = [1, 0, 1, 0, 2, 0, 1, 0, 1, 0, 0, 0, 2, 0, 0, 0];
    var b12 = [1, 0, 0, 1, 2, 0, 0, 0, 1, 0, 0, 1, 2, 0, 0, 0];
    var b13 = [1, 0, 0, 0, 2, 0, 0, 1, 1, 0, 0, 0, 2, 0, 0, 1];
    var b14 = [1, 0, 0, 0, 2, 0, 2, 0, 1, 0, 0, 0, 2, 0, 2, 0];

    var all = [b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14];

    let randomIndex = Math.floor(Math.random() * all.length);

    return all[randomIndex];
}
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
function checkBeatRandom(randArray) {
    let stackNums = [4, 8, 12];
    for (let i = 0; i < SIZE - 2; i++) {
        if (randArray[i] == randArray[i + 1] && randArray[i + 1] == randArray[i + 2]) {
            if (stackNums.includes(i + 2)) {
                randArray[i] = 0;
            } else {
                randArray[i + 2] = 0;
            }
        }

        if (randArray[SIZE - 2] == randArray[SIZE - 1] && randArray[SIZE - 2] == randArray[0]) {
            randArray[SIZE - 1] = 0;
        }
    }
    return randArray;
}

// fills

function setFill(fullTom1, fullTom2, fullSnare1, fullFloor, level) {

    if (level == "beginner")
        FillResalt(easyFills(), fullTom1, fullTom2, fullSnare1, fullFloor);
    else if (level == "advance")
        FillResalt(advanceFills(), fullTom1, fullTom2, fullSnare1, fullFloor);
    else
        FillResalt(randFill(), fullTom1, fullTom2, fullSnare1, fullFloor);
}

function easyFills() {
    // 1 = tom1
    // 2 = tom2
    // 3 = snare
    // 4 = floor
    //1,e,n,a,2,e,n,a,3,e,n,a,4,e,n,a
    var f1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4];
    var f2 = [3, 3, 3, 3, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4];
    var f3 = [0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 1, 1, 2, 2, 4, 4];
    var f4 = [3, 3, 3, 3, 1, 1, 1, 1, 2, 0, 2, 0, 4, 0, 4, 0];
    var f5 = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 3, 3, 3, 3];
    var f6 = [3, 0, 3, 0, 1, 0, 1, 0, 2, 0, 2, 0, 4, 0, 4, 0];
    var f7 = [3, 0, 3, 0, 1, 1, 1, 1, 2, 0, 2, 0, 4, 4, 4, 4];
    var f8 = [3, 3, 3, 3, 1, 0, 1, 0, 1, 0, 1, 0, 3, 3, 3, 3];
    var f9 = [3, 0, 3, 0, 1, 1, 1, 1, 2, 0, 2, 0, 4, 4, 4, 4];
    var f10 = [3, 3, 3, 3, 1, 0, 0, 0, 1, 0, 1, 0, 3, 3, 3, 3];
    var f11 = [3, 3, 3, 3, 0, 0, 1, 0, 2, 2, 2, 2, 4, 0, 4, 0];
    var f12 = [3, 3, 3, 3, 1, 1, 1, 1, 3, 0, 0, 0, 0, 0, 0, 0];
    var f13 = [3, 3, 3, 3, 1, 1, 1, 1, 3, 0, 0, 0, 4, 4, 4, 4];
    var f14 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4];

    var all = [f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14];
    let randomIndex = Math.floor(Math.random() * all.length);
    return all[randomIndex];
}

function advanceFills() {
    // 1 = tom1
    // 2 = tom2
    // 3 = snare
    // 4 = floor
    //1,e,n,a,2,e,n,a,3,e,n,a,4,e,n,a
    var f1 = [3, 3, 3, 3, 1, 1, 1, 0, 2, 2, 2, 2, 4, 4, 4, 0];
    var f2 = [3, 3, 3, 3, 1, 0, 1, 1, 2, 2, 2, 2, 4, 0, 4, 0];
    var f3 = [1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1, 3, 3, 1];
    var f4 = [3, 3, 3, 0, 1, 1, 1, 0, 2, 2, 2, 0, 4, 4, 4, 0];
    var f5 = [3, 3, 3, 0, 1, 0, 1, 0, 2, 2, 2, 0, 4, 4, 4, 4];
    var f6 = [3, 3, 1, 1, 3, 3, 2, 0, 0, 3, 3, 3, 4, 0, 4, 4];
    var f7 = [3, 3, 0, 0, 1, 1, 0, 0, 2, 2, 4, 4, 2, 0, 2, 0];
    var f8 = [3, 3, 1, 1, 2, 2, 4, 4, 4, 4, 2, 2, 1, 1, 3, 3];
    var f9 = [3, 3, 3, 1, 1, 1, 0, 0, 3, 3, 3, 2, 4, 0, 4, 0];
    var f10 = [3, 0, 3, 0, 1, 1, 1, 0, 3, 0, 3, 0, 4, 4, 4, 4];
    var f11 = [3, 3, 3, 3, 1, 3, 1, 3, 2, 3, 2, 3, 4, 3, 4, 3];
    var f12 = [0, 0, 3, 3, 4, 0, 4, 4, 2, 2, 1, 1, 4, 0, 0, 0];
    var f13 = [3, 0, 3, 0, 3, 0, 0, 0, 3, 3, 3, 3, 3, 0, 0, 0];
    var f14 = [1, 0, 1, 0, 1, 0, 0, 0, 2, 2, 2, 2, 0, 0, 4, 4];

    var all = [f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14];
    let randomIndex = Math.floor(Math.random() * all.length);
    return all[randomIndex];
}

function randFill() {
    var randArray = [];
    for (let i = 0; i < SIZE; i++) {
        randArray[i] = Math.floor(Math.random() * 5);
    }
    return randArray;
}
function FillResalt(checkedFill, fullTom1, fullTom2, fullSnare1, fullFloor) {
    for (let i = 0; i < SIZE; i++) {

        if (checkedFill[i] == 1) {

            fullTom1[i].style.visibility = "visible";
            fullTom2[i].style.visibility = "hidden";
            fullSnare1[i].style.visibility = "hidden";
            fullFloor[i].style.visibility = "hidden";

        } else if (checkedFill[i] == 2) {

            fullTom1[i].style.visibility = "hidden";
            fullTom2[i].style.visibility = "visible";
            fullSnare1[i].style.visibility = "hidden";
            fullFloor[i].style.visibility = "hidden";

        } else if (checkedFill[i] == 3) {

            fullTom1[i].style.visibility = "hidden";
            fullTom2[i].style.visibility = "hidden";
            fullSnare1[i].style.visibility = "visible";
            fullFloor[i].style.visibility = "hidden";

        }
        else if (checkedFill[i] == 4) {

            fullTom1[i].style.visibility = "hidden";
            fullTom2[i].style.visibility = "hidden";
            fullSnare1[i].style.visibility = "hidden";
            fullFloor[i].style.visibility = "visible";

        }
        else {
            fullTom1[i].style.visibility = "hidden";
            fullTom2[i].style.visibility = "hidden";
            fullSnare1[i].style.visibility = "hidden";
            fullFloor[i].style.visibility = "hidden";
        }
    }
}

function hideAll(arr) {
    Array.from(arr).forEach(element => {
        element.style.visibility = "hidden";
    });
}

// on click events

document.querySelector(".beginner").addEventListener('click', function () {

    difficlty("beginner");
});

document.querySelector(".advance").addEventListener('click', function () {

    difficlty("advance");
});

document.querySelector(".Expert").addEventListener('click', function () {

    difficlty("Expert");
});

document.querySelector(".clear").addEventListener('click', function () {

    var tmp = genBeat();
    for (i = 0; i < tmp.length; i++)
        hideAll(tmp[i]);


    var temp = genAdvanceOrExpert();
    for (i = 0; i < temp.length; i++)
        hideAll(temp[i]);

});
//"MAIN"
function difficlty(level) {

    if (level == "beginner")
        var allFill = genBegginer();
    else
        var allFill = genAdvanceOrExpert();

    var allBeat = genBeat();
    setHHVis(allBeat[0], level);
    BeatVisibility(allBeat[0], allBeat[1], allBeat[2], level);
    setFill(allFill[0], allFill[1], allFill[2], allFill[3], level);
}