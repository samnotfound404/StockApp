import { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import TimeseriesChart from "@/components/comps/timeSeriesChart";

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

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/stock/daily?symbol=${symbol}`);
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
  }, [symbol]);

  const { currentPrice, changePercent, loading, error } = stockData;

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
        {loading ? (
          <div className="text-sm text-muted-foreground">Fetching data...</div>
        ) : error ? null : (
          <div className="text-sm text-muted-foreground">{changePercent} today</div>
        )}
        {/* Timeseries Chart */}
        <TimeseriesChart className="w-full aspect-[4/3]" isDarkMode={isDarkMode} />
      </div>
    </Card>
  );
};

export default StockCard;
