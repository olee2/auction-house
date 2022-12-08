import { timeLeft } from './timeLeft.js';

export const createInfo = (listing) => {
  const {
    title,
    description,
    endsAt,
    _count: { bids: numBids },
    bids,
  } = listing;

  const currentBid = bids.length ? bids[bids.length - 1].amount : 0;

  return ` <div>
                <h1 class="h2 title mb-2">${title}</h1>
                <p class="description mb-5">${
                  description ? description : 'No description available'
                }</p>
            </div>
            <div>
                <div class="mb-3" >${timeLeft(endsAt)}</div>
                <p class="mb-3">Current bid: <span class="price">$${currentBid}</span></p>
                <form class="d-flex bid-form">
                <div class="form-control">
                <label for="bid">$</label>
                <input
                    type="number"
                    class=""
                    id="bid"
                    aria-describedby="emailHelp"
                    value=${currentBid + 1}
                    min=${currentBid + 1}
                />
                </div>
                <button type="submit" class="btn btn-secondary">Place bid</button>
                </form>
            </div>`;
};
