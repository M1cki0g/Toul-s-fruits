function login(email, password) {
  let m = document.getElementById("message_login");

  const adminCredentials = {
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
  };

  let find = false;
  let isAdmin = false;

  let check = JSON.parse(localStorage.getItem("users")) || [];
  for (let i = 0; i < check.length; i++) {
    if (
      email.toLowerCase() === check[i].email.toLowerCase() &&
      password === check[i].password
    ) {
      find = true;
      break;
    }
  }

  if (
    email.toLowerCase() === adminCredentials.email.toLowerCase() &&
    password === adminCredentials.password
  ) {
    isAdmin = true;
  }

  if (find || isAdmin) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);
    if (isAdmin) {
      localStorage.setItem("isAdmin", "true");
      window.location.href = "admin.html";
    } else {
      window.location.href = "home.html";
    }
  } else {
    m.innerText = "Invalid email or password.";
  }
}
