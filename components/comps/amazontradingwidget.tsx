import React, { useEffect } from "react";

// Amazon TradingView Profile Widget
const AmazonTradingViewProfileWidget = () => {
  useEffect(() => {
    const widgetContainer = document.getElementById("tradingview-widget-profile");

    if (widgetContainer) {
      const existingScript = document.getElementById("tradingview-widget-script-profile");
      if (!existingScript) {
        const script = document.createElement("script");
        script.id = "tradingview-widget-script-profile";
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js";
        script.async = true;
        script.innerHTML = JSON.stringify({
          width: 500,
          height: 550,
          isTransparent: false,
          colorTheme: "light",
          symbol: "NASDAQ:AAPL",
          locale: "en",
        });
        widgetContainer.appendChild(script);

        console.log("Script added for TradingView profile widget.");
      }
    } else {
      console.error("Widget container not found.");
    }

    return () => {
      const script = document.getElementById("tradingview-widget-script-profile");
      if (script) {
        script.remove();
        console.log("Script removed for TradingView profile widget.");
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container" id="tradingview-widget-profile">
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

// Amazon TradingView Widget (Timeline)
const AmazonTradingViewWidget = () => {
  useEffect(() => {
    const widgetContainer = document.getElementById("tradingview-widget-timeline");

    if (widgetContainer) {
      const existingScript = document.getElementById("tradingview-widget-script-timeline");
      if (!existingScript) {
        const script = document.createElement("script");
        script.id = "tradingview-widget-script-timeline";
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
        script.async = true;
        script.innerHTML = JSON.stringify({
          feedMode: "symbol",
          symbol: "NASDAQ:AAPL",
          isTransparent: false,
          displayMode: "regular",
          width: 600,
          height: 550,
          colorTheme: "light",
          locale: "en",
        });

        widgetContainer.appendChild(script);
      }
    } else {
      console.error("Widget container not found");
    }
  }, []); 

  return (
    <div className="tradingview-widget-container" id="tradingview-widget-timeline">
      <div className="tradingview-widget-copyright"></div>
    </div>
  );
};

// Parent Component displaying both widgets side by side
const TradingViewWidgets = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6">
      <div className="widget-container">
        <AmazonTradingViewWidget />
      </div>
      <div className="widget-container">
        <AmazonTradingViewProfileWidget />
      </div>
    </div>
  );
};

export default TradingViewWidgets;
