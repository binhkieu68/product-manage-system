require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');

const apiRoutes = require('./routes/api');
const webRoutes = require('./routes/web');

const app = express();

// ---- View engine (EJS) ----
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ---- Middleware ----
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // lets HTML forms send DELETE via ?_method=DELETE
app.use(express.static(path.join(__dirname, 'public')));

// ---- Routes ----
app.use('/api', apiRoutes);   // Requirement 1: REST API (insert / delete)
app.use('/', webRoutes);      // Requirement 2 & 3: website (list, insert, delete, sorted)

// ---- MongoDB connection ----
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/product_manage_db';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB:', MONGO_URI))
  .catch((err) => console.error('MongoDB connection error:', err.message));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
