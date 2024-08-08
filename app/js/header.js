import { header, headerWrapper } from "./script.js";

function headerFun() {
  // Header

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
}

export default headerFun;
