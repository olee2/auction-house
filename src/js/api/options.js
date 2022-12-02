/**
 * A function for generating options for http requests.
 * @param {string} method The http request method for the api call.
 * @param {object} body An object with the body of the api call.
 * @returns an object with request options.
 */

const options = (method, body) => {
  const headers = {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  if (body) {
    return {
      method,
      body: JSON.stringify(body),
      headers,
    };
  }
  return {
    method,
    headers,
  };
};