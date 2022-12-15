import { getUsersListings, updateProfile } from '../api/index.js';
import { getUser, updateUser } from '../storage/index.js';
import { createProfile, createCard, isLoggedIn } from '../components/index.js';

if (!isLoggedIn()) {
  location.assign('register.html');
}

updateUser();

const user = getUser();
const { name } = user;

const profileContainer = document.querySelector('.profile-container');
const listingsContainer = document.querySelector('.profile-listings');

profileContainer.innerHTML = createProfile(user);

const editAvatarModal = document.querySelector('.edit-avatar-modal');
const editAvatarForm = document.querySelector('.edit-avatar-form');
const editAvatarOpen = document.querySelector('.edit-avatar-open');
const editAvatarClose = document.querySelector('.edit-avatar-close');

editAvatarOpen.onclick = () => {
  editAvatarModal.showModal();
};

editAvatarClose.onclick = () => {
  editAvatarModal.close();
};

editAvatarForm.onsubmit = async (e) => {
  e.preventDefault();
  try {
    const form = e.target;
    const formData = new FormData(form);
    const body = Object.fromEntries(formData.entries());

    const response = await updateProfile(body, name);
    console.log(response);
    await updateUser();
    location.reload();
  } catch (error) {
    console.log(error);
  }
};

const main = async () => {
  const listings = await getUsersListings(name);
  listingsContainer.innerHTML = listings
    .map((listing) => createCard(listing))
    .join('');
};

main();
