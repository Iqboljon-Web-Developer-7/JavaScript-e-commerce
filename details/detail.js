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

let query = new URLSearchParams(window.location.search);
let id = query.get("id");
const API_URL = "https://dummyjson.com";
let path = document.querySelector(".product-name");
const detail = document.querySelector(".detail");

async function fetchApi(url, path, id) {
  let res = await fetch(`${url}/${path}/${id}`);
  res.json().then((data) => loadContents(data));
}

fetchApi(API_URL, "products", id);

function rating(num, randomData) {
  let sNum = randomData.rating;
  return num < sNum ? "fa-solid fa-star active" : "fa-solid fa-star";
}
function loadContents(data) {
  console.log(data);
  path.textContent = data.title;
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
