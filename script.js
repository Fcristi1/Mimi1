// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartCount = cart.length;

// Update cart count on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});

// Function to add a product to the cart
function addToCart(productName, price) {
    const product = {
        name: productName,
        price: parseFloat(price)
    };
    cart.push(product);
    cartCount++;
    updateCartCount();
    saveCart();
    alert(`${productName} added to cart!`);
}

// Function to update the cart count in the UI
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

// Function to save the cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to display cart items in cart.html
function displayCart() {
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    if (!cartItemsElement || !cartTotalElement) return;

    cartItemsElement.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<p>Your cart is empty.</p>';
        cartTotalElement.textContent = '0.00';
        return;
    }

    cart.forEach((item, index) => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsElement.appendChild(cartItemDiv);
        total += item.price;
    });

    cartTotalElement.textContent = total.toFixed(2);
}

// Function to remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    cartCount--;
    updateCartCount();
    saveCart();
    displayCart();
}

// Function to handle checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
    const confirmCheckout = confirm(`Total amount: $${total}\nProceed to checkout?`);

    if (confirmCheckout) {
        cart = [];
        cartCount = 0;
        updateCartCount();
        saveCart();
        alert('Thank you for your purchase!');
        window.location.href = 'index.html';
    }
}

// Display cart on cart page
if (window.location.pathname.includes('cart.html')) {
    displayCart();
}