const stripe = Stripe(
    "pk_live_51QfpxfGBwEiJ8bR6tBdhaVL7bbVeLfxQW9CC1urqFVIt5pdx1gOMU5VyDZ7gq6LsG6t8FEBlBC2IdekcOgvFDzb400jkBtTftv"
);

const checkout = stripe.checkout;

let itemQuantities = {
    piedshagcard: 1,
    gannetcard: 1,
    dotterelcard: 1,
    piedshagscard: 1,
    blueduckcard: 1,
    
    dotterela4: 1,
    piedshagsa4: 1,
    tuia4: 1,
    ganneta4: 1,
    piedshaga4: 1,
};

let itemDetails = {
    piedshagcard: { name: 'Pied Shag - Greeting Card', priceId: "price_1Qq4YrGBwEiJ8bR63EO5WSxX", price: 4.00 },
    gannetcard: { name: 'Gannet - Greeting Card', priceId: "price_1Qq4a7GBwEiJ8bR6afbCSVWM", price: 4.00 },
    dotterelcard: { name: 'Dotterel - Greeting Card', priceId: "price_1Qq4avGBwEiJ8bR6gFxpfdHt", price: 4.00 },
    piedshagscard: { name: 'Pied Shags screaming - Greeting Card', priceId: "price_1Qq7gvGBwEiJ8bR6H75f32hE", price: 4.00 },
    blueduckcard: { name: 'Blue Duck - Greeting Card', priceId: "price_1Qq7gUGBwEiJ8bR6UQzJeCBF", price: 4.00 },
    
    dotterela4: { name: 'Dotterel - A4 Print', priceId: "price_1QqOo6GBwEiJ8bR6vq1dGkVJ", price: 30.00 },
    piedshagsa4: { name: 'Pied Shags screaming - A4 Print', priceId: "price_1QqOoeGBwEiJ8bR64ODnFIrP", price: 30.00 },
    tuia4: { name: 'Tui - A4 Print', priceId: "price_1QqOq1GBwEiJ8bR6VxqII35h", price: 30.00 },
    ganneta4: { name: 'Gannet - A4 Print', priceId: "price_1QqOp1GBwEiJ8bR6D7C0PkNn", price: 30.00 },
    piedshaga4: { name: 'Pied Shag - A4 Print 3', priceId: "price_1QqOpMGBwEiJ8bR6sW1u55Bj", price: 30.00 },
    'a3 shipping': { name: 'A3 Shipping', priceId: 'price_1Qq5vCGBwEiJ8bR6qBeoR29j', price: 10.00 },
    'a4 shipping': { name: 'A4 Shipping', priceId: '', price: 7.00 },
    'small shipping': { name: 'Small Shipping', priceId: 'price_1Qq5wTGBwEiJ8bR6UgDokFzC', price: 5.00 }
};

function changeQuantity(item, change) {
    itemQuantities[item] = Math.max(0, itemQuantities[item] + change);
    document.getElementById(`${item}-quantity`).textContent = itemQuantities[item];
}

let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

function addToCart(item) {
    const { name, priceId, price } = itemDetails[item];
    const quantityToAdd = itemQuantities[item];

    const existingItemIndex = cart.findIndex(cartItem => cartItem.name === name);

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantityToAdd;
    } else {
        cart.push({ name, quantity: quantityToAdd, priceId, price });
    }

    showCart();

    itemQuantities[item] = 1;
    document.getElementById(`${item}-quantity`).textContent = 1;

    updateCartDisplay();
    saveCart();

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
    
    shippingAddressElement.getValue().then(function (result) {
        if (result.error) {
            // Display error to your customer (e.g., insufficient address details)
            console.error(result.error.message);
            alert("Please fill in all required address fields."); // Or a better error message
        } else {
            // No errors, proceed to Checkout
            const address = result.value;
            console.log("Shipping address collected:", address); // Log the address

            // Now you have the address, include it in the Checkout Session
            stripe.redirectToCheckout({
                lineItems,
                mode: "payment",
                successUrl: "https://www.matai.moorfield.co.nz/shop/success",
                cancelUrl: "https://www.matai.moorfield.co.nz/shop",
                // Pass the address to Stripe (see below for how to use it)
                shippingAddressCollection: {
                    allowedCountries: ['NZ'], // Example countries
                },
                clientReferenceId: JSON.stringify(address) // Or a dedicated metadata field
            })
                .then(result => { /* ... */ })
                .catch(error => { /* ... */ });
        }
    });


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

const shippingAddressElement = stripe.elements().create('address', {mode: 'shipping'});
shippingAddressElement.mount('#shipping-address');
