const express = require('express');
const router = express.Router();
const pool = require('../db');

// @route     GET /getAllFixedIncome
// @desc      Get all Fixed Income for a specific user
// @access    Private
router.get('/getAllFixedIncome', async (req, res) => {
  const { userid } = req.user;

  try {
    const fixedIncome = await pool.query('SELECT * FROM fixedIncome WHERE user_id = $1', [userid]);

    res.json(fixedIncome.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// @route     POST /createFixedIncome
// @desc      Create a FixedIncome
// @body      { description: string, amount: string, }
// @access    Private
router.post('/createFixedIncome', async (req, res) => {
  try {
    const { description, amount } = req.body;
    const { userid } = req.user;

    const newIncome = await pool.query(
      'INSERT INTO fixedIncome (description, monthly_amount, user_id) VALUES($1, $2, $3) RETURNING *',
      [description, amount, userid]
    );

    res.json(newIncome.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// @route     PUT updateFixedIncome/:id
// @desc      Update a FixedIncome
// @access    Private
router.put('/updateFixedIncome/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount } = req.body;

    await pool.query('UPDATE fixedIncome SET description = $1, monthly_amount = $2 WHERE id = $3', [
      description,
      amount,
      id,
    ]);

    res.json('Fixed Income updated succesfully');
  } catch (error) {
    console.log(error.message);
  }
});

// @route     DELETE deleteFixedIncome/:id
// @desc      Delete a Category
// @access    Private
router.delete('/deleteFixedIncome/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query('DELETE FROM fixedIncome WHERE id = $1', [id]);

    res.json('Fixed Income deleted succesfully');
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
