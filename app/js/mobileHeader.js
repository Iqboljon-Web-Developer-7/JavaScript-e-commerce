function toggleMobileHeader(mobileHeader, mobileNav, mobileInput) {
  mobileHeader.classList.toggle("active");
  mobileHeader.classList.remove("searcher");
  mobileNav.classList.remove("hidden");
  mobileInput.value = "";
}

export default toggleMobileHeader;
