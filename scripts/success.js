document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');

    if (sessionId) {
        const apiURL = 'https://026lkm2gi4.execute-api.ap-southeast-2.amazonaws.com/dev/checkout-session?sessionId=' + sessionId;

        fetch(apiURL)
            .then(response => response.json())
            .then(data => {
                const session = data.session;
                const shippingAddress = session.shipping_address;

                if (shippingAddress) {
                    const addressDisplay = document.getElementById('shipping-address'); // Correct element ID
                    if (addressDisplay) {
                        addressDisplay.textContent = `
                            ${shippingAddress.name}
                            ${shippingAddress.address.line1}
                            ${shippingAddress.address.city}
                            ${shippingAddress.address.state}
                            ${shippingAddress.address.postal_code}
                            ${shippingAddress.address.country}
                        `;
                    } else {
                        console.error("Element with ID 'shipping-address' not found on the page.");
                    }
                } else {
                    console.log("No shipping address found in session.");
                }
            })
            .catch(error => console.error("Error retrieving session:", error));
    } else {
        console.log("No session ID found in URL.");
    }
});
        

     