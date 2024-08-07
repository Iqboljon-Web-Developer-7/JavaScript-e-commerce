function categories(API_URL, fetchApi, path) {
  // Categories
  const categories = document.querySelectorAll(".category");
  categories.forEach((item) => {
    item.addEventListener("click", () => {
      path = `products/category/${item.getAttribute("data-category")}`;
      fetchApi(
        API_URL,
        `products/category/${item.getAttribute("data-category")}`,
        0,
        8,
        "",
        ".products__container"
      );
    });
  });
  // Categories - - - |
}

export default categories;
