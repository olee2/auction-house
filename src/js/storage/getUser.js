/**
 * Function for retrieving the user's information (name, token etc.) from local storage.
 * @returns An object with the user's information.
 */

export const getUser = () => {
  return JSON.parse(localStorage.getItem('credentials'));
};
