import { options, apiCall, placeBid } from '../api/index.js';
import { updateUser } from '../storage/index.js';
import {
  createSlide,
  createInfo,
  setLoader,
  bidHistory,
  isLoggedIn,
} from '../components/index.js';

const id = new URLSearchParams(document.location.search).get('id');

const infoContainer = document.querySelector('.info-container');
const mediaContainer = document.querySelector('.carousel-inner');
const historyContainer = document.querySelector('.history-container');
const bidContainer = document.querySelector('.bid-history');
const historyLink = document.querySelector('.show-history-link');
const loginNotice = document.querySelector('.login-notice');
let hidden = true;

if (!isLoggedIn()) {
  bidContainer.style.display = 'none';
  loginNotice.style.display = 'block';
}

historyLink.onclick = () => {
  historyContainer.classList.toggle('show-history');
  historyLink.innerText = hidden ? 'Hide all bids' : 'Show all bids';
  hidden = !hidden;
};

infoContainer.innerHTML = setLoader();

const url = `https://nf-api.onrender.com/api/v1/auction/listings/${id}?_bids=true&_seller=true`;

apiCall(url, options())
  .then((data) => {
    const { media, title, bids } = data;

    console.log(data);

    if (media.length) {
      mediaContainer.innerHTML = media
        .map((m) => createSlide(m, title))
        .join('');
    } else {
      mediaContainer.innerHTML =
        "<div class='carousel-item'><img src='./assets/img/placeholder.jpg' /><div>";
    }

    infoContainer.innerHTML = createInfo(data);
    historyContainer.innerHTML = bidHistory(bids);

    document.querySelector('.carousel-item').classList.add('active');

    //replaceErrorImg();
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
        await updateUser();
        location.reload();
      } catch (error) {
        console.log(error);
      }
    };
  });
