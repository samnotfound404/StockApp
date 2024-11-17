"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import axios from "axios";
interface Stock {
  symbol: string;
  name: string;
  currency: string;
  stockExchange: string;
  exchangeShortName: string;
}
export default function StockSearchComponent() {
  const [query, setQuery] = useState<string>("");
  const [stocks, setStocks] = useState<Stock[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const handleSearch = (term: string) => {
    setQuery(term);
    const params = new URLSearchParams(searchParams as any);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };
  useEffect(() => {
    if (query.trim().length > 0) {
      const fetchStocks = async () => {
        try {
          const response = await axios.get(
            `https://financialmodelingprep.com/api/v3/search?query=${query}&apikey=vZ8CiaC1bYFjuCYSJkd01zZ8MBF4haR0`
          );
          const filteredStocks = response.data.filter(
            (stock: Stock) => stock.exchangeShortName === "NASDAQ"
          );
          setStocks(filteredStocks);
        } catch (error) {
          console.error("Error fetching stock data:", error);
        }
      };
      fetchStocks();
    } else {
      setStocks([]);
    }
  }, [query]);
  const handleStockSelect = (symbol: string) => {
    router.push(`/dashboard?symbol=${symbol}`);
  };
  return (
    <div className="relative">
      <form onSubmit={(e) => e.preventDefault()}>
        <Input
          type="search"
          placeholder="Search stocks..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-8 w-full"
        />
      </form>
      {stocks.length > 0 && (
        <ul className="absolute bg-white shadow-lg border border-gray-200 rounded-md mt-1 w-full z-10">
          {stocks.map((stock) => (
            <li
              key={stock.symbol}
              onClick={() => handleStockSelect(stock.symbol)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <div className="font-bold">{stock.symbol}</div>
              <div className="text-sm text-gray-500">{stock.name}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
