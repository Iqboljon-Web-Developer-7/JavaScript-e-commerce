import loadProducts from "./products.js";

function favouritesFun(favouritesIcon, favouritesPage, home, favourites) {
  async function fetchAllFavourites(list) {
    const fetchedDatas = await list.map((item) =>
      fetch(`https://dummyjson.com/products/${item}`).then((data) =>
        data.json()
      )
    );

    const response = await Promise.all(fetchedDatas);

    loadProducts(response, ".favourites__container");
  }

  favouritesIcon.addEventListener("click", () => {
    favouritesPage.classList.remove("hidden");
    home.classList.add("hidden");
    favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    fetchAllFavourites(favourites);
  });
}
export default favouritesFun;
