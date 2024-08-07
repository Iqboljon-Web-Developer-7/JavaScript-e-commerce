function timer() {
  // Timer
  function startCountdown(duration) {
    const daysElement = document.getElementById("days"),
      hoursElement = document.getElementById("hours"),
      minutesElement = document.getElementById("minutes"),
      secondsElement = document.getElementById("seconds");

    let endTime = Date.now() + duration * 1000;

    function updateTimer() {
      let timeLeft = endTime - Date.now();
      if (timeLeft <= 0) {
        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";
        clearInterval(timerInterval);
        return;
      }

      let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      days = String(days).padStart(2, "0");
      hours = String(hours).padStart(2, "0");
      minutes = String(minutes).padStart(2, "0");
      seconds = String(seconds).padStart(2, "0");

      daysElement.innerHTML = days;
      hoursElement.innerHTML = hours;
      minutesElement.innerHTML = minutes;
      secondsElement.innerHTML = seconds;
    }

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
  }

  // Start a countdown of 1 day (86400 seconds)
  startCountdown(440000);

  // Timer - - - |
}

export default timer;
