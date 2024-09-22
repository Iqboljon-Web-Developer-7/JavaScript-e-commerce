// Load products
import cartListCounterFun from "./cartListCounter.js";
import favouriteCounterFun from "./favouriteCounter.js";
import rating from "./rating.js";
import {
  API_URL,
  loadMoreBtn,
  rightBtn,
  mobileHeader,
  mobileNav,
  home,
  details,
  register,
  favouritesPage,
  cartPage,
  contact,
  about,
  loadLessBtn,
  leftBtn,
  fetchApi,
} from "./script.js";

function myPopup(title, src) {
  new Popup({
    id: "my-popup",
    title,
    content: ` 
      <img src="${src}" class="popUpImg"/>
    `,
    showImmediately: true,
  });
}

function hideAllSections() {
  about.classList.add("hidden");
  home.classList.add("hidden");
  details.classList.add("hidden");
  register.classList.add("hidden");
  favouritesPage.classList.add("hidden");
  cartPage.classList.add("hidden");
  contact.classList.add("hidden");
}

let imgIdx = 0;
let imgUrls = [];
function detailsImagesFun() {
  setTimeout(() => {
    const detailsImages = document.querySelectorAll(".detailsImages");
    const mainImg = document.querySelector(".mainImg");
    detailsImages.forEach((item) => {
      item.addEventListener("click", () => {
        imgIdx = +item.getAttribute("data-id");
        mainImg.src = imgUrls[imgIdx];
      });
    });
  }, 2200);
}

const loadProducts = (data, destination, isNav) => {
  let allContent = JSON.parse(localStorage.getItem("allContent"));
  const productsLoaders = document.querySelector(".products-loaders"),
    searchWrapper = document.querySelector(".search-wrapper");

  let favourites = JSON.parse(localStorage.getItem("favourites")) || [],
    favouriteCounter = document.querySelector(".favourite-counter"),
    cartList = JSON.parse(localStorage.getItem("cartList")) || [],
    cartCounter = document.querySelector(".cart-counter");

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
    if (destination != ".search-wrapper") {
      if (data.length < 8) {
        rightBtn.disabled = true;
        leftBtn.disabled = true;
        loadLessBtn.classList.add("hidden");
        loadMoreBtn.classList.add("hidden");
      } else {
        if (allContent) {
          // console.log(allContent);
          loadMoreBtn.classList.add("hidden");
          loadLessBtn.classList.remove("hidden");
          rightBtn.disabled = true;
          leftBtn.disabled = true;
        } else {
          loadMoreBtn.classList.remove("hidden");
          loadLessBtn.classList.add("hidden");
          rightBtn.disabled = false;
          leftBtn.disabled = false;
        }
        localStorage.setItem("allContent", JSON.stringify(false));
        allContent = false;
        console.log(allContent);
      }
    }

    data.forEach((item) => {
      const product = document.createElement("div");
      product.className = "product";
      product.innerHTML = `
              <div class="product__main flex-center">
                <img src=${item.thumbnail} alt="img" class="product__img"/>
                ${
                  isNav
                    ? `<div class="controls flex-center f-column">
                      <img src="./images/home/products/heart.svg" alt="heart svg" class="heart ${
                        favourites.includes(item.id) && "active"
                      }">
                      <img src="./images/home/products/cart.svg" class="seeProductImg" alt="cart">
                     </div>`
                    : `<img src="./images/home/products/delete-icon.svg" class="delete-product" alt="cart">`
                }
                ${
                  cartList.some((element) => element.id == item.id)
                    ? `<button class="product__btn active">Remove From Cart</button>`
                    : `<button class="product__btn">Add To Cart</button>`
                }
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
        detailsImagesFun();
        if (e.classList.contains("product__img")) {
          document.body.style.overflow = "auto";
          hideAllSections();
          window.scrollTo(0, 0);
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
            res.json().then((data) => {
              imgUrls = data.images;
              loadProductsDetail(data);
            });
          }

          fetchApiDetails(API_URL, "products", id);
          function loadProductsDetail(data) {
            itemPath.textContent = data.title;
            detail.innerHTML = `
                 <div class="detail__img">
                    <div class="mainImgContainer">
                      <img src=${data.images[imgIdx]} class="mainImg" alt="">
                    </div>
                    <div class="detail__imgs--container">
                      ${
                        data.images.length > 1
                          ? data.images.map((item, idx) => {
                              return `<img class="detailsImages" data-id="${idx}" src=${data.images[idx]}>`;
                            })
                          : ""
                      }
                    </div>
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
          if (JSON.parse(localStorage.getItem("isLogged"))) {
            if (!e.classList.contains("active")) {
              favourites.push(item.id);
              e.classList.add("active");
            } else {
              let remove = favourites.splice(
                favourites.findIndex((element) => element == item.id),
                1
              );
              e.classList.remove("active");

              favourites.filter((element) => element != remove);
            }
          } else {
            myPopup(
              "Login to Save",
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF2LTxzjp2cMwur3el5C9GHxA-jZfB0VcXlw&s"
            );
          }
        } else if (e.classList.contains("delete-product")) {
          favourites = favourites.filter((element) => element != item.id);
          if (favourites.length == 0) {
            hideAllSections();
            home.classList.remove("hidden");
            fetchApi(
              API_URL,
              "products",
              0,
              8,
              "",
              ".products__container",
              true
            );
          }
          console.log(favourites);

          e.closest(".product").remove();
        } else if (e.classList.contains("product__btn")) {
          if (JSON.parse(localStorage.getItem("isLogged"))) {
            if (!e.classList.contains("active")) {
              cartList.push({
                id: item.id,
                quantity: 1,
                initialPrice: item.price,
                subTotal: item.price,
              });
              e.classList.add("active");
              e.textContent = "Remove From Cart";
            } else {
              e.textContent = "Add To Cart";
              let remove = cartList.splice(
                cartList.findIndex((element) => element == item.id),
                1
              );
              e.classList.remove("active");
              cartList.filter((element) => element != remove);
            }
          } else {
            myPopup(
              "Login to Add",
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF2LTxzjp2cMwur3el5C9GHxA-jZfB0VcXlw&s"
            );
          }
        } else if (e.classList.contains("seeProductImg")) {
          myPopup(item.title, item.images[0]);
        }
        favouriteCounterFun(favourites, favouriteCounter);
        cartListCounterFun(cartList, cartCounter);

        localStorage.setItem("cartList", JSON.stringify(cartList));
        localStorage.setItem("favourites", JSON.stringify(favourites));
      });
    });
  }
};

export default loadProducts;
// Products END - - - |
