const stripe = Stripe(
    "pk_live_51QfpxfGBwEiJ8bR6tBdhaVL7bbVeLfxQW9CC1urqFVIt5pdx1gOMU5VyDZ7gq6LsG6t8FEBlBC2IdekcOgvFDzb400jkBtTftv"
);

let item1Quantity = 1;
let item2Quantity = 1;

function changeQuantity(item, change) {
    if (item === 'item1') {
        item1Quantity = Math.max(0, item1Quantity + change);
        document.getElementById('item1-quantity').textContent = item1Quantity;
    } else if (item === 'item2') {
        item2Quantity = Math.max(0, item2Quantity + change);
        document.getElementById('item2-quantity').textContent = item2Quantity;
    }
}

document.getElementById("checkout").addEventListener("click", function () {
    stripe.redirectToCheckout({
        lineItems: [
            {
                price: "price_1Qnx4qGBwEiJ8bR6QeXDoAL3", // Greeting Card
                quantity: item1Quantity,
            },
            {
                price: "price_1QpzJ3GBwEiJ8bR60HffPhkk", // A3 print
                quantity: item2Quantity,
            },
        ],
        mode: "payment",
        successUrl: "https://www.matai.moorfield.co.nz",
        cancelUrl: "https://www.matai.moorfield.co.nz",
    })
        .then(function (result) {
            if (result.error) {
                console.error("Stripe error:", result.error);
                alert(result.error.message);
            }
        })
        .catch(function (error) {
            console.error("Checkout error:", error);
            alert("An error occurred during checkout.");
        });
});