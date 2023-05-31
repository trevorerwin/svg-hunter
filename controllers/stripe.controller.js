require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const domain = 'http://localhost:3000';
const router = require('express').Router();
const db = require('../db.js');
const fetchUserID = require('../middleware/fetch-user-id.js');

// Creates a Stripe customer and subscribes them to a subscription plan
router.post('/create-customer', fetchUserID, async (req, res) => {
  try {
    const { email, paymentMethod, priceID } = req.body;

    // Create customer and subscription in Stripe
    const customer = await stripe.customers.create({
      email: email,
      payment_method: paymentMethod,
      invoice_settings: {
        default_payment_method: paymentMethod,
      },
    });

    const customerID = customer.id;
    const subscription = await stripe.subscriptions.create({
      customer: customerID,
      items: [{ price: priceID }],
      expand: ['latest_invoice.payment_intent'],
    });
    const userID = req.user.id;
    const updatedUsergroups = `${process.env.SECRET}:${subscription.id}`;

    const sql = `UPDATE gomot1_upright_svghunter.sitelok SET StripeID = ?, Usergroups = ? WHERE id = ?`;

    db.query(sql, [customerID, updatedUsergroups, userID], (err, result) => {
      if (err) {
        console.error('Error updating customer:', err);
        res.status(500).json({ message: err.message });
      } else {
        const updatedUser = { ...req.user, usergroup: updatedUsergroups };
        res.status(200).json({ message: 'Customer created successfully', updatedUser });
      }
    });
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ error: 'Failed to create customer' });
  }
});

router.post('/create-checkout-session', fetchUserID, async (req, res) => {
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

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

module.exports = router;
