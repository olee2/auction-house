import { options, apiCall, placeBid } from '../api/index.js';
import { updateCredits } from '../storage/index.js';
import {
  createSlide,
  createInfo,
  setLoader,
  replaceErrorImg,
} from '../components/index.js';

const id = new URLSearchParams(document.location.search).get('id');

const infoContainer = document.querySelector('.info-container');
const mediaContainer = document.querySelector('.carousel-inner');

infoContainer.innerHTML = setLoader();

const url = `https://nf-api.onrender.com/api/v1/auction/listings/${id}?_bids=true`;

apiCall(url, options())
  .then((data) => {
    const { media, title } = data;

    if (media.length) {
      mediaContainer.innerHTML = media
        .map((m) => createSlide(m, title))
        .join('');
    } else {
      mediaContainer.innerHTML =
        "<div class='carousel-item'><img src='./assets/img/placeholder.jpg' /><div>";
    }

    infoContainer.innerHTML = createInfo(data);

    document.querySelector('.carousel-item').classList.add('active');

    replaceErrorImg();
  })
  .then((data) => {
    const bidForm = document.querySelector('form');
    bidForm.onsubmit = async (e) => {
      e.preventDefault();

      try {
        const form = e.target;
        const formData = new FormData(form);
        const body = Object.fromEntries(formData.entries());
        body.amount = Number(body.amount);

        await placeBid(body, id);
        await updateCredits();
      } catch (error) {
        console.log(error);
      }
    };
  });
