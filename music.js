var numClick = 0;
const size = 16;

function setHHVis(fullHH, vis) {
    for (let i = 0; i < fullHH.length; i++) {
        fullHH[i].style.visibility = vis;
    }
}

// Show or hide all beats
function BeatVisibility(fullBass, fullSnare, vis) {
    if (vis == "hidden") {
        hideAll(fullBass);
        hideAll(fullSnare);
    } else {
        var randomBeat = randBeat();
        var checkedBeat = checkBeatRandom(randomBeat);
        BeatResalt(checkedBeat, fullBass, fullSnare);
    }
}

// Show or hide all fill
function setFill(fullTom1,fullTom2,fullSnare1,fullFloor,vis) {
    if (vis == "hidden") {
        hideAll(fullTom1);
        hideAll(fullTom2);
        hideAll(fullSnare1);
        hideAll(fullFloor);

    } else {
        var randomFill = randFill();
        console.log(randomFill)
     //   var checkedFill = checkBeatRandom(randFill);
        FillResalt(randomFill,fullTom1 ,fullTom2, fullSnare1,fullFloor);
    }
}

function randFill(){
    var randArray = [];
    for (let i = 0; i < size; i++) {
         randArray[i] = Math.floor(Math.random() * 5);
    }
    return randArray;

}

//function checkBeatRandom(randFill){}

function FillResalt(checkedFill,fullTom1 ,fullTom2, fullSnare1,fullFloor){
    for (let i = 0; i < size; i++) {

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

        }else if (checkedFill[i] == 3) {

            fullTom1[i].style.visibility = "hidden";
            fullTom2[i].style.visibility = "hidden";
            fullSnare1[i].style.visibility = "visible";
            fullFloor[i].style.visibility = "hidden";

        }
        else if(checkedFill[i] == 4){

            fullTom1[i].style.visibility = "hidden";
            fullTom2[i].style.visibility = "hidden";
            fullSnare1[i].style.visibility = "hidden";
            fullFloor[i].style.visibility = "visible";

        }
        else{
            fullTom1[i].style.visibility = "hidden";
            fullTom2[i].style.visibility = "hidden";
            fullSnare1[i].style.visibility = "hidden";
            fullFloor[i].style.visibility = "hidden";
        }
    }
}

function BeatResalt(checkedArr, randBass, randSnare) {
    for (let i = 0; i < checkedArr.length; i++) {
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

function hideAll(arr) {
    Array.from(arr).forEach(element => {
        element.style.visibility = "hidden";
    });
}

// Generate random beats
function randBeat() {
    var randArray = [];
    for (let i = 0; i < size; i++) {
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
    for (let i = 0; i < size - 2; i++) {
        if (randArray[i] == randArray[i + 1] && randArray[i + 1] == randArray[i + 2]) {
            if (stackNums.includes(i + 2)) {
                randArray[i] = 0;
            } else {
                randArray[i + 2] = 0;
            }
        }

        if (randArray[size - 2] == randArray[size - 1] && randArray[size - 2] == randArray[0]) {
            randArray[size - 1] = 0;
        }
    }
    return randArray;
}

document.querySelector(".js-play").addEventListener('click', function () {
    var fullHH = generate('HHcontainer', 'HH', 'X');
    var fullSnare = generate('SnareContainer', 'Snare', 'O');
    var fullBass = generate('BassContainer', 'Bass', 'O');

    var fullTom1 = generate('Tom1container', 'Tom1', 'T1');
    var fullTom2 = generate('Tom2container', 'Tom2', 'T2');
    var fullSnare1 = generate('Snare1Container', 'Snare1', 'S');
    var fullFloor = generate('FloorContainer', 'floor', 'F');


    numClick++;

    var vis = numClick % 2 === 0 ? "hidden" : "visible";
    setHHVis(fullHH, vis);
    BeatVisibility(fullBass, fullSnare, vis);
    setFill(fullTom1,fullTom2,fullSnare1,fullFloor,vis)
});

// Generate all parts of the beats
function generate(id, name, text) {
    const container = document.getElementById(id);
    container.innerHTML = '';

    for (let i = 0; i < size; i++) {
        const div = document.createElement('div');
        div.className = name;
        div.textContent = text;
        container.appendChild(div);
    }
    return container.children;
}
