import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  btnStart: document.querySelector('[data-start]'),
  counterDays: document.querySelector('[data-days]'),
  counterHour: document.querySelector('[data-hours]'),
  counterMin: document.querySelector('[data-minutes]'),
  counterSec: document.querySelector('[data-seconds]'),
};
refs.btnStart.disabled = true;
const currentTime = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] < currentTime) {
      Notiflix.Report.failure(
        ' ☹️Something goes wrong...',
        '"Please choose a date in the future."',
        'Okay'
      );
      refs.btnStart.disabled = true;
    } else {
      refs.btnStart.disabled = false;
    }
  },
};

const inputDate = flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

refs.btnStart.addEventListener('click', onStart);

let counter = null;

function onStart() {
  const timerId = setInterval(() => {
    const userSelectDate = inputDate.selectedDates[0];
    const currentTime = new Date();
    const counter = userSelectDate - currentTime;

    if (counter < 0) {
      clearInterval(timerId);
      return Notiflix.Report.success('Time is over!', '', 'Okay');
    }

    updateTimer(convertMs(counter));
  }, 1000);

  refs.btnStart.disabled = true;
}

function updateTimer({ days, hours, minutes, seconds }) {
  refs.counterDays.textContent = addLeadingZero(days);
  refs.counterHour.textContent = addLeadingZero(hours);
  refs.counterMin.textContent = addLeadingZero(minutes);
  refs.counterSec.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
