require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const domain = 'http://localhost:3000';
const router = require('express').Router();
const express = require('express');
const db = require('../db.js');
const bodyParser = require('body-parser');
// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.STRIPE_CLI_SECRET;

// Middleware to capture the raw request body
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
      success_url: `${domain}/success`,
      cancel_url: `${domain}/cancel`,
    });
    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

router.post('/webhook', captureRawBody, express.json(), (req, res) => {
  console.log('Webhook route called');
  const sig = req.headers['stripe-signature'];
  const rawBody = req.rawBody;
  console.log('sig and rawbody created');
  let event;

  try {
    console.log('created event');
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err) {
    console.error('Error constructing webhook:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  console.log('switch statement');
  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;

      const { customer, customer_details, subscription } = session;
      const updatedUsergroups = `${process.env.SECRET}:${subscription}`;
      const customer_email = customer_details.email;

      try {
        const sql = `UPDATE gomot1_upright_svghunter.sitelok SET StripeID = ?, Usergroups = ? WHERE Email = ?`;

        db.query(sql, [customer, updatedUsergroups, customer_email], (err, result) => {
          if (err) {
            console.error('Error updating customer:', err);
            res.status(500).json({ message: err.message });
          } else {
            const updatedUser = { ...req.user, usergroup: subscription };
            res.status(200).json({ message: 'Customer created successfully', updatedUser });
          }
        });
      } catch (error) {
        console.error('Error updating customer:', error);
        res.status(500).json({ message: error.message });
      }

      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  res.json({ received: true });
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
