const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const cors = require('cors');
dotenv.config();

const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());

app.post('/fetch-bank-details', async (req, res) => {
  const { ifscCode } = req.body;
  try {
    const response = await axios.get(`https://bank-apis.justinclicks.com/API/V1/IFSC/${ifscCode.toUpperCase()}`);
    if (response.data) {
      res.status(200).json(response.data);
    } else {
      res.status(404).json({ message: 'Invalid IFSC code or no details found.' });
    }
  } catch (error) {
    console.error('Error fetching bank details:', error);
    res.status(500).json({ message: 'Error fetching bank details.' });
  }
});
// Load environment variables
require('dotenv').config();

// Import required packages
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_ID
});

// Initialize Express app
app.use(bodyParser.json()); // Middleware to parse JSON request body

// POST route to create order
app.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: amount, // Amount in smallest currency unit (e.g., paise for INR)
      currency: 'INR',
    };
    const order = await razorpay.orders.create(options);

    console.log(order);
    return res.status(200).json({ razorpay_order_id: order.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to create order' });
  }
});

// Start the server
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


app.get('/stock/daily', async (req, res) => {
  const { symbol } = req.query;

  if (!symbol) {
      return res.status(400).json({ message: 'Stock symbol is required' });
  }

  try {
      // Fetch stock data from Finnhub API
      const apiKey = 'cqfir39r01qle0e3q9k0cqfir39r01qle0e3q9kg'; // Replace with your actual Finnhub API key
      const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`);
      
      const data = response.data;
      if (data.c !== undefined && data.c !== 0) {
          const currentPrice = data.c; // Current price
          const previousClose = data.pc; // Previous close price
          const changePercent = ((currentPrice - previousClose) / previousClose * 100).toFixed(2);

          return res.status(200).json({
              symbol,
              currentPrice,
              changePercent
          });
      } else {
          return res.status(404).json({ message: 'Stock data not found or invalid symbol' });
      }
  } catch (error) {
      console.error('Error fetching stock data:', error);
      res.status(500).json({ message: 'Error fetching stock data' });
  }
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
