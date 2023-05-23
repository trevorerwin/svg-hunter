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
    mode: 'payment',
    success_url: `${domain}/success.html`,
    cancel_url: `${domain}/cancel.html`,
  });

  res.redirect(303, session.url);
});

router.get('/subscription/status/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const sql = `SELECT HasActiveStripeSub FROM gomot1_upright_svghunter.sitelok WHERE id = ?`;

    db.query(sql, [id], (error, results) => {
      if (error) {
        console.error('Error verifying subscription status: ', error);
        res.status(500).json({ message: error.message });
      }

      console.log(results);

      if (results.length === 0) {
        res.status(404).json({ message: 'User not found' });
      }

      const HasActiveStripeSub = results[0].HasActiveStripeSub;

      console.log(HasActiveStripeSub);

      res.status(200).json({ HasActiveStripeSub });
    });
  } catch (error) {
    console.error('Error verifying subscription status: ', error);
    res.status(500).json({ message: 'Error verifying subscription status' });
  }
});

module.exports = router;
