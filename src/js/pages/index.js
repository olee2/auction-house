import { getListings } from '../api/index.js';
import { createCard } from '../components/createListing.js';

const listingsContainer = document.querySelector('.listings-container');

const filterFinished = (listings) => {
  return listings.filter((item) => {
    const { endsAt } = item;
    const then = new Date(endsAt);
    if (then > 0) {
      return item;
    }
  });
};

const main = async () => {
  const listings = await getListings();
  const onlyActive = filterFinished(listings);

  const latest = onlyActive.slice(0, 40);

  listingsContainer.innerHTML = latest
    .map((listing) => createCard(listing))
    .join('');
};

main();
