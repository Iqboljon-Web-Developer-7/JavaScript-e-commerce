async function fetchAllCart(list) {
  let cartList = JSON.parse(localStorage.getItem("cartList"));
  setTimeout(() => {
    let incrementBtn = document.querySelectorAll(".increment");
    let decrementBtn = document.querySelectorAll(".decrement");
    let inputs = document.querySelectorAll(".cartItem__units--input");

    incrementBtn.forEach((item, idx) =>
      item.addEventListener("click", () => {
        increment(idx);
      })
    );
    decrementBtn.forEach((item, idx) => {
      item.addEventListener("click", () => {
        decrement(idx);
      });
    });
    function increment(idx) {
      setTimeout(() => {
        inputs[idx].value = parseInt(inputs[idx].value) + 1;
        cartList[idx].quantity = parseInt(inputs[idx].value);
        cartList[idx].price = (
          cartList[idx].price * parseInt(inputs[idx].value)
        ).toFixed(2);
        localStorage.setItem("cartList", JSON.stringify(cartList));
      }, 100);
    }

    function decrement(idx) {
      inputs[idx].value =
        parseInt(inputs[idx].value) > 1 ? parseInt(inputs[idx].value) - 1 : 1;
      cartList[idx].quantity = parseInt(inputs[idx].value);
      cartList[idx].price = (
        cartList[idx].price * parseInt(inputs[idx].value)
      ).toFixed(2);
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
