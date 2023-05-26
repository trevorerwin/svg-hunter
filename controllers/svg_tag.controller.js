const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db.js');


function multiTag(...tags) {
  return tags;
   
 
  
}


// http://localhost:4000/svg_tag/display-by-tag/:svgTag
router.get('/display-by-tag/:svgTag', (req, res) => {
  try {
    const svgTag = req.params.svgTag;
    console.log(svgTag)
    const sql = `SELECT * FROM gomot1_upright_svghunter.SVG WHERE id IN (SELECT svgId FROM gomot1_upright_svghunter.SVG_Tags WHERE svgTag = ?)`;
    const values = [svgTag];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error('Error retrieving SVGs by tag: ', error);
        res.status(500).json({ message: error.message });
      } else {
        res.status(200).json({ results: results });
      }
    });
  } catch (error) {
    console.error('Error retrieving SVGs by tag: ', error);
    res.status(500).json({ message: 'Error retrieving SVGs by tag' });
  }
});

// http://localhost:4000/svg_tag/display-all
router.get('/display-all', (req, res) => {
  try {
    let sql = `SELECT * FROM gomot1_upright_svghunter.SVG_Tags`;

    db.query(sql, (error, results) => {
      if (error) throw error;
      res.json({ results: results });
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// ---------------------- Display By Multiple Tags --------------------------------
// http://localhost:4000/svg_tag/multi-tag/:svgTag
router.get('/multi-tag/:svgTag', (req, res) => {
  
  try {
    const svgTag = req.params.svgTag;
   const multiTagArray = []
    multiTagArray.push(svgTag)
    console.log("pooped my pants" + multiTagArray)
    // console.log("parameter" + multiTagArray.map(() => '?').join(','))
    const sql = `SELECT * FROM gomot1_upright_svghunter.SVG WHERE id IN (SELECT svgId FROM gomot1_upright_svghunter.SVG_Tags WHERE svgTag IN (${multiTagArray}))`;
    const values = [];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error('Error retrieving SVGs by tag: ', error);
        res.status(500).json({ message: error.message });
      } else {
        res.status(200).json({ results: results });
      }
    });
  } catch (error) {
    console.error('Error retrieving SVGs by tag: ', error);
    res.status(500).json({ message: 'Error retrieving SVGs by tag' });
  }
});


router.post('/multi-tag', (req, res) => {
  try {
    const svgTags = req.body.svgTags;
    const multiTagArray = multiTag(svgTags);

    const sql = `SELECT * FROM gomot1_upright_svghunter.SVG WHERE id IN (SELECT svgId FROM gomot1_upright_svghunter.SVG_Tags WHERE svgTag IN (${JSON.stringify(multiTagArray)}))`;
    const values = [];

    db.query(sql, values, (error, results) => {
      if (error) {
        console.error('Error retrieving SVGs by tag: ', error);
        res.status(500).json({ message: error.message });
      } else {
        res.status(200).json({ results: results });
      }
    });
  } catch (error) {
    console.error('Error retrieving SVGs by tag: ', error);
    res.status(500).json({ message: 'Error retrieving SVGs by tag' });
  }
});

module.exports = router;
