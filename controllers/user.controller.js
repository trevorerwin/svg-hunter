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
                res.status(200).json({ message: "new user created", token });
            }
        });
    } catch (error) {
        console.error("Error signing up: ", error);
        res.status(500).json({ message: "Error signing up" });
    }
});

// http://localhost:4000/user/login
router.post("/login", (req, res) => {
    try {
        const { Username, Passphrase } = req.body;

        // Check if the username and passphrase are provided
        if (!Username || !Passphrase) {
            return res
                .status(400)
                .json({ message: "Username and passphrase are required" });
        }

        const sql = `SELECT * FROM sitelok WHERE Username = '${Username}'`;
        db.query(sql, async (error, userArray) => {
            if (error) {
                console.error("Error logging in: ", error);
                return res.status(500).json({ message: error.message });
            }

            if (userArray.length === 0) {
                return res.status(401).json({ message: "pooped my pants / Username Incorrect" });
            }
            console.log(userArray)
            const user = userArray[0];
            console.log(user)
            let isPassphraseValid = await bcrypt.compare(Passphrase, user.Passphrase);

            if (isPassphraseValid == false) {
                return res.json({ message: "Password Incorrect" });
            }
            // TODO make secret web token secret in dotenv file
            // Generate a JWT token
            const token = jwt.sign({ Username }, `${process.env.SECRET}`);

            // Send the token in the response
            res.status(200).json({ message: "Login successful", token });
        });
    } catch (error) {
        console.error("Error logging in: ", error);
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;
