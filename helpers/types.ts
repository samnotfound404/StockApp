// Define types for the query results and investment summary
export interface StockOwned {
    s_id: string;
    num: number;  // Number of stocks owned
  }
  
  export interface StockPrice {
    stock_id: string;
    open_price: number;  // Price at the time of buying
    close_price: number;  // Current price
    timestamp: string;    // Timestamp of the price
  }
  
  export interface StockInfo {
    stock_id: string;
    company_name: string;
    symbol: string;
  }
  
  export interface InvestmentData {
    companyName: string;
    companySymbol: string;
    priceAtBuying: number;
    actualCurrentPrice: number;
    numStocks: number;
    currentValue: number;  // Current value = numStocks * actualCurrentPrice
  }
  
  export interface InvestmentSummary {
    investments: InvestmentData[];
    netInvestment: number;  // Total investment at the time of purchase
    totalCurrentValue: number;  // Total current value of stocks
    returns: number;  // Profit or loss
    returnsPercentage: number;  // Percentage returns
  }
  