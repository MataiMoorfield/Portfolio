const stripe = Stripe(
    "pk_live_51QfpxfGBwEiJ8bR6tBdhaVL7bbVeLfxQW9CC1urqFVIt5pdx1gOMU5VyDZ7gq6LsG6t8FEBlBC2IdekcOgvFDzb400jkBtTftv"
);

let itemQuantities = {
    item1: 1,
    item2: 1,
    item3: 1,
    item4: 1,
    item5: 1,
    item6: 1,
    item7: 1,
    item8: 1,
    item9: 1
};

let itemDetails = {
    item1: { name: 'Tui - A3 Print', priceId: "price_1QpzJ3GBwEiJ8bR60HffPhkk", price: 40.00 },
    item2: { name: 'Fighting Pied Shags - A3 Print', priceId: "price_1Qq4XKGBwEiJ8bR636Z9tcLe", price: 40.00 },
    item3: { name: 'A3 Print 3', priceId: "price_1QnwfnGBwEiJ8bR6uPiVpqy1", price: 40.00 },
    item4: { name: 'Pied Shag - Greeting Card', priceId: "price_1Qq4YrGBwEiJ8bR63EO5WSxX", price: 4.00 },
    item5: { name: 'Gannet - Greeting Card', priceId: "price_1Qq4a7GBwEiJ8bR6afbCSVWM", price: 4.00 },
    item6: { name: 'Dotterel - Greeting Card', priceId: "price_1Qq4avGBwEiJ8bR6gFxpfdHt", price: 4.00 },
    item7: { name: 'Postcard 1', priceId: "price_1Qq0mZGBwEiJ8bR6Yn6mLzSI", price: 2.00 },
    item8: { name: 'Postcard 2', priceId: "price_1Qq0mZGBwEiJ8bR6Yn6mLzSI", price: 2.00 },
    item9: { name: 'Postcard 3', priceId: "price_1Qq0mZGBwEiJ8bR6Yn6mLzSI", price: 2.00 },
};

function changeQuantity(item, change) {
    itemQuantities[item] = Math.max(0, itemQuantities[item] + change);
    document.getElementById(`${item}-quantity`).textContent = itemQuantities[item];
}

let cart = JSON.parse(sessionStorage.getItem('cart')) || []; // Load cart from sessionStorage

function addToCart(item) {
    const { name, priceId, price } = itemDetails[item];
    const quantityToAdd = itemQuantities[item];

    const existingItemIndex = cart.findIndex(cartItem => cartItem.name === name);

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantityToAdd;
    } else {
        cart.push({ name, quantity: quantityToAdd, priceId, price });
    }

    itemQuantities[item] = 1;
    document.getElementById(`${item}-quantity`).textContent = 1;

    updateCartDisplay();
    saveCart(); // Save cart to sessionStorage
}

function updateCartDisplay() {
    const cartItemsList = document.getElementById('cart-items');
    cartItemsList.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span class="cart-item-details">${item.quantity} x ${item.name} - $${(item.quantity * item.price).toFixed(2)}</span>
            <div class="cart-quantity-controls">
                <button onclick="updateCartItemQuantity('${item.name}', -1)">-</button>
                <span id="cart-${item.name}-quantity" class="quantity">${item.quantity}</span>
                <button onclick="updateCartItemQuantity('${item.name}', 1)">+</button><p>&nbsp;</p>
                <button class="remove-item" onclick="removeItem('${item.name}')">🗑️</button> </div>
        `;
        cartItemsList.appendChild(listItem);
        total += item.quantity * item.price;
    });

    document.getElementById('cart-total').textContent = `Total: $${total.toFixed(2)}`;
}

function updateCartItemQuantity(itemName, change) {
    const itemIndex = cart.findIndex(item => item.name === itemName);
    if (itemIndex > -1) {
        cart[itemIndex].quantity = Math.max(0, cart[itemIndex].quantity + change);

        if (cart[itemIndex].quantity === 0) {
            cart.splice(itemIndex, 1);
        }
        updateCartDisplay();
        saveCart();
    }
}

function removeItem(itemName) {
    const itemIndex = cart.findIndex(item => item.name === itemName);
    if (itemIndex > -1) {
        cart.splice(itemIndex, 1);
        updateCartDisplay();
        saveCart();
    }
}

function saveCart() {
    sessionStorage.setItem('cart', JSON.stringify(cart));
}

document.getElementById("checkout").addEventListener("click", () => {
    const lineItems = cart.map(item => ({
        price: item.priceId,
        quantity: item.quantity
    }));

    stripe.redirectToCheckout({
        lineItems,
        mode: "payment",
        successUrl: "https://www.matai.moorfield.co.nz/shop/success",
        cancelUrl: "https://www.matai.moorfield.co.nz/shop",
    })
        .then(result => {
            if (result.error) {
                console.error("Stripe error:", result.error);
                alert(result.error.message);
            }
        })
        .catch(error => {
            console.error("Checkout error:", error);
            alert("An error occurred during checkout.");
        });
});

updateCartDisplay(); // Initialize cart display on page load.