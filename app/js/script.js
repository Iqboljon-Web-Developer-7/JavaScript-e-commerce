import footer from "./footer.js";
import timer from "./timer.js";
import search from "./search.js";
import categories from "./categories.js";
import pagesChanging from "./pagesChanging.js";
import favouriteCounterFun from "./favouriteCounter.js";
import registerFun from "./register.js";
import supHeaderFun from "./supHeader.js";
import headerFun from "./header.js";
import favouritesFun from "./favourites.js";
import toggleMobileHeader from "./mobileHeader.js";
import productsNavFun from "./productsNav.js";
import changeProducts from "./changeProducts.js";
import fetchApi from "./fetchApi.js";

// API Fetcher Function
const API_URL = "https://dummyjson.com";

// API_PATH
let path = "products";

// Mobile Input
let mobileInput = document.querySelector("#mobile-input");

// Pages
const details = document.querySelector(".details"),
  home = document.querySelector(".home"),
  register = document.querySelector(".register");

// Header
const headerWrapper = document.querySelector(".header-wrapper"),
  header = document.querySelector(".header"),
  headerNav = document.querySelector(".header__nav"),
  headerLinks = document.querySelectorAll(".header__nav a"),
  headerMobileNav = document.querySelector(".mobile-header__nav");

// Mobile Header
const mobileHeader = document.querySelector(".mobile-header"),
  closeIcon = document.querySelector(".close-icon"),
  menuIcon = document.querySelector(".menu-icon"),
  mobileNav = document.querySelector(".mobile-header__nav");

menuIcon.addEventListener("click", () =>
  toggleMobileHeader(mobileHeader, mobileNav, mobileInput)
);
closeIcon.addEventListener("click", () =>
  toggleMobileHeader(mobileHeader, mobileNav, mobileInput)
);

// Favourites page
let favourites = JSON.parse(localStorage.getItem("favourites")) || [],
  favouriteCounter = document.querySelector(".favourite-counter"),
  favouritesIcon = document.querySelector(".heart-icon"),
  favouritesPage = document.querySelector(".favourites");

// Products

const loadMoreBtn = document.querySelector(".load-all"),
  loadLessBtn = document.querySelector(".load-less"),
  leftBtn = document.querySelector(".products__controls--left"),
  rightBtn = document.querySelector(".products__controls--right");

// how many products should be displayed

// Products left btn is disabled
leftBtn.disabled = true;

// Changing products
rightBtn.addEventListener("click", () =>
  changeProducts("right", fetchApi, API_URL, path, leftBtn)
);
leftBtn.addEventListener("click", () =>
  changeProducts("left", fetchApi, API_URL, path, leftBtn)
);

// First load of products
fetchApi(API_URL, "products", 0, 8, "", ".products__container");

productsNavFun(loadMoreBtn, loadLessBtn, fetchApi, API_URL, path);
favouritesFun(favouritesIcon, favouritesPage, home, favourites);
headerFun(header, headerWrapper);
supHeaderFun(header);
registerFun(register, home, headerLinks);
favouriteCounterFun(favourites, favouriteCounter);
pagesChanging(headerLinks, headerNav, headerMobileNav, details, home, register);
categories(API_URL, fetchApi, path);
search(API_URL, fetchApi, header);
timer();
footer();
