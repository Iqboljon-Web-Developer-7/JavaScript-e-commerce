async function fetchAllCart(list) {
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
      }, 100);
    }

    function decrement(idx) {
      input[idx].value =
        parseInt(input.value) > 1 ? parseInt(inputs[idx].value) - 1 : 1;
    }
  }, 100);

  let carContainer = document.querySelector(".cart__container");
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
    carContainer.appendChild(cartItem);
  });
}

export default fetchAllCart;
