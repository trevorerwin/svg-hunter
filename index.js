require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const userController = require('./controllers/user.controller');
const svgController = require('./controllers/svg.controller');
const svg_tagController = require('./controllers/svg_tag.controller');
const stripeController = require('./controllers/stripe.controller');
const checkoutController = require('./controllers/checkout.controller');

app.use(cors());
app.use('/checkout', checkoutController);

app.use(express.json());

app.use('/user', userController);
app.use('/svg', svgController);
app.use('/svg_tag', svg_tagController);
app.use('/stripe', stripeController);

app.listen(process.env.PORT, () => {
  console.log(`mysql server running on port ${process.env.PORT}`);
});
