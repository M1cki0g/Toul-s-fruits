document.addEventListener("DOMContentLoaded", function () {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  if (!isAdmin) {
    alert("Access denied! Admins only.");
    window.location.assign("admin.html");
  } else {
    loadProducts();
  }
});

function loadProducts() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const productContainer = document.getElementById("admin-product-container");

  productContainer.innerHTML = ""; // Clear the container

  products.forEach((product, index) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product-item";
    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
  <h1 style="color: black;">${product.name}</h1>
  <p style="color: black;">${product.quantity} Per Kg</p>
  <h1 style="color: black;">${product.price}$</h1>
  <button onclick="deleteProduct(${index})" style="color: black; background-color:red; 
                                             border-radius:10px">Supprimer</button>
  <button onclick="editProduct(${index})" style="color: black;
                                             border-radius:10px">Modifier</button>
`;
    productContainer.appendChild(productDiv);
  });
}

function addProduct() {
  const name = document.getElementById("product-name").value;
  const quantity = document.getElementById("product-quantity").value;
  const image = document.getElementById("product-image").files[0];
  const price = document.getElementById("product-price").value;
  const reader = new FileReader();

  reader.onloadend = function () {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    products.push({ name, quantity, price, image: reader.result });
    localStorage.setItem("products", JSON.stringify(products));
    alert("Product added successfully!");
    loadProducts();
    closePopup();
  };

  if (image) {
    reader.readAsDataURL(image);
  } else {
    alert("Please select an image.");
  }
}

function deleteProduct(index) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  if (index >= 0 && index < products.length) {
    products.splice(index, 1); // Remove the product
    localStorage.setItem("products", JSON.stringify(products)); // Update localStorage
    alert("Product deleted successfully!");
    loadProducts(); // Reload the product list
  }
}

function editProduct(index) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const product = products[index];
  document.getElementById("product-name").value = product.name;
  document.getElementById("product-quantity").value = product.quantity;
  document.getElementById("login_f").innerText = "Save Product";
  document.getElementById("login_f").onclick = function () {
    saveProduct(index);
  };
  openPopup();
}

function saveProduct(index) {
  const name = document.getElementById("product-name").value;
  const quantity = document.getElementById("product-quantity").value;
  const image = document.getElementById("product-image").files[0];
  const reader = new FileReader();

  reader.onloadend = function () {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    products[index] = { name, quantity, image: reader.result };
    localStorage.setItem("products", JSON.stringify(products));
    alert("Product updated successfully!");
    loadProducts();
    closePopup();
    document.getElementById("login_f").innerText = "Add Product";
    document.getElementById("login_f").onclick = addProduct;
  };

  if (image) {
    reader.readAsDataURL(image);
  } else {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    products[index] = { name, quantity, image: products[index].image };
    localStorage.setItem("products", JSON.stringify(products));
    alert("Product updated successfully!");
    loadProducts();
    closePopup();
    document.getElementById("login_f").innerText = "Add Product";
    document.getElementById("login_f").onclick = addProduct;
  }
}

function openPopup() {
  document.getElementById("popup").style.display = "block";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}
