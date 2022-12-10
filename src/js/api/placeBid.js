import { apiCall, options } from './index.js';

/**
 * A function for making a bid on a listing.
 * @param {object} body The body for the api call.
 * @param {number} id The id of the post.
 * @returns An api call.
 */

export const placeBid = async (body, id) => {
  const url = `https://nf-api.onrender.com/api/v1/auction/listings/${id}/bids`;
  const method = 'post';
  return await apiCall(url, options(method, body));
};
