import { getListings } from '../api/index.js';
import { createCard, replaceErrorImg } from '../components/index.js';

const listingsContainer = document.querySelector('.listings-container');

const main = async () => {
  const listings = await getListings();

  listingsContainer.innerHTML = listings
    .map((listing) => createCard(listing))
    .join('');
  replaceErrorImg();
};

main();
