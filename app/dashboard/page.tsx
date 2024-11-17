'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';
import { Bell, Check, Search, TrendingUp, DollarSign } from 'lucide-react';
import AmazonTradingViewWidget from "@/components/comps/amazontradingwidget";
import TradingViewWidget from '@/components/comps/amazongraph';
import '../globals.css';
import { fetchMultipleStocks, addToWatchlist, fetchStockData } from '@/helpers/api';

const Component = () => {
  const router = useRouter();
  const [symbol, setSymbol] = useState<string | null>(null);
  const [currentStock, setCurrentStock] = useState<any | null>(null);
  const [stocks, setStock] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [watchlistStatus, setWatchlistStatus] = useState<{ [key: string]: boolean }>({});
  const stockSymbols = ['AAPL', 'MSFT', 'NVDA', 'NFLX', 'TSLA'];
  useEffect(() => {
    const fetchStocks = async () => {
      const query = new URLSearchParams(window.location.search);
      const symbolParam = query.get('symbol');

      if (symbolParam) {
        setSymbol(symbolParam);
        console.log(`Symbol found: ${symbolParam}`);

        try {
          setLoading(true); // Set loading state
          const stockData = await fetchStockData(symbolParam);
          console.log("stock data ", stockData);
          setCurrentStock({ symbol: stockData.symbol, change: stockData.changePercent, price: stockData.currentPrice });
          console.log(`Fetched stock data for ${symbolParam}:`, stockData);
        } catch (error) {
          if (error instanceof Error) {
            console.error(`Error fetching stock data for ${symbolParam}:`, error.message);
          } else {
            console.error('Unknown error:', error);
          }
        } finally {
          setLoading(false); // Clear loading state
        }
      } else {
        console.log("No symbol found in query params.");
      }

      try {
        const data = await fetchMultipleStocks(stockSymbols);
        setStock(data);
        console.log('Fetched multiple stocks:', data);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error(error);
        }
      }
    };

    fetchStocks();
  }, []);

  const handleAddToWatchlist = async (symbol: string, name: string) => {
    try {
      const response = await addToWatchlist(symbol, name);
      if (response.success) {
        setWatchlistStatus((prevState) => ({ ...prevState, [symbol]: true }));
      } else {
        console.error("Failed to add to watchlist");
      }
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center">
          <DollarSign className="h-6 w-6 text-primary" />
          <span className="ml-2 text-2xl font-bold">StockSignal</span>
        </div>

        <div className="flex-grow flex justify-center">
          <div className="relative w-2/3">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input className="pl-8 text-sm" placeholder="Search more stocks..." type="search" />
          </div>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-1">
        <Card>
          <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 pb-4">
            <div>
            <div className="text-xl font-bold">{currentStock?.symbol?.toUpperCase()}</div>
              <div className="text-3xl font-bold mt-2">
                ${currentStock?.price}
                <span className="text-red-500 text-xl ml-2">{currentStock?.changePercent}</span>
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                After Hours: $202.77{" "}
                <span className="text-green-500">+0.079%</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Closed: Nov 15, 7:59 PM UTC-5 · USD · NASDAQ · Disclaimer
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => symbol && handleAddToWatchlist(symbol, currentStock?.symbol || '')}
                variant="outline"
                size="sm"
                disabled={watchlistStatus['AMZN']}
              >
                {watchlistStatus['AMZN'] ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Added
                  </>
                ) : (
                  <>
                    <Bell className="mr-2 h-4 w-4" />
                    Add to Watchlist
                  </>
                )}
              </Button>
              <Button size="sm">
                <TrendingUp className="mr-2 h-4 w-4" />
                Buy
              </Button>
            </div>
          </CardHeader>

          <div className="p-4">
            {symbol && <TradingViewWidget symbol={symbol} />}
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Similar Stocks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full">
              <div
                className="flex gap-4 overflow-x-auto scrollbar-hidden scroll-smooth p-4"
                style={{ scrollSnapType: "x mandatory" }}
              >
                {stocks.map((stock, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 w-56 flex flex-col shrink-0"
                    style={{ scrollSnapAlign: "center" }}
                  >
                    <div className="font-medium">{stock.symbol}</div>
                    <div className="text-sm text-muted-foreground">Sector: Technology</div>
                    <div className="flex items-center justify-between text-sm mt-4">
                      <div className="font-medium">${stock.currentPrice.toFixed(2)}</div>
                      <div className={`flex items-center ${stock.changePercent > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {stock.changePercent > 0 ? '↑' : '↓'} {stock.changePercent}%
                      </div>
                    </div>
                    <Button
                      onClick={() => handleAddToWatchlist(stock.symbol, stock.name)}
                      variant="outline"
                      size="sm"
                      disabled={watchlistStatus[stock.symbol]}
                    >
                      {watchlistStatus[stock.symbol] ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Added
                        </>
                      ) : (
                        <>
                          <Bell className="mr-2 h-4 w-4" />
                          Add to Watchlist
                        </>
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <AmazonTradingViewWidget />
    </div>
  );
};

export default Component;