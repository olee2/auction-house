import { getListings } from '../api/index.js';
import { createCard } from '../components/index.js';

const listingsContainer = document.querySelector('.listings-container');

const main = async () => {
  const listings = await getListings();

  const latest = listings;
  console.log(latest);

  listingsContainer.innerHTML = latest
    .map((listing) => createCard(listing))
    .join('');
};

main();
