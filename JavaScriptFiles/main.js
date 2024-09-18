const SIZE = 16;


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
function hideAll(arr) {
    Array.from(arr).forEach(element => {
        element.style.visibility = "hidden";
    });
}


document.getElementById("beginner").addEventListener('click', function () {

    difficlty("beginner");
});

document.getElementById("advance").addEventListener('click', function () {

    difficlty("advance");
});

document.getElementById("expert").addEventListener('click', function () {

    difficlty("Expert");
});

document.getElementById("clear").addEventListener('click', function () {

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
    BeatVisibility(allBeat[1], allBeat[2], level);
    setFill(allFill[0], allFill[1], allFill[2], allFill[3], level);
}