import { options, apiCall } from '../api/index.js';
import { createSlide, createInfo, setLoader } from '../components/index.js';

const id = new URLSearchParams(document.location.search).get('id');

const infoContainer = document.querySelector('.info-container');
const mediaContainer = document.querySelector('.carousel-inner');

infoContainer.innerHTML = setLoader();

const url = `https://nf-api.onrender.com/api/v1/auction/listings/${id}?_bids=true`;

apiCall(url, options()).then((data) => {
  console.log(data);
  const { media } = data;
  mediaContainer.innerHTML = media.map((m) => createSlide(m)).join('');
  infoContainer.innerHTML = createInfo(data);
  document.querySelector('.carousel-item').classList.add('active');
});
