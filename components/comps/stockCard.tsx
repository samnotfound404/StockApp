import { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import TimeSeriesChart from "@/components/comps/timeSeriesChart";

interface StockCardProps {
  symbol: string;
  companyName: string;
  isDarkMode: boolean;
}

interface StockData {
  currentPrice: string | null;
  changePercent: string | null;
  loading: boolean;
  error: string | null;
}

const StockCard: React.FC<StockCardProps> = ({ symbol, companyName, isDarkMode }) => {
  const [stockData, setStockData] = useState<StockData>({
    currentPrice: null,
    changePercent: null,
    loading: true,
    error: null,
  });

  const [dateRange, setDateRange] = useState<string>("12M"); // Default to 12M

  // Fetch stock data whenever the symbol or dateRange changes
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/stock/daily?symbol=${symbol}&dateRange=${dateRange}`);
        const data = await response.json();

        if (response.ok) {
          setStockData({
            currentPrice: data.currentPrice,
            changePercent: data.changePercent,
            loading: false,
            error: null,
          });
        } else {
          setStockData({
            currentPrice: null,
            changePercent: null,
            loading: false,
            error: data.message || 'Error fetching stock data',
          });
        }
      } catch (error) {
        setStockData({
          currentPrice: null,
          changePercent: null,
          loading: false,
          error: 'Error fetching stock data',
        });
      }
    };

    fetchStockData();
  }, [symbol, dateRange]); // Re-fetch data when symbol or dateRange changes

  const { currentPrice, changePercent, loading, error } = stockData;

  const handleDateRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDateRange(event.target.value); // Update the dateRange state
  };

  return (
    <Card>
      <div className="flex flex-col gap-4 p-2">
        <div className="flex items-center justify-between">
          <div className="text-lg font-medium">{companyName}</div>
          {loading ? (
            <div className="text-lg font-medium text-muted-foreground">Loading...</div>
          ) : error ? (
            <div className="text-sm text-red-500">{error}</div>
          ) : (
            <div className="text-lg font-medium text-primary">${currentPrice}</div>
          )}
        </div>
        {/* Percentage Change */}
        <div className="flex items-center">
          {loading ? (
            <div className="text-sm text-muted-foreground">Fetching data...</div>
          ) : error ? (
            <div className="text-sm text-red-500">Error fetching data</div>
          ) : changePercent !== null && changePercent !== undefined ? (
            <div
              className={`flex items-center ${parseFloat(changePercent) > 0 ? 'text-green-500' : 'text-red-500'}`}
            >
              {parseFloat(changePercent) > 0 ? '↑' : '↓'} {changePercent}%
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">No data available</div>
          )}
        </div>
        {/* Date Range Dropdown */}
        <div className="flex justify-between items-center">
          {/* <label htmlFor="dateRange" className="text-sm font-medium">Select Date Range:</label> */}
          <select
            id="dateRange"
            value={dateRange}
            onChange={handleDateRangeChange}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="1D">1D</option>
            <option value="3M">3M</option>
            <option value="12M">1Y</option>
            <option value="60M">5Y</option>
            <option value="ALL">All</option>
          </select>
        </div>

        {/* Pass the dynamic symbol and dateRange to the TimeSeriesChart */}
        <TimeSeriesChart
          className="w-full aspect-[4/3]"
          symbol={symbol}
          dateRange={dateRange}
        />
      </div>
    </Card>
  );
};

export default StockCard;
