import { home, details, register, favouritesPage, cartPage } from "./script.js";

function pagesChanging(headerLinks, headerNav, headerMobileNav) {
  // Pages changing

  headerLinks.forEach((link, idx) => {
    link.addEventListener("click", () => {
      headerLinks[idx].classList.add("active");

      headerLinks.forEach((link2, idx2) => {
        if (idx != idx2) {
          headerLinks[idx2].classList.remove("active");
        }
      });

      setTimeout(() => {
        window.scroll({ top: 0, left: 0 }); // Smooth scroll to the top-left corner
      }, 100);
    });
  });
  headerNav.addEventListener("click", (e) => changePages(e));
  headerMobileNav.addEventListener("click", (e) => {
    headerMobileNav.parentElement.classList.remove("active");
    changePages(e);
  });
  function changePages(e) {
    e = e.target;
    if (e.textContent == "Home") {
      details.classList.add("hidden");
      home.classList.remove("hidden");
      register.classList.add("hidden");
      favouritesPage.classList.add("hidden");
      cartPage.classList.add("hidden");
    } else if (e.textContent == "Sign Up") {
      home.classList.add("hidden");
      details.classList.add("hidden");
      register.classList.remove("hidden");
      favouritesPage.classList.add("hidden");
    }
  }

  // Pages changing end - - - |
}
export default pagesChanging;
