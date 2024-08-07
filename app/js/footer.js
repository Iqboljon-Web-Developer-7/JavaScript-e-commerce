function footer() {
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
}

export default footer;
