const stripe = Stripe(
    "pk_live_51QfpxfGBwEiJ8bR6tBdhaVL7bbVeLfxQW9CC1urqFVIt5pdx1gOMU5VyDZ7gq6LsG6t8FEBlBC2IdekcOgvFDzb400jkBtTftv"
);

let itemQuantities = {
    tuia3: 1,
    piedshagsa3: 1,
    blacktuia3: 1,
    piedshagcard: 1,
    gannetcard: 1,
    dotterelcard: 1,
    piedshagscard: 1,
    blueduckcard: 1,
};

let itemDetails = {
    tuia3: { name: 'Tui - A3 Print', priceId: "price_1QpzJ3GBwEiJ8bR60HffPhkk", price: 40.00 },
    piedshagsa3: { name: 'Fighting Pied Shags - A3 Print', priceId: "price_1Qq4XKGBwEiJ8bR636Z9tcLe", price: 40.00 },
    blacktuia3: { name: 'Black Tui - A3 Print 3', priceId: "", price: 40.00 },
    piedshagcard: { name: 'Pied Shag - Greeting Card', priceId: "price_1Qq4YrGBwEiJ8bR63EO5WSxX", price: 4.00 },
    gannetcard: { name: 'Gannet - Greeting Card', priceId: "price_1Qq4a7GBwEiJ8bR6afbCSVWM", price: 4.00 },
    dotterelcard: { name: 'Dotterel - Greeting Card', priceId: "price_1Qq4avGBwEiJ8bR6gFxpfdHt", price: 4.00 },
    piedshagscard: { name: 'Pied Shags screaming - Greeting Card', priceId: "price_1Qq7gvGBwEiJ8bR6H75f32hE", price: 4.00 },
    blueduckcard: { name: 'Blue Duck - Greeting Card', priceId: "price_1Qq7gUGBwEiJ8bR6UQzJeCBF", price: 4.00 },
    item8: { name: 'Postcard 2', priceId: "", price: 2.00 },
    item9: { name: 'Postcard 3', priceId: "", price: 2.00 },
    'a3 shipping': { name: 'A3 Shipping', priceId: 'price_1Qq5vCGBwEiJ8bR6qBeoR29j', price: 10.00 },
    'a4 shipping': { name: 'A4 Shipping', priceId: '', price: 7.00 },
    'small shipping': { name: 'Small Shipping', priceId: 'price_1Qq5wTGBwEiJ8bR6UgDokFzC', price: 5.00 }
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

    showCart(); // shows the div for the cart

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
        if (!['A3 Shipping', 'A4 Shipping', 'Small Shipping'].includes(item.name)) {
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
        }
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

    // Shipping Logic (Prioritized)
    const hasA3Item = cart.some(item => ['Tui - A3 Print', 'Fighting Pied Shags - A3 Print', 'Black Tui - A3 Print 3'].includes(item.name));
    const hasSmallItem = cart.some(item => ['Pied Shag - Greeting Card', 'Gannet - Greeting Card', 'Dotterel - Greeting Card', 'Pied Shags screaming - Greeting Card', 'Blue Duck - Greeting Card'].includes(item.name)); // Updated to include piedshag-6

    let shippingItemName = null;

    if (hasA3Item) {
        shippingItemName = 'a3 shipping';
    } else if (hasSmallItem) {
        shippingItemName = 'small shipping';
    }

    if (shippingItemName) {
        const shippingItem = itemDetails[shippingItemName];
        lineItems.push({
            price: shippingItem.priceId,
            quantity: 1
        });
    }

    stripe.redirectToCheckout({
        lineItems,
        mode: "payment",
        shipping_address_collection: {  // This is the essential part!
            allowed_countries: ['NZ'], // Or any countries you want
        },
        shipping_options: [ // You may want to add shipping options too
            {
                shipping_rate: process.env.SHIPPING_RATE_ID
            },
        ],
        successUrl: "https://www.matai.moorfield.co.nz/shop/success?session_id={CHECKOUT_SESSION_ID}",
        cancelUrl: "https://www.matai.moorfield.co.nz/shop",
    })
        .then(result => { /* ... */ })
        .catch(error => { /* ... */ });
});

updateCartDisplay();

function hideCart() {
    document.getElementById("cart-toggle").style.display = "block";
    document.getElementById("cart-toggle").style.opacity = 1;
    document.getElementById("cart").style.bottom = "-100%";
}

function showCart() {
    document.getElementById("cart").style.bottom = "0%";
    document.getElementById("cart-toggle").style.opacity = 0;
    setTimeout(_ => document.getElementById("cart-toggle").style.display = "none", 500);
}
document.getElementById("minimise").addEventListener("click", hideCart);

document.getElementById("cart-toggle").addEventListener("click", showCart);