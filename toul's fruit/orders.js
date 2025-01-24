document.addEventListener("DOMContentLoaded", function () {
  loadOrders();
});

function loadOrders() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const ordersContainer = document.getElementById("orders-container");

  ordersContainer.innerHTML = ""; // Clear the container

  orders.forEach((order, index) => {
    const orderDiv = document.createElement("div");
    orderDiv.className = "order-item";
    orderDiv.innerHTML = `
      <h1>Product: ${order.productName}</h1>
      <p>Quantity: ${order.quantity || 0}</p>
      <p>Status: ${order.status}</p>
      <button onclick="confirmOrder(${index})">Confirm</button>
      <button onclick="declineOrder(${index})" class="decline-btn">Decline</button>
      <button onclick="deleteOrder(${index})" class="delete-btn">delete</button>
    `;
    ordersContainer.appendChild(orderDiv);
  });
}

function confirmOrder(index) {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  if (index >= 0 && index < orders.length) {
    orders[index].status = "Confirmed";
    localStorage.setItem("orders", JSON.stringify(orders));
    loadOrders(); // Reload the order list
  }
}

function declineOrder(index) {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  if (index >= 0 && index < orders.length) {
    orders[index].status = "Declined";
    localStorage.setItem("orders", JSON.stringify(orders));
    loadOrders(); // Reload the order list
  }
}

function deleteOrder(index) {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  if (index >= 0 && index < orders.length) {
    orders.splice(index, 1); // Remove the order
    localStorage.setItem("orders", JSON.stringify(orders)); // Update localStorage
    loadOrders(); // Reload the order list
  }
}
