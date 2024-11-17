'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Bell, Search, TrendingUp,DollarSign } from 'lucide-react'
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import '../globals.css';
const stockData = [
  { date: "Nov 12", price: 205 },
  { date: "Nov 13", price: 210 },
  { date: "Nov 14", price: 215 },
  { date: "Nov 15", price: 202.61 },
]

const companyNews = [
  {
    title: "Amazon Announces Q3 2024 Results",
    date: "Nov 15, 2024",
    summary: "Amazon reports strong growth in AWS and advertising segments..."
  },
  {
    title: "New Prime Features Launched",
    date: "Nov 14, 2024",
    summary: "Amazon introduces new benefits for Prime members including..."
  },
  {
    title: "Expansion in Healthcare Sector",
    date: "Nov 13, 2024",
    summary: "Amazon's healthcare initiatives show promising results..."
  },
]

export default function Component() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between gap-4">
  {/* Left Section: StockSignal Logo and Text */}
  <div className="flex items-center">
  <DollarSign className="h-6 w-6 text-primary" />
  <span className="ml-2 text-2xl font-bold">StockSignal</span>
  </div>

  {/* Center Section: Search Bar */}
  <div className="flex-grow flex justify-center">
    <div className="relative w-2/3">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input className="pl-8 text-sm" placeholder="Search more stocks..." type="search" />
    </div>
  </div>

  {/* Placeholder for right alignment or additional elements */}
  <div className="text-center"></div>
</div>


      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
      <Card>
  <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 pb-4">
    {/* Stock Details */}
    <div>
      <div className="text-xl font-bold">Amazon.com Inc (AMZN)</div>
      <div className="text-3xl font-bold mt-2">
        $202.61
        <span className="text-red-500 text-xl ml-2">-2.78%</span>
      </div>
      <div className="text-sm text-muted-foreground mt-1">
        After Hours: $202.77{" "}
        <span className="text-green-500">+0.079%</span>
      </div>
      <div className="text-xs text-muted-foreground">
        Closed: Nov 15, 7:59 PM UTC-5 · USD · NASDAQ · Disclaimer
      </div>
    </div>

    {/* Action Buttons */}
    <div className="flex gap-2">
      <Button variant="outline" size="sm">
        <Bell className="mr-2 h-4 w-4" />
        Add to Watchlist
      </Button>
      <Button size="sm">
        <TrendingUp className="mr-2 h-4 w-4" />
        Buy
      </Button>
    </div>
  </CardHeader>

  {/* Chart Content */}
  <CardContent>
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={stockData} // Ensure `stockData` is defined with stock price and date
          margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={["auto", "auto"]} />
          {/* <Tooltip> */}
          <Line type="monotone" dataKey="price" stroke="hsl(var(--primary))" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </CardContent>
</Card>


        <Card>
          <CardHeader>
            <CardTitle>Key Statistics</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-1 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Previous Close</div>
                <div className="font-medium">$211.48</div>
              </div>
              <div>
                <div className="text-muted-foreground">Market Cap</div>
                <div className="font-medium">2.13T USD</div>
              </div>
              <div>
                <div className="text-muted-foreground">P/E Ratio</div>
                <div className="font-medium">43.42</div>
              </div>
              <div>
                <div className="text-muted-foreground">52 Week Range</div>
                <div className="font-medium">$139.53 - $215.90</div>
              </div>
              <div>
                <div className="text-muted-foreground">Average Volume</div>
                <div className="font-medium">37.91M</div>
              </div>
              <div>
                <div className="text-muted-foreground">Dividend Yield</div>
                <div className="font-medium">-</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
  <CardHeader>
    <CardTitle>Similar Stocks</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Carousel Container */}
    <div className="relative w-full">
      {/* Scrollable Stock Cards */}
      <div
        // ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hidden scroll-smooth p-4"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {[
          { name: "Apple", ticker: "AAPL", sector: "Technology", price: "$225.00", change: "0.00%", color: "text-neutral-500", arrow: "→" },
          { name: "Microsoft", ticker: "MSFT", sector: "Technology", price: "$415.00", change: "-1.81%", color: "text-red-500", arrow: "↓" },
          { name: "NVIDIA", ticker: "NVDA", sector: "Technology", price: "$141.98", change: "-4.45%", color: "text-red-500", arrow: "↓" },
          { name: "Netflix", ticker: "NFLX", sector: "Entertainment", price: "$823.96", change: "+3.53%", color: "text-green-500", arrow: "↑" },
          { name: "Tesla", ticker: "TSLA", sector: "Automotive", price: "$999.99", change: "+2.15%", color: "text-green-500", arrow: "↑" },
        ].map((stock, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 w-56 flex flex-col shrink-0"
            style={{ scrollSnapAlign: "center" }}
          >
            <div className="font-medium">{stock.name} ({stock.ticker})</div>
            <div className="text-sm text-muted-foreground">{stock.sector}</div>
            <div className="flex items-center justify-between text-sm mt-4">
              <div className="font-medium">{stock.price}</div>
              <div className={`flex items-center ${stock.color}`}>
                {stock.arrow} {stock.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Buttons */}
      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full shadow-md hover:bg-gray-200"
        // onClick={scrollLeft}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full shadow-md hover:bg-gray-200"
        // onClick={scrollRight}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </CardContent>
</Card>


      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>News</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {companyNews.map((news, index) => (
                <div key={index} className="border-b pb-4 last:border-0">
                  <h3 className="font-semibold">{news.title}</h3>
                  <p className="text-sm text-muted-foreground">{news.date}</p>
                  <p className="mt-2 text-sm">{news.summary}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                Amazon.com, Inc. is an American multinational technology company focusing on e-commerce,
                cloud computing, digital streaming, and artificial intelligence.
              </p>
              <p>
                Founded by Jeff Bezos in 1994, Amazon has grown from an online bookstore to become
                one of the world's most valuable companies, known for its innovation in various sectors
                including retail, entertainment, and technology services.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
