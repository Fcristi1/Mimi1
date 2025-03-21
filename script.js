// Initialize cart if it doesn't exist in localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartCount = cart.length;

// Function to add a product to the cart
function addToCart(productName, price) {
  const product = { name: productName, price: price };
  cart.push(product);
  cartCount++;
  updateCartCount();
  saveCartToLocalStorage();
  alert(`${productName} added to cart!`);
}

// Function to update the cart count in the UI
function updateCartCount() {
  document.getElementById('cart-count').textContent = cartCount;
}

// Function to save the cart to localStorage
function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart count on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
});