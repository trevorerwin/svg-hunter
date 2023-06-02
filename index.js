require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const userController = require('../svg-hunter/controllers/user.controller');
const svgController = require('../svg-hunter/controllers/svg.controller');
const svg_tagController = require('../svg-hunter/controllers/svg_tag.controller');
const stripeController = require('../svg-hunter/controllers/stripe.controller');
const checkoutController = require('../svg-hunter/controllers/checkout.controller');

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
