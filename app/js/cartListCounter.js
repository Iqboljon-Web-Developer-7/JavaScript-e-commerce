function cartListCounterFun(cartList, cartListCounter) {
  if (cartList.length != 0) {
    cartListCounter.classList.remove("invi");
    cartListCounter.textContent = cartList.length;
  } else {
    cartListCounter.classList.add("invi");
  }
}

export default cartListCounterFun;
