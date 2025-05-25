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
    blacktuicard: 1,

    dotterela4: 1,
    piedshagsa4: 1,
    tuia4: 1,
    ganneta4: 1,
    piedshaga4: 1,
    blacktuia4: 1,

    ganneta3: 1,
    blacktuia3: 1,
    dotterela3: 1,
    piedshagsa3: 1,
    tuia3: 1,
    littleshaga3: 1,

    dotterelpost: 1,
    piedshagspost: 1,
    tuipost: 1,
    gannetpost: 1,
    piedshagpost: 1,
};

let itemDetails = {
    piedshagcard: { name: 'Pied Shag - Greeting Card', priceId: "price_1Qq4YrGBwEiJ8bR63EO5WSxX", price: 4.00 },
    gannetcard: { name: 'Gannet - Greeting Card', priceId: "price_1Qq4a7GBwEiJ8bR6afbCSVWM", price: 4.00 },
    dotterelcard: { name: 'Dotterel - Greeting Card', priceId: "price_1Qq4avGBwEiJ8bR6gFxpfdHt", price: 4.00 },
    piedshagscard: { name: 'Pied Shags - Greeting Card', priceId: "price_1Qq7gvGBwEiJ8bR6H75f32hE", price: 4.00 },
    blueduckcard: { name: 'Blue Duck - Greeting Card', priceId: "price_1Qq7gUGBwEiJ8bR6UQzJeCBF", price: 4.00 },
    blacktuicard: { name: 'Black Tui - Greeting Card', priceId: "price_1RSY7YGBwEiJ8bR6PLsQyk1p", price: 4.00 },

    dotterela4: { name: 'Dotterel - A4 Print', priceId: "price_1RA24jGBwEiJ8bR68RVwFWUl", price: 40.00 },
    piedshagsa4: { name: 'Pied Shags - A4 Print', priceId: "price_1RA25EGBwEiJ8bR64S6xEr9z", price: 40.00 },
    tuia4: { name: 'Tui - A4 Print', priceId: "price_1RA22MGBwEiJ8bR6FtMf1MAi", price: 40.00 },
    ganneta4: { name: 'Gannet - A4 Print', priceId: "price_1RA23HGBwEiJ8bR6dWB3ySfo", price: 40.00 },
    piedshaga4: { name: 'Pied Shag - A4 Print', priceId: "price_1RA24KGBwEiJ8bR6YCvCJztF", price: 40.00 },
    blacktuia4: { name: 'Black Tui - A4 Print', priceId: "price_1RA21vGBwEiJ8bR6C4XyvpaQ", price: 40.00 },

    ganneta3: { name: 'Gannet - A3 Print', priceId: "price_1RA21DGBwEiJ8bR6A8AbPIZD", price: 60.00 },
    blacktuia3: { name: 'Black Tui - A3 Print', priceId: "price_1RA20ZGBwEiJ8bR61EFCQzYZ", price: 60.00 },
    dotterela3: { name: 'Dotterel - A3 Print', priceId: "price_1RA20GGBwEiJ8bR6V2bgIYx5", price: 60.00 },
    piedshagsa3: { name: 'Pied Shags - A3 Print', priceId: "price_1RA1zlGBwEiJ8bR6gYYFQoIj", price: 60.00 },
    tuia3: { name: 'Tui - A3 Print', priceId: "price_1RA1zGGBwEiJ8bR6vdoE5qwI", price: 60.00 },
    littleshaga3: { name: 'Little Pied Shag - A3 Print', priceId: "price_1RA1y7GBwEiJ8bR6oRq1uUWT", price: 60.00 },

    dotterelpost: { name: 'Dotterel - Postcard', priceId: "price_1QqRkvGBwEiJ8bR6K7O60IjW", price: 2.00 },
    piedshagspost: { name: 'Pied Shags - Postcard', priceId: "price_1QqRlRGBwEiJ8bR6B0VSPjxV", price: 2.00 },
    tuipost: { name: 'Tui - Postcard', priceId: "price_1QqRlvGBwEiJ8bR6ec01PFrY", price: 2.00 },
    gannetpost: { name: 'Gannet - Postcard', priceId: "price_1QqRkRGBwEiJ8bR6WUlhHYiC", price: 2.00 },
    piedshagpost: { name: 'Pied Shag - Postcard', priceId: "price_1QqRjzGBwEiJ8bR6kCLqPKgC", price: 2.00 },

    'a3 shipping': { name: 'A3 Shipping', priceId: 'price_1Qq5vCGBwEiJ8bR6qBeoR29j', price: 10.00 },
    'a4 shipping': { name: 'A4 Shipping', priceId: 'price_1Qq5vmGBwEiJ8bR6XAzyGA6Q', price: 7.00 },
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

    if (quantityToAdd > 0) {
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

    const hasA3Item = cart.some(item => ['Gannet - A3 Print', 'Black Tui - A3 Print', 'Dotterel - A3 Print', 'Pied Shags - A3 Print', 'Tui - A3 Print', 'Little Pied Shag - A3 Print'].includes(item.name));
    const hasA4Item = cart.some(item => ['Dotterel - A4 Print', 'Pied Shags - A4 Print', 'Tui - A4 Print', 'Gannet - A4 Print', 'Pied Shag - A4 Print 3', 'Black Tui - A4 Print'].includes(item.name));
    const hasSmallItem = cart.some(item => ['Pied Shag - Greeting Card', 'Gannet - Greeting Card', 'Dotterel - Greeting Card', 'Pied Shags - Greeting Card', 'Blue Duck - Greeting Card', 'Dotterel - Postcard', 'Pied Shags - Postcard', 'Tui - Postcard', 'Gannet - Postcard', 'Pied Shag - Postcard',].includes(item.name)); // Updated to include piedshag-6

    let shippingItemName = null;

    if (hasA3Item) {
        shippingItemName = 'a3 shipping';
    } else if (hasA4Item) {
        shippingItemName = 'a4 shipping';
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
        const address = result.value;
        console.log("Shipping address collected:", address);
        stripe.redirectToCheckout({
            lineItems,
            mode: "payment",
            successUrl: "https://www.matai.moorfield.co.nz/shop/success/",
            cancelUrl: "https://www.matai.moorfield.co.nz/shop",

            shippingAddressCollection: {
                allowedCountries: ['NZ'],
            },
            clientReferenceId: JSON.stringify(address)
        })
            .then(result => { /* ... */ })
            .catch(error => { /* ... */ });

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

hideCart();
document.getElementById("minimise").addEventListener("click", hideCart);

document.getElementById("cart-toggle").addEventListener("click", showCart);
const shippingAddressElement = stripe.elements().create('address', { mode: 'shipping' });
shippingAddressElement.mount('#shipping-address');