async function fetchAllCart(list) {
  let cartList = JSON.parse(localStorage.getItem("cartList"));
  let initialPrices = [];
  setTimeout(() => {
    let incrementBtn = document.querySelectorAll(".increment");
    let decrementBtn = document.querySelectorAll(".decrement");
    let inputs = document.querySelectorAll(".cartItem__units--input");
    let cartTotalPrice = document.querySelectorAll(".cartItem__total");

    incrementBtn.forEach((item, idx) =>
      item.addEventListener("click", () => {
        changeCartInfo(idx, true);
      })
    );
    decrementBtn.forEach((item, idx) => {
      item.addEventListener("click", () => {
        changeCartInfo(idx, false);
      });
    });
    function changeCartInfo(idx, isUp) {
      if (isUp) {
        inputs[idx].value = parseInt(inputs[idx].value) + 1;
      } else {
        inputs[idx].value =
          parseInt(inputs[idx].value) > 1 ? parseInt(inputs[idx].value) - 1 : 1;
      }
      cartList[idx].quantity = parseInt(inputs[idx].value);

      cartList[idx].subTotal =
        cartList[idx].initialPrice * cartList[idx].quantity;

      cartTotalPrice[idx].textContent = `$${cartList[idx].subTotal.toFixed(2)}`;
      localStorage.setItem("cartList", JSON.stringify(cartList));
    }
  }, 0);

  let cartContainer = document.querySelector(".cart__container");
  cartContainer.innerHTML = "";

  list.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cartItem";
    cartItem.innerHTML = `
      <div class="cartItem__img-name flex-center">
        <img src="${item.images[0]}" alt="cartItem image">
        <p>${item.title}</p>
      </div>
      <div class="cartItem__price">
        <p>$${item.price}</p>
      </div>
      <div class="cartItem__units">
      <button class="increment"><i class="fa-solid fa-chevron-up"></i></button>
      <input type="number" class="cartItem__units--input" value="1" id="numberInput">
      <button class="decrement"><i class="fa-solid fa-chevron-down"></i></button>
      </div>
      <div class="cartItem__total">
        $${item.price}
      </div>
      `;
    cartContainer.appendChild(cartItem);
  });
}

export default fetchAllCart;
