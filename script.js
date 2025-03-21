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

// Function to calculate total cart price
function calculateTotal() {
  return cart.reduce((total, item) => total + item.price, 0);
}

// Function to handle checkout
function checkout() {
  const total = calculateTotal();
  
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  const confirmCheckout = confirm(`Total amount: $${total}\nProceed to checkout?`);
  
  if (confirmCheckout) {
    // Clear the cart
    cart = [];
    cartCount = 0;
    updateCartCount();
    saveCartToLocalStorage();
    alert('Thank you for your purchase!');
    window.location.href = 'index.html';
  }
}

// Update cart count on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
});