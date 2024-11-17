// components/widgets/SearchWidget.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input"; // Update the path based on your project structure
import axios from "axios";

// Define the Stock type
interface Stock {
  symbol: string;
  name: string;
  currency: string;
  stockExchange: string;
  exchangeShortName: string;
}

const SearchWidget = () => {
  const [query, setQuery] = useState<string>("");
  const [stocks, setStocks] = useState<Stock[]>([]); // Explicitly type the stocks state
  const [loading, setLoading] = useState<boolean>(false); // For loading state
  const router = useRouter();

  // Function to handle search and update URL
  const handleSearch = (term: string) => {
    setQuery(term);
    // Triggering stock fetch when query is updated
  };

  // Fetch stocks dynamically based on the query
  useEffect(() => {
    if (query.trim().length > 0) {
      setLoading(true); // Set loading state to true when fetching
      const fetchStocks = async () => {
        try {
          const response = await axios.get(
            `https://financialmodelingprep.com/api/v3/search?query=${query}&apikey=vZ8CiaC1bYFjuCYSJkd01zZ8MBF4haR0`
          );
          // Filter stocks where exchangeShortName is NASDAQ
          const filteredStocks = response.data.filter(
            (stock: Stock) => stock.exchangeShortName === "NASDAQ"
          );
          setStocks(filteredStocks);
        } catch (error) {
          console.error("Error fetching stock data:", error);
        } finally {
          setLoading(false); // Set loading state to false after fetching
        }
      };
      fetchStocks();
    } else {
      setStocks([]);
    }
  }, [query]);

  // Function to handle stock selection
  const handleStockSelect = (symbol: string) => {
    router.push(`/dashboard?symbol=${symbol}`);
  };
  const displayedStocks = stocks.slice(0, 5);

  return (
    <div className="relative">
      {/* Search Input */}
      <form onSubmit={(e) => e.preventDefault()}>
        <Input
          type="search"
          placeholder="Search stocks..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-8 w-full"
        />
      </form>

      {/* Loading Indicator */}
      {loading && query && (
        <div className="absolute top-full left-0 right-0 bg-white p-2 text-sm text-gray-500 shadow-lg">
          Loading results...
        </div>
      )}

      {/* Stock Recommendations */}
      {stocks.length > 0 && !loading && query && (
        <ul
          className="absolute bg-white shadow-lg border border-gray-200 rounded-md mt-1 w-full z-10"
          style={{ maxHeight: '300px', overflowY: 'auto' }} // Apply scrollable container
        >
          {displayedStocks.map((stock) => (
            <li
              key={stock.symbol}
              onClick={() => handleStockSelect(stock.symbol)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <div className="font-bold">{stock.symbol}</div>
              <div className="text-sm text-gray-500">{stock.name}</div>
            </li>
          ))}
          {/* Show a message if more than 5 results */}
          {stocks.length > 5 && (
            <li className="px-4 py-2 text-sm text-gray-500 text-center">
              +{stocks.length - 5} more results...
            </li>
          )}
        </ul>
      )}

      {/* No results found */}
      {stocks.length === 0 && !loading && query && (
        <div className="absolute top-full left-0 right-0 bg-white p-2 text-sm text-gray-500 shadow-lg">
          No results found
        </div>
      )}
    </div>
  );
};

export default SearchWidget;
