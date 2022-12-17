/**
 * A function for logging out user.
 */

export const logOut = () => {
  localStorage.clear();
  location.reload();
};
