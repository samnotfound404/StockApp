'use client'
import { useState } from "react";
import axios from "axios";

export default function Home() {
  // States for stock symbol, image URL, and error messages
  const [symbol, setSymbol] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setError("");
    setImage(null);

    try {
      // Send POST request to Colab notebook API
      const response = await axios.post(
        "http://<colab-ngrok-url>/predict", // Replace with your ngrok URL
        { symbol },
        { responseType: "arraybuffer" } // Ensure response is treated as binary data
      );

      // Create a URL for the image blob
      const blob = new Blob([response.data], { type: "image/png" });
      const imageUrl = URL.createObjectURL(blob);
      setImage(imageUrl); // Set the image URL to state
    } catch (err: any) {
      // Handle errors
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "An error occurred.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Stock Price Prediction</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter stock symbol (e.g., NVDA)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)} // Update symbol state
          required
        />
        <button type="submit">Predict</button>
      </form>

      {/* Display error message if any */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display the generated image if available */}
      {image && <img src={image} alt="Stock Prediction Plot" />}
    </div>
  );
}
