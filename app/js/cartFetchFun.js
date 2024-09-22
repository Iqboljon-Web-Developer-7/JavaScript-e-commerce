import cartListCounterFun from "./cartListCounter.js";
import {
  about,
  cartCounter,
  cartPage,
  contact,
  details,
  favouritesPage,
  home,
  register,
} from "./script.js";

let eventCount = 0;
async function fetchAllCarts(list) {
  const check = eventCount < 1;
  let cartList = JSON.parse(localStorage.getItem("cartList"));
  let checkoutBtn = document.querySelector(".checkout-btn");

  let subtotalPrice;
  let totalPrice;
  let cartTotalPrice;
  let inputs;
  let myPopup;
  let totalCartsPrice = 0;

  setTimeout(() => {
    const cart = document.querySelector(".cart__container");

    inputs = document.querySelectorAll(".cartItem__units--input");
    cartTotalPrice = document.querySelectorAll(".cartItem__total");
    subtotalPrice = document.querySelector(".subTotal-price");
    totalPrice = document.querySelector(".totalPrice");

    cartList.forEach((item, idx) => {
      inputs[idx].value = item.quantity;
      cartTotalPrice[idx].textContent = `$${item.subTotal.toFixed(2)}`;
      showTotalPrice();
    });

    myPopup = new Popup({
      id: "my-popup",
      title: "Confirm process",
      content: `
             <div class="confirmModal">
               <p class="description">After confirmation you can't undo the process</p>
               <p>Total price is <span>${totalCartsPrice}</span></p>
               <div class="confirmBtns flex-center">
                <button class="cancel">Cancel</button>
                <button class="confirm">Confirm</button>
               </div>
             </div>
            `,
    });

    check &&
      cart.addEventListener("click", (e) => {
        let product = e.target.closest(".cartItem");
        let input;
        let inputValue;

        if (e.target.classList.contains("deleteCart")) {
          deleteItem(product.dataset.id);
          console.log("delete working");
          console.log(cartList);
        } else if (e.target.classList.contains("increment")) {
          input = e.target.nextElementSibling;
          inputValue = e.target.nextElementSibling.value;
          input.value = Number(inputValue) + 1;

          console.log(input);

          cartList = cartList.map((item) => {
            if (item.id == product.dataset.id) {
              item.quantity = input.value;
              let subTotal = product.querySelector(".cartItem__total");
              subTotal.textContent = `$${(
                item.initialPrice * +input.value
              ).toFixed(2)}`;
              item.subTotal = item.initialPrice * +item.quantity;
            }
            return item;
          });
        } else if (e.target.classList.contains("decrement")) {
          input = e.target.previousElementSibling;
          inputValue = e.target.previousElementSibling.value;
          if (Number(inputValue) > 1) {
            input.value = Number(inputValue) - 1;
          }

          cartList = cartList.map((item) => {
            if (item.id == product.dataset.id) {
              item.quantity = input.value;
              let subTotal = product.querySelector(".cartItem__total");
              subTotal.textContent = `$${(
                item.initialPrice * +input.value
              ).toFixed(2)}`;
              item.subTotal = item.initialPrice * +item.quantity;
            }
            return item;
          });
        }

        localStorage.setItem("cartList", JSON.stringify(cartList));
        showTotalPrice();

        console.log(cartList);

        if (cartList.length == 0) {
          cartPage.classList.add("hidden");
          home.classList.remove("hidden");
        }
      });

    function deleteItem(id) {
      // updateCartlistStorage();

      console.log(id);
      console.log(cartList);

      cartList = cartList.filter((prdc) => prdc.id !== +id);
      list = list.filter((listItem) => listItem.id !== +id);

      console.log(cartList);

      cartListCounterFun(cartList, cartCounter);
      showTotalPrice();
      updateCartList();
      localStorage.setItem("cartList", JSON.stringify(cartList));
    }
    function updateCartlistStorage() {
      cartList = JSON.parse(localStorage.getItem("cartList"));
    }
  }, 0);

  check && checkoutBtn.addEventListener("click", resetPopup);

  eventCount++;

  function resetPopup() {
    myPopup = new Popup({
      id: "my-popup",
      title: "Confirm process",
      content: `
             <div class="confirmModal">
               <p class="description">After confirmation you can't undo the process</p>
               <p>Total price is <span>$${totalCartsPrice}</span></p>
               <div class="confirmBtns flex-center">
                <button class="cancel-btn cancel">Cancel</button>
                <button class="confirm-btn confirm">Confirm</button>
               </div>
             </div>
            `,
    });
    myPopup.show();
    let cancelBtn = document.querySelector(".cancel-btn");
    let confirmBtn = document.querySelector(".confirm-btn");
    check &&
      cancelBtn.addEventListener("click", () => {
        myPopup.hide();
      });
    check &&
      confirmBtn.addEventListener("click", () => {
        myPopup.hide();
        localStorage.removeItem("cartList");
        about.classList.add("hidden");
        home.classList.remove("hidden");
        details.classList.add("hidden");
        register.classList.add("hidden");
        favouritesPage.classList.add("hidden");
        cartPage.classList.add("hidden");
        contact.classList.add("hidden");
        window.scroll(0, 0);
        cartListCounterFun([], cartCounter);
      });
  }

  setTimeout(() => {
    showTotalPrice();
  }, 100);

  function showTotalPrice() {
    let subTotal = 0;
    cartList.forEach((item, idx) => {
      subTotal += item.subTotal;
    });
    subtotalPrice.textContent = `$${subTotal.toFixed(2)}`;
    totalPrice.textContent = `$${subTotal.toFixed(2)}`;
    totalCartsPrice = subTotal.toFixed(2);
  }

  let cartContainer = document.querySelector(".cart__container");
  cartContainer.innerHTML = "";

  function updateCartList() {
    console.log(cartContainer);
    cartContainer.innerHTML = "";

    list.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cartItem";
      cartItem.dataset.id = item.id;
      cartItem.innerHTML = `
        <div class="cartItem__img-name flex-center">
          <span class="flex-center deleteCart" tabindex="-1">X</span>
          <img src="${item.images[0]}" alt="cartItem image">
          <p>${item.title}</p>
        </div>
        <div class="cartItem__price">
          <p>$${item.price}</p>
        </div>
        <div class="cartItem__units">
          <i class="fa-solid fa-chevron-up increment"></i>
          <input type="number" class="cartItem__units--input" value="1" id="numberInput">
          <i class="fa-solid fa-chevron-down decrement"></i>
        </div>
        <div class="cartItem__total">
          $${item.price.toFixed(2)}
        </div>
        `;
      cartContainer.appendChild(cartItem);
    });
  }
  updateCartList();
}

export default fetchAllCarts;
