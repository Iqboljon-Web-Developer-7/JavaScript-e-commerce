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
  productsLoaders = document.querySelector(".products-loaders");

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
loadMoreBtn.addEventListener("click", () => {
  fetchApi(API_URL, "products", 0, 30, "", ".products__container");
});
function loadContents(data, destination) {
  let container = document.querySelector(destination);
  container.innerHTML = "";
  productsLoaders.style.display = "none";

  data = data.products;
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
      location.replace(`details/details.html?id=${item.id}`);
    });
  });
}
// Products END - - - |

// Categories
const categories = document.querySelectorAll(".category");
categories.forEach((item) => {
  item.addEventListener("click", () => {
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
