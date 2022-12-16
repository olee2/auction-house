import { apiCall, options } from './index.js';

/**
 * A function for creating a listing
 * @param {string} name Name of the user
 * @returns An object with the user details
 */

export const createListing = async (body) => {
  const url = `https://nf-api.onrender.com/api/v1/auction/listings`;
  const method = 'post';
  const apiUser = await apiCall(url, options(method, body));
  return apiUser;
};
