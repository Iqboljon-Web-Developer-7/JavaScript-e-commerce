const details = document.querySelector(".details");
const home = document.querySelector(".home");

const headerNav = document.querySelector(".header__nav");
headerNav.addEventListener("click", (e) => {
  if (e.target.textContent == "Home") {
    details.classList.add("hidden");
    home.classList.remove("hidden");
  }
});

// Sup Header - Header
const supHeader = document.querySelector(".sup-header-wrapper");
setTimeout(() => {
  supHeader.style.height = supHeader.clientHeight + "px";
  supHeader.classList.add("active");
  setTimeout(() => {
    header.classList.add("active");
  }, 650);
  setTimeout(() => {
    supHeader.style.display = "none";
  }, 1000);
}, 3000);

// Sup Header - Header END - - - |

// Header
const header = document.querySelector(".header");
window.addEventListener("scroll", (e) => {
  if (window.scrollY >= 100) {
    header.classList.add("top");
    document.body.style.marginTop = header.clientHeight + "px";
  } else {
    document.body.style.marginTop = 0;
    header.classList.remove("top");
  }
});
// Header END - - - |

// Mobile Header
const mobileHeader = document.querySelector(".mobile-header"),
  closeIcon = document.querySelector(".close-icon"),
  menuIcon = document.querySelector(".menu-icon");

menuIcon.addEventListener("click", toggleMobileHeader);
closeIcon.addEventListener("click", toggleMobileHeader);
function toggleMobileHeader() {
  mobileHeader.classList.toggle("active");
}
// Mobile Header - - - |

// Carousel
const carouselWrapper = document.querySelector(".carousel-wrapper"),
  carousel = document.querySelector(".carousel"),
  carouselItems = document.querySelectorAll(".carousel__item");

carouselItems.forEach(
  (item) =>
    (item.style.width =
      carousel.clientWidth -
      parseInt(window.getComputedStyle(carouselItems[0]).paddingInline) * 2 +
      "px")
);

// Carousel END - - - |

// Products

const API_URL = "https://dummyjson.com";
const productsContainer = document.querySelector(".products__container"),
  loadMoreBtn = document.querySelector(".load-all"),
  loadLessBtn = document.querySelector(".load-less"),
  productsLoaders = document.querySelector(".products-loaders"),
  leftBtn = document.querySelector(".products__controls--left"),
  rightBtn = document.querySelector(".products__controls--right");

let limit = 0;
leftBtn.disabled = true;

rightBtn.addEventListener("click", () => changeProducts("right"));
leftBtn.addEventListener("click", () => changeProducts("left"));

function changeProducts(direction) {
  if (direction == "right") {
    limit += 8;
    leftBtn.disabled = false;
  } else if ((direction = "left")) {
    limit -= 8;
    if (limit == 0) {
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
async function fetchApi(url, path, start, limit, param = "", destination) {
  let result = await fetch(
    `${url}/${path}?skip=${start}&limit=${limit}${param}`
  );
  result.json().then((res) => loadContents(res, destination));
}
fetchApi(API_URL, "products", 0, 8, "", ".products__container");

function rating(num, randomData) {
  let sNum = randomData.rating;
  return num < sNum ? "fa-solid fa-star active" : "fa-solid fa-star";
}

let allContent = false;
loadMoreBtn.addEventListener("click", () => {
  allContent = true;
  fetchApi(API_URL, path, 0, 30, "", ".products__container");
});

function loadContents(data, destination) {
  let container = document.querySelector(destination);
  container.innerHTML = "";
  productsLoaders.style.display = "none";
  data = data.products;
  if (data.length == 0) {
    rightBtn.disabled = true;
    container.innerHTML = "Nothig found :(";
  } else {
    if (data.length < 8) {
      rightBtn.disabled = true;
    } else {
      rightBtn.disabled = false;
    }
    if (allContent) {
      rightBtn.disabled = true;
      loadMoreBtn.classList.add("hidden");
      allContent = false;
    }
    data.forEach((item) => {
      const product = document.createElement("div");
      product.className = "product";
      product.innerHTML = `
            <div class="product__main flex-center">
              <img src=${item.images[0]} alt="img" />
              <div class="controls flex-center f-column">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart"
                  viewBox="0 0 16 16">
                  <path
                    d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye"
                  viewBox="0 0 16 16">
                  <path
                    d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                </svg>
              </div>
              <button class="product__btn">Add To Cart</button>
            </div>
  
            <div class="product__info">
              <h4 class="product__info--name">${item.title}</h4>
              <div class="product__info--end flex-center">
                <div class="price">$${item.price}</div>
                <div class="rating">
  
                  <i class="${rating(1, item)}"></i>
                  <i class="${rating(2, item)}"></i>
                  <i class="${rating(3, item)}"></i>
                  <i class="${rating(4, item)}"></i>
                  <i class="${rating(5, item)}"></i>
                </div>
                <p class="count">(${Math.round(Math.random() * 1000)})</p>
              </div>
            </div>
      `;
      container.append(product);
      product.addEventListener("click", (e) => {
        home.classList.add("hidden");
        details.classList.remove("hidden");
        const detail = document.querySelector(".detail");
        let itemPath = document.querySelector(".product-name");

        let id = item.id;
        async function fetchApiDetails(url, path, id) {
          let res = await fetch(`${url}/${path}/${id}`);
          res.json().then((data) => loadContentsDetail(data));
        }

        fetchApiDetails(API_URL, "products", id);
        function loadContentsDetail(data) {
          itemPath.textContent = data.title;
          detail.innerHTML = `
             <div class="detail__img">
                  <div class="detail__imgs--container">
                  </div>
                  <img src=${data.images[0]} alt="">
              </div>
              <div class="detail__info">
                  <h3 class="detail-info--name">${data.title}</h3>
                  <div class="detail-info--rating flex-center">
                    <div class="stars">
                       <i class="${rating(1, data)}"></i>
                        <i class="${rating(2, data)}"></i>
                        <i class="${rating(3, data)}"></i>
                        <i class="${rating(4, data)}"></i>
                        <i class="${rating(5, data)}"></i>
                    </div>
                    <div class="detail-info--rating-end flex-center">
                      <p class="reviews">(${Math.round(
                        Math.random() * 1000
                      )}) reviews</p>
                      | <p class="stock">In Stock</p>
                    </div>
                  </div>
                  <h4 class="price">$${data.price}</h4>
                  <p class="description">${data.description}</p>
                  <hr/>
              </div>
          `;
        }
      });
    });
  }
}
// Products END - - - |

// Categories
var path = "products";
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

// Search Products
const searchWrapper = document.querySelector(".search-wrapper"),
  desktopInput = document.querySelector("#search-desktop"),
  searchLoaders = document.querySelector(".search-loaders"),
  search = document.querySelector(".search");
desktopInput.addEventListener("focus", () => {
  searchWrapper.classList.add("active");
  header.classList.add("top");
});
desktopInput.addEventListener("input", (e) => {
  let val = e.target.value;
  searchLoaders.classList.add("active");
  search.innerHTML = "";
  setTimeout(() => {
    if (val) {
      fetchApi(API_URL, "products/search", 0, 30, `&q=${val}`, ".search");
    } else {
      search.innerHTML = "<h1>What do you want ?</h1>";
    }
    searchLoaders.classList.remove("active");
  }, 800);
});
searchWrapper.addEventListener("click", (e) => closeSearching(e));
function closeSearching(e) {
  if (
    e.target.classList.contains("search-wrapper") ||
    e.target.classList.contains("search__close")
  ) {
    searchWrapper.classList.remove("active");
    desktopInput.value = "";
    search.innerHTML = "<h1>What do you want ?</h1>";
  }
}
// Search Products - - - |

// Timer
function startCountdown(duration) {
  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");

  let endTime = Date.now() + duration * 1000;

  function updateTimer() {
    let timeLeft = endTime - Date.now();
    if (timeLeft <= 0) {
      daysElement.textContent = "00";
      hoursElement.textContent = "00";
      minutesElement.textContent = "00";
      secondsElement.textContent = "00";
      clearInterval(timerInterval);
      return;
    }

    let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    days = String(days).padStart(2, "0");
    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    daysElement.innerHTML = days;
    hoursElement.innerHTML = hours;
    minutesElement.innerHTML = minutes;
    secondsElement.innerHTML = seconds;
  }

  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
}

// Start a countdown of 1 day (86400 seconds)
startCountdown(440000);
// Timer - - - |

// Footer
const footerItems = document.querySelectorAll(".footer__item"),
  downIcons = document.querySelectorAll(".down-icon");
downIcons.forEach((item, idx) => {
  item.addEventListener("click", (e) => {
    if (downIcons[idx].classList.contains("active")) {
      footerItems[idx].style.height = 2.25 + "rem";
    } else {
      footerItems[idx].style.height = footerItems[idx].scrollHeight + "px";
    }
    downIcons[idx].classList.toggle("active");
    footerItems[idx].classList.toggle("active");
  });
});
// Footer END - - - |
