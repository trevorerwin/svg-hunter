require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const domain = 'http://localhost:3000';
const router = require('express').Router();
const db = require('../db.js');
const fetchUserID = require('../middleware/fetch-user-id.js');

router.post('/create-customer', fetchUserID, async (req, res) => {
  try {
    console.log(`userId: ${req.user.id}`);
    const { email, paymentMethod } = req.body;

    // Create customer
    const customer = await stripe.customers.create({
      email,
      payment_method: paymentMethod,
      invoice_settings: {
        default_payment_method: paymentMethod,
      },
    });

    console.log(customer);

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

module.exports = router;
