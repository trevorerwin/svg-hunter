require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const domain = 'http://localhost:3000';
const router = require('express').Router();
const db = require('../db.js');
const fetchUserID = require('../middleware/fetch-user-id.js');

router.post('/create-customer', fetchUserID, async (req, res) => {
  try {
    const { email } = req.body;

    // Create customer
    const customer = await stripe.customers.create({
      email: email,
    });

    const userID = req.user.id;
    const customerID = customer.id;

    const sql = `UPDATE gomot1_upright_svghunter.sitelok SET StripeID = ? WHERE id = ?`;

    db.query(sql, [customerID, userID], (error, results) => {
      if (error) {
        console.error('Error updating user: ', error);
        res.status(500).json({ message: error.message });
      } else {
        res.status(200).json({ results: results });
      }
    });
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ error: 'Failed to create customer' });
  }
});

router.post('/create-subscription', fetchUserID, async (req, res) => {
  try {
    const { priceID } = req.body;
    const userID = req.user.id;
    const stripeID = req.user.StripeID;

    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: stripeID,
      items: [{ price: priceID }],
      expand: ['latest_invoice.payment_intent'],
    });

    const sql = `UPDATE gomot1_upright_svghunter.sitelok SET Usergroups = ? WHERE id = ?`;
    const updatedUsergroups = `${process.env.SECRET}:${subscription.id}`;

    db.query(sql, [updatedUsergroups, userID], (error, results) => {
      if (error) {
        console.error('Error updating user: ', error);
        res.status(500).json({ message: error.message });
      } else {
        const updatedUser = { ...req.user, usergroup: updatedUsergroups };
        res.status(200).json({ user: updatedUser });
      }
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ error: 'Failed to create subscription' });
  }
});

module.exports = router;
