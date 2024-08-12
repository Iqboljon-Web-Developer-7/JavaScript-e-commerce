import loadProducts from "./products.js";

async function fetchApi(
  url,
  path,
  start,
  limit,
  param = "",
  destination,
  isNav
) {
  let productsLoaders = document.querySelector(".products-loaders");
  productsLoaders.style.display = "grid";
  let result = await fetch(
    `${url}/${path}?skip=${start}&limit=${limit}${param}`
  );
  result.json().then((res) => loadProducts(res, destination, isNav));
}

export default fetchApi;
