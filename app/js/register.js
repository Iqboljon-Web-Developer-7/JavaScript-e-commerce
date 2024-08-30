import { register, home, favouriteCounter, cartCounter } from "./script.js";
import favouriteCounterFun from "./favouriteCounter.js";
import cartListCounterFun from "./cartListCounter.js";

function registerFun(headerLinks) {
  // Register forms
  const signUp = document.querySelector(".sign-up"),
    signIn = document.querySelector(".sign-in"),
    signInForm = document.querySelector("#signInForm"),
    userIcon = document.querySelector(".fa-user"),
    userInfos = document.querySelector(".user");

  signUp.classList.add("hidden");
  signIn.classList.remove("hidden");

  let userData = JSON.parse(localStorage.getItem("userdata")) || [];
  userData.length != 0 ? userIcon.classList.remove("hidden") : null;

  userIcon.addEventListener("click", () => {
    let userData = JSON.parse(localStorage.getItem("userdata")) || [];
    userInfos.innerHTML = `
    <div class="user__info flex-center">
      <img src=${userData.image} alt="1" width="400">
      <div class="user__info--name">
        <h4 class="name">${userData.firstName}</h4>
        <p class="username">${userData.username}</p>
      </div>
    </div>
    <div class="user__nav flex-center f-column">
      <button class="leave" name="logout">Log Out</button>
    </div>
`;
    userInfos.classList.toggle("active");
  });
  userInfos.addEventListener("click", (e) => {
    if (e.target.name == "logout") {
      userInfos.classList.remove("active");
      userIcon.classList.add("hidden");
      localStorage.clear();
      favouriteCounterFun([], favouriteCounter);
      cartListCounterFun([], cartCounter);
      let heartIcons = document.querySelectorAll(".heart");
      heartIcons.forEach((heartIcon) => {
        heartIcon.classList.remove("active");
      });
    }
  });

  signInForm.addEventListener("submit", formDataHandler);
  function formDataHandler(e) {
    e.preventDefault();
    e.srcElement.children.login.innerHTML = "";

    let miniLoader = document.createElement("div");
    miniLoader.classList.add("mini-loader");

    e.srcElement.children.login.append(miniLoader);

    let name = e.srcElement.children.name.value;
    let password = e.srcElement.children.password.value;

    async function fetchUser(name, password, e) {
      let res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: name,
          password: password,
          expiresInMins: 30,
        }),
      })
        .then((res) => res.json())
        .then((data) => validation(e, data));
    }

    fetchUser(name, password, e);
    function validation(e, data) {
      let input1 = e.srcElement.children.name;
      let input2 = e.srcElement.children.password;
      let button = e.srcElement.children.login;

      if (
        data.message == "Username and password required" ||
        data.message == "Invalid credentials" ||
        input1.value == JSON.parse(localStorage.getItem("name"))
      ) {
        input1.classList.add("error");
        input2.classList.add("error");
        if (input1.value == JSON.parse(localStorage.getItem("name"))) {
          button.innerHTML = "Already Logged In :)";
        }
        // localStorage.setItem("isLogged", JSON.parse(false));
      } else {
        localStorage.setItem("userdata", JSON.stringify(data));
        input1.classList.remove("error");
        input2.classList.remove("error");
        button.innerHTML = "Logged In :)";
        register.classList.add("hidden");
        home.classList.remove("hidden");
        userIcon.classList.remove("hidden");
        headerLinks[0].classList.add("active");
        headerLinks[3].classList.remove("active");
        localStorage.setItem("name", JSON.stringify(name));
        localStorage.setItem("isLogged", JSON.parse(true));
      }

      setTimeout(() => {
        button.innerHTML = "Login";
      }, 1000);
    }
  }
  // Register forms end
}

export default registerFun;
