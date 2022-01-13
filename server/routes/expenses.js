const express = require('express');
const router = express.Router();
const pool = require('../db');

// @route     GET /getAllExpenses
// @desc      Get all expenses
// @access    Private
router.get('/getAllExpenses', async (req, res) => {
  try {
    const allExpenses = await pool.query('SELECT * FROM expense');

    res.json(allExpenses.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// @route     GET getSingleExpense/:id
// @desc      Get a single expense
// @access    Private
router.get('/getSingleExpense/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await pool.query('SELECT * FROM expense WHERE expenseId = $1', [id]);

    res.json(expense.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// @route     GET /getAllExpensesByMonth
// @desc      Get all expenses for a particular month (and year)
// @body      { month: number, year: number }
// @access    Private
router.get('/getAllExpensesByMonth', async (req, res) => {
  try {
    const { month, year } = req.query;

    const expense = await pool.query(
      'SELECT * FROM expense WHERE EXTRACT(MONTH FROM date) = $1 and EXTRACT(YEAR FROM date) = $2 order by date asc',
      [month, year]
    );

    res.json(expense.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// @route     POST /createExpense
// @desc      Create an expense
// @body      { description: string, amount: number, date: date }
// @access    Private
router.post('/createExpense', async (req, res) => {
  try {
    const { description, amount, date, category, notes } = req.body;

    const newExpense = await pool.query(
      'INSERT INTO expense (description, amount, date, category, notes) VALUES($1, $2, $3, $4, $5) RETURNING *',
      [description, amount, date, category, notes]
    );

    res.json(newExpense.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// @route     PUT updateExpense/:id
// @desc      Update an expense
// @access    Private
router.put('/updateExpense/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, date } = req.body;

    await pool.query('UPDATE expense SET description = $1, amount = $2, date =$3 WHERE expenseId = $4', [
      description,
      amount,
      date,
      id,
    ]);

    res.json('Expense updated succesfully');
  } catch (error) {
    console.log(error.message);
  }
});

// @route     DELETE deleteExpense/:id
// @desc      Delete an expense
// @access    Private
router.delete('/deleteExpense/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query('DELETE FROM expense WHERE expenseId = $1', [id]);

    res.json('Expense deleted succesfully');
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
