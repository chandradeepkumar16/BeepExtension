chrome.alarms.onAlarm.addListener(function(alarm) {
    const beep = new Audio('beep.mp3');
    beep.play();
  });
  