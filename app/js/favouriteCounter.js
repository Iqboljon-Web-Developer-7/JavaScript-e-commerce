import { favouritesPageCounter } from "./script.js";

function favouriteCounterFun(favourites, favouriteCounter) {
  if (favourites.length != 0) {
    favouriteCounter.classList.remove("invi");
    favouritesPageCounter.classList.remove("invi");
    favouriteCounter.textContent = favourites.length;
    favouritesPageCounter.textContent = favourites.length;
  } else {
    favouriteCounter.classList.add("invi");
    favouritesPageCounter.classList.add("invi");
  }
}

export default favouriteCounterFun;
