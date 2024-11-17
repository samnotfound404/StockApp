"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import TimeseriesChart from "@/components/comps/timeSeriesChart"
import { useEffect, useState } from "react"
import './globals.css';
import axios from "axios"
import {DollarSign } from 'lucide-react'
import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import StockCard from '@/components/comps/stockCard';
import { fetchStockData } from "@/helpers/api"
export default function Component() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [query, setquery] = useState('')
  const [Stocks, setStocks] = useState([])
  
  const handlesearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const stockData = await fetchStockData(query); // Use the fetchStockData function
      setStocks(stockData);
      console.log(stockData);

      // Navigate to the dashboard with the symbol in the query
      window.location.href = `/dashboard?symbol=${query}`;
    } catch (err) {
      console.error('Error fetching stock data:', err.message);
    }
  };
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  return (
    <div>
      <header className="bg-background border-b px-4 py-3 md:px-6 md:py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
        <Link className="flex items-center justify-center" href="#">
          <DollarSign className="h-6 w-6 text-primary" />
          <span className="ml-2 text-2xl font-bold">StockSignal</span>
        </Link>
          <nav className="hidden md:flex items-center gap-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
              Explore Stocks
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
              Dashboard
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
              Watchlist
            </Link>
            <Link href="/Portfolio" className="text-muted-foreground hover:text-foreground" prefetch={false}>
              Portfolio
            </Link>
          </nav>
          <div className="flex justify-between items-center gap-6">
            
            <div className="flex items-center gap-2">
{isDarkMode?   <MoonIcon onClick={()=>setIsDarkMode(!isDarkMode)} className="h-6 w-6 text-purple-800 cursor-pointer" /> :(  <SunIcon  onClick={()=>setIsDarkMode(!isDarkMode)} className="h-6 w-6 text-yellow-500 cursor-pointer" />)}
<svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 rounded-full bg-gray-300 p-1 cursor-pointer"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="8" r="4" />  {/* Profile image - head */}
          <path d="M6 14c0-2 6-2 6-2s6 0 6 2" />  {/* Shoulders */}
        </svg>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_40vw] gap-8 p-4 md:p-6 lg:p-8">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Explore Stocks</h2>
            <div className="relative flex-1 max-w-md">
              <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <form onSubmit={handlesearch}>

              <Input type="search" placeholder="Search stocks..." value={query} onChange={(e) => {setquery(e.target.value) }} className="pl-8 w-full" />
              </form>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <StockCard
        symbol="AAPL"
        companyName="Apple Inc."
        isDarkMode={true} // or false
      />
            <StockCard
        symbol="MSFT"
        companyName="Microsoft Corp"
        isDarkMode={true} // or false
      />
            <StockCard
        symbol="AMZN"
        companyName="Amazon.com, Inc."
        isDarkMode={true} // or false
      />
      <StockCard
        symbol="TSLA"
        companyName="Tesla, Inc."
        isDarkMode={true} // or false
      />
      <StockCard
        symbol="NVDA"
        companyName="Nvidia Corporation"
        isDarkMode={true} // or false
      />
      <StockCard
        symbol="GOOG"
        companyName="Alphabet Inc."
        isDarkMode={true} // or false
      />
          </div>
        </section>
        <section className="w-full lg:w-[40vw]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                View Portfolio
              </Button>
              <Button variant="outline" size="sm">
                Manage Watchlist
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Investments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-lg font-medium">$125,000</div>
                    <div className="text-sm text-muted-foreground">Total Investments</div>
                  </div>
                  <div>
                    <div className="text-lg font-medium text-primary">$15,000</div>
                    <div className="text-sm text-muted-foreground">Total Returns</div>
                  </div>
                  <div>
                    <div className="text-lg font-medium">$140,000</div>
                    <div className="text-sm text-muted-foreground">Current Value</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Watchlist</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Change</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>AAPL</TableCell>
                      <TableCell>$130.25</TableCell>
                      <TableCell className="text-primary">+2.5%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>MSFT</TableCell>
                      <TableCell>$280.15</TableCell>
                      <TableCell className="text-muted-foreground">-1.2%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>AMZN</TableCell>
                      <TableCell>$3,150.75</TableCell>
                      <TableCell className="text-primary">+0.8%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <footer className="bg-muted/40 px-4 py-6 md:px-6 md:py-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-sm text-muted-foreground">&copy; 2023 StockTracker. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
              Terms of Service
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
              Privacy Policy
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground" prefetch={false}>
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}




