"use client"

import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { ResponsiveLine } from "@nivo/line"
import { calculateInvestment, calculateCurrentValues,fetchDetailedStockData } from "@/helpers/api"
import { useEffect, useState } from "react"
import { title } from "process"
import SellModal from "@/components/comps/sellingModal"

export default function Component() {
  const [stocks, setStocks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [sellingStock, setSellingStock] = useState(null);
  const [portfolioSummary, setPortfolioSummary] = useState({
    totalCurrentValue: 0,
    totalInvestment: 0,
    numberOfStocks: 0,
    percentChange: 0,
  });

  useEffect(() => {
    async function fetchStocks() {
      try {
        const stocks = await calculateInvestment();
        console.log("Stocks:", stocks);

        // Extract investmentDetails and calculate current values
        const data = await calculateCurrentValues(stocks.investmentDetails);

        // Process data to remove duplicates and compute the summary
        const aggregatedData = aggregateStocks(data);

        // Update states
        setStocks(aggregatedData.stocks);
        setPortfolioSummary(aggregatedData.summary);
        console.log("Portfolio");
        console.log("Updated investment details:", aggregatedData);
      } catch (error) {
        console.error("Error fetching stocks:", error);
      }
    }

    fetchStocks();
  }, []);
  function aggregateStocks(stockData) {
    const stockMap = new Map();

    // Merge stocks with the same symbol
    stockData.forEach((stock) => {
      if (stockMap.has(stock.symbol)) {
        const existing = stockMap.get(stock.symbol);
        stockMap.set(stock.symbol, {
          ...existing,
          num_shares: existing.num_shares + stock.num_shares,
          currentValue: existing.currentValue + stock.currentValue,
          current_investment: existing.current_investment + stock.current_investment,
        });
      } else {
        stockMap.set(stock.symbol, { ...stock });
      }
    });

    // Convert the map back to an array
    const mergedStocks = Array.from(stockMap.values());

    // Calculate portfolio summary
    const totalCurrentValue = mergedStocks.reduce((sum, stock) => sum + stock.currentValue, 0);
    const totalInvestment = mergedStocks.reduce((sum, stock) => sum + stock.current_investment, 0);
    const numberOfStocks = mergedStocks.length;
    const percentChange = ((totalCurrentValue - totalInvestment) / totalInvestment) * 100;

    return {
      stocks: mergedStocks,
      summary: {
        totalCurrentValue,
        totalInvestment,
        numberOfStocks,
        percentChange,
      },
    };
  }
  const handleSell = async (symbol, num) => {
    try {
      const response = await fetchDetailedStockData(symbol);
      console.log("Detailed stock data for", symbol, ":", response, "num:", num);
  
      const stock = { ...response, num: num };
      setSellingStock(stock);
  
      console.log("Updated sellingStock:", stock);
      setModalOpen(true); // Move this here
    } catch (error) {
      console.error("Error fetching detailed stock data for", symbol, ":", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
   {stocks && sellingStock && modalOpen && (
  <SellModal
    stockData={sellingStock} // Match the expected prop name in SellModal
    symbol={sellingStock.symbol}
    onClose={() => setModalOpen(false)}
  />
)}
      <header className="bg-background border-b sticky top-0 z-40 px-4 md:px-6 flex items-center h-14 shrink-0">
        <Link href="#" className="mr-6 flex items-center gap-2" prefetch={false}>
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Acme Stocks</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          <Link href="#" className="text-primary-foreground hover:underline" prefetch={false}>
            Stocks
          </Link>
          <Link href="#" className="text-primary-foreground hover:underline" prefetch={false}>
            Portfolio
          </Link>
          <Link href="#" className="text-primary-foreground hover:underline" prefetch={false}>
            News
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <img
                  src="/placeholder.svg"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="rounded-full"
                  style={{ aspectRatio: "36/36", objectFit: "cover" }}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-6">
        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Portfolio Overview</CardTitle>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </CardHeader>
          <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
  {[
    {
      title: "Total Value",
      value: `$${portfolioSummary.totalCurrentValue.toLocaleString()}`,
    },
    {
      title: "Total Investment",
      value: `$${portfolioSummary.totalInvestment.toLocaleString()}`,
      change: "", // No change field needed for Total Investment
      changeColor: "",
    },
    {
      title: "Number of Stocks",
      value: portfolioSummary.numberOfStocks,
      change: "", // No change field needed for Number of Stocks
      changeColor: "",
    },
    {
      title: "Change",
      value: `${portfolioSummary.percentChange.toFixed(2)}%`,
      change: portfolioSummary.percentChange,
      changeColor: portfolioSummary.percentChange > 0 ? "text-green-500" : "text-red-500",
    },
  ].map((item, index) => (
    <div
      key={index}
      className="bg-muted/20 rounded-lg p-4 flex flex-col gap-2"
    >
      <div className="text-sm text-muted-foreground">{item.title}</div>
      <div className={`text-2xl ${item.changeColor} font-bold`}>{item.value}</div>
    
    </div>
  ))}
</div>
          </CardContent>

        </Card>
        <Card className="col-span-1 md:col-span-2 lg:col-span-2">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Stocks Owned</CardTitle>
            <Link href="#" className="text-primary hover:underline" prefetch={false}>
              View All
            </Link>
          </CardHeader>
          <CardContent className="h-[30vh] overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Stock</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Shares</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Investment</TableHead>
                  <TableHead>Change</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stocks?.map((stock,index) => (
                  <TableRow key={stock.symbol}>
                    <TableCell>
                      <div className="font-medium">{stock.company_name}</div>
                      <div className="text-xs text-muted-foreground">{stock.symbol}</div>
                    </TableCell>
                    <TableCell>${stock.currentPrice}</TableCell>
                    <TableCell>{stock.num_shares}</TableCell>
                    <TableCell>${stock.currentValue}</TableCell>
                    <TableCell>${stock.current_investment}</TableCell>
                    <TableCell className={stock.changePercent >= 0 ? "text-green-500" : "text-red-500"}>
                      {stock?.changePercent >= 0 ? "+" : ""}{stock.changePercent.toFixed(2)}%
                    </TableCell>
                    <TableCell>

                      <Button variant="destructive" size="sm" onClick={() => handleSell(stock.symbol,stock.num_shares)}>
                        Sell
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
       
      </main>
    </div>
  )
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}


