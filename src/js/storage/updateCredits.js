import { getUser, storeUser } from './index.js';
import { getUserFromApi } from '../api/index.js';

/**
 * A function for updating the user in localstorage with the correct amount of credits.
 */

export const updateCredits = async () => {
  const localUser = getUser();
  const name = localUser.name;
  const updatedUser = await getUserFromApi(name);
  const credits = updatedUser.credits;
  storeUser({ ...localUser, credits });
};
