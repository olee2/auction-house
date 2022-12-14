import { getUser, storeUser } from './index.js';
import { getUserFromApi } from '../api/index.js';

/**
 * A function for updating the user in localstorage with the correct amount of credits and current avatar img.
 */

export const updateUser = async () => {
  const localUser = getUser();
  const name = localUser.name;
  const updatedUser = await getUserFromApi(name);
  const { credits, avatar } = updatedUser;
  storeUser({ ...localUser, credits, avatar });
  location.reload();
};
