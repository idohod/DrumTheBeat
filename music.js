var numClick = 0;
const size = 16;

function setHHVis(fullHH, vis) {
    for (let i = 0; i < fullHH.length; i++) {
        fullHH[i].style.visibility = vis;
    }
}

// Show or hide all beats
function setArrVis(fullBass, fullSnare, vis) {
    if (vis == "hidden") {
        hideAll(fullBass);
        hideAll(fullSnare);
    } else {
        var randArr = randArray();
        var checkedArr = checkRandom(randArr);
        setResalt(checkedArr, fullBass, fullSnare);
    }
}

function setResalt(checkedArr, randBass, randSnare) {
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
function randArray() {
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
function checkRandom(randArray) {
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

    numClick++;

    var vis = numClick % 2 === 0 ? "hidden" : "visible";
    setHHVis(fullHH, vis);
    setArrVis(fullBass, fullSnare, vis);
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
