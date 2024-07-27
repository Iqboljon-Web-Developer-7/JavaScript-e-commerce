let query = new URLSearchParams(window.location.search);
let id = query.get("id");
const API_URL = "https://dummyjson.com";

async function fetchApi(url, path, id) {
  let res = await fetch(`${url}/${path}/${id}`);
  res.json().then((data) => console.log(data));
}

fetchApi(API_URL, "products", id);
