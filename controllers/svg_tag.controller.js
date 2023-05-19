const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db.js");

// http://localhost:4000/svg_tag/display-by-tag/:svgTag
router.get("/display-by-tag/:svgTag", (req, res) => {
    try {
        const svgTag = req.params.svgTag;

        const sql = `SELECT * FROM gomot1_upright_svghunter.SVG WHERE id IN (SELECT svgId FROM gomot1_upright_svghunter.SVG_Tags WHERE svgTag = ?)`;
        const values = [svgTag];

        db.query(sql, values, (error, results) => {
            if (error) {
                console.error("Error retrieving SVGs by tag: ", error);
                res.status(500).json({ message: error.message });
            } else {
                res.status(200).json({ results: results });
            }
        });
    } catch (error) {
        console.error("Error retrieving SVGs by tag: ", error);
        res.status(500).json({ message: "Error retrieving SVGs by tag" });
    }
});
module.exports = router;
