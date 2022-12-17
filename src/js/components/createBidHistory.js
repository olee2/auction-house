/**
 * A function for generating html for listing bids on a listing.
 * @param {array} bids Array of bids on the listing.
 * @returns HTML for each of the bids.
 */

export const bidHistory = (bids) => {
  return bids
    .map((bid) => {
      const { bidderName, amount } = bid;
      return `<p class="mt-1">${bidderName} ($${amount})</p>`;
    })
    .join('');
};
