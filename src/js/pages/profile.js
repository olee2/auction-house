import { getUser } from '../storage/index.js';
import { createProfile } from '../components/index.js';

const user = getUser();
const profileContainer = document.querySelector('.profile-container');

profileContainer.innerHTML = createProfile(user);
