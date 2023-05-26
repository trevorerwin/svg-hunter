const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db.js');
const nodemailer = require('nodemailer');

router.get('/all-users', async (req, res) => {
  try {
    let sql = 'SELECT Username AS username from sitelok';

    db.query(sql, (error, results, fields) => {
      if (error) throw error;
      res.json({ results: results });
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// http:localhost:4000/user/signup
router.post('/signup', async (req, res) => {
  try {
    const { Username, Email, Passphrase, Name } = req.body;

    const hashedPassphrase = await bcrypt.hash(Passphrase, 10);

    const sql = 'INSERT INTO sitelok (Username, Email, Passphrase, Name, Usergroups) VALUES (?, ?, ?, ?, ?)';
    const values = [Username, Email, hashedPassphrase, Name, `${process.env.SECRET}`];
    db.query(sql, values, (error) => {
      if (error) {
        console.error('Error signing up: ', error);
        res.status(500).json({ message: error.message });
      } else {
        const token = jwt.sign({ Username, Email }, `${process.env.SECRET}`);
        res.status(200).json({ message: 'new user created', token });
      }
    });
  } catch (error) {
    console.error('Error signing up: ', error);
    res.status(500).json({ message: 'Error signing up' });
  }
});

// http://localhost:4000/user/login
router.post('/login', (req, res) => {
  try {
    const { Username, Passphrase } = req.body;

    // Check if the username and passphrase are provided
    if (!Username || !Passphrase) {
      return res.status(400).json({ message: 'Username and passphrase are required' });
    }

    const sql = `SELECT * FROM sitelok WHERE Username = '${Username}'`;
    db.query(sql, async (error, userArray) => {
      if (error) {
        console.error('Error logging in: ', error);
        return res.status(500).json({ message: error.message });
      }

      if (userArray.length === 0) {
        return res.status(401).json({ message: 'pooped my pants' });
      }

      const user = userArray[0];
      const isPassphraseValid = await bcrypt.compare(Passphrase, user.Passphrase);
      console.log(user);

      if (!isPassphraseValid) {
        return res.json({ message: 'Invalid credentials' });
      }
      // TODO make secret web token secret in dotenv file
      // Generate a JWT token
      const token = jwt.sign({ Username }, `${process.env.SECRET}`);
      // Send the token in the response
      res.status(200).json({ message: 'Login successful', token });
    });
  } catch (error) {
    console.error('Error logging in: ', error);
    res.status(500).json({ message: error.message });
  }
});

// http://localhost:4000/user/send-email
router.post('/send-email', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    let transporter = nodemailer.createTransport({
      host: 'mail.svghunter.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'support-demo@svghunter.com', // generated ethereal user
        pass: 'uprightstudent', // generated ethereal password
      },
    });

    const mailOptions = {
      from: email, // Use the user-entered email as the sender's email
      to: 'upright.lv.team@gmail.com', // Replace with the email address where you want to receive the emails
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
    };

    const mailOptions2 = {
      from: 'support-demo@svghunter.com',
      to: email,
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Error sending email' });
      }
      transporter.sendMail(mailOptions2, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).json({ message: 'Error sending email' });
        }
      });
      res.status(200).json({ message: 'Email sent' });
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
});

// http://localhost:4000/user/reset-password
router.post('/reset-password', async (req, res) => {
  try {
    const { Email } = req.body;

    // Check if the email is provided
    if (!Email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const sql = `SELECT * FROM sitelok WHERE Email = '${Email}'`;
    db.query(sql, async (error, userArray) => {
      if (error) {
        console.error('Error resetting password: ', error);
        return res.status(500).json({ message: error.message });
      }

      if (userArray.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const user = userArray[0];

      // Generate a unique token or temporary password for password reset
      const resetLink = `http://127.0.0.1:5500/svg-hunter/client/svg-hunter-app/src/Auth/create-new-password.html`; // Replace with your reset link

      const name = 'User';
      const subject = 'Password Reset';
      const message = `Hi ${name},\n\nWe have received a password reset request for your account. Please click on the following link to reset your password:\n\n${resetLink}\n\nIf you didn't request a password reset, you can ignore this email.\n\nBest regards,\nThe SVG Hunter Team`;

      // Send the email
      const transporter = nodemailer.createTransport({
        host: 'mail.svghunter.com',
        port: 465,
        secure: true,
        auth: {
          user: 'support-demo@svghunter.com',
          pass: 'uprightstudent',
        },
      });

      const mailOptions = {
        from: 'support-demo@svghunter.com',
        to: Email,
        subject: subject,
        text: message,
      };

      await transporter.sendMail(mailOptions);

      res.json({ message: 'Password reset email sent' });
    });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({
      message: 'An error occurred while resetting the password',
    });
  }
});

// http://localhost:4000/user/update-password
router.patch('/update-password', async (req, res) => {
  try {
    const { Passphrase, NewPassword, Username, Email } = req.body;

    // Check if the existing password, new password, and username are provided
    if (!NewPassword || !Username || !Email) {
      return res.status(400).json({
        message: 'new password, Username and Email are required',
      });
    }

    // Retrieve the user from the database
    const sql = `SELECT * FROM sitelok WHERE Username = '${Username}' And Email = '${Email}'`;
    db.query(sql, async (error, userArray) => {
      if (error) {
        console.error('Error updating password:', error);
        return res.status(500).json({ message: error.message });
      }

      if (userArray.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const user = userArray[0];

      // Check if the existing password matches the stored password
      // const isExistingPasswordValid = await bcrypt.compare(
      //     Passphrase,
      //     user.Passphrase
      // );

      // if (!isExistingPasswordValid) {
      //     return res
      //         .status(401)
      //         .json({ message: "Invalid existing password" });
      // }

      // Hash the new password
      const hashedNewPassword = await bcrypt.hash(NewPassword, 10);

      // Update the password in the database
      const updateSql = 'UPDATE sitelok SET Passphrase = ? WHERE Username = ?';
      const updateValues = [hashedNewPassword, Username];
      db.query(updateSql, updateValues, (error, result) => {
        if (error) {
          console.error('Error updating password:', error);
          return res.status(500).json({ message: 'Error updating password' });
        }

        res.status(200).json({
          message: 'Password updated successfully',
        });
      });
    });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Error updating password' });
  }
});

module.exports = router;
