const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db.js");

router.get("/all-users", async (req, res) => {
    try {
        let sql = "SELECT Username AS username from sitelok";

        db.query(sql, (error, results, fields) => {
            if (error) throw error;
            res.json({ results: results });
        });
    } catch (error) {
        res.json({ message: error.message });
    }
});

//http:localhost:4000/user/signup
router.post("/signup", async (req, res) => {
    try {
        const { Username, Email, Passphrase, Name } = req.body;

        const hashedPassphrase = await bcrypt.hash(Passphrase, 10);

        const sql =
            "INSERT INTO sitelok (Username, Email, Passphrase, Name, Usergroups) VALUES (?, ?, ?, ?, ?)";
        const values = [
            Username,
            Email,
            hashedPassphrase,
            Name,
            `${process.env.SECRET}`,
        ];

        db.query(sql, values, (error) => {
            if (error) {
                console.error("Error signing up: ", error);
                res.status(500).json({ message: error.message });
            } else {
                const token = jwt.sign(
                    { Username, Email },
                    `${process.env.SECRET}`
                );
                res.status(200).json({ message: "User signed up", token });
            }
        });
    } catch (error) {
        console.error("Error signing up: ", error);
        res.status(500).json({ message: "Error signing up" });
    }
});
module.exports = router;
