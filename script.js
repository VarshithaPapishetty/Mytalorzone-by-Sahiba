// Mobile menu toggle
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Profile dropdown toggle
const profileDropdown = document.getElementById('profileDropdown');
const profileMenu = document.getElementById('profileMenu');

if (profileDropdown && profileMenu) {
    profileDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
        profileMenu.classList.toggle('hidden');
    });

    // Close the dropdown when clicking outside
    document.addEventListener('click', () => {
        profileMenu.classList.add('hidden');
    });
}

// Simulated user authentication
let isLoggedIn = false;

// Login form submission
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Simulated login (replace with actual authentication logic)
        if (email && password) {
            isLoggedIn = true;
            localStorage.setItem('isLoggedIn', 'true');
            alert('Login successful!');
            window.location.href = 'index.html';
        } else {
            alert('Please enter both email and password.');
        }
    });
}

// Signup form submission
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }
        
        // Simulated signup (replace with actual registration logic)
        if (name && email && password) {
            alert('Account created successfully! Please log in.');
            window.location.href = 'login.html';
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutButton = document.getElementById('checkoutButton');
    const totalAmount = document.getElementById('totalAmount');

    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = '';
            emptyCart.classList.remove('hidden');
            cartTotal.classList.add('hidden');
            checkoutButton.classList.add('hidden');
        } else {
            emptyCart.classList.add('hidden');
            cartTotal.classList.remove('hidden');
            checkoutButton.classList.remove('hidden');

            let total = 0;
            cartItems.innerHTML = cart.map((item, index) => {
                total += item.price * item.quantity;
                return `
                    <div class="flex items-center justify-between border-b pb-4">
                        <div class="flex items-center">
                            <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-md mr-4">
                            <div>
                                <h3 class="font-semibold">${item.name}</h3>
                                <p class="text-gray-600">$${item.price.toFixed(2)} x ${item.quantity}</p>
                            </div>
                        </div>
                        <button onclick="removeFromCart(${index})" class="text-red-500 hover:text-red-700">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
            }).join('');

            totalAmount.textContent = total.toFixed(2);
        }
    }
}

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Initialize cart on page load
updateCart();

// My Orders functionality
let orders = JSON.parse(localStorage.getItem('orders')) || [];

function updateOrders() {
    const ordersList = document.getElementById('ordersList');
    const emptyOrders = document.getElementById('emptyOrders');

    if (ordersList) {
        if (orders.length === 0) {
            ordersList.innerHTML = '';
            emptyOrders.classList.remove('hidden');
        } else {
            emptyOrders.classList.add('hidden');
            ordersList.innerHTML = orders.map((order, index) => {
                return `
                    <div class="bg-white rounded-lg shadow-md p-6 mb-4">
                        <h3 class="font-semibold text-lg mb-2">Order #${order.id}</h3>
                        <p class="text-gray-600 mb-2">Date: ${order.date}</p>
                        <p class="text-gray-600 mb-2">Total: $${order.total.toFixed(2)}</p>
                        <p class="text-gray-600">Status: ${order.status}</p>
                    </div>
                `;
            }).join('');
        }
    }
}

// Initialize orders on page load
updateOrders();

// Check login status on page load
window.addEventListener('DOMContentLoaded', () => {
    isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    updateLoginStatus();
});

function updateLoginStatus() {
    const loginLink = document.querySelector('#profileMenu a:first-child');
    if (loginLink) {
        if (isLoggedIn) {
            loginLink.textContent = 'Logout';
            loginLink.href = '#';
            loginLink.addEventListener('click', logout);
        } else {
            loginLink.textContent = 'Login / Signup';
            loginLink.href = 'login.html';
            loginLink.removeEventListener('click', logout);
        }
    }
}

function logout() {
    isLoggedIn = false;
    localStorage.removeItem('isLoggedIn');
    alert('You have been logged out.');
    updateLoginStatus();
    window.location.href = 'index.html';
}

