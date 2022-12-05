import { apiCall } from '../api/index.js';
import { errorHtml, setLoader } from '../components/index.js';
import { getError } from '../storage/index.js';

const form = document.querySelector('form');
const signalContainer = document.querySelector('.signal');

form.onsubmit = async (e) => {
  e.preventDefault();

  const form = e.target;

  const formData = new FormData(form);
  const profile = Object.fromEntries(formData.entries());

  if (!profile.avatar) {
    delete profile.avatar;
  }

  const options = {
    method: 'POST',
    body: JSON.stringify(profile),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  };

  signalContainer.innerHTML = setLoader();

  try {
    const response = await apiCall(
      'https://nf-api.onrender.com/api/v1/auction/auth/register',
      options
    );
    console.log(response);
  } catch (error) {
    const { errors } = getError();
    signalContainer.innerHTML = errorHtml(errors[0].message);
    console.log(error);
    localStorage.removeItem('error');
  }
};
