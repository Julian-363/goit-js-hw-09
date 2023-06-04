function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.querySelector('[data-start]');
  const stopButton = document.querySelector('[data-stop]');
  let intervalId;

  function startColorSwitching() {
    startButton.disabled = true;
    intervalId = setInterval(function () {
      const randomColor = getRandomHexColor();
      document.body.style.backgroundColor = randomColor;
    }, 1000);
  }

  function stopColorSwitching() {
    startButton.disabled = false;
    clearInterval(intervalId);
  }

  startButton.addEventListener('click', startColorSwitching);
  stopButton.addEventListener('click', stopColorSwitching);
});
