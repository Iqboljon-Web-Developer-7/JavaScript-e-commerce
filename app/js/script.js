import footer from "./footer.js";
import timer from "./timer.js";
import search from "./search.js";
import categories from "./categories.js";
import rating from "./rating.js";
import pagesChanging from "./pagesChanging.js";
import favouriteCounterFun from "./favouriteCounter.js";

// API Fetcher Function
const API_URL = "https://dummyjson.com";

// API_PATH
let path = "products";

async function fetchApi(url, path, start, limit, param = "", destination) {
  productsLoaders.style.display = "grid";
  let result = await fetch(
    `${url}/${path}?skip=${start}&limit=${limit}${param}`
  );
  result.json().then((res) => loadProducts(res, destination));
}

// Home and Product changing
const details = document.querySelector(".details"),
  home = document.querySelector(".home"),
  register = document.querySelector(".register");

const headerNav = document.querySelector(".header__nav"),
  headerLinks = document.querySelectorAll(".header__nav a"),
  headerMobileNav = document.querySelector(".mobile-header__nav");

// Register forms
const signUp = document.querySelector(".sign-up"),
  signIn = document.querySelector(".sign-in"),
  signInBtn = document.querySelector("#loginBtn"),
  signUpBtn = document.querySelector("#signUpBtn"),
  signUpForm = document.querySelector("#signUpForm"),
  signInForm = document.querySelector("#signInForm"),
  userIcon = document.querySelector(".fa-user"),
  userInfos = document.querySelector(".user");

signUp.classList.add("hidden");
signIn.classList.remove("hidden");

let isLoggedIn = false;
let userData = JSON.parse(localStorage.getItem("userdata")) || [];
userData.length != 0 ? userIcon.classList.remove("hidden") : null;

userIcon.addEventListener("click", () => {
  let userData = JSON.parse(localStorage.getItem("userdata")) || [];
  userInfos.innerHTML = `
      <div class="user__info flex-center">
        <img src=${userData.image} alt="1" width="400">
        <div class="user__info--name">
          <h4 class="name">${userData.firstName}</h4>
          <p class="username">${userData.username}</p>
        </div>
      </div>
      <div class="user__nav flex-center f-column">
       
        <button class="leave" name="logout">Log Out</button>
      </div>
  `;
  userInfos.classList.toggle("active");
});
userInfos.addEventListener("click", (e) => {
  if (e.target.name == "logout") {
    localStorage.removeItem("userdata");
    userInfos.classList.remove("active");
    userIcon.classList.add("hidden");
  }
});

signInForm.addEventListener("submit", formDataHandler);
function formDataHandler(e) {
  e.preventDefault();
  e.srcElement.children.login.innerHTML = "";

  let miniLoader = document.createElement("div");
  miniLoader.classList.add("mini-loader");

  e.srcElement.children.login.append(miniLoader);

  let name = e.srcElement.children.name.value;
  let password = e.srcElement.children.password.value;

  async function fetchUser(name, password, e) {
    let res = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: name,
        password: password,
        expiresInMins: 30,
      }),
    })
      .then((res) => res.json())
      .then((data) => validation(e, data));
  }

  fetchUser(name, password, e);
  function validation(e, data) {
    let input1 = e.srcElement.children.name;
    let input2 = e.srcElement.children.password;
    let button = e.srcElement.children.login;

    if (
      data.message == "Username and password required" ||
      data.message == "Invalid credentials"
    ) {
      input1.classList.add("error");
      input2.classList.add("error");
    } else {
      localStorage.setItem("userdata", JSON.stringify(data));
      input1.classList.remove("error");
      input2.classList.remove("error");
    }

    button.innerHTML = "Logged In :)";
    register.classList.add("hidden");
    home.classList.remove("hidden");
    userIcon.classList.remove("hidden");
    headerLinks[0].classList.add("active");
    headerLinks[3].classList.remove("active");
    setTimeout(() => {
      button.innerHTML = "Login";
    }, 1000);
  }
}
// Register forms end

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
const headerWrapper = document.querySelector(".header-wrapper");
const header = document.querySelector(".header");
window.addEventListener("scroll", (e) => {
  if (window.scrollY >= 100) {
    header.classList.add("top");
    headerWrapper.classList.add("top");
    document.body.style.marginTop = header.clientHeight + "px";
  } else {
    document.body.style.marginTop = 0;
    header.classList.remove("top");
    headerWrapper.classList.remove("top");
  }
});
// Header END - - - |

// Mobile Header
const mobileHeader = document.querySelector(".mobile-header"),
  closeIcon = document.querySelector(".close-icon"),
  menuIcon = document.querySelector(".menu-icon"),
  mobileNav = document.querySelector(".mobile-header__nav");

menuIcon.addEventListener("click", toggleMobileHeader);
closeIcon.addEventListener("click", toggleMobileHeader);
function toggleMobileHeader() {
  mobileHeader.classList.toggle("active");
  mobileHeader.classList.remove("searcher");
  mobileNav.classList.remove("hidden");
  mobileInput.value = "";
}
// Mobile Header - - - |

// Products

const productsContainer = document.querySelector(".products__container"),
  loadMoreBtn = document.querySelector(".load-all"),
  loadLessBtn = document.querySelector(".load-less"),
  productsLoaders = document.querySelector(".products-loaders"),
  leftBtn = document.querySelector(".products__controls--left"),
  rightBtn = document.querySelector(".products__controls--right");

// how many products should be displayed
let limit = 0;

leftBtn.disabled = true;

rightBtn.addEventListener("click", () => changeProducts("right"));
leftBtn.addEventListener("click", () => changeProducts("left"));

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

// First load of products
fetchApi(API_URL, "products", 0, 8, "", ".products__container");

// Load more or less
let allContent = false;
loadMoreBtn.addEventListener("click", () => {
  allContent = true;
  fetchApi(API_URL, path, 0, 30, "", ".products__container");
  setTimeout(() => {
    loadLessBtn.classList.remove("hidden");
  }, 500);
});
loadLessBtn.addEventListener("click", () => {
  allContent = false;
  fetchApi(API_URL, path, 0, 8, "", ".products__container");
  setTimeout(() => {
    loadLessBtn.classList.add("hidden");
  }, 500);
});
// Load more or less - - - |

let favourites = JSON.parse(localStorage.getItem("favourites")) || [],
  favouriteCounter = document.querySelector(".favourite-counter"),
  favouritesIcon = document.querySelector(".heart-icon"),
  favouritesPage = document.querySelector(".favourites"),
  favouritesContainer = document.querySelector(".favourites__container");

async function fetchAllFavourites(list) {
  const fetchedDatas = await list.map((item) =>
    fetch(`https://dummyjson.com/products/${item}`).then((data) => data.json())
  );

  const response = await Promise.all(fetchedDatas);

  loadProducts(response, ".favourites__container");
}

favouritesIcon.addEventListener("click", () => {
  favouritesPage.classList.remove("hidden");
  home.classList.add("hidden");
  fetchAllFavourites(favourites);

  // fetchAllFavourites(favourites);
});

// Load products
function loadProducts(data, destination, content) {
  // where products should be loaded ?
  let container = document.querySelector(destination);

  // clear container
  container.innerHTML = "";

  // remove loaders
  productsLoaders.style.display = "none";

  // get only products array
  data = data.products || data;

  // data is empty or end of data(products)
  if (data.length == 0) {
    rightBtn.disabled = true;
    container.textContent = "Nothig found :(";
  } else {
    // data has less than 8 products so
    if (data.length < 8) {
      rightBtn.disabled = true;
      loadMoreBtn.classList.add("hidden");
    } else {
      loadMoreBtn.classList.remove("hidden");
      rightBtn.disabled = false;
    }

    // do all content display ?
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
              <img src=${item.images[0]} alt="img" class="product__img"/>
              <div class="controls flex-center f-column">
                <img src="./images/home/products/heart.svg" alt="heart svg" class="heart ${
                  favourites.includes(item.id) && "active"
                }">
                <img src="./images/home/products/cart.svg" alt="cart">
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
        e = e.target;
        if (e.classList.contains("product__img")) {
          // on mobile searching it removes mobile header and results
          mobileHeader.classList.remove("searcher");
          mobileHeader.classList.remove("active");
          mobileNav.classList.remove("hidden");
          searchWrapper.classList.remove("active");

          // hide home page contents
          home.classList.add("hidden");
          // show only product main container
          details.classList.remove("hidden");
          // detail container
          const detail = document.querySelector(".detail");

          // detail path name
          let itemPath = document.querySelector(".product-name");

          let id = item.id;
          // custom Details function
          async function fetchApiDetails(url, path, id) {
            let res = await fetch(`${url}/${path}/${id}`);
            res.json().then((data) => loadProductsDetail(data));
          }

          fetchApiDetails(API_URL, "products", id);
          function loadProductsDetail(data) {
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
        } else if (e.classList.contains("heart")) {
          if (!e.classList.contains("active")) {
            favourites.push(item.id);
          } else {
            let remove = favourites.splice(
              favourites.findIndex((element) => element == item.id),
              1
            );
            favourites.filter((element) => element != remove);
          }
          e.classList.toggle("active");
          favouriteCounter.textContent = favourites.length;
          if (favourites.length == 0) {
            favouriteCounter.classList.add("invi");
            favouriteCounter.text = 0;
          } else {
            favouriteCounter.classList.remove("invi");
          }
        }
        localStorage.setItem("favourites", JSON.stringify(favourites));
      });
    });
  }
}
// Products END - - - |

favouriteCounterFun(favourites, favouriteCounter);
pagesChanging(headerLinks, headerNav, headerMobileNav, details, home, register);
categories(API_URL, fetchApi, path);
search(API_URL, fetchApi, header);
timer();
footer();
