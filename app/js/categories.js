import { API_URL, fetchApi } from "./script.js";

function categories(updatePath) {
  // Categories
  const categories = document.querySelectorAll(".category");
  categories.forEach((item) => {
    item.addEventListener("click", () => {
      updatePath(`products/category/${item.getAttribute("data-category")}`);
      fetchApi(
        API_URL,
        `products/category/${item.getAttribute("data-category")}`,
        0,
        8,
        "",
        ".products__container",
        true
      );
    });
  });
  // Categories - - - |
}

export default categories;
