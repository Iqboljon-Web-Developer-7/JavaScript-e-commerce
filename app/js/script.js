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
