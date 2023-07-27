document.addEventListener("DOMContentLoaded", function () {
  const startTimerButton = document.getElementById("startTimer");
  const stopTimerButton = document.getElementById("stopTimer");
  const timerContainer = document.getElementById("timer");
  let countdown; // Define the countdown variable outside the functions

  startTimerButton.addEventListener("click", function () {
    const timeInSeconds = parseInt(document.getElementById("time").value, 10);
    if (!isNaN(timeInSeconds) && timeInSeconds > 0) {
      chrome.runtime.sendMessage({ message: "start", time: timeInSeconds });
      // startCountdown(timeInSeconds);
    }
  });

  stopTimerButton.addEventListener("click", function () {
    chrome.runtime.sendMessage({ message: "stop" });
    // stopCountdown();
  });
});
