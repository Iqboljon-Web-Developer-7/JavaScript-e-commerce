function registerFun(register, home, headerLinks) {
  // Register forms
  const signUp = document.querySelector(".sign-up"),
    signIn = document.querySelector(".sign-in"),
    signInBtn = document.querySelector("#loginBtn"),
    signUpBtn = document.querySelector("#signUpBtn"),
    signUpForm = document.querySelector("#signUpForm"),
    signInForm = document.querySelector("#signInForm"),
    userIcon = document.querySelector(".fa-user"),
    userInfos = document.querySelector(".user");

  signUp.classList.add("hidden");
  signIn.classList.remove("hidden");

  let isLoggedIn = false;
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
      localStorage.removeItem("userdata");
      userInfos.classList.remove("active");
      userIcon.classList.add("hidden");
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
        data.message == "Invalid credentials"
      ) {
        input1.classList.add("error");
        input2.classList.add("error");
      } else {
        localStorage.setItem("userdata", JSON.stringify(data));
        input1.classList.remove("error");
        input2.classList.remove("error");
      }

      button.innerHTML = "Logged In :)";
      register.classList.add("hidden");
      home.classList.remove("hidden");
      userIcon.classList.remove("hidden");
      headerLinks[0].classList.add("active");
      headerLinks[3].classList.remove("active");
      setTimeout(() => {
        button.innerHTML = "Login";
      }, 1000);
    }
  }
  // Register forms end
}

export default registerFun;
