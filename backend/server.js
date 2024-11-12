const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const cors = require('cors');  
const { createClient } = require('@supabase/supabase-js');

dotenv.config();

const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());
const supabaseUrl = 'https://bdpcgxpjmagdsgylrhus.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkcGNneHBqbWFnZHNneWxyaHVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyODQyMTYsImV4cCI6MjA0NTg2MDIxNn0.vOFUQ-5fmPsc3cNk0wqtTzuZF9fTNql3Sb6J0Ecv1kc";
if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL or Key is missing');
}
const supabase = createClient(supabaseUrl, supabaseKey);
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
app.post('/save-user-details', async (req, res) => {
  const { full_name, email, dob, gender, idType, idNumber, bankAccountNumber} = req.body;
  try {
    const { data: existingUsers, error: checkError } = await supabase
      .from('users')
      .select('*')
      .eq('full_name', full_name);
    if (checkError) throw checkError;
    if (existingUsers && existingUsers.length > 0) {
      return res.status(400).json({ message: 'A user with this name already exists.' });
    }
    const { data: maxUserIdData, error: maxIdError } = await supabase
      .from('users')
      .select('user_id')
      .order('user_id', { ascending: false })
      .limit(1);
    if (maxIdError) throw maxIdError;
    const newUserId = maxUserIdData && maxUserIdData.length > 0
      ? maxUserIdData[0].user_id + 1
      : 1;
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert([
        {
          user_id: newUserId,
          full_name: full_name,
          dob: dob,
          gender: gender,
          email: email,
          bank_acc_no: bankAccountNumber,
          aadhar_no: idType === 'Aadhar' ? idNumber : null,
          pan_no: idType === 'PAN' ? idNumber : null,
        },
      ]);
    if (userError) throw userError;
    res.status(201).json({ message: 'User details saved successfully!' });
  } catch (error) {
    console.error('Error saving user details:', error);
    res.status(500).json({ message: 'Error saving user details.', error });
  }
});

const ALPHA_VANTAGE_API_URL = 'https://www.alphavantage.co/query';
app.get('/stock/daily', async (req, res) => {
  const { symbol } = req.query;

  if (!symbol) {
    return res.status(400).json({ message: 'Stock symbol is required' });
  }

  // try {
  //   // Make a GET request to Alpha Vantage API
  //   const response = await axios.get(ALPHA_VANTAGE_API_URL, {
  //     params: {
  //       function: 'TIME_SERIES_DAILY',
  //       symbol: symbol,
  //       interval:'5min',
  //       apikey: 'ZIBI54OMGHG91RH2'
  //     }
  //   });

  //   // Check if data is returned from Alpha Vantage
  //   if (response.data['Time Series (Daily)']) {
  //     res.status(200).json(response.data['Time Series (Daily)']);
  //   } else {
  //     res.status(404).json({ message: 'Stock data not found or API limit reached' });
  //   }
  // } catch (error) {
  //   console.error('Error fetching stock data:', error);
  //   res.status(500).json({ message: 'Error fetching stock data' });
  // }
  try {
    // Make a GET request to Alpha Vantage API to get current stock price
    const response = await axios.get(ALPHA_VANTAGE_API_URL, {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol: symbol,
        apikey: 'ZIBI54OMGHG91RH2'
      }
    });

    // Check if the response contains the stock data
    if (response.data['Global Quote']) {
      const stockData = response.data['Global Quote'];
      const currentPrice = stockData['05. price']; // Current price field
      const symbol = stockData['01. symbol']; // Stock symbol field

      res.status(200).json({ symbol, currentPrice });
    } else {
      res.status(404).json({ message: 'Stock data not found or API limit reached' });
    }
  } catch (error) {
    console.error('Error fetching stock data:', error);
    res.status(500).json({ message: 'Error fetching stock data' });
  }
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
