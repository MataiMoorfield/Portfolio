const express = require('express');
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const serverless = require('serverless-http');

app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
    const { lineItems, shipping } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            shipping_address_collection: {
                allowed_countries: ['NZ'],
            },
            shipping_options: [
                {
                    shipping_rate: process.env.SHIPPING_RATE_ID
                },
            ],
            success_url: 'https://www.matai.moorfield.co.nz/shop/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'https://www.matai.moorfield.co.nz/shop',
        });

        res.json({ sessionId: session.id });
    } catch (error) {
        console.error("Error creating Checkout Session:", error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/checkout-session', async (req, res) => {
    const { sessionId } = req.query;

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        res.json({ session });
    } catch (error) {
        console.error("Error retrieving Checkout Session:", error);
        res.status(500).json({ error: error.message });
    }
});

exports.handler = serverless(app);