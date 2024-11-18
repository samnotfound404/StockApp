'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addStockPurchase } from '@/helpers/api'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { ArrowUpDown, DollarSign, TrendingUp, TrendingDown } from 'lucide-react'
import Script from 'next/script'
declare global {
  interface Window {
      Razorpay: any;
  }
}

interface StockData {
  stock_id: string
  user_id: string
  open_price: number
  close_price: number
  high_price: number
  low_price: number
  current_price: number
}

interface BuyModalProps {
  stockData: StockData;
  symbol: string;
  onClose: () => void;
}

export default function BuyModal({ stockData, symbol, onClose }: BuyModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [total, setTotal] = useState(stockData.current_price)
  const [isOpen, setIsOpen] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value) || 0
    setQuantity(newQuantity)
    setTotal(newQuantity * stockData.current_price)
  }

  const handleBuy = async () => {
    if (isProcessing) return; // Prevent multiple clicks
    
    setIsProcessing(true);

    try {
      // Create Razorpay order
      const response = await fetch('http://localhost:3001/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: total * 100 }), // Total in paise
      });
      const data = await response.json();
      const orderId = data.razorpay_order_id;
      if (!orderId) {
        alert('Failed to create order');
        return;
      }

      // Initialize Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Razorpay Key ID
        amount: total * 100, // Total amount in paise
        currency: "INR",
        name: "Your Company Name",
        description: `Buying ${quantity} shares of ${symbol}`,
        order_id: orderId, // Order ID returned from your backend
        handler: function (response: any) {
          console.log("Payment successful", response);
          alert(`Payment successful! Transaction ID: ${response.razorpay_payment_id}`);
          addStockPurchase(stockData, quantity); // Proceed with stock purchase after successful payment
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399CC",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment failed", error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Buy {symbol}</DialogTitle>
            <DialogDescription>
              Enter the quantity of shares you want to purchase.
            </DialogDescription>
          </DialogHeader>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 py-4"
          >
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right font-semibold">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="col-span-3"
                min="1"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-semibold">Price</Label>
              <div className="col-span-3 text-lg">${stockData.current_price.toFixed(2)}</div>
            </div>
            <motion.div
              className="grid grid-cols-4 items-center gap-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 1.5 }}
            >
              <Label className="text-right font-semibold">Total</Label>
              <div className="col-span-3 text-2xl font-bold text-green-600">${total.toFixed(2)}</div>
            </motion.div>
          </motion.div>
          <DialogFooter>
            <Button onClick={handleBuy} className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6">
              {isProcessing ? "Processing..." : "Confirm Purchase"}
            </Button>
          </DialogFooter>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6 p-4 bg-gray-100 rounded-lg dark:bg-gray-800"
          >
            <h4 className="font-semibold text-lg mb-3">Stock Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <StockInfoItem label="Open" value={stockData.open_price} icon={<TrendingUp className="h-4 w-4 text-green-500" />} />
              <StockInfoItem label="Close" value={stockData.close_price} icon={<TrendingDown className="h-4 w-4 text-red-500" />} />
              <StockInfoItem label="High" value={stockData.high_price} icon={<ArrowUpDown className="h-4 w-4 text-blue-500" />} />
              <StockInfoItem label="Low" value={stockData.low_price} icon={<ArrowUpDown className="h-4 w-4 text-blue-500" />} />
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  )
}

function StockInfoItem({ label, value, icon }: { label: string, value: number, icon: React.ReactNode }) {
  return (
    <div className="flex items-center space-x-2">
      {icon}
      <span className="font-medium">{label}:</span>
      <span>${value.toFixed(2)}</span>
    </div>
  )
}
