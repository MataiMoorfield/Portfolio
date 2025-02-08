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
    item9: 1
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

// ... (Your functions: changeQuantity, addToCart, updateCartDisplay, updateCartItemQuantity, removeItem, saveCart, hideCart, showCart)

document.getElementById("checkout").addEventListener("click", () => {
    const lineItems = cart.map(item => ({
        price: item.priceId,
        quantity: item.quantity
    }));

    // Shipping Logic (same as before)
    const hasA3Item = cart.some(item => ['Tui - A3 Print', 'Fighting Pied Shags - A3 Print', 'Black Tui - A3 Print 3'].includes(item.name));
    const hasSmallItem = cart.some(item => ['Pied Shag - Greeting Card', 'Gannet - Greeting Card', 'Dotterel - Greeting Card', 'Pied Shags screaming - Greeting Card', 'Blue Duck - Greeting Card'].includes(item.name));

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
        successUrl: "https://www.matai.moorfield.co.nz/shop/success",
        cancelUrl: "https://www.matai.moorfield.co.nz/shop",
        shipping_address_collection: {
            allowed_countries: ['NZ'], // **Crucially, specify allowed countries**
        },

    })
    .then(response => response.json())
    .then(data => {
        if (data.sessionId) {
            stripe.redirectToCheckout({
                sessionId: data.sessionId,
            });
        } else if (data.error) {
            console.error("Stripe Checkout Error:", data.error);
            alert("There was an error processing your checkout. Please try again later.");
        } else {
            console.error("Unexpected response from /create-checkout-session:", data);
            alert("There was an unexpected error processing your checkout. Please try again later.");
        }
    })
    .catch((error) => {
        console.error('Fetch Error:', error);
        alert("There was a network error. Please try again later.");
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