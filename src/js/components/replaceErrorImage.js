/**
 * This function will replace image links that trigger an error with a placeholder image.
 */

export const replaceErrorImg = () => {
  const images = document.querySelectorAll('img');
  images.forEach((img) => {
    img.addEventListener('error', (e) => {
      e.target.src = './assets/img/placeholder.jpg';
    });
  });
};
