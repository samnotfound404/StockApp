import React, { useEffect, useRef } from "react";

const TradingViewTickerWidget: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Prevent adding the script multiple times
    if (document.getElementById("tradingview-ticker-script")) return;

    const script = document.createElement("script");
    script.id = "tradingview-ticker-script";
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = `
      {
        "symbols": [
          {
            "description": "TSLA - Tesla",
            "proName": "NASDAQ:TSLA"
          },
          {
            "description": "AAPL - Apple",
            "proName": "NASDAQ:AAPL"
          },
          {
            "description": "NVDA - Nvidia",
            "proName": "NASDAQ:NVDA"
          },
          {
            "description": "AMZN - Amazon",
            "proName": "NASDAQ:AMZN"
          },
          {
            "description": "MSFT - Microsoft",
            "proName": "NASDAQ:MSFT"
          },
          {
            "description": "GOOGL - Google",
            "proName": "NASDAQ:GOOGL"
          },
          {
            "description": "NFLX - Netflix",
            "proName": "NASDAQ:NFLX"
          },
          {
            "description": "BABA - Alibaba",
            "proName": "NYSE:BABA"
          },
          {
            "description": "PYPL - PayPal",
            "proName": "NASDAQ:PYPL"
          }
        ],
        "showSymbolLogo": true,
        "isTransparent": false,
        "largeChartUrl": "http://localhost:3000/dashboard?symbol=AMZN",
        "displayMode": "compact",
        "colorTheme": "light",
        "locale": "en"
      }`;

    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    // Cleanup on component unmount
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="bg-gray-100 py-1">
      <div className="tradingview-widget-container" ref={containerRef}>
        <div className="tradingview-widget-container__widget"></div>
        <div className="tradingview-widget-copyright">

        </div>
      </div>
    </div>
  );
};

export default TradingViewTickerWidget;
