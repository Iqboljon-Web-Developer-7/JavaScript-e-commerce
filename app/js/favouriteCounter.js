function favouriteCounterFun(favourites, favouriteCounter) {
  if (favourites.length != 0) {
    favouriteCounter.classList.remove("invi");
    favouriteCounter.textContent = favourites.length;
  } else {
    favouriteCounter.classList.add("invi");
  }
}

export default favouriteCounterFun;
