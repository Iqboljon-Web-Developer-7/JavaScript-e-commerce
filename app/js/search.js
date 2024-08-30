import loadProducts from "./products.js";
import {
  API_URL,
  fetchApi,
  header,
  mobileNav,
  mobileHeader,
} from "./script.js";

function search() {
  // Search Products
  let mobileInput = document.querySelector("#mobile-input");
  let desktopInput = document.querySelector("#search-desktop");
  let searchWrapper = document.querySelector(".search-wrapper");
  let searchLoaders = document.querySelector(".search-loaders");

  mobileInput.addEventListener("focus", (e) => showSearching(e));
  desktopInput.addEventListener("focus", showSearching);
  function showSearching(e) {
    if (e.target.name == "mobile-search") {
      mobileNav.classList.add("hidden");
      mobileHeader.classList.add("searcher");
    }
    searchWrapper.classList.add("active");
    header.classList.add("top");
  }

  desktopInput.addEventListener("input", (e) => showResult(e));
  mobileInput.addEventListener("input", (e) => showResult(e));
  function showResult(e) {
    let val = e.target.value;
    searchLoaders.classList.add("active");
    search.innerHTML = "";
    setTimeout(() => {
      if (val) {
        fetchApi(API_URL, "products/search", 0, 30, `&q=${val}`, ".search");
      } else {
        search.innerHTML = "<h1>What do you want ?</h1>";
      }
      searchLoaders.classList.remove("active");
    }, 800);
  }

  searchWrapper.addEventListener("click", (e) => {
    e = e.target;
    if (
      e.classList.contains("search-wrapper") ||
      e.classList.contains("search__close")
    ) {
      fetchApi(API_URL, "products", 0, 8, "", ".products__container", true);
      searchWrapper.classList.remove("active");
      desktopInput.value = "";
      search.innerHTML = "<h1>What do you want ?</h1>";
      header.classList.remove("top");
    }
  });

  // Search Products - - - |
}

export default search;
