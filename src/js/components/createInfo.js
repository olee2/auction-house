import { timeLeft, isLoggedIn } from './index.js';
import { getUser } from '../storage/index.js';

export const createInfo = (listing) => {
  const {email: userEmail} = getUser();
  
  console.log(listing)
  const {
    title,
    description,
    endsAt,
    _count: { bids: numBids },
    seller: {email: sellerEmail},
    bids,
  } = listing;

  let sortedBids = bids.sort((a, b) => a.amount - b.amount);

  const currentBid = sortedBids.length
    ? sortedBids[sortedBids.length - 1].amount
    : 0;

  console.log(sortedBids);

  const disabled = () => {
    if(!isLoggedIn){
      return 'disabled'
    }else if(userEmail === sellerEmail){
      return 'disabled'
    }else{
      return ''
    }
  }


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
            </div>`;
};
