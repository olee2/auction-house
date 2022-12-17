import { timeLeft, isLoggedIn } from './index.js';
import { getUser } from '../storage/index.js';

/**
 * A function for generating the html for the information on a specific listing.
 * @param {object} listing
 * @returns Html for info on a specific listing.
 */

export const createInfo = (listing) => {
  const { email: userEmail, credits } = getUser() ? getUser() : { email: '' };

  const {
    title,
    description,
    endsAt,
    _count: { bids: numBids },
    seller: { email: sellerEmail },
    bids,
  } = listing;

  let sortedBids = bids.sort((a, b) => a.amount - b.amount);

  const currentBid = sortedBids.length
    ? sortedBids[sortedBids.length - 1].amount
    : 0;

  // Verifying if the bid form should be active or disabled.
  const disabled = () => {
    if (!isLoggedIn()) {
      return 'disabled';
    } else if (userEmail === sellerEmail) {
      return 'disabled';
    } else if (credits <= currentBid) {
      return 'disabled';
    } else {
      return '';
    }
  };

  // Giving additional information relevant for the bid form.
  const bidOption = () => {
    if (isLoggedIn() && userEmail !== sellerEmail) {
      return `<p class="mt-3">Available Credits: $${credits}</p> ${
        disabled() ? '<p>(Insufficient funds)</p>' : ''
      }`;
    } else if (!isLoggedIn()) {
      return `        
        <p class="login-notice mt-3">
          Please <a href="./login.html">login</a> or
          <a href="./register.html">register</a> to place a bid
        </p>`;
    } else {
      return ``;
    }
  };

  //Verify if it is the logged in users' listing and returns either bid form or btns for edit/delete.
  const isOwnListing = () => {
    if (userEmail === sellerEmail) {
      return `<div class="edit-delete-container">
                <button type="button" class="btn btn-outline-primary delete-listing-btn mb-3">Delete</button>
                <button type="button" class="btn btn-outline-primary edit-listing-btn">Edit</button>
              </div>`;
    } else {
      return ` 
      <form class="d-flex bid-form">
      <input
          ${disabled()}
          type="number"
          class="form-control"
          name="amount"
          id="bid"
          aria-describedby="emailHelp"
          required
          value=${currentBid + 1}
          min=${currentBid + 1}
      />

      <button type="submit" ${disabled()} class="btn btn-secondary">Place bid</button>
      </form>
      ${bidOption()}
  `;
    }
  };

  return ` <div>
                <h1 class="h2 title mb-2">${title}</h1>
                <p class="description mb-5">${
                  description ? description : 'No description available'
                }</p>
            </div>
            <div>
            <div class="row align-items-end">
                <div class="col"> 
                  <div class="mb-3">Time left: ${timeLeft(endsAt)}</div>
                  <p >Current bid: <span class="price">$${currentBid}</span></p></div>
                <div class="col mt-3">${isOwnListing()}</div>
            </div>
               
                
            </div>`;
};
