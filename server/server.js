// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();


const passport = require('./middlewares/passportMiddleware.js');
const itemsRouter = require('./routes/items');
const authRoutes = require('./routes/auth');


const app = express();
// app.use(bodyParser.json());
const PORT = process.env.PORT || 3300;
const secretKey = process.env.JWT_SECRET || 'defaultSecretKey';

mongoose.connect('mongodb+srv://sergey25111988:JxOpFByDtVvW9S5c@mis1.hoq0s3r.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Connection error:', error);
  });


// Middleware
app.use(morgan('dev')); 
app.use(express.json({ limit: '10mb'}));
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: true,
}))


app.use(passport.initialize());
app.use(passport.session());

app.use(cors());


// Routes
// Define your routes here
app.use('/api', itemsRouter);
app.use('/auth', authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
