"use client"

import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { ResponsiveLine } from "@nivo/line"

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen w-full">
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
              <div className="bg-muted/20 rounded-lg p-4 flex flex-col gap-2">
                <div className="text-sm text-muted-foreground">Total Value</div>
                <div className="text-2xl font-bold">$125,432</div>
                <div className="text-sm text-green-500">+3.2% this week</div>
              </div>
              <div className="bg-muted/20 rounded-lg p-4 flex flex-col gap-2">
                <div className="text-sm text-muted-foreground">Stocks</div>
                <div className="text-2xl font-bold">32</div>
                <div className="text-sm text-green-500">+2 this week</div>
              </div>
              <div className="bg-muted/20 rounded-lg p-4 flex flex-col gap-2">
                <div className="text-sm text-muted-foreground">Watchlist</div>
                <div className="text-2xl font-bold">18</div>
                <div className="text-sm text-muted-foreground">No change</div>
              </div>
              <div className="bg-muted/20 rounded-lg p-4 flex flex-col gap-2">
                <div className="text-sm text-muted-foreground">Cash</div>
                <div className="text-2xl font-bold">$12,345</div>
                <div className="text-sm text-green-500">+1.5% this week</div>
              </div>
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
          <CardContent className="h-[30vh]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Stock</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Shares</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Apple Inc.</div>
                    <div className="text-xs text-muted-foreground">AAPL</div>
                  </TableCell>
                  <TableCell>$135.24</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>$13,524</TableCell>
                  <TableCell className="text-green-500">+2.3%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Microsoft Corp.</div>
                    <div className="text-xs text-muted-foreground">MSFT</div>
                  </TableCell>
                  <TableCell>$280.12</TableCell>
                  <TableCell>50</TableCell>
                  <TableCell>$14,006</TableCell>
                  <TableCell className="text-green-500">+1.8%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Amazon.com, Inc.</div>
                    <div className="text-xs text-muted-foreground">AMZN</div>
                  </TableCell>
                  <TableCell>$3,215.45</TableCell>
                  <TableCell>10</TableCell>
                  <TableCell>$32,154.50</TableCell>
                  <TableCell className="text-green-500">+1.5%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="col-span-1 md:col-span-2 lg:col-span-1">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Trends (Graph)</CardTitle>
            <Link href="#" className="text-primary hover:underline" prefetch={false}>
              View All
            </Link>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <TimeseriesChart className="aspect-[16/9]" />
            </div>
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