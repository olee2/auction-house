import { getListings } from '../api/index.js';
import { createCard, replaceErrorImg } from '../components/index.js';

const listingsContainer = document.querySelector('.listings-container');
const searchField = document.querySelector('.search-field');
const searchForm = document.querySelector('.search-form');

const main = async () => {
  let listings = await getListings();
  console.log(listings);
  if (searchField.value) {
    listings = listings.filter((listing) => {
      return (
        listing.title.search(searchField.value) > -1 ||
        listing.tags.includes(searchField.value)
      );
    });
  }

  listingsContainer.innerHTML = listings
    .map((listing) => createCard(listing))
    .join('');
  replaceErrorImg();
};

searchForm.onsubmit = async (e) => {
  e.preventDefault();
  await main();
  searchForm.reset();
};

main();
