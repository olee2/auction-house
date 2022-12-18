import { getListings } from '../api/index.js';
import { createCard, setLoader, errorHtml } from '../components/index.js';
import { getError } from '../storage/index.js';

const listingsContainer = document.querySelector('.listings-container');
const searchField = document.querySelector('.search-field');
const searchForm = document.querySelector('.search-form');
const sort = document.querySelector('#sort');

sort.onchange = (e) => {
  e.target.value ? main() : null;
};

const main = async () => {
  listingsContainer.innerHTML = setLoader();
  try {
    let listings = await getListings(sort.value);
    if (searchField.value) {
      listings = listings.filter((listing) => {
        return (
          listing.title.search(searchField.value) > -1 ||
          listing.tags.includes(searchField.value)
        );
      });
    }

    if (!listings.length) {
      listingsContainer.innerHTML =
        '<p class="fw-bold ">No such listing found. Please try another search.</p>';
    } else {
      listingsContainer.innerHTML = listings
        .map((listing) => createCard(listing))
        .join('');
    }
  } catch (error) {
    listingsContainer.innerHTML = errorHtml(
      'An error occured. Please wait a while and try again.'
    );
  }
};

searchForm.onsubmit = async (e) => {
  e.preventDefault();
  await main();
  searchForm.reset();
};

main();
