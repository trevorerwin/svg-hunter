require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const domain = 'http://localhost:3000';

app.post('/create-checkout-session', async (req, res) => {
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
