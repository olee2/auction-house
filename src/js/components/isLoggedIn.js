import { getUser } from '../storage/index.js';

export const isLoggedIn = () => {
  const user = getUser();
  return user ? true : false;
};
