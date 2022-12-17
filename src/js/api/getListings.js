import { apiCall } from './index.js';

/**
 *
 * @param {string} sort string with specification on how to sort.
 * @returns an API Call
 */

export const getListings = async (sort) => {
  const url = `https://nf-api.onrender.com/api/v1/auction/listings?_bids=true&_active=true&${sort}`;

  return await apiCall(url);
};
