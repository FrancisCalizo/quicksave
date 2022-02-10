const express = require('express');
const router = express.Router();
const pool = require('../db');

// @route     GET /getAllRecurringIncome
// @desc      Get all recurring income for a specific user
// @access    Private
router.get('/getAllRecurringIncome', async (req, res) => {
  const { userid } = req.user;

  try {
    const recurringIncome = await pool.query('SELECT * FROM income_recurring WHERE user_id = $1', [userid]);

    res.json(recurringIncome.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// @route     DELETE deleteRecurringIncome/:id
// @desc      Delete a Category
// @access    Private
router.delete('/deleteRecurringIncome/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query('DELETE FROM income_recurring WHERE id = $1', [id]);

    res.json('Recurring Income deleted succesfully');
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
