/**
 * Filtering out inactive listings
 * @param {Array} listings Array of listings
 * @returns Array of active listings
 */

const filterFinished = (listings) => {
  return listings.filter((item) => {
    const { endsAt } = item;
    const now = new Date().getTime();
    const then = new Date(endsAt).getTime();

    if (then - now > 0) {
      return item;
    }
  });
};
