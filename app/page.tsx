"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import TimeseriesChart from "@/components/comps/timeSeriesChart"
import { useEffect, useState } from "react"
import './globals.css';
import { MoonIcon, SunIcon } from '@heroicons/react/solid';

export default function Component() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-background border-b px-4 py-3 md:px-6 md:py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Link href="#" className="text-lg font-bold" prefetch={false}>
            StockSignal
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
              <Button variant="outline" size="sm">
                Sign In
              </Button>
              <Button size="sm">Sign Up</Button>
            </div>
            <div className="flex items-center gap-2">
{isDarkMode?   <MoonIcon onClick={()=>setIsDarkMode(!isDarkMode)} className="h-6 w-6 text-purple-800 cursor-pointer" /> :(  <SunIcon  onClick={()=>setIsDarkMode(!isDarkMode)} className="h-6 w-6 text-yellow-500 cursor-pointer" />)}
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
              <Input type="search" placeholder="Search stocks..." className="pl-8 w-full" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <div className="flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-medium">Apple Inc.</div>
                  <div className="text-lg font-medium text-primary">$130.25</div>
                </div>
                <div className="text-sm text-muted-foreground">+2.5% today</div>
                <TimeseriesChart  className="w-full aspect-[4/3]" isDarkMode={isDarkMode} />
              </div>
            </Card>
            <Card>
              <div className="flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-medium">Microsoft Corp.</div>
                  <div className="text-lg font-medium text-primary">$280.15</div>
                </div>
                <div className="text-sm text-muted-foreground">-1.2% today</div>
                <TimeseriesChart  className="w-full aspect-[4/3]" isDarkMode={isDarkMode} />
              </div>
            </Card>
            <Card>
              <div className="flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-medium">Amazon.com, Inc.</div>
                  <div className="text-lg font-medium text-primary">$3,150.75</div>
                </div>
                <div className="text-sm text-muted-foreground">+0.8% today</div>
                <TimeseriesChart  className="w-full aspect-[4/3]" isDarkMode={isDarkMode} />
              </div>
            </Card>
            <Card>
              <div className="flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-medium">Tesla, Inc.</div>
                  <div className="text-lg font-medium text-primary">$650.25</div>
                </div>
                <div className="text-sm text-muted-foreground">-3.1% today</div>
                <TimeseriesChart  className="w-full aspect-[4/3]" isDarkMode={isDarkMode} />
              </div>
            </Card>
            <Card>
              <div className="flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-medium">Nvidia Corporation</div>
                  <div className="text-lg font-medium text-primary">$615.50</div>
                </div>
                <div className="text-sm text-muted-foreground">+4.2% today</div>
                <TimeseriesChart  className="w-full aspect-[4/3]" isDarkMode={isDarkMode} />
              </div>
            </Card>
            <Card>
              <div className="flex flex-col gap-4 p-2">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-medium">Alphabet Inc.</div>
                  <div className="text-lg font-medium text-primary">$2,450.75</div>
                </div>
                <div className="text-sm text-muted-foreground">-0.5% today</div>
                <TimeseriesChart  className="w-full aspect-[4/3]" isDarkMode={isDarkMode} />
              </div>
            </Card>
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




