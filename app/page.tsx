"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { ResponsiveLine } from "@nivo/line"
import { useEffect,useState } from "react"
import './globals.css';

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
            StockTracker
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
            <Link href="/portfolio" className="text-muted-foreground hover:text-foreground" prefetch={false}>
              Portfolio
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button size="sm">Sign Up</Button>
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
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-medium">Apple Inc.</div>
                  <div className="text-lg font-medium text-primary">$130.25</div>
                </div>
                <div className="text-sm text-muted-foreground">+2.5% today</div>
                <TimeseriesChart className="w-full aspect-[4/3]" />
              </div>
            </Card>
            <Card>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-medium">Microsoft Corp.</div>
                  <div className="text-lg font-medium text-primary">$280.15</div>
                </div>
                <div className="text-sm text-muted-foreground">-1.2% today</div>
                <TimeseriesChart className="w-full aspect-[4/3]" />
              </div>
            </Card>
            <Card>
              <div className="flex flex-col gap-4 ">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-medium">Amazon.com, Inc.</div>
                  <div className="text-lg font-medium text-primary">$3,150.75</div>
                </div>
                <div className="text-sm text-muted-foreground">+0.8% today</div>
                <TimeseriesChart className="w-full aspect-[4/3]" />
              </div>
            </Card>
            <Card>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-medium">Tesla, Inc.</div>
                  <div className="text-lg font-medium text-primary">$650.25</div>
                </div>
                <div className="text-sm text-muted-foreground">-3.1% today</div>
                <TimeseriesChart className="w-full aspect-[4/3]" />
              </div>
            </Card>
            <Card>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-medium">Nvidia Corporation</div>
                  <div className="text-lg font-medium text-primary">$615.50</div>
                </div>
                <div className="text-sm text-muted-foreground">+4.2% today</div>
                <TimeseriesChart className="w-full aspect-[4/3]" />
              </div>
            </Card>
            <Card>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-medium">Alphabet Inc.</div>
                  <div className="text-lg font-medium text-primary">$2,450.75</div>
                </div>
                <div className="text-sm text-muted-foreground">-0.5% today</div>
                <TimeseriesChart className="w-full aspect-[4/3]" />
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

function LineChart(props) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Desktop",
            data: [
              { x: "Jan", y: 43 },
              { x: "Feb", y: 137 },
              { x: "Mar", y: 61 },
              { x: "Apr", y: 145 },
              { x: "May", y: 26 },
              { x: "Jun", y: 154 },
            ],
          },
          {
            id: "Mobile",
            data: [
              { x: "Jan", y: 60 },
              { x: "Feb", y: 48 },
              { x: "Mar", y: 177 },
              { x: "Apr", y: 78 },
              { x: "May", y: 96 },
              { x: "Jun", y: 204 },
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  )
}


function TimeseriesChart(props) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Desktop",
            data: [
              { x: "2018-01-01", y: 7 },
              { x: "2018-01-02", y: 5 },
              { x: "2018-01-03", y: 11 },
              { x: "2018-01-04", y: 9 },
              { x: "2018-01-05", y: 12 },
              { x: "2018-01-06", y: 16 },
              { x: "2018-01-07", y: 13 },
            ],
          },
          {
            id: "Mobile",
            data: [
              { x: "2018-01-01", y: 9 },
              { x: "2018-01-02", y: 8 },
              { x: "2018-01-03", y: 13 },
              { x: "2018-01-04", y: 6 },
              { x: "2018-01-05", y: 8 },
              { x: "2018-01-06", y: 14 },
              { x: "2018-01-07", y: 11 },
            ],
          },
        ]}
        margin={{ top: 10, right: 20, bottom: 40, left: 40 }}
        xScale={{
          type: "time",
          format: "%Y-%m-%d",
          useUTC: false,
          precision: "day",
        }}
        xFormat="time:%Y-%m-%d"
        yScale={{
          type: "linear",
          min: 0,
          max: "auto",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
          format: "%d",
          tickValues: "every 1 day",
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  )
}