import { apiCall, options } from './index.js';

/**
 * A function for fetching a user
 * @param {string} name Name of the user
 * @returns An object with the user details
 */

export const getUserFromApi = async (name) => {
  const url = `https://nf-api.onrender.com/api/v1/auction/profiles/${name}?_listings=true`;
  const apiUser = await apiCall(url, options());
  return apiUser;
};

export const getUsersListings = async (name) => {
  const url = `https://nf-api.onrender.com/api/v1/auction/profiles/${name}/listings?_bids=true`;
  const apiUser = await apiCall(url, options());
  return apiUser;
};