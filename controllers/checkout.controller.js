require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const domain = 'http://localhost:4000';
const router = require('express').Router();
const db = require('../db.js');
const fetchUserID = require('../middleware/fetch-user-id.js');

router.post('/create-checkout-session', async (req, res) => {
  try {
    const { priceID } = req.body;

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceID,
          quantity: 1,
        },
      ],
      success_url: `${domain}/success.html`,
      cancel_url: `${domain}/cancel.html`,
    });
    res.redirect(303, session.url);
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

module.exports = router;
