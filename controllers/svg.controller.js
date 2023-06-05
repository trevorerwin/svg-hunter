const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db.js');

// http://localhost:4000/svg/display-by-name/:id
router.get('/display-by-name/:svgName', (req, res) => {
  try {
    let sql = `SELECT * FROM gomot1_upright_svghunter.SVG WHERE svgName='${req.params.svgName}'`;

    db.query(sql, (error, results) => {
      if (error) throw error;
      res.json({ results: results });
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// http://localhost:4000/svg/display-all
router.get('/display-all', (req, res) => {
  try {
    let sql = `SELECT * FROM gomot1_upright_svghunter.SVG`;

    db.query(sql, (error, results) => {
      if (error) throw error;
      res.json({ results: results });
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// http://localhost:4000/svg/display-new
router.get('/display-new', (req, res) => {
  try {
    let sql = `SELECT * FROM gomot1_upright_svghunter.SVG ORDER BY Id DESC`;

    db.query(sql, (error, results) => {
      if (error) throw error;
      res.json({ results: results });
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
