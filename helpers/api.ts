import axios from 'axios';
import supabase from '../client'; // Ensure Supabase client is imported
import { StockOwned, StockPrice, StockInfo, InvestmentSummary, InvestmentData } from "./types";
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

  export const addStockSale = async (stockData: StockData, numStocks: number) => {
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
          num: -numStocks, // Record as negative for sale
        });
  
      if (stockOwnedError) {
        throw new Error(`Error inserting into stock_owned: ${stockOwnedError.message}`);
      }
  
      return { success: true, message: 'Stock sale data added successfully.' };
    } catch (error) {
      console.error(error);
      return { success: false, message: error instanceof Error ? error.message : 'Unknown error' };
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
  async function getUserId() {
    const { data: { user } } = await supabase.auth.getUser(); // Get current authenticated user
    if (!user) throw new Error('User not authenticated');
    return user.id;
  }
  

interface OwnedStock {
    s_id: string;
    num: number;
}

interface StockPriceData {
    open_price: number;
    stock_id: string;
}

interface StockInfo {
    symbol: string;
    company_name: string;
}

interface InvestmentDetail {
    company_name: string;
    symbol: string;
    open_price: number;
    current_value: number;
    num_shares: number;
    current_investment: number;
}

export const calculateInvestment = async (): Promise<{ investmentDetails: InvestmentDetail[], totalInvestment: number }> => {
    const user_id = await getUserId(); // Get the user ID from session

    // Step 1: Query the stock_owned table for the user's owned stocks
    const { data: ownedStocks, error: ownedError } = await supabase
        .from('stock_owned')
        .select('s_id, num')
        .eq('user_id', user_id);

    if (ownedError) throw new Error('Error fetching owned stocks: ' + ownedError.message);

    // Step 2: For each owned stock, get the stock price data from stock_price table
    const investmentDetails: InvestmentDetail[] = [];
    let totalInvestment = 0;

    for (const stock of ownedStocks as OwnedStock[]) {
        const { data: stockPriceData, error: priceError } = await supabase
            .from('stock_price')
            .select('open_price, stock_id')
            .eq('s_id', stock.s_id)
            .single(); // Assuming the s_id is unique for each stock owned

        if (priceError) throw new Error('Error fetching stock price: ' + priceError.message);

        // Step 3: Get the company name and symbol from the stocks table using stock_id
        const { data: stockInfo, error: stockError } = await supabase
            .from('stocks')
            .select('symbol, company_name')
            .eq('stock_id', (stockPriceData as StockPriceData).stock_id)
            .single();

        if (stockError) throw new Error('Error fetching stock info: ' + stockError.message);

        const openPrice = (stockPriceData as StockPriceData).open_price;
        const currentInvestment = openPrice * stock.num;

        // Step 4: Adjust the total investment based on the number of shares (positive or negative)
        if (stock.num > 0) {
            totalInvestment += currentInvestment;
        } else {
            // Proportionally reduce the investment for sold shares
            totalInvestment += stock.num * openPrice;
        }

        investmentDetails.push({
            company_name: (stockInfo as StockInfo).company_name,
            symbol: (stockInfo as StockInfo).symbol,
            open_price: openPrice,
            current_value: currentInvestment,
            num_shares: stock.num,
            current_investment: currentInvestment,
        });
    }

    return {
        investmentDetails,
        totalInvestment,
    };
};

interface InvestmentDetail {
    company_name: string;
    symbol: string;
    open_price: number; // Price bought at
    num_shares: number; // Number of shares bought
    current_investment: number; // Investment at the time of purchase
    current_value: number; // Total value at the time of purchase (open_price * num_shares)
  }
  
  // Type for the final data structure
  interface FinalInvestmentDetails {
    companyName: string;
    symbol: string;
    priceBoughtAt: number;
    totalShares: number;
    totalInvestment: number;
    currentPrice: number;
    currentValue: number;
    changePercent: number;
  }
  
  export const calculateCurrentValues = async (investmentDetails: InvestmentDetail[]) => {
    console.log("investmentDetails input:", investmentDetails); // Debugging
    if (!Array.isArray(investmentDetails)) {
      throw new Error("investmentDetails is not an array.");
    }
  
    // Step 1: Fetch current stock data for each stock
    const updatedInvestmentDetails = await Promise.all(
      investmentDetails.map(async (investment) => {
        const currentStockData = await fetchStockData(investment.symbol);
  
        // Step 2: Calculate current value (num_shares * currentPrice)
        const currentValue = investment.num_shares * currentStockData.currentPrice;
  
        // Step 3: Calculate changePercent ((openPrice - currentPrice) / openPrice * 100)
        const changePercent = ((  currentStockData.currentPrice-investment.open_price) / investment.open_price) * 100;
  
        // Return the updated investment details
        return {
          ...investment,
          currentPrice: currentStockData.currentPrice, // Add the current price
          currentValue, // Update the current value
          changePercent, // Add percentage change
        };
      })
    );
  
    return updatedInvestmentDetails;
  };
  export const removeFromWatchlist = async (stock_id: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from('watchlist')
        .delete()
        .eq('stock_id', stock_id);
  
      if (error) {
        throw new Error('Error removing stock from watchlist: ' + error.message);
      }
  
      console.log(`Stock with ID ${stock_id} removed from watchlist.`);
    } catch (error) {
      console.error('Error removing stock from watchlist:', error);
    }
  };
export const fetchWatchlist = async () => {
    try {
        // Get user ID from session
        const userId = await getUserId();

        // Fetch the watchlist for the user
        const { data: watchlist, error: watchlistError } = await supabase
            .from('watchlist')
            .select('stock_id')
            .eq('user_id', userId);

        if (watchlistError) throw new Error('Error fetching watchlist: ' + watchlistError.message);

        // Fetch stock details for each stock in the watchlist
        const stockDetails = await Promise.all(
            watchlist.map(async (item) => {
                const { data: stock, error: stockError } = await supabase
                    .from('stocks')
                    .select('symbol, company_name')
                    .eq('stock_id', item.stock_id)
                    .single();

                if (stockError) throw new Error('Error fetching stock details: ' + stockError.message);

                const currentStockData = await fetchStockData(stock.symbol);

                return {
                    stock_id: item.stock_id,
                    symbol: stock.symbol,
                    company_name: stock.company_name,
                    currentPrice: currentStockData.currentPrice,
                    changePercent: currentStockData.changePercent,
                };
            })
        );

        return stockDetails;
    } catch (error) {
        console.error('Error fetching watchlist:', error);
        return [];
    }
};
function aync() {
    throw new Error('Function not implemented.');
}
    // async function calculateReturns() {
    //     const { investmentDetails, totalInvestment } = await calculateInvestment();
      
    //     // Step 1: Query the stock_price table to get the most recent stock prices
    //     const returnsDetails = await Promise.all(investmentDetails.map(async (stock) => {
    //       const { data: latestStockPrice, error } = await supabase
    //         .from('stock_price')
    //         .select('close_price')
    //         .eq('stock_id', stock.symbol)  // assuming stock_id is related to symbol
    //         .order('timestamp', { ascending: false }) // Get the latest stock price
    //         .limit(1)
    //         .single();
      
    //       if (error) throw new Error('Error fetching latest stock price: ' + error.message);
      
    //       // Step 2: Calculate the returns for each stock
    //       const currentValue = latestStockPrice.close_price * stock.num_shares;
    //       const returnOnInvestment = currentValue - stock.current_investment;
      
    //       return {
    //         ...stock,
    //         latest_price: latestStockPrice.close_price,
    //         current_value: currentValue,
    //         return_on_investment: returnOnInvestment,
    //         percentage_return: (returnOnInvestment / stock.current_investment) * 100,
    //       };
    //     }));
      
    //     // Step 3: Calculate total returns
    //     const totalReturns = returnsDetails.reduce((sum, stock) => sum + stock.return_on_investment, 0);
      
    //     return {
    //       returnsDetails,
    //       totalReturns,
    //     };
    //   }