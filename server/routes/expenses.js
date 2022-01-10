const express = require('express');
const router = express.Router();
const pool = require('../db');

// @route     POST expenses
// @desc      Create an expense
// @access    Private
router.post('/', async (req, res) => {
  try {
    const { description, amount, date } = req.body;

    const newExpense = await pool.query(
      'INSERT INTO expense (description, amount, date) VALUES($1, $2, $3) RETURNING *',
      [description, amount, date]
    );

    res.json(newExpense.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// @route     GET expenses
// @desc      Get all expenses
// @access    Private
router.get('/', async (req, res) => {
  try {
    const allExpenses = await pool.query('SELECT * FROM expense');

    res.json(allExpenses.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// @route     GET expenses/:id
// @desc      Get a single expense
// @access    Private
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await pool.query(
      'SELECT * FROM expense WHERE expense_id = $1',
      [id]
    );

    res.json(expense.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// @route     PUT expenses/:id
// @desc      Update an expense
// @access    Private
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, date } = req.body;

    await pool.query(
      'UPDATE expense SET description = $1, amount = $2, date =$3 WHERE expense_id = $4',
      [description, amount, date, id]
    );

    res.json('Expense updated succesfully');
  } catch (error) {
    console.log(error.message);
  }
});

// @route     DELETE expenses
// @desc      Delete an expense
// @access    Private
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query('DELETE FROM expense WHERE expense_id = $1', [id]);

    res.json('Expense deleted succesfully');
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
