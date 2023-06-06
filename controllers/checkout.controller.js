require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const domain = 'http://localhost:3000';
const router = require('express').Router();
const express = require('express');
const db = require('../db.js');
const bodyParser = require('body-parser');
// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.STRIPE_CLI_SECRET;

// Middleware to capture the raw req body
const captureRawBody = (req, res, next) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    req.rawBody = body;
    next();
  });
};

router.post('/create-checkout-session', express.json(), async (req, res) => {
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
      success_url: `${domain}/success`,
      cancel_url: `${domain}/cancel`,
    });
    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  let event = req.body;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = req.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return res.sendStatus(400);
    }
  }
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;

      const { customer, customer_details, subscription } = session;
      const updatedUsergroups = `${process.env.USER_GROUP}:${subscription}`;
      const customer_email = customer_details.email;

      try {
        const sql = `UPDATE gomot1_upright_svghunter.sitelok SET StripeID = ?, Usergroups = ? WHERE Email = ?`;

        db.query(sql, [customer, updatedUsergroups, customer_email], (err, result) => {
          if (err) {
            console.error('Error updating customer:', err);
            return res.status(500).json({ message: err.message });
          } else {
            const updatedUser = { ...req.user, usergroup: subscription };
            return res.status(200).json({ message: 'Customer created successfully', updatedUser });
          }
        });
      } catch (error) {
        console.error('Error updating customer:', error);
        return res.status(500).json({ message: error.message });
      }

      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a res to acknowledge receipt of the event
  // res.json({ received: true });
});

router.get('/success', (req, res) => {
  console.log(req.query);
  const { session_id } = req.query;

  const session = stripe.checkout.sessions.retrieve(session_id);

  const { customer_email, payment_method } = session;
  res.json({ customer_email: customer_email, payment_method: payment_method });
});

router.get('/cancel', (req, res) => {
  res.send('Cancelled');
});

module.exports = router;
