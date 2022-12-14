import { apiCall, options } from './index.js';

/**
 * A function for updating the profile avatar
 * @param {object} body The body for the api call.
 * @param {number} name The name of the user.
 * @returns An api call.
 */

export const updateProfile = async (body, name) => {
  const url = `https://nf-api.onrender.com/api/v1/auction/profiles/${name}/media`;
  const method = 'put';
  return await apiCall(url, options(method, body));
};
