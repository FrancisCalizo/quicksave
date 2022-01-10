const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// Routes

// Create expense
app.post('/expenses', async (req, res) => {
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

// Get all expenses
app.get('/expenses', async (req, res) => {
  try {
    const allExpenses = await pool.query('SELECT * FROM expense');

    res.json(allExpenses.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// Get expense
app.get('/expenses/:id', async (req, res) => {
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

// Update expense
app.put('/expenses/:id', async (req, res) => {
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

// Delete expense
app.delete('/expenses/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query('DELETE FROM expense WHERE expense_id = $1', [id]);

    res.json('Expense deleted succesfully');
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(5000, () => console.log('Server has started on port 5000'));
