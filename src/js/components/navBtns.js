import { isLoggedIn, logOut } from './index.js';

//This script verify if the user is logged in or not and add buttons to the navbar accordingly.

const logout = `<button class="btn btn-outline-primary logout-btn">Log out</button>`;
const login = `<a href="./login.html" class="btn btn-outline-primary">Sign in</a>`;
const register = `<a href="./register.html" class="btn btn-secondary ms-3">Register</a>`;

const container = document.querySelector('.nav-btn-container');

const navBtns = () => {
  if (isLoggedIn()) {
    container.innerHTML = logout;
    document.querySelector('.logout-btn').onclick = () => logOut();
  } else {
    container.innerHTML = login + register;
  }
};

navBtns();
