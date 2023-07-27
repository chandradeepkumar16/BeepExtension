let alarmRunning = false;
let alarmInterval;
const beep = new Audio("beep.mp3");

chrome.alarms.onAlarm.addListener(function (alarm) {
  if (alarmRunning) {
    beep.play();
    alarmInterval = setInterval(function () {
      beep.play();
    }, 3000); // Play the beep every 3 seconds (adjust this as needed)
  }
});

function startAlarm(timeInSeconds) {
  const title = "Timer";

  if (!alarmRunning) {
    chrome.alarms.create(title, { delayInMinutes: timeInSeconds / 60 });
    alarmRunning = true;
  }
}

function stopAlarm() {
  const title = "Timer";
  if (alarmRunning) {
    chrome.alarms.clear(title);
    alarmRunning = false;
    clearInterval(alarmInterval);
    beep.pause();
    beep.currentTime = 0;
  }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "start") {
    startAlarm(request.time);
  } else if (request.message === "stop") {
    stopAlarm();
  }
});
