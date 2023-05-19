require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());
const userController = require("../svg-hunter/controllers/user.controller");
const svgController = require("../svg-hunter/controllers/svg.controller");
const svg_tagController = require("../svg-hunter/controllers/svg_tag.controller");

app.use(express.json());

app.use("/user", userController);
app.use("/svg", svgController);
app.use("/svg_tag", svg_tagController);

app.listen(process.env.PORT, () => {
    console.log(`mysql server running on port ${process.env.PORT}`);
});
