import fetchAllCarts from "./cartFetchFun.js";
import {
  home,
  details,
  register,
  favouritesPage,
  cartPage,
  contact,
  about,
  vibrateIfEmpty,
  searchWrapper,
  header,
} from "./script.js";

function cartListFun(cartListIcon, cartList) {
  let cartLoaders = document.querySelector(".cart-loaders");

  function hideAllSections() {
    about.classList.add("hidden");
    home.classList.add("hidden");
    details.classList.add("hidden");
    register.classList.add("hidden");
    favouritesPage.classList.add("hidden");
    cartPage.classList.add("hidden");
    contact.classList.add("hidden");
  }

  async function fetchAllCart(list) {
    const fetchedDatas = await list.map((item) =>
      fetch(`https://dummyjson.com/products/${item.id}`).then((data) =>
        data.json()
      )
    );

    const response = await Promise.all(fetchedDatas);

    fetchAllCarts(response);

    cartLoaders.style.display = "none";
  }

  cartListIcon.addEventListener("click", () => {
    if (JSON.parse(localStorage.getItem("cartList"))) {
      try {
        if (JSON.parse(localStorage.getItem("cartList")).length != 0) {
          hideAllSections();
          searchWrapper.classList.remove("active");
          header.classList.remove("top");
          cartPage.classList.remove("hidden");
          document.body.style.overflow = "auto";

          cartList = JSON.parse(localStorage.getItem("cartList")) || [];
          fetchAllCart(cartList);
        } else {
          vibrateIfEmpty(cartListIcon);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      vibrateIfEmpty(cartListIcon);
    }
  });
}
export default cartListFun;
