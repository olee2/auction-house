import {
  getUsersListings,
  updateProfile,
  createListing,
} from '../api/index.js';
import { getUser, updateUser, getError } from '../storage/index.js';
import {
  createProfile,
  createCard,
  isLoggedIn,
  errorHtml,
  setLoader,
} from '../components/index.js';

if (!isLoggedIn()) {
  location.assign('login.html');
}

updateUser();

const user = getUser();
const { name } = user;

const profileContainer = document.querySelector('.profile-container');
const listingsContainer = document.querySelector('.profile-listings');

profileContainer.innerHTML = createProfile(user);

const createListingBtn = document.querySelector('.create-listing-btn');
const createListingModal = document.querySelector('.create-listing-modal');
const createListingForm = document.querySelector('.create-listing-form');
const createListingClose = document.querySelector('.create-listing-close');
const createListingDate = document.querySelector('.create-listing-date');
const createListingSignal = document.querySelector(
  '.create-listing-signal-container'
);

const date = new Date();

const day = date.getDate();
const month = date.getMonth();
const year = date.getFullYear();
const hours = date.getHours();
const minutes = date.getMinutes();

const currentValue = `${year}-${month + 1}-${day}T${hours + 1}:${
  minutes < 10 ? '0' + minutes : minutes
}`;

const addMediaInput = document.querySelector('.add-media-input');
const addMediaBtn = document.querySelector('.add-media-btn');
const addedMediaContainer = document.querySelector('.added-media-container');

const imgArray = [];

createListingForm.onsubmit = async (e) => {
  e.preventDefault();
  createListingSignal.innerHTML = setLoader();
  try {
    const form = e.target;
    const formData = new FormData(form);
    const body = Object.fromEntries(formData.entries());
    body.media = imgArray;
    body.endsAt = new Date(body.endsAt);
    await createListing(body);
    location.reload();
  } catch (error) {
    const { errors } = getError();
    createListingSignal.innerHTML = errorHtml(errors[0].message);
  }
};

createListingBtn.onclick = () => {
  //Since the form is reset when the modal closes, the datetime is set when the modal opens.
  createListingDate.value = currentValue;
  createListingDate.min = currentValue;
  createListingModal.showModal();
};

createListingClose.onclick = () => {
  createListingModal.close();
  createListingForm.reset();
};

const updateAddedMedia = () => {
  addedMediaContainer.innerHTML = imgArray
    .map(
      (img, index) =>
        `<p class="mt-2 pb-2 border-bottom">${img}<a class="a ms-2 remove-image" data-index="${index}">Remove</a></p>`
    )
    .join('');
};

const addRemoveEventListener = () => {
  const removeLinks = document.querySelectorAll('.remove-image');
  removeLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const index = link.dataset.index;
      imgArray.splice(index, 1);
      updateAddedMedia();
      addRemoveEventListener();
    });
  });
};

addMediaBtn.onclick = () => {
  const imgUrl = addMediaInput.value;
  const urlRegEx =
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

  if (urlRegEx.test(imgUrl)) {
    addMediaInput.setCustomValidity('');
    imgArray.push(imgUrl);
    updateAddedMedia();
    addRemoveEventListener();
    addMediaInput.value = '';
  } else {
    addMediaInput.setCustomValidity('Please enter a URL.');
    addMediaInput.reportValidity();
  }
};

const editAvatarModal = document.querySelector('.edit-avatar-modal');
const editAvatarForm = document.querySelector('.edit-avatar-form');
const editAvatarOpen = document.querySelector('.edit-avatar-open');
const editAvatarClose = document.querySelector('.edit-avatar-close');
const avatarSignal = document.querySelector('.avatar-signal');

editAvatarOpen.onclick = () => {
  editAvatarModal.showModal();
};

editAvatarClose.onclick = () => {
  editAvatarModal.close();
  editAvatarForm.reset();
  avatarSignal.innerHTML = '';
};

editAvatarForm.onsubmit = async (e) => {
  e.preventDefault();
  avatarSignal.innerHTML = setLoader();
  try {
    const form = e.target;
    const formData = new FormData(form);
    const body = Object.fromEntries(formData.entries());
    await updateProfile(body, name);
    await updateUser();
    location.reload();
  } catch (error) {
    const { errors } = getError();
    avatarSignal.innerHTML = errorHtml(errors[0].message);
  }
};

const main = async () => {
  try {
    const listings = await getUsersListings(name);

    if (listings.length) {
      listingsContainer.innerHTML = listings
        .map((listing) => createCard(listing))
        .join('');
    } else {
      listingsContainer.innerHTML = `<p class="text-center fw-bold fs-4">No listings yet. </p>`;
    }
  } catch (error) {
    listingsContainer.innerHTML = errorHtml(
      'An error occured. Please wait a while and try again.'
    );
  }
};

main();
