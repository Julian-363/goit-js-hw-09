const form = document.querySelector('.form');
const outputDiv = document.getElementById('output');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      setTimeout(() => {
        resolve({ position, delay });
      }, delay);
    } else {
      reject({ position, delay });
    }
  });
}

function handleSubmit(event) {
  event.preventDefault();

  const delayInput = document.querySelector('input[name="delay"]');
  const stepInput = document.querySelector('input[name="step"]');
  const amountInput = document.querySelector('input[name="amount"]');

  const firstDelay = parseInt(delayInput.value);
  const delayStep = parseInt(stepInput.value);
  const amount = parseInt(amountInput.value);

  outputDiv.innerHTML = ''; // Limpiar el contenido anterior

  for (let i = 1; i <= amount; i++) {
    const delay = firstDelay + (i - 1) * delayStep;

    createPromise(i, delay)
      .then(({ position, delay }) => {
        const message = `✅ Fulfilled promise ${position} in ${delay}ms<br>`;
        outputDiv.innerHTML += message;
      })
      .catch(({ position, delay }) => {
        const message = `❌ Rejected promise ${position} in ${delay}ms<br>`;
        outputDiv.innerHTML += message;
      });
  }

  form.reset();
}

form.addEventListener('submit', handleSubmit);
