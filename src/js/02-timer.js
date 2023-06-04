// // // import flatpickr from 'flatpickr';
// // // import 'flatpickr/dist/flatpickr.min.css';
// // // import Notiflix from 'notiflix';
// // // import flatpickr from 'flatpickr';

// // // const options = {
// // //   enableTime: true,
// // //   time_24hr: true,
// // //   defaultDate: new Date(),
// // //   minuteIncrement: 1,
// // //   onClose(selectedDates) {
// // //     const selectedDate = selectedDates[0];
// // //     if (selectedDate < new Date()) {
// // //       Notiflix.Notify.warning('Please choose a date in the future');
// // //       document.querySelector('[data-start]').disabled = true;
// // //     } else {
// // //       document.querySelector('[data-start]').disabled = false;
// // //     }
// // //   },
// // // };

// // // flatpickr('#datetime-picker', options);

// // // function convertMs(ms) {
// // //   const second = 1000;
// // //   const minute = second * 60;
// // //   const hour = minute * 60;
// // //   const day = hour * 24;

// // //   const days = Math.floor(ms / day);
// // //   const hours = Math.floor((ms % day) / hour);
// // //   const minutes = Math.floor(((ms % day) % hour) / minute);
// // //   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

// // //   return { days, hours, minutes, seconds };
// // // }

// // // function addLeadingZero(value) {
// // //   return value.toString().padStart(2, '0');
// // // }

// // // const startButton = document.querySelector('[data-start]');
// // // const daysValue = document.querySelector('[data-days]');
// // // const hoursValue = document.querySelector('[data-hours]');
// // // const minutesValue = document.querySelector('[data-minutes]');
// // // const secondsValue = document.querySelector('[data-seconds]');

// // // let countdownIntervalId;

// // // startButton.addEventListener('click', function () {
// // //   const selectedDate = flatpickr.parseDate(
// // //     document.querySelector('#datetime-picker').value
// // //   );
// // //   const currentDate = new Date();

// // //   if (selectedDate <= currentDate) {
// // //     Notiflix.Notify.warning('Please choose a date in the future');
// // //     return;
// // //   }

// // //   const timeRemaining = selectedDate.getTime() - currentDate.getTime();

// // //   clearInterval(countdownIntervalId);

// // //   countdownIntervalId = setInterval(function () {
// // //     const time = convertMs(timeRemaining);

// // //     daysValue.textContent = addLeadingZero;
// // //   });
// // // });

// // import flatpickr from 'flatpickr';
// // import Notiflix from 'notiflix';

// // const datePicker = document.getElementById('datetime-picker');
// // const startButton = document.querySelector('[data-start]');
// // const daysElement = document.querySelector('[data-days]');
// // const hoursElement = document.querySelector('[data-hours]');
// // const minutesElement = document.querySelector('[data-minutes]');
// // const secondsElement = document.querySelector('[data-seconds]');

// // let countdownInterval;

// // function startCountdown() {
// //   const selectedDate = new Date(datePicker.value);
// //   const currentDate = new Date();

// //   if (selectedDate <= currentDate) {
// //     Notiflix.Notify.warning('Please choose a date in the future');
// //     return;
// //   }

// //   startButton.disabled = true;

// //   countdownInterval = setInterval(() => {
// //     const remainingTime = selectedDate - new Date();
// //     if (remainingTime <= 0) {
// //       clearInterval(countdownInterval);
// //       updateTimerDisplay(0, 0, 0, 0);
// //       Notiflix.Notify.success('Countdown finished');
// //       return;
// //     }

// //     const { days, hours, minutes, seconds } = convertMs(remainingTime);
// //     updateTimerDisplay(days, hours, minutes, seconds);
// //   }, 1000);
// // }

// // function updateTimerDisplay(days, hours, minutes, seconds) {
// //   daysElement.textContent = addLeadingZero(days);
// //   hoursElement.textContent = addLeadingZero(hours);
// //   minutesElement.textContent = addLeadingZero(minutes);
// //   secondsElement.textContent = addLeadingZero(seconds);
// // }

// // function convertMs(ms) {
// //   const second = 1000;
// //   const minute = second * 60;
// //   const hour = minute * 60;
// //   const day = hour * 24;

// //   const days = Math.floor(ms / day);
// //   const hours = Math.floor((ms % day) / hour);
// //   const minutes = Math.floor(((ms % day) % hour) / minute);
// //   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

// //   return {
// //     days,
// //     hours,
// //   };
// // }






import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

let countdownIntervalId;

const convertMs = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const addLeadingZero = value => {
  return value.toString().padStart(2, '0');
};

const updateTimer = time => {
  daysValue.textContent = addLeadingZero(time.days);
  hoursValue.textContent = addLeadingZero(time.hours);
  minutesValue.textContent = addLeadingZero(time.minutes);
  secondsValue.textContent = addLeadingZero(time.seconds);
};

const startCountdown = endTime => {
  countdownIntervalId = setInterval(() => {
    const currentTime = Date.now();
    const timeRemaining = endTime - currentTime;

    if (timeRemaining <= 0) {
      clearInterval(countdownIntervalId);
      updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const time = convertMs(timeRemaining);
    updateTimer(time);
  }, 1000);
};

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: function (selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
      window.alert('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
      startButton.addEventListener('click', () => {
        startCountdown(selectedDate.getTime());
        startButton.disabled = true;
      });
    }
  },
});
