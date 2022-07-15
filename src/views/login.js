import axios from "axios";

const signUpButton = document.getElementById("signUpBtn");

signUpButton.addEventListener("click", async (event) => {
  event.preventDefault();
  console.log("sign up button has been clicked");

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  if (!email || !password) {
    alert("Fill in the form!");
    return;
  }

  const body = { email, password };

  const userToken = await axios.post("/user/signup", body);
  console.log(userToken);

  localStorage.setItem("token", userToken.data.token);
});


