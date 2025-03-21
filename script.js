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
  return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
}

// Function to display cart items
function displayCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  
  if (!cartItems) return;
  
  cartItems.innerHTML = '';
  
  if (cart.length === 0) {
    cartItems.innerHTML = '<p>Your cart is empty</p>';
    cartTotal.textContent = '0.00';
    return;
  }

  cart.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';
    itemDiv.innerHTML = `
      <span>${item.name}</span>
      <span>$${item.price.toFixed(2)}</span>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItems.appendChild(itemDiv);
  });

  cartTotal.textContent = calculateTotal();
}

// Function to remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  cartCount--;
  updateCartCount();
  saveCartToLocalStorage();
  displayCart();
}

// Function to handle checkout
function checkout() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  const total = calculateTotal();
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
  displayCart();
});