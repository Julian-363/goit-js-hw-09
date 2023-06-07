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
      setTimeout(() => {
        reject({ position, delay });
      }, delay);
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

  function processPromise(position) {
    if (position <= amount) {
      const delay = firstDelay + (position - 1) * delayStep;

      createPromise(position, delay)
        .then(({ position, delay }) => {
          const message = `✅ Fulfilled promise ${position} in ${delay}ms<br>`;
          outputDiv.innerHTML += message;
          processPromise(position + 1); // Llamar recursivamente para procesar la siguiente promesa
        })
        .catch(({ position, delay }) => {
          const message = `❌ Rejected promise ${position} in ${delay}ms<br>`;
          outputDiv.innerHTML += message;
          processPromise(position + 1); // Llamar recursivamente para procesar la siguiente promesa
        });
    }
  }

  processPromise(1); // Comenzar el proceso con la primera promesa

  form.reset();
}

form.addEventListener('submit', handleSubmit);
