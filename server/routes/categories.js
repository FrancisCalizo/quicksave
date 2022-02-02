const express = require('express');
const router = express.Router();
const pool = require('../db');

// @route     GET /getAllCateogoriesByUser
// @desc      Get all categories for a specific user
// @access    Private
router.get('/getAllCategoriesByUser/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const categories = await pool.query('SELECT * FROM category WHERE user_id = $1', [id]);

    res.json(categories.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// @route     POST /createCategory
// @desc      Create a category
// @body      { name: string, color: string, userId: int }
// @access    Private
router.post('/createCategory', async (req, res) => {
  try {
    const { name, color, userId } = req.body;

    const newCategory = await pool.query('INSERT INTO category (name, color, user_id) VALUES($1, $2, $3) RETURNING *', [
      name,
      color,
      userId,
    ]);

    res.json(newCategory.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// @route     PUT updateCategory/:id
// @desc      Update a category
// @access    Private
router.put('/updateCategory/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    await pool.query('UPDATE category SET name = $1 WHERE category_id = $2', [name, id]);

    res.json('Category updated succesfully');
  } catch (error) {
    console.log(error.message);
  }
});

// @route     DELETE deleteCategory/:id
// @desc      Delete a Category
// @access    Private
router.delete('/deleteCategory/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query('DELETE FROM category WHERE category_id = $1', [id]);

    res.json('Category deleted succesfully');
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
