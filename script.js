document.addEventListener("DOMContentLoaded", () => {
    // Initialize an empty cart array
    let cart = [];

    // Function to update the cart summary (total items and cost)
    function updateCartSummary() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0); // Sum up quantities
        const totalCost = cart.reduce((sum, item) => sum + item.price * item.quantity, 0); // Sum up costs

        // Update the cart items and cost on the page
        document.getElementById("total-items").innerText = totalItems;
        document.getElementById("total-cost").innerText = `$${totalCost.toFixed(2)}`;
    }

    // Function to update the cart display with the current items
    function updateCartDisplay() {
        const cartItemsContainer = document.getElementById("cart-items-container");
        cartItemsContainer.innerHTML = ""; // Clear the existing cart items

        // Loop through the cart items and add them to the display
        cart.forEach((item, index) => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `
                <p>${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</p>
                <button class="discard-item">Discard</button>
            `;
            cartItemsContainer.appendChild(itemElement);

            // Add event listener to the discard button
            itemElement.querySelector(".discard-item").addEventListener("click", () => removeFromCart(index));
        });
    }

    // Function to add items to the cart
    function addToCart(event) {
        const itemName = event.target.getAttribute("data-name");
        const itemPrice = parseFloat(event.target.getAttribute("data-price"));

        // Check if the item already exists in the cart
        const existingItemIndex = cart.findIndex((item) => item.name === itemName);
        if (existingItemIndex > -1) {
            // If the item exists, increase its quantity
            cart[existingItemIndex].quantity++;
        } else {
            // Add new item to the cart array
            cart.push({ name: itemName, price: itemPrice, quantity: 1 });
        }

        // Update the cart display and summary
        updateCartDisplay();
        updateCartSummary();
    }

    // Function to remove an item from the cart
    function removeFromCart(index) {
        cart.splice(index, 1); // Remove the item at the specified index
        updateCartDisplay(); // Update the cart display
        updateCartSummary(); // Update the cart summary
    }

    // Attach event listeners to all "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", addToCart);
    });

    // Payment processing event
    const proceedPaymentBtn = document.getElementById("proceed-payment");
    proceedPaymentBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty. Please add items to proceed.");
            return;
        }

        const selectedPaymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

        alert(`Proceeding to payment...\nPayment Method: ${selectedPaymentMethod}\nTotal Cost: ${document.getElementById("total-cost").innerText}`);

        // Simulate payment success and redirect to the success page
        setTimeout(() => {
            window.location.href = "payment-success.html"; // Redirect to payment success page
        }, 1000); // Redirect after 1 second
    });

    // Add the "Proceed to Payment" button redirect
    document.getElementById('proceed-payment').addEventListener('click', function() {
        // Redirect to the payment success page
        window.location.href = 'payment-success.html';
    });

    // Menu toggle functionality for mobile view
    const menu = document.querySelector("#mobile-menu");
    const menuLinks = document.querySelector(".navbar__menu");
    menu.addEventListener("click", function () {
        menu.classList.toggle("is-active");
        menuLinks.classList.toggle("active");
    });
});

document.getElementById('proceed-payment').addEventListener('click', function() {
    // Redirect to the payment success page
    window.location.href = 'payment-success.html';
});
