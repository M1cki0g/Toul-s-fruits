// let color = "red";

// set
// window.localStorage.setItem("color", color);

// get
// let t = window.localStorage.getItem("color", color);
// window.localStorage["fontsize"] = "40px";
// console.log(window.localStorage.getItem("color"));
// console.log(t);
// console.log(window.localStorage.getItem("color"));

// //remove one
// // window.localStorage.removeItem("color");

// //get key
// console.log(window.localStorage.key(0));

// clear all
// window.localStorage.clear();

// let users = {
//   email: [],
//   password: [],
// };

class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
}

function signup() {
  let find = 0;
  let email = document.getElementById("email_signin").value.trim();
  let password = document.getElementById("passwd_signin").value.trim();
  let m = document.getElementById("message_signin");

  let users = JSON.parse(localStorage.getItem("users")) || [];

  for (let i = 0; i < users.length; i++) {
    if (email.toLowerCase() === users[i].email.toLowerCase()) {
      find = 1;
      break;
    }
  }

  if (find === 0) {
    let newUser = new User(email, password);
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Set the login state and user email
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);

    // Redirect to home page after sign-in
    window.location.href = "home.html";
  } else {
    m.innerText = "Email already exists.";
  }
}
// function hideAuthButtons() {
//   document.getElementById("login").style.display = "none";
//   document.getElementById("signin").style.display = "none";
// }

// function logout() {
//   // Reset the UI
//   document.getElementById("login").style.display = "inline-block";
//   document.getElementById("signin").style.display = "inline-block";
//   document.getElementById("logoutBtn").style.display = "none";
// }
