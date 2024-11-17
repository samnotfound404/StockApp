import React, { useEffect, useRef } from "react";

type TimeSeriesChartProps = {
  symbol: string;
  dateRange: string; // Accept dateRange as a prop
  className?: string;
};

function TimeSeriesChart({ symbol, dateRange, className }: TimeSeriesChartProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Ensure the container is cleared before injecting a new widget
    if (containerRef.current) {
      containerRef.current.innerHTML = ""; // Clear previous widget
    }

    // Ensure the symbol always starts with "NASDAQ:" if it's not already there
    const formattedSymbol = symbol.startsWith("NASDAQ:") ? symbol : `NASDAQ:${symbol}`;

    if (containerRef.current) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        symbol: formattedSymbol,
        width: "200",
        height: "350",
        locale: "en",
        colorTheme: "light",
        isTransparent: false,
        autosize: false,
        largeChartUrl: "",
        dateRange: dateRange,
        chartOnly: true,
        noTimeScale: false,
      });

      containerRef.current.appendChild(script);
    }

    // Optional cleanup if needed
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ""; // Remove previous widget
      }
    };
  }, [symbol, dateRange]);

  return (
    <div className={className} ref={containerRef}>
      {/* The TradingView widget will be injected here */}
    </div>
  );
}

export default TimeSeriesChart;
