export function getRandomNumberBetween(min, max, decimals = 0) {
  const multiplier = 10 ** decimals;

  return Math.round(multiplier * (Math.random() * (max - min) + min)) / multiplier
}
