import { timeLeft } from './timeLeft.js';

/**
 * A function for generating card html for a given listing.
 * @param {object} listing
 * @returns HTML for a card with a listing.
 */

export const createCard = (listing) => {
  const {
    id,
    title,
    endsAt,
    media,
    _count: { bids: numBids },
    bids,
  } = listing;

  const currentBid = bids.length ? bids[bids.length - 1].amount : 0;

  const image = media.length ? media[0] : './assets/img/placeholder.jpg';

  return `
             <a href="/product.html?id=${id}" class="card slide">
                <img src=${image} alt="" onerror="this.src='./assets/img/placeholder.jpg'" />
                <div class="product-info">
                    <h3 class="card__title">${title}</h3>
                    ${timeLeft(endsAt)}
                    <p class="card__bids">${numBids} bids</p>
                    <p class="card__price">$${currentBid}</p>
                </div>
            </a>
  
  `;
};
