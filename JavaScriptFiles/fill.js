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