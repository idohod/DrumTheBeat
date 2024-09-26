const SIZE = 16;
var flag;
var level;

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
document.getElementById("playAgain").addEventListener('click', function () {
    toPauseAll = false;

    if (randomBeat == null || easyBeat == null) {
        errorrMassage.innerHTML = "must enter BPM and chose level first!";
        return;
    }
    else
        errorrMassage.innerHTML = ''
    if (!stillPlaying)
        difficlty(level, true);
});

document.getElementById("beginner").addEventListener('click', function () {
    level = "beginner";
    toPauseAll = false;

    if (!stillPlaying)
        difficlty(level, false);
});

document.getElementById("advance").addEventListener('click', function () {
    level = "advance";
    toPauseAll = false;

    if (!stillPlaying)
        difficlty(level, false);
});

document.getElementById("expert").addEventListener('click', function () {
    level = "Expert";
    toPauseAll = false;

    if (!stillPlaying)
        difficlty(level, false);

});

document.getElementById("clear").addEventListener('click', function () {

    var tmp = genBeat();
    for (i = 0; i < tmp.length; i++)
        hideAll(tmp[i]);

    var temp = genAdvanceOrExpert();
    for (i = 0; i < temp.length; i++)
        hideAll(temp[i]);

    toPauseAll = true;
    stillPlaying = false;

    clearInterval(beatInterval);
    clearInterval(fillInterval);
    theMarker.style.transform = `translateX(0px) translateY(0px)`;
    theMarker.style.visibility = "hidden";
});
//"MAIN"
function difficlty(level, flag) {

    var BPM = getBMP();
    if (BPM == 0)
        return;

    if (level == "beginner")
        var allFill = genBegginer();
    else
        var allFill = genAdvanceOrExpert();

    var theFill = setFill(allFill[0], allFill[1], allFill[2], allFill[3], level, flag);

    var allBeat = genBeat();
    setHHVis(allBeat[0], level);
    BeatVisibility(allBeat[1], allBeat[2], level, flag, theFill);
}