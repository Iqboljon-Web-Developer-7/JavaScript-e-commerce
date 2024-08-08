import { home, details, register } from "./script.js";

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
    });
  });
  headerNav.addEventListener("click", (e) => changePages(e));
  headerMobileNav.addEventListener("click", (e) => changePages(e));
  function changePages(e) {
    e = e.target;
    if (e.textContent == "Home") {
      details.classList.add("hidden");
      home.classList.remove("hidden");
      register.classList.add("hidden");
    } else if (e.textContent == "Sign Up") {
      home.classList.add("hidden");
      details.classList.add("hidden");
      register.classList.remove("hidden");
    }
  }

  // Pages changing end - - - |
}
export default pagesChanging;
