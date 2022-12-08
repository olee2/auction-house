import { apiCall } from './index.js';

export const getListings = async (order) => {
  order === '' ? (order = 'desc') : null;

  const url = `https://nf-api.onrender.com/api/v1/auction/listings?_bids=true&_active=true`;

  const data = await apiCall(url);

  return data;
};
