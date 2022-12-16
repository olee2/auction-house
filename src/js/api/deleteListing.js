import { apiCall, options } from './index.js';

/**
 * A function for deleting a listing.
 * @param {object} body The body for the api call.
 * @param {number} name The name of the user.
 * @returns An api call.
 */

export const deleteListing = async (id) => {
  const url = `https://nf-api.onrender.com/api/v1/auction/listings/${id}`;
  const method = 'delete';
  return await apiCall(url, options(method));
};
