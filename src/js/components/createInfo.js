import { timeLeft, isLoggedIn } from './index.js';
import { getUser } from '../storage/index.js';

export const createInfo = (listing) => {
  const { email: userEmail, credits } = getUser() ? getUser() : { email: '' };

  console.log(credits);

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

  const disabled = () => {
    if (!isLoggedIn()) {
      return 'disabled';
    } else if (userEmail === sellerEmail) {
      return 'disabled';
    } else {
      return '';
    }
  };

  const bidOption = () => {
    if (isLoggedIn() && userEmail !== sellerEmail) {
      return `<p class="mt-3">Available Credits: $${credits}</p>`;
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
