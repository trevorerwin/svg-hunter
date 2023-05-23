const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db.js");
const nodemailer = require("nodemailer");

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
                return res.status(401).json({ message: "pooped my pants" });
            }

            const user = userArray[0];

            isPassphraseValid = bcrypt.compare(Passphrase, user.Passphrase);

            if (isPassphraseValid == false) {
                return res.json({ message: "Invalid credentials" });
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

// http://localhost:4000/user/send-email
router.post("/send-email", async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        let transporter = nodemailer.createTransport({
            host: "mail.svghunter.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "support-demo@svghunter.com", // generated ethereal user
                pass: "uprightstudent", // generated ethereal password
            },
        });

        const mailOptions = {
            from: email, // Use the user-entered email as the sender's email
            to: "upright.lv.team@gmail.com", // Replace with the email address where you want to receive the emails
            subject: subject,
            text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
        };

        const mailOptions2 = {
            from: "support-demo@svghunter.com",
            to: email,
            subject: subject,
            text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                return res.status(500).json({ message: "Error sending email" });
            }
            transporter.sendMail(mailOptions2, (error, info) => {
                if (error) {
                    console.error("Error sending email:", error);
                    return res
                        .status(500)
                        .json({ message: "Error sending email" });
                }
            });
            res.status(200).json({ message: "Email sent" });
        });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Error sending email" });
    }
});

module.exports = router;
