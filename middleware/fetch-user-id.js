const jwt = require('jsonwebtoken');
const db = require('../db.js');

const fetchUserID = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, 'HUNTERKILL');
    const sql = `SELECT * FROM gomot1_upright_svghunter.sitelok WHERE Username = ?`;

    console.log(decodedToken);

    db.query(sql, [decodedToken.Username], (error, results) => {
      if (error) {
        console.error('Error retrieving user: ', error);
        res.status(500).json({ message: error.message });
      }

      if (results.length === 0) {
        throw Error('User was not found');
      }

      req.user = results[0];
      next();
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = fetchUserID;
