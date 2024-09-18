const HHElement = document.getElementById("HHAudio");
const SnareElement = document.getElementById("SnareAudio");
const BassElement = document.getElementById("BassAudio");

const volumes = {
    hhVolume: 0.5,    // 50% volume for Hi-Hat
    snareVolume: 0.5, // 50% volume for Snare
    bassVolume: 1.0   // 100% volume for Bass
};

document.querySelector(".play").addEventListener('click', function () {
   let t = getBMP();
   console.log(t);
});

function getBMP() {

    const input = document.getElementById("BPM");
    var value = Number(input.value);

    let miliSeconds = 60000 / value;
   
    return miliSeconds;

}

function playBeatPattern(beatPattern, interval, level) {
    let i = 0;
    HHElement.volume = volumes.hhVolume;
    SnareElement.volume = volumes.snareVolume;
    BassElement.volume = volumes.bassVolume;

    const playNextBeat = () => {
        HHElement.currentTime = 0; // Reset Hi-Hat to the start

        // Hi-Hat logic
        if (level === "beginner") {
            if (i % 2 === 0) {
                HHElement.play().catch((error) => {
                    console.warn("Error playing Hi-Hat:", error);
                }); // Play Hi-Hat every other beat
            } else {
                HHElement.pause();
            }
        } else {
            HHElement.play().catch((error) => {
                console.warn("Error playing Hi-Hat:", error);
            }); // Play on every beat for other levels
        }

        // Snare and Bass logic based on beat pattern
        if (beatPattern[i] === 2) {
            SnareElement.currentTime = 0;
            SnareElement.play().catch((error) => {
                console.warn("Error playing Snare:", error);
            });   // Play snare on beatPattern[i] = 2
            BassElement.pause();    // Ensure Bass isn't playing
        } else if (beatPattern[i] === 1) {
            BassElement.currentTime = 0;
            BassElement.play().catch((error) => {
                console.warn("Error playing Bass:", error);
            });     // Play bass on beatPattern[i] = 1
            SnareElement.pause();   // Ensure Snare isn't playing
        } else {
            // No hit, pause both
            SnareElement.pause();
            BassElement.pause();
        }

        i++;

        // Stop the loop if the pattern is done
        if (i > beatPattern.length) {
            clearInterval(beatInterval);
            HHElement.pause();
            SnareElement.pause();
            BassElement.pause();
        }
    };

    // Set interval for the beat pattern
    const beatInterval = setInterval(playNextBeat, interval);
}
