const stripe = Stripe(
    "pk_test_51QfpxfGBwEiJ8bR6zXvmdmnvT9pRoezKxiQ3qwYF55Y54TwrurUfa7o0Vt7K0VlLxDGfd1cNgPm6Vh6O9tKYT1pw00VkINCxfc"
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
    item1: { name: 'A3 Print 1', priceId: "price_1QnwfnGBwEiJ8bR6uPiVpqy1", price: 40.00 },
    item2: { name: 'A3 Print 2', priceId: "price_1QnwfnGBwEiJ8bR6uPiVpqy1", price: 40.00 },
    item3: { name: 'A3 Print 3', priceId: "price_1QnwfnGBwEiJ8bR6uPiVpqy1", price: 40.00 },

    item4: { name: 'Card - Pied Shag', priceId: "price_1Qnwg2GBwEiJ8bR6zv1nSOKj", price: 4.00 },
    item5: { name: 'Card - Gannet', priceId: "price_1Qnwg2GBwEiJ8bR6zv1nSOKj", price: 4.00 },
    item6: { name: 'Card - Dotterel', priceId: "price_1Qnwg2GBwEiJ8bR6zv1nSOKj", price: 4.00 },

    item7: { name: 'Postcard 1', priceId: "price_1Qq0mZGBwEiJ8bR6Yn6mLzSI", price: 2.00 },
    item8: { name: 'Postcard 2', priceId: "price_1Qq0mZGBwEiJ8bR6Yn6mLzSI", price: 2.00 },
    item9: { name: 'Postcard 3', priceId: "price_1Qq0mZGBwEiJ8bR6Yn6mLzSI", price: 2.00 },
};

function changeQuantity(item, change) {
    itemQuantities[item] = Math.max(0, itemQuantities[item] + change);
    document.getElementById(`${item}-quantity`).textContent = itemQuantities[item];
}

const cart = [];

function addToCart(item) {
    const { name, priceId, price } = itemDetails[item]; // Get price
    const quantityToAdd = itemQuantities[item];

    const existingItemIndex = cart.findIndex(cartItem => cartItem.name === name);

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantityToAdd;
    } else {
        cart.push({ name, quantity: quantityToAdd, priceId, price }); // Add price to cart item
    }

    itemQuantities[item] = 1;
    document.getElementById(`${item}-quantity`).textContent = 1;

    updateCartDisplay();
}

function updateCartDisplay() {
const cartItemsList = document.getElementById('cart-items');
cartItemsList.innerHTML = '';

let total = 0;

cart.forEach(item => {
const listItem = document.createElement('li');

// Use a template literal correctly, escaping single quotes within
listItem.innerHTML = `
    <span class="cart-item-details">${item.quantity} x ${item.name} - $${(item.quantity * item.price).toFixed(2)}</span>
    <div class="cart-quantity-controls">
        <button onclick="updateCartItemQuantity('${item.name}', -1)">-</button>
        <span id="cart-${item.name}-quantity" class="quantity">${item.quantity}</span>
        <button onclick="updateCartItemQuantity('${item.name}', 1)">+</button>
    </div>
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
updateCartDisplay();  // Crucial: Update the display after changing quantity
}
}

document.getElementById("checkout").addEventListener("click", () => {
    const lineItems = cart.map(item => ({
        price: item.priceId,
        quantity: item.quantity
    }));

    stripe.redirectToCheckout({
        lineItems,
        mode: "payment",
        successUrl: "https://www.matai.moorfield.co.nz",
        cancelUrl: "https://www.matai.moorfield.co.nz",
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