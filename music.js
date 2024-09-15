var numClick = 0;
const size = 16;

function combineHHArrays() {

    var HH = document.querySelectorAll(".HH")
    var HH1 = document.querySelectorAll(".HH1")
    var HH2 = document.querySelectorAll(".HH2")
    var HH3 = document.querySelectorAll(".HH3")

    return [...HH, ...HH1, ...HH2, ...HH3];
}

function combineSnareArrays() {

    var snares = document.querySelectorAll(".Snare")
    var snares1 = document.querySelectorAll(".Snare1")
    var snares2 = document.querySelectorAll(".Snare2")
    var snares3 = document.querySelectorAll(".Snare3")

    return [...snares, ...snares1, ...snares2, ...snares3];
}
function combineBassArrays() {

    var basses = document.querySelectorAll(".Bass")
    var basses1 = document.querySelectorAll(".Bass1")
    var basses2 = document.querySelectorAll(".Bass2")
    var basses3 = document.querySelectorAll(".Bass3")

    return [...basses, ...basses1, ...basses2, ...basses3];
}


function setHHVis(fullHH, vis) {

    for (i = 0; i < fullHH.length; i++)
        fullHH[i].style.visibility = vis

};

function setArrVis(fullBass, fullSnare, vis) {

    if (vis == "hidden") {
        hideAll(fullBass)
        hideAll(fullSnare)
    }
    else {
        var randArr = randArray()
       var checkedArr = checkRandom(randArr)

        setResalt(checkedArr, fullBass, fullSnare)
    }
};

function setResalt(randArray, randBass, randSnare) {

    for (i = 0; i < randArray.length; i++) {
        if (randArray[i] == 1) {
            randSnare[i].style.visibility = "hidden"
            randBass[i].style.visibility = "visible"
        } else if (randArray[i] == 2) {
            randSnare[i].style.visibility = "visible"
            randBass[i].style.visibility = "hidden"
        } else {
            randBass[i].style.visibility = "hidden"
            randBass[i].style.visibility = "hidden"
        }
    }
}
function hideAll(arr) {
    arr.forEach(element => {
        element.style.visibility = "hidden"
    });

}

function randArray() {

    var randArray = []
    for (i = 0; i < size; i++) {
        if (i == 0 || i == 8)
            randArray[i] = 1
        else if (i == 4 || i == 12)
            randArray[i] = 2
        else
            randArray[i] = Math.floor(Math.random() * 3)
    }
    return randArray
}


function checkRandom(randArray){

    stackNums = [4,8,12]
    for (i=0;i<size - 2;i++){

       if(randArray[i] == randArray[i + 1] && randArray[i + 1] == randArray[i + 2]){
          if(i + 2 in stackNums)
            randArray[i] = 0
          else
          randArray[i + 2] = 0
       }
       
       if(randArray[size - 2] == randArray[size - 1] && randArray[size - 2] == randArray[0])
             randArray[size - 1] = 0

    }
    return randArray
}

document.querySelector(".js-play").addEventListener('click', function () {
    var fullHH = combineHHArrays()
    var fullSnare = combineSnareArrays()
    var fullBass = combineBassArrays()

    numClick++

    var vis = numClick % 2 === 0 ? "hidden" : "visible"
    setHHVis(fullHH, vis)
    setArrVis(fullBass, fullSnare, vis)

    checkVisibility(fullHH,tooltip)
    checkVisibility(fullSnare,tooltip1)
    checkVisibility(fullBass,tooltip2)


});
