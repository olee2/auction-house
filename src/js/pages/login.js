import { apiCall } from '../api/index.js';
import { storeUser, getError } from '../storage/index.js';
import { errorHtml, setLoader } from '../components/index.js';

const form = document.querySelector('form');
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const signalContainer = document.querySelector('.signal');

form.onsubmit = async (e) => {
  e.preventDefault();

  signalContainer.innerHTML = setLoader();

  const options = {
    method: 'POST',
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  };

  try {
    const data = await apiCall(
      'https://nf-api.onrender.com/api/v1/auction/auth/login',
      options
    );

    storeUser(data);
    //location.assign('../profile.html');
  } catch (error) {
    const { errors } = getError();
    signalContainer.innerHTML = errorHtml(errors[0].message);
    console.log(error);
  }
};