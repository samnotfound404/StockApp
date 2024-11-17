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
