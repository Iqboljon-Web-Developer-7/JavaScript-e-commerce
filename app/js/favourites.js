import cartListCounterFun from "./cartListCounter.js";
import loadProducts from "./products.js";
import {
  home,
  details,
  register,
  cartPage,
  contact,
  about,
  vibrateIfEmpty,
  searchWrapper,
  header,
  cartCounter,
} from "./script.js";

let response;
function favouritesFun(favouritesIcon, favouritesPage, favourites) {
  let favouritesLoaders = document.querySelector(".favourites-loaders");

  async function fetchAllFavourites(list) {
    let fetchedDatas = await list.map((item) =>
      fetch(`https://dummyjson.com/products/${item}`).then((data) =>
        data.json()
      )
    );

    response = await Promise.all(fetchedDatas);

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

  let transferToCart = document.querySelector(".transferToCart");
  transferToCart.addEventListener("click", () => {
    let transferedArray = [];
    let cartList = JSON.parse(localStorage.getItem("cartList"));
    console.log("Favourites ", favourites);
    console.log("Response ", response);
    console.log("CartList ", cartList);

    response.forEach((item, idx) => {
      let helper = {};
      helper.id = item.id;
      helper.initialPrice = item.price;
      helper.subTotal = item.price;
      helper.quantity = 1;

      transferedArray.push(helper);
    });
    const mergedArray = [...cartList, ...transferedArray].reduce(
      (acc, current) => {
        if (!acc.some((item) => item.id === current.id)) {
          acc.push(current);
        }
        return acc;
      },
      []
    );
    cartListCounterFun(mergedArray, cartCounter);
    localStorage.setItem("cartList", JSON.stringify(mergedArray));

    transferToCart.textContent = "Successfully added!";
    transferToCart.classList.add("success");
    setTimeout(() => {
      transferToCart.textContent = "Move All To Bag!";
      transferToCart.classList.remove("success");
    }, 1000);
  });

  favouritesIcon.addEventListener("click", () => {
    if (JSON.parse(localStorage.getItem("favourites"))) {
      try {
        if (JSON.parse(localStorage.getItem("favourites")).length != 0) {
          searchWrapper.classList.remove("active");
          hideAllSections();
          header.classList.remove("top");
          document.body.style.overflow = "auto";
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
