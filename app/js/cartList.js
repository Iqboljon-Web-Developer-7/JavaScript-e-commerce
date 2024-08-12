import loadProducts from "./products.js";
import fetchAllCarts from "./cartFetchFun.js";
import { home, details, register, cartPage, favouritesPage } from "./script.js";

function cartListFun(cartListIcon, cartList) {
  let cartLoaders = document.querySelector(".cart-loaders");

  async function fetchAllCart(list) {
    const fetchedDatas = await list.map((item) =>
      fetch(`https://dummyjson.com/products/${item}`).then((data) =>
        data.json()
      )
    );

    const response = await Promise.all(fetchedDatas);

    // loadProducts(response, ".cart__container", false);
    fetchAllCarts(response);

    cartLoaders.style.display = "none";
  }

  cartListIcon.addEventListener("click", () => {
    if (JSON.parse(localStorage.getItem("cartList"))) {
      try {
        if (JSON.parse(localStorage.getItem("cartList")).length != 0) {
          home.classList.add("hidden");
          register.classList.add("hidden");
          details.classList.add("hidden");
          favouritesPage.classList.add("hidden");
          cartPage.classList.remove("hidden");
          cartList = JSON.parse(localStorage.getItem("cartList")) || [];
          fetchAllCart(cartList);
        } else {
          cartListIcon.classList.remove("shake");
          void cartListIcon.offsetWidth;
          cartListIcon.classList.add("shake");
        }
      } catch (error) {
        console.log(error);
      }
    }
  });
}
export default cartListFun;
