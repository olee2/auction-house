/**
 * Function for retrieving the error that was saved by the api call.
 * @returns An object with the error information.
 */

export const getError = () => {
  return JSON.parse(localStorage.getItem('error'));
};
