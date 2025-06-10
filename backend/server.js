const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI is not defined in environment variables');
  console.error('Please check your .env file and make sure it contains MONGODB_URI');
  process.exit(1);
}

console.log('Attempting to connect to MongoDB...');
console.log('Connection string format check:', MONGODB_URI.includes('mongodb+srv://'));

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Successfully connected to MongoDB Atlas');
})
.catch(err => {
  console.error('MongoDB Atlas connection error:', err.message);
  console.error('Please check:');
  console.error('1. Your MongoDB Atlas connection string is correct');
  console.error('2. Your IP address is whitelisted in MongoDB Atlas');
  console.error('3. Your username and password are correct');
  process.exit(1);
});

// Routes
const sellerRoutes = require('./routes/sellerRoutes');
app.use('/api/seller', sellerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 