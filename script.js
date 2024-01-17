let timer;
let isRunning = false;
let startTime;
let laps = [];

function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now() - (laps.length > 0 ? laps[laps.length - 1] : 0);
        timer = setInterval(updateTime, 1000); 
        isRunning = true;
        document.getElementById("laps").innerHTML = ""; 
    }
}

function pauseStopwatch() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    }
}

function resetStopwatch() {
    clearInterval(timer);
    isRunning = false;
    document.getElementById("display").innerText = "00:00:00"; 
    startTime = 0;
    laps = [];
    document.getElementById("laps").innerHTML = "";
}

function lapTime() {
    if (isRunning) {
        recordLap();
    }
}

function recordLap() {
    const lapTime = Date.now() - startTime;
    laps.push(lapTime);
    displayLaps();
    document.getElementById("results").style.display = "block";
}

function displayLaps() {
    const lapsTable = document.getElementById("laps");
    lapsTable.innerHTML = "";

    laps.forEach((lap, index) => {
        const row = lapsTable.insertRow();
        const lapCell = row.insertCell(0);
        const timeCell = row.insertCell(1);

        lapCell.innerText = index + 1;
        timeCell.innerText = formatTime(lap);
    });
}

function updateTime() {
    const elapsedTime = Date.now() - startTime;
    document.getElementById("display").innerText = formatTime(elapsedTime);
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60);
    const hours = Math.floor(minutes / 60);

    const formattedHours = padZero(hours);
    const formattedMinutes = padZero(minutes);
    const formattedSeconds = padZero(seconds);

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function padZero(number) {
    return number < 10 ? `0${number}` : `${number}`;
}
