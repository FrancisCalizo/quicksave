const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { cookieJwtAuth } = require('./middleware/cookieJwtAuth');

const app = express();
dotenv.config();

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.post('/login', require('./routes/login'));
app.post('/isLoggedIn', require('./routes/isLoggedIn'));
app.use('/', cookieJwtAuth, require('./routes/expenses'));
app.use('/', require('./routes/categories'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
