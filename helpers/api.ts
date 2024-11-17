import axios from 'axios';
import supabase from '../client'; // Ensure Supabase client is imported

/**
 * Fetches bank details using an IFSC code.
 * @param ifscCode - The IFSC code to fetch bank details.
 * @returns The bank details or an error message.
 */
export const addToWatchlist = async (symbol: string, companyName?: string) => {
    try {
      // 1. Check if the stock exists in the 'stocks' table
      const { data: stock, error: stockError } = await supabase
        .from('stocks')
        .select('*')
        .eq('symbol', symbol)
        .single();
  
      let stockId: string;
  
      if (stockError) {
        // 2. Add the stock to the 'stocks' table if it doesn't exist
        const { data: newStock, error: newStockError } = await supabase
          .from('stocks')
          .insert([{ symbol, company_name: companyName || 'Unknown' }])
          .select('*')
          .single();
  
        if (newStockError) throw new Error('Failed to add stock to the database.');
        stockId = newStock.stock_id;
      } else {
        stockId = stock.stock_id;
      }
  
      // 3. Get the user's ID from the session
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
     console.log(session)
      if (sessionError || !session) throw new Error('User not authenticated.');
      const userId = session.user.id;
  
      // 4. Add the stock to the user's watchlist
      const { data: watchlistEntry, error: watchlistError } = await supabase
        .from('watchlist')
        .insert([{ user_id: userId, stock_id: stockId }]);
  
      if (watchlistError) throw new Error('Failed to add stock to watchlist.');
  
      return {
        success: true,
        message: 'Stock successfully added to watchlist.',
        watchlistEntry,
      };
    } catch (error: any) {
      console.error('Error in addToWatchlist:', error.message);
      return {
        success: false,
        message: error.message,
      };
    }
  };
export const fetchBankDetails = async (ifscCode: string) => {
  try {
    const response = await axios.get(
      `https://bank-apis.justinclicks.com/API/V1/IFSC/${ifscCode.toUpperCase()}`
    );
    if (response.data) {
      return response.data;
    } else {
      throw new Error('Invalid IFSC code or no details found.');
    }
  } catch (error) {
    console.error('Error fetching bank details:', error);
    throw new Error('Error fetching bank details.');
  }
};

/**
 * Fetches daily stock data using a symbol.
 * @param symbol - The stock symbol.
 * @returns An object containing the current price, change percentage, and symbol.
 */
export const fetchMultipleStocks = async (symbols: string[]) => {
    try {
        const apiKey = 'cqfir39r01qle0e3q9k0cqfir39r01qle0e3q9kg';
      const promises = symbols.map((symbol) =>
        axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`)
      );
  
      const responses = await Promise.all(promises);
      return responses.map((response, index) => ({
        symbol: symbols[index],
        currentPrice: response.data.c,
        changePercent: ((response.data.c - response.data.pc) / response.data.pc * 100).toFixed(2),
      }));
    } catch (error) {
      console.error('Error fetching multiple stock data:', error);
      throw new Error('Error fetching multiple stock data.');
    }
  };
export const fetchStockData = async (symbol: string) => {
  try {
    const apiKey = 'cqfir39r01qle0e3q9k0cqfir39r01qle0e3q9kg'; // Replace with your actual Finnhub API key
    const response = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`
    );
    const data = response.data;

    if (data.c !== undefined && data.c !== 0) {
      const currentPrice = data.c; // Current price
      const previousClose = data.pc; // Previous close price
      const changePercent = ((currentPrice - previousClose) / previousClose * 100).toFixed(2);

      return {
        symbol,
        currentPrice,
        changePercent,
      };
    } else {
      throw new Error('Stock data not found or invalid symbol.');
    }
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw new Error('Error fetching stock data.');
  }
};
