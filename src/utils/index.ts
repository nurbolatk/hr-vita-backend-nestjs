import * as dayjs from 'dayjs';
import 'dayjs/locale/ru';
import * as LF from 'dayjs/plugin/localizedFormat';
dayjs.extend(LF);

dayjs.locale('ru');

export function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

export function displayDay(date: Date) {
  const day = dayjs(date);
  return day.format('LL');
}

export function displayTime(date: Date) {
  const day = dayjs(date);
  return day.format('HH:mm');
}
