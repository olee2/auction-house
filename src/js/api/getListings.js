import { apiCall } from './index.js';

export const getListings = async (sort) => {
  const url = `https://nf-api.onrender.com/api/v1/auction/listings?_bids=true&_active=true&${sort}`;

  const data = await apiCall(url);

  return data;
};
