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
      items: [{ price: priceID }],
    });

    const userID = req.user.id;
    const customerID = customer.id;
    const subscription = customer.subscriptions.data[0];
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

module.exports = router;
