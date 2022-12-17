import { getUser } from '../storage/index.js';

/**
 * Function for verifying if the user is logged in.
 * @returns Either true or false.
 */

export const isLoggedIn = () => {
  const user = getUser();
  return user ? true : false;
};
