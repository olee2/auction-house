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
    return `<span>${Math.ceil(weeks)} weeks</span>`;
  }
  if (days > 1) {
    return `<span>${Math.ceil(days)} days</span>`;
  }
  if (hours > 1) {
    return `<span class="time fw-bold">${Math.ceil(hours)} hours</span>`;
  }
  if (minutes > 1) {
    return `<span class="time fw-bold">${Math.ceil(minutes)} minutes </span>`;
  }
  if (seconds > 1) {
    return `<span class="time fw-bold">Less then a minute</span>`;
  }

  return 'Finished';
};
