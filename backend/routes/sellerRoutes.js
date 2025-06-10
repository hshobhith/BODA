const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Seller = require('../models/Seller');

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find seller by email
    const seller = await Seller.findOne({ email });
    if (!seller) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await seller.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: seller._id, email: seller.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      seller: {
        id: seller._id,
        email: seller.email,
        storeName: seller.storeName,
        phoneNumber: seller.phoneNumber,
        address: seller.address
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Register route
router.post('/register', async (req, res) => {
  try {
    const { email, password, storeName, phoneNumber, address } = req.body;

    // Check if seller already exists
    let seller = await Seller.findOne({ email });
    if (seller) {
      return res.status(400).json({ message: 'Seller already exists' });
    }

    // Create new seller
    seller = new Seller({
      email,
      password,
      storeName,
      phoneNumber,
      address
    });

    await seller.save();

    // Create JWT token
    const token = jwt.sign(
      { id: seller._id, email: seller.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      seller: {
        id: seller._id,
        email: seller.email,
        storeName: seller.storeName,
        phoneNumber: seller.phoneNumber,
        address: seller.address
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 