const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db.js");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const generateResetToken = () => {
    const tokenLength = 16; // Change the length of the reset token as needed
    const resetToken = crypto.randomBytes(tokenLength).toString("hex");
    return resetToken;
};

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

// http:localhost:4000/user/signup
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
                return res.status(401).json({ message: "User Not Found" });
            }

            const user = userArray[0];
            const isPassphraseValid = await bcrypt.compare(
                Passphrase,
                user.Passphrase
            );
            // console.log(user);

            if (!isPassphraseValid) {
                return res.json({ message: "Invalid Passphrase" });
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
        const supportEmail = "support-demo@svghunter.com";

        function sendToSupport() {
            let transporter = nodemailer.createTransport({
                host: "mail.svghunter.com",
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: "support-demo@svghunter.com", // generated ethereal user
                    pass: "uprightstudent", // generated ethereal password
                },
            });

            transporter.sendMail({
                from: `${email}`,
                to: `${supportEmail}`,
                cc: "upright.lv.team@gmail.com",
                subject: subject,
                text: message,
            });
        }

        function sendToSender() {
            let transporter = nodemailer.createTransport({
                host: "mail.svghunter.com",
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: "support-demo@svghunter.com", // generated ethereal user
                    pass: "uprightstudent", // generated ethereal password
                },
            });

            transporter.sendMail({
                from: `${supportEmail}`,
                to: `${email}`,
                subject: subject,
                text: "We have received your email. Our team will review it and get back to you as soon as possible. Thank you for contacting us!",
            });
        }
        sendToSupport();
        sendToSender();
        res.json({ message: "email sent" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Error sending email" });
    }
});

router.post("/reset-password", async (req, res) => {
    try {
        const { Email, Username } = req.body;

        // Check if the email is provided
        if (!Email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const sql = `SELECT * FROM sitelok WHERE Email = '${Email}'`;
        db.query(sql, async (error, userArray) => {
            if (error) {
                console.error("Error resetting password: ", error);
                return res.status(500).json({ message: error.message });
            }

            if (userArray.length === 0) {
                return res.status(404).json({ message: "User not found" });
            }

            const user = userArray[0];

            // Generate a unique reset token
            const resetToken = generateResetToken(); // Implement this function to generate a unique token

            // Update the user's reset token in the database
            const updateSql = `UPDATE sitelok SET ResetToken = '${resetToken}' WHERE Email = '${Email}'`;
            db.query(updateSql, async (error, result) => {
                if (error) {
                    console.error("Error updating reset token:", error);
                    return res
                        .status(500)
                        .json({ message: "Error updating reset token" });
                }

                // Generate a reset link with the token
                const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

                const sqlUsername = user.Username;

                const subject = "Password Reset";
                const message = `Hi ${sqlUsername},\n\nWe have received a password reset request for your account. Please click on the following link to reset your password:\n\n${resetLink}\n \nIf you didn't request a password reset, you can ignore this email.\n\nBest regards,\nThe SVG Hunter Team`;

                // Send the email
                const transporter = nodemailer.createTransport({
                    host: "mail.svghunter.com",
                    port: 465,
                    secure: true,
                    auth: {
                        user: "support-demo@svghunter.com",
                        pass: "uprightstudent",
                    },
                });

                const mailOptions = {
                    from: "support-demo@svghunter.com",
                    to: Email,
                    subject: subject,
                    text: message,
                };

                await transporter.sendMail(mailOptions);

                res.json({ message: "Password reset email sent" });
            });
        });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({
            message: "An error occurred while resetting the password",
        });
    }
});

router.patch("/update-password", async (req, res) => {
    try {
        const { NewPassword, Username, Email, ResetToken } = req.body;

        // Check if the new password, username, email, and reset token are provided
        if (!NewPassword || !Username || !Email || !ResetToken) {
            return res.status(400).json({
                message:
                    "New password, username, email, and reset token are required",
            });
        }

        // Retrieve the user from the database
        const sql = `SELECT * FROM sitelok WHERE Username = '${Username}' AND Email = '${Email}' AND ResetToken = '${ResetToken}'`;
        db.query(sql, async (error, userArray) => {
            if (error) {
                console.error("Error updating password:", error);
                return res.status(500).json({ message: error.message });
            }

            if (userArray.length === 0) {
                return res.status(404).json({ message: "User not found" });
            }

            const user = userArray[0];

            // Hash the new password
            const hashedNewPassword = await bcrypt.hash(NewPassword, 10);

            // Update the password and reset token in the database
            const updateSql =
                "UPDATE sitelok SET Passphrase = ?, ResetToken = NULL WHERE Username = ?";
            const updateValues = [hashedNewPassword, Username];
            db.query(updateSql, updateValues, (error, result) => {
                if (error) {
                    console.error("Error updating password:", error);
                    return res
                        .status(500)
                        .json({ message: "Error updating password" });
                }

                res.status(200).json({
                    message: "Password updated successfully",
                });
            });
        });
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ message: "Error updating password" });
    }
});

module.exports = router;
