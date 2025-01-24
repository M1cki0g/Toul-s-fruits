document.addEventListener("DOMContentLoaded", function () {
  loadProducts();
  updateButtons();
});

function loadProducts() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const productContainer = document.getElementById("product-container");

  productContainer.innerHTML = ""; // Clear the container

  products.forEach((product, index) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product-item";
    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h1>${product.name}</h1>
      <p>Per Kg</p>
      <h1>${product.quantity}</h1>
      <button id="shop-now" onclick="placeOrder('${product.name}')">Shop</button>
    `;
    productContainer.appendChild(productDiv);
  });
}

function placeOrder(productName) {
  const modal = document.getElementById("quantityModal");
  modal.style.display = "block";
  modal.setAttribute("data-product-name", productName);
}

function closeModal() {
  const modal = document.getElementById("quantityModal");
  modal.style.display = "none";
}

function confirmbtn() {
  console.log("confirmOrder");
  const modal = document.getElementById("quantityModal");
  const productName = modal.getAttribute("data-product-name");
  const quantity = document.getElementById("quantityInput").value;
  console.log(quantity);
  if (quantity && quantity > 0) {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push({ productName, quantity, status: "Pending" });
    localStorage.setItem("orders", JSON.stringify(orders));
    alert("Order placed successfully!");
    closeModal();
    loadOrders(); // Ensure the order list is reloaded
  } else {
    alert("Please enter a valid quantity.");
  }
}

function updateButtons() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  document.getElementById("login").style.display = isLoggedIn
    ? "none"
    : "inline-block";
  document.getElementById("signin").style.display = isLoggedIn
    ? "none"
    : "inline-block";
  document.getElementById("logoutBtn").style.display = isLoggedIn
    ? "inline-block"
    : "none";
}

function logout() {
  localStorage.removeItem("isLoggedIn"); // Reset login state
  localStorage.removeItem("isAdmin"); // Reset admin state
  updateButtons(); // Update buttons
}
