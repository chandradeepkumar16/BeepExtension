document.addEventListener('DOMContentLoaded', function() {
    const startTimerButton = document.getElementById('startTimer');
    startTimerButton.addEventListener('click', function() {
      const title = document.getElementById('title').value;
      const timeInSeconds = parseInt(document.getElementById('time').value, 10);
      if (!title || isNaN(timeInSeconds)) {
        alert('Please enter a valid title and time.');
        return;
      }
  
      chrome.alarms.create(title, { delayInMinutes: timeInSeconds / 60 });
      alert(`Timer set for ${timeInSeconds} seconds.`);
    });
  });
  