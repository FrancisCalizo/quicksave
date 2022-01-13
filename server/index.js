const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

// middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/', require('./routes/expenses'));
app.use('/', require('./routes/categories'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
