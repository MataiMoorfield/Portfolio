const stripe = Stripe(
    "pk_live_51QfpxfGBwEiJ8bR6tBdhaVL7bbVeLfxQW9CC1urqFVIt5pdx1gOMU5VyDZ7gq6LsG6t8FEBlBC2IdekcOgvFDzb400jkBtTftv"
);

let item1Quantity = 0;
let item2Quantity = 0;

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

function changeQuantity(itemId, change) {
    const quantitySpan = document.getElementById(`${itemId}-quantity`);
    let quantity = parseInt(quantitySpan.textContent);
    quantity += change;

    if (quantity < 0) {
        quantity = 0; // Prevent negative quantities
    }

    quantitySpan.textContent = quantity;
}

function addToCart(productId) {
    // Logic to add the product to the cart
    // This could involve updating the cart data in local storage,
    // sending a request to a server, etc.
    console.log(`Added ${productId} to cart`);

    // Example: If you want to automatically increment quantity in the cart
    if (productId === 'product1') {
        changeQuantity('item1', 1);
    } else if (productId === 'product2') {
        changeQuantity('item2', 1);
    }

}

function changeQuantity(itemId, change) {
    const quantitySpan = document.getElementById(`${itemId}-quantity`);
    let quantity = parseInt(quantitySpan.textContent);
    quantity += change;

    if (quantity < 0) {
        quantity = 0; // Prevent negative quantities
    }

    quantitySpan.textContent = quantity;
}

function updateImage(productId, selectedValue) {
    let imageElement = document.getElementById(productId + "-image");
    let imagePath = "";

    if (productId === 'product1') {
        switch (selectedValue) {
            case "piedshag":
                imagePath = "../Images/Shop/Greeting card.png";
                break;
            case "dotterel":
                imagePath = "../Images/Shop/Print-a3.jpeg"; // Path for Dotterel card
                break;
            case "kiwi":
                imagePath = "../Images/Shop/kiwi_card.jpg"; // Path for Kiwi card
                break;
            // ... other cases
        }
    } else if (productId === 'product2') {
        switch (selectedValue) {
            case "piedshag":
                imagePath = "../Images/Shop/Print-a3.jpeg";
                break;
            case "dotterel":
                imagePath = "../Images/Shop/dotterel_print.jpg"; // Path for Dotterel print
                break;
            case "tui":
                imagePath = "../Images/Shop/tui_print.jpg"; // Path for Tui print
                break;
            // ... other cases
        }
    }
    imageElement.src = imagePath;
}