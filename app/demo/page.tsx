'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronRight, ChevronLeft, Check } from 'lucide-react'

export default function Component() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    idType: 'None',
    idNumber: '',
    bankName: '',
    bankAccountNumber: '',
    ifscCode: '',
    password: '',
    // passwordStrength: 50,
  })

  const steps = [
    { number: 1, name: 'Personal' },
    { number: 2, name: 'ID' },
    { number: 3, name: 'Bank Details' },
    { number: 4, name: 'Password' },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePasswordStrengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)
    setFormData(prev => ({ ...prev, passwordStrength: value }))
  }

  const nextStep = () => setStep(prev => Math.min(prev + 1, steps.length))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <Label htmlFor="name">What's your name?</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="UserName"
              required
            />
            <Label htmlFor="email">What's your email?</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              required
            />
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <Label htmlFor="idType">Select ID Type</Label>
            <select
              id="idType"
              name="idType"
              value={formData.idType}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md p-2"
            >
              <option value="None" disabled>Select ID Type</option>
              <option value="PAN">PAN Card</option>
              <option value="Aadhar">Aadhar Card</option>
            </select>
            {formData.idType !== 'None' && (
              <>
                <Label htmlFor="idNumber">
                  Enter your {formData.idType === 'PAN' ? 'PAN' : 'Aadhar'} Number
                </Label>
                <Input
                  id="idNumber"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleInputChange}
                  placeholder={formData.idType === 'PAN' ? 'Enter PAN number' : 'Enter Aadhar number'}
                  required
                />
              </>
            )}
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <Label htmlFor="bankName">Bank Name</Label>
            <select
              id="bankName"
              name="bankName"
              value={formData.bankName}
              onChange={handleInputChange}
              className="w-full border-gray-300 rounded-md p-2"
              required
            >
              <option value="" disabled>Select Bank</option>
              <option value="State Bank of India">State Bank of India</option>
              <option value="HDFC Bank">HDFC Bank</option>
              <option value="ICICI Bank">ICICI Bank</option>
              <option value="Axis Bank">Axis Bank</option>
              <option value="Bank of Baroda">Bank of Baroda</option>
              <option value="Punjab National Bank">Punjab National Bank</option>
              <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
              <option value="IDFC First Bank">IDFC First Bank</option>
              <option value="Union Bank of India">Union Bank of India</option>
              <option value="Yes Bank">Yes Bank</option>
            </select>
            <Label htmlFor="bankAccountNumber">Bank Account Number</Label>
            <Input
              id="bankAccountNumber"
              name="bankAccountNumber"
              value={formData.bankAccountNumber}
              onChange={handleInputChange}
              placeholder="e.g., 1234567890"
              required
            />
            <Label htmlFor="ifscCode">IFSC Code</Label>
            <Input
              id="ifscCode"
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleInputChange}
              placeholder="e.g., SBIN0001234"
              required
            />
          </div>
        )
      case 4:
        return (
          <div className="space-y-4">
            <Label htmlFor="password">Set a Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Create a strong password"
              required
            />
            {/* <Label htmlFor="passwordStrength">Password Strength</Label>
            <input
              type="range"
              id="passwordStrength"
              name="passwordStrength"
              min="0"
              max="100"
            //   value={formData.passwordStrength}
              onChange={handlePasswordStrengthChange}
              className="w-full"
            /> */}
            {/* <div className="text-sm text-gray-500">
              Strength: {formData.passwordStrength}%
            </div> */}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <header className="absolute top-8 left-20 text-2xl font-bold text-gray-700">StockSignal</header>
      <div className="w-full max-w-md mb-8">
        <div className="relative h-2 bg-gray-300 rounded-full">
          <div
            className="absolute top-0 left-0 h-full bg-gray-700 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${(step / steps.length) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          {steps.map((s) => (
            <div
              key={s.number}
              className={`flex flex-col items-center ${
                step >= s.number ? 'text-gray-800' : 'text-gray-400'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mb-1 transition-all duration-500 ${
                  step >= s.number
                    ? 'border-gray-800 bg-gray-800 text-white'
                    : 'border-gray-300 bg-white text-gray-300'
                }`}
              >
                {step > s.number ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{s.number}</span>
                )}
              </div>
              <span className="text-xs font-medium">{s.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-700">Create Your Account</h2>
          <form className="space-y-6">
            {renderStep()}
            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={step === 1}
                className="flex items-center text-gray-700"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                type="button"
                onClick={step === steps.length ? () => console.log('Form submitted:', formData) : nextStep}
                className="flex items-center bg-gray-700 text-white"
              >
                {step === steps.length ? 'Submit' : 'Next'}
                {step !== steps.length && <ChevronRight className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <footer className="mt-8 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} StockSignal. All rights reserved.
      </footer>
    </div>
  )
}
