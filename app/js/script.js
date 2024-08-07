import footer from "./footer.js";
import timer from "./timer.js";
import search from "./search.js";
import categories from "./categories.js";
import pagesChanging from "./pagesChanging.js";
import favouriteCounterFun from "./favouriteCounter.js";
import registerFun from "./register.js";
import supHeaderFun from "./supHeader.js";
import loadProducts from "./products.js";
import headerFun from "./header.js";
import favouritesFun from "./favourites.js";
import toggleMobileHeader from "./mobileHeader.js";

// API Fetcher Function
const API_URL = "https://dummyjson.com";

// API_PATH
let path = "products";

async function fetchApi(url, path, start, limit, param = "", destination) {
  productsLoaders.style.display = "grid";
  let result = await fetch(
    `${url}/${path}?skip=${start}&limit=${limit}${param}`
  );
  result.json().then((res) => loadProducts(res, destination));
}

let mobileInput = document.querySelector("#mobile-input");

// Home and Product changing
const details = document.querySelector(".details"),
  home = document.querySelector(".home"),
  register = document.querySelector(".register");

const headerNav = document.querySelector(".header__nav"),
  headerLinks = document.querySelectorAll(".header__nav a"),
  headerMobileNav = document.querySelector(".mobile-header__nav");

const mobileHeader = document.querySelector(".mobile-header"),
  closeIcon = document.querySelector(".close-icon"),
  menuIcon = document.querySelector(".menu-icon"),
  mobileNav = document.querySelector(".mobile-header__nav");

const headerWrapper = document.querySelector(".header-wrapper");
const header = document.querySelector(".header");

let favourites = JSON.parse(localStorage.getItem("favourites")) || [],
  favouriteCounter = document.querySelector(".favourite-counter"),
  favouritesIcon = document.querySelector(".heart-icon"),
  favouritesPage = document.querySelector(".favourites"),
  favouritesContainer = document.querySelector(".favourites__container");

menuIcon.addEventListener("click", () =>
  toggleMobileHeader(mobileHeader, mobileNav, mobileInput)
);
closeIcon.addEventListener("click", () =>
  toggleMobileHeader(mobileHeader, mobileNav, mobileInput)
);

// Products

const productsContainer = document.querySelector(".products__container"),
  loadMoreBtn = document.querySelector(".load-all"),
  loadLessBtn = document.querySelector(".load-less"),
  productsLoaders = document.querySelector(".products-loaders"),
  leftBtn = document.querySelector(".products__controls--left"),
  rightBtn = document.querySelector(".products__controls--right");

// how many products should be displayed
let limit = 0;

leftBtn.disabled = true;

rightBtn.addEventListener("click", () => changeProducts("right"));
leftBtn.addEventListener("click", () => changeProducts("left"));

function changeProducts(direction) {
  if (direction === "right") {
    limit += 8;
    leftBtn.disabled = false;
  } else if ((direction = "left")) {
    limit -= 8;
    if (limit === 0) {
      leftBtn.disabled = true;
    }
  }
  if (limit < 0) {
    limit = 0;
    leftBtn.disabled = true;
  } else {
    fetchApi(API_URL, path, limit, 8, "", ".products__container");
  }
}

// First load of products
fetchApi(API_URL, "products", 0, 8, "", ".products__container");

// Load more or less
let allContent = false;
localStorage.setItem("allContent", JSON.stringify(allContent));
loadMoreBtn.addEventListener("click", () => {
  allContent = true;

  localStorage.setItem("allContent", JSON.stringify(allContent));

  fetchApi(API_URL, path, 0, 30, "", ".products__container");
  setTimeout(() => {
    loadLessBtn.classList.remove("hidden");
  }, 500);
});
loadLessBtn.addEventListener("click", () => {
  allContent = false;
  localStorage.setItem("allContent", JSON.stringify(allContent));

  fetchApi(API_URL, path, 0, 8, "", ".products__container");
  setTimeout(() => {
    loadLessBtn.classList.add("hidden");
  }, 500);
});
// Load more or less - - - |

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
