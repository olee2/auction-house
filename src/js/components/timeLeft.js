export const timeLeft = (time) => {
  const now = new Date().getTime();
  const then = new Date(time).getTime();

  // Time left in seconds
  const seconds = (then - now) / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const weeks = days / 7;

  if (weeks > 1) {
    return `<p>${Math.ceil(weeks)} weeks left</p>`;
  }
  if (days > 1) {
    return `<p>${Math.ceil(days)} days left</p>`;
  }
  if (hours > 1) {
    return `<p class="time fw-bold">${Math.ceil(hours)} hours left</p>`;
  }
  if (minutes > 1) {
    return `<p class="time fw-bold">${Math.ceil(minutes)} minutes left</p>`;
  }
  return `<p class="">Less then a minute left</p>`;
};
