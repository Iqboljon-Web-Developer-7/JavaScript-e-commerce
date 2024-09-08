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
import cartListCounterFun from "./cartListCounter.js";
import cartListFun from "./cartList.js";

// API Fetcher Function
const API_URL = "https://dummyjson.com";

// API_PATH
let path = "products";
function updatePath(value) {
  path = value;
}

// Mobile Input
let mobileInput = document.querySelector("#mobile-input");

// Pages
const details = document.querySelector(".details"),
  home = document.querySelector(".home"),
  register = document.querySelector(".register"),
  cartPage = document.querySelector(".cart"),
  contact = document.querySelector(".contact__container"),
  about = document.querySelector(".about__container");

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

let searchWrapper = document.querySelector(".search-wrapper");

menuIcon.addEventListener("click", () =>
  toggleMobileHeader(mobileHeader, mobileNav, mobileInput)
);
closeIcon.addEventListener("click", () => {
  toggleMobileHeader(mobileHeader, mobileNav, mobileInput);
  searchWrapper.classList.remove("active");
});

// Favourites page
let favourites = JSON.parse(localStorage.getItem("favourites")) || [],
  favouriteCounter = document.querySelector(".favourite-counter"),
  favouritesPageCounter = document.querySelector(".favourites__header--count"),
  favouritesIcon = document.querySelector(".heart-icon"),
  favouritesPage = document.querySelector(".favourites");

let cartList = JSON.parse(localStorage.getItem("cartList")) || [],
  cartCounter = document.querySelector(".cart-counter"),
  cartListIcon = document.querySelector(".cart-icon");

// Products

const loadMoreBtn = document.querySelector(".load-all"),
  loadLessBtn = document.querySelector(".load-less"),
  leftBtn = document.querySelector(".products__controls--left"),
  rightBtn = document.querySelector(".products__controls--right");

// how many products should be displayed

// Products left btn is disabled
leftBtn.disabled = true;

// Changing products
rightBtn.addEventListener("click", () => changeProducts("right"));
leftBtn.addEventListener("click", () => changeProducts("left"));
// First load of products
fetchApi(API_URL, "products", 0, 8, "", ".products__container", true);

productsNavFun();
favouritesFun(favouritesIcon, favouritesPage, favourites);
cartListFun(cartListIcon, cartList);
headerFun();
supHeaderFun();
registerFun(headerLinks);
favouriteCounterFun(favourites, favouriteCounter);
cartListCounterFun(cartList, cartCounter);
pagesChanging(headerLinks, headerNav, headerMobileNav);
categories(updatePath);
search();
timer();
footer();

export {
  API_URL,
  fetchApi,
  path,
  leftBtn,
  rightBtn,
  loadLessBtn,
  loadMoreBtn,
  header,
  headerWrapper,
  mobileNav,
  mobileHeader,
  home,
  details,
  register,
  cartPage,
  contact,
  about,
  favourites,
  favouriteCounter,
  favouritesPage,
  favouritesPageCounter,
  cartCounter,
};
