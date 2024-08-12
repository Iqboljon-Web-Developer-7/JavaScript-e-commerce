import loadProducts from "./products.js";
import { home, details, register } from "./script.js";

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

  favouritesIcon.addEventListener("click", () => {
    if (JSON.parse(localStorage.getItem("favourites"))) {
      try {
        if (JSON.parse(localStorage.getItem("favourites")).length != 0) {
          home.classList.add("hidden");
          register.classList.add("hidden");
          details.classList.add("hidden");
          favouritesPage.classList.remove("hidden");
          favourites = JSON.parse(localStorage.getItem("favourites")) || [];
          fetchAllFavourites(favourites);
        } else {
          favouritesIcon.classList.remove("shake");
          void favouritesIcon.offsetWidth;
          favouritesIcon.classList.add("shake");
        }
      } catch (error) {
        console.log(error);
      }
    }
  });
}
export default favouritesFun;
