import loadProducts from "./products.js";
import {
  home,
  details,
  register,
  cartPage,
  contact,
  about,
  vibrateIfEmpty,
} from "./script.js";

function favouritesFun(favouritesIcon, favouritesPage, favourites) {
  let favouritesLoaders = document.querySelector(".favourites-loaders");

  async function fetchAllFavourites(list) {
    const fetchedDatas = await list.map((item) =>
      fetch(`https://dummyjson.com/products/${item}`).then((data) =>
        data.json()
      )
    );

    const response = await Promise.all(fetchedDatas);

    loadProducts(response, ".favourites__container", false);

    favouritesLoaders.style.display = "none";
  }

  function hideAllSections() {
    about.classList.add("hidden");
    home.classList.add("hidden");
    details.classList.add("hidden");
    register.classList.add("hidden");
    favouritesPage.classList.add("hidden");
    cartPage.classList.add("hidden");
    contact.classList.add("hidden");
  }

  favouritesIcon.addEventListener("click", () => {
    if (JSON.parse(localStorage.getItem("favourites"))) {
      try {
        if (JSON.parse(localStorage.getItem("favourites")).length != 0) {
          hideAllSections();
          favouritesPage.classList.remove("hidden");
          favourites = JSON.parse(localStorage.getItem("favourites")) || [];
          fetchAllFavourites(favourites);
        } else {
          vibrateIfEmpty(favouritesIcon);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      vibrateIfEmpty(favouritesIcon);
    }
  });
}
export default favouritesFun;
