import { loadLessBtn, loadMoreBtn, API_URL, path } from "./script.js";
import fetchApi from "./fetchApi.js";

function productsNavFun() {
  // Load more or less
  let allContent = false;
  localStorage.setItem("allContent", JSON.stringify(allContent));
  loadMoreBtn.addEventListener("click", () => {
    allContent = true;

    localStorage.setItem("allContent", JSON.stringify(allContent));

    fetchApi(API_URL, path, 0, 30, "", ".products__container");
    setTimeout(() => {
      loadLessBtn.classList.remove("hidden");
    }, 500);
  });
  loadLessBtn.addEventListener("click", () => {
    allContent = false;
    localStorage.setItem("allContent", JSON.stringify(allContent));

    fetchApi(API_URL, path, 0, 8, "", ".products__container");
    setTimeout(() => {
      loadLessBtn.classList.add("hidden");
    }, 500);
  });
  // Load more or less - - - |
}

export default productsNavFun;
