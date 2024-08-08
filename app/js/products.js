// Load products
import rating from "./rating.js";
import { API_URL } from "./script.js";

const loadProducts = (data, destination) => {
  let allContent = JSON.parse(localStorage.getItem("allContent"));
  const loadMoreBtn = document.querySelector(".load-all"),
    productsLoaders = document.querySelector(".products-loaders"),
    rightBtn = document.querySelector(".products__controls--right"),
    mobileHeader = document.querySelector(".mobile-header"),
    mobileNav = document.querySelector(".mobile-header__nav"),
    home = document.querySelector(".home"),
    details = document.querySelector(".details"),
    searchWrapper = document.querySelector(".search-wrapper");

  let favourites = JSON.parse(localStorage.getItem("favourites")) || [],
    favouriteCounter = document.querySelector(".favourite-counter");

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
      localStorage.setItem("allContent", JSON.stringify(allContent));
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
};
// Products END - - - |

export default loadProducts;
