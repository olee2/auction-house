export const createSlide = (img, title) => {
  return `<div class="carousel-item">
      <img src=${img} alt=${title} />
    </div>`;
};
