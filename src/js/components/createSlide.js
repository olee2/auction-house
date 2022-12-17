/**
 * Generating a slide for product slider.
 * @param {strin} img
 * @param {string} title
 * @returns Html for a slide.
 */

export const createSlide = (img, title) => {
  return `<div class="carousel-item">
      <img src=${img} alt=${title}  onerror="this.src='./assets/img/placeholder.jpg'" />
    </div>`;
};
