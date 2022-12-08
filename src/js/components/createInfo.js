import { timeLeft } from './timeLeft.js';

export const createInfo = (listing) => {
  const {
    title,
    description,
    endsAt,
    _count: { bids: numBids },
    bids,
  } = listing;

  console.log(listing);

  const currentBid = bids.length ? bids[bids.length - 1].amount : 0;

  return ` <div class="">
                <h1 class="h3 title mb-2">${title}</h1>
                <p class="description mb-2">${description}</p>
            </div>
            <div class="col-6">
                <p class="time">${timeLeft(endsAt)}</p>
                <p class="mb-2">Current bid: <span class="price">$${currentBid}</span></p>
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
