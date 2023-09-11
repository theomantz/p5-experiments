export function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function getRandomIndexOfArray(length: number) {
  return Math.floor(Math.random() * length);
}
