document.addEventListener("DOMContentLoaded", function () {
  const startTimerButton = document.getElementById("startTimer");
  const stopTimerButton = document.getElementById("stopTimer");
  const timerContainer = document.getElementById("timer");
  let countdown; // Define the countdown variable outside the functions

  chrome.runtime.sendMessage({ message: "getTimers" }, function (response) {
    displayTimers(response.timers);
  });

  startTimerButton.addEventListener("click", function () {
    const timeInSeconds = parseInt(document.getElementById("time").value, 10);
    if (!isNaN(timeInSeconds) && timeInSeconds > 0) {
      chrome.runtime.sendMessage({ message: "start", time: timeInSeconds });
      startCountdown(timeInSeconds);
    }
  });

  stopTimerButton.addEventListener("click", function () {
    chrome.runtime.sendMessage({ message: "stop" });
    stopCountdown();
  });

  function startCountdown(timeInSeconds) {
    let timer = timeInSeconds;
    updateTimerDisplay(timerContainer, timer);

    countdown = setInterval(function () {
      // Assign the interval to the global countdown variable
      timer--;
      updateTimerDisplay(timerContainer, timer);

      if (timer === 0) {
        clearInterval(countdown);
      }
    }, 1000);
  }

  function stopCountdown() {
    timerContainer.textContent = "00:00";
    clearInterval(countdown); // Clear the interval when stopping the countdown
  }

  function updateTimerDisplay(container, timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    const formattedTime = `${padZero(minutes)}:${padZero(seconds)}`;
    container.textContent = formattedTime;
  }

  function padZero(num) {
    return num.toString().padStart(2, "0");
  }
});
