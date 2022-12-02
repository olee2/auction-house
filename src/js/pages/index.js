import { getListings } from '../api/index.js';
import { createCard, filterFinished } from '../components/index.js';

const listingsContainer = document.querySelector('.listings-container');

const main = async () => {
  const listings = await getListings();
  const onlyActive = filterFinished(listings);

  const latest = onlyActive.slice(0, 40);
  console.log(latest);

  listingsContainer.innerHTML = latest
    .map((listing) => createCard(listing))
    .join('');
};

main();
