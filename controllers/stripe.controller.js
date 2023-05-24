require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const domain = 'http://localhost:3000';
const router = require('express').Router();
const db = require('../db.js');

router.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: 'price_1NAd4JBbFZD5Ir3VadsttQAZ',
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${domain}/success.html`,
    cancel_url: `${domain}/cancel.html`,
  });

  res.redirect(303, session.url);
});

router.get('/subscription/status/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const sql = `SELECT StripeID FROM gomot1_upright_svghunter.sitelok WHERE id = ?`;

    db.query(sql, id, (error, results) => {
      if (error) {
        console.error('Error retrieving subscription status:', error);
        return res.status(500).json({ message: error.message });
      }

      if (results.length === 0 || results[0].StripeID === null) {
        return res.status(404).json({ message: 'User not found or subscription not active' });
      }

      const stripeID = results[0].StripeID;
      console.log(stripeID);

      stripe.subscriptions.retrieve(stripeID, (error, subscription) => {
        if (error) {
          console.error('Error retrieving subscription status:', error);
          return res.status(500).json({ message: error.message });
        }

        res.status(200).json({ subscription });
      });
    });
  } catch (error) {
    console.error('Error retrieving user subscriptions:', error);
    res.status(500).json({ message: 'Error retrieving user subscriptions' });
  }
});

module.exports = router;
