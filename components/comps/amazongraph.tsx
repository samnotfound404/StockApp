import React, { useEffect, useRef, memo } from "react";

function TradingViewWidget() {
  // Define the ref explicitly as HTMLDivElement | null
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Check if the script has already been added to the DOM to prevent duplicates
    const existingScript = document.getElementById("tradingview-widget-script");

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.id = "tradingview-widget-script";  // Add an id to the script for checking
      script.innerHTML = `
        {
          "width": "1200",
          "height": "610",
          "symbol": "NASDAQ:AAPL",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "light",
          "style": "2",
          "locale": "en",
          "gridColor": "rgba(0, 0, 0, 0.06)",
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "save_image": false,
          "details": true,
          "calendar": false,
          "show_popup_button": true,
          "popup_width": "1000",
          "popup_height": "650",
          "support_host": "https://www.tradingview.com"
        }`;

      // Ensure the ref is not null before appending the script
      if (container.current) {
        container.current.appendChild(script);
      }
    }
  }, []); // Empty dependency array ensures this runs only on mount

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
