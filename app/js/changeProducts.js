import fetchApi from "./fetchApi.js";
import { API_URL, path, leftBtn } from "./script.js";

let limit = 0;

function changeProducts(direction) {
  if (direction === "right") {
    limit += 8;
    leftBtn.disabled = false;
  } else if ((direction = "left")) {
    limit -= 8;
    if (limit === 0) {
      leftBtn.disabled = true;
    }
  }
  if (limit < 0) {
    limit = 0;
    leftBtn.disabled = true;
  } else {
    fetchApi(API_URL, path, limit, 8, "", ".products__container");
  }
}

export default changeProducts;
