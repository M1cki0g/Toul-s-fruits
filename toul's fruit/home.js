document.addEventListener("DOMContentLoaded", function () {
  updateButtons();
});

function updateButtons() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userEmail = localStorage.getItem("userEmail");

  document.getElementById("login").style.display = isLoggedIn
    ? "none"
    : "inline-block";
  document.getElementById("signin").style.display = isLoggedIn
    ? "none"
    : "inline-block";
  document.getElementById("logoutBtn").style.display = isLoggedIn
    ? "inline-block"
    : "none";
  document.getElementById("userEmail").style.display = isLoggedIn
    ? "inline-block"
    : "none";
  document.getElementById("userEmail").innerText = isLoggedIn ? userEmail : "";
}

function logout() {
  localStorage.removeItem("isLoggedIn"); // Reset login state
  localStorage.removeItem("isAdmin"); // Reset admin state
  localStorage.removeItem("userEmail"); // Remove user email
  updateButtons(); // Update buttons
}
