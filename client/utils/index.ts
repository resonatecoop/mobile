function padWithZero(number: number) {
  const string = String(number);
  if (number < 10) {
    return "0" + string;
  }
  return string;
}

export function getMMSSFromMillis(milliseconds: number) {
  const totalSeconds = milliseconds / 1000;
  const seconds = Math.floor(totalSeconds % 60);
  const minutes = Math.floor(totalSeconds / 60);

  return padWithZero(minutes) + ":" + padWithZero(seconds);
}
