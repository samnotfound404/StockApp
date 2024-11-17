import axios from 'axios';
import supabase from '../client'; // Ensure Supabase client is imported

/**
 * Fetches bank details using an IFSC code.
 * @param ifscCode - The IFSC code to fetch bank details.
 * @returns The bank details or an error message.
 */
export const isStockInWatchlist = async (symbol: string): Promise<boolean> => {
    try {
      // Fetch the stock_id for the given symbol
      const { data: stock, error: stockError } = await supabase
        .from('stocks')
        .select('stock_id')
        .eq('symbol', symbol)
        .single();
  
      if (stockError) throw stockError;
  
      if (!stock) {
        console.error(`Stock not found for symbol: ${symbol}`);
        return false;
      }
  
      const stockId = stock.stock_id;
  
      // Check if the stock_id exists in the watchlist table
      const { data: watchlist, error: watchlistError } = await supabase
        .from('watchlist')
        .select('stock_id')
        .eq('stock_id', stockId)
        .single();
  
      if (watchlistError && watchlistError.details !== '0 rows found') {
        throw watchlistError;
      }
  
      return !!watchlist; // Return true if found, false otherwise
    } catch (error) {
      console.error(`Error checking watchlist for ${symbol}:`, error);
      return false;
    }
  };
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
// console.log("stockData",data)
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
interface StockData {
    stock_id: string
    user_id: string
    open_price: number
    close_price: number
    high_price: number
    low_price: number
    current_price: number
  }
export const fetchDetailedStockData = async (
    symbol: string
  ): Promise<StockData> => {
    try {
      const apiKey = "cqfir39r01qle0e3q9k0cqfir39r01qle0e3q9kg";
  
      // Fetch stock profile data
      const response = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`
      );
  
      const data = response.data;
  
      // Get stock_id from the Supabase stocks table
      const { data: stockEntry, error: stockError } = await supabase
        .from("stocks")
        .select("stock_id")
        .eq("symbol", symbol)
        .single();
  
      if (stockError || !stockEntry) {
        throw new Error("Error fetching stock ID from database.");
      }
  
      const stock_id = stockEntry.stock_id;
  
      // Get user_id from session
      const { data: session, error: sessionError } = await supabase.auth.getSession();
  
      if (sessionError || !session || !session.session || !session.session.user) {
        throw new Error("Error fetching user session.");
      }
  
      const user_id = session.session.user.id;
  
      // Map the fetched data to the StockData interface
      const stockData: StockData = {
        stock_id,
        user_id,
        open_price: data.o, // Open price
        close_price: data.pc, // Previous close price
        high_price: data.h, // High price
        low_price: data.l, // Low price
        current_price: data.c, // Current price
      };
  
      return stockData;
    } catch (error) {
      console.error("Error fetching detailed stock data:", error);
      throw new Error("Error fetching detailed stock data.");
    }
  };

  export const addStockPurchase = async (stockData: StockData, numStocks: number) => {
    try {
      // Get the current timestamp
      const currentTime = new Date().toISOString();
  
      // Step 1: Insert data into the `stock_price` table
      const { data: stockPrice, error: stockPriceError } = await supabase
        .from('stock_price')
        .insert({
          stock_id: stockData.stock_id,
          open_price: stockData.open_price,
          close_price: stockData.close_price,
          high_price: stockData.high_price,
          low_price: stockData.low_price,
          timestamp: currentTime, // Add the current timestamp
        })
        .select(); // To fetch the inserted row including `s_id`
  
      if (stockPriceError) {
        throw new Error(`Error inserting into stock_price: ${stockPriceError.message}`);
      }
  
      if (!stockPrice || stockPrice.length === 0) {
        throw new Error('No data returned after inserting into stock_price');
      }
  
      const s_id = stockPrice[0].s_id; // Get the `s_id` from the inserted row
  
      // Step 2: Insert data into the `stock_owned` table
      const { error: stockOwnedError } = await supabase
        .from('stock_owned')
        .insert({
          user_id: stockData.user_id,
          s_id: s_id, // Foreign key linking to `stock_price`
          num: numStocks,
        });
  
      if (stockOwnedError) {
        throw new Error(`Error inserting into stock_owned: ${stockOwnedError.message}`);
      }
  
      return { success: true, message: 'Stock purchase data added successfully.' };
    } catch (error) {
      console.error(error);
      return { success: false, message: error instanceof Error ? error.message : 'Unknown error' };
    }
  };
  


