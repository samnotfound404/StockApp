'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronRight, ChevronLeft, Check } from 'lucide-react'
import { Eye, EyeOff } from 'lucide-react'
interface BankDetails {
  ADDRESS: string;
  BANK: string;
  BANKCODE: string;
  BRANCH: string;
  CENTRE: string;
  CITY: string;
  CONTACT: string;
  DISTRICT: string;
  IFSC: string;
  IMPS: boolean;
  MICR: string;
  NEFT: boolean;
  RTGS: boolean;
  STATE: string;
  SWIFT: string;
  UPI: boolean;
}
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
  })
  const [showPassword, setShowPassword] = useState(false)
  const [bankDetails, setBankDetails] = useState(null)
  const [isConfirming, setIsConfirming] = useState(false)

  const steps = [
    { number: 1, name: 'Personal' },
    { number: 2, name: 'ID' },
    { number: 3, name: 'Bank Details' },
    { number: 4, name: 'Password' },
  ]

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateStep = () => {
    switch (step) {
      case 1:
        return formData.name && formData.email
      case 2:
        return formData.idType !== 'None' && formData.idNumber
      case 3:
        return formData.bankName && formData.bankAccountNumber && formData.ifscCode
      case 4:
        return formData.password
      default:
        return false
    }
  }

  const nextStep = async () => {
    if (validateStep()) {
      if (step === steps.length) {
        await fetchBankDetails()
      } else {
        setStep(prev => prev + 1)
      }
    } else {
      alert('Please fill in all required fields.')
    }
  }

  const fetchBankDetails = async () => {
    try {
      const response = await fetch(`https://bank-apis.justinclicks.com/API/V1/IFSC/${formData.ifscCode.toUpperCase()}`)
      if (response.ok) {
        const data = await response.json()
        setBankDetails(data)
        setIsConfirming(true)
      } else {
        alert('Invalid IFSC code or unable to retrieve bank details.')
      }
    } catch (error) {
      console.error('Error fetching bank details:', error)
    }
  }

  const confirmDetails = () => {
    setIsConfirming(false)
    console.log('Form submitted:', formData)
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <Label htmlFor="name">What's your name? <span className="text-red-500">*</span></Label>
            <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="UserName" required />
            <Label htmlFor="email">What's your email? <span className="text-red-500">*</span></Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required />
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <Label htmlFor="idType">Select ID Type <span className="text-red-500">*</span></Label>
            <select id="idType" name="idType" value={formData.idType} onChange={handleInputChange} className="w-full border-gray-300 rounded-md p-2">
              <option value="None" disabled>Select ID Type</option>
              <option value="PAN">PAN Card</option>
              <option value="Aadhar">Aadhar Card</option>
            </select>
            {formData.idType !== 'None' && (
              <>
                <Label htmlFor="idNumber">Enter your {formData.idType === 'PAN' ? 'PAN' : 'Aadhar'} Number <span className="text-red-500">*</span></Label>
                <Input id="idNumber" name="idNumber" value={formData.idNumber} onChange={handleInputChange} placeholder={formData.idType === 'PAN' ? 'Enter PAN number' : 'Enter Aadhar number'} required />
              </>
            )}
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <Label htmlFor="bankName">Bank Name <span className="text-red-500">*</span></Label>
            <select id="bankName" name="bankName" value={formData.bankName} onChange={handleInputChange} className="w-full border-gray-300 rounded-md p-2" required>
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
            <Label htmlFor="bankAccountNumber">Bank Account Number <span className="text-red-500">*</span></Label>
            <Input id="bankAccountNumber" name="bankAccountNumber" value={formData.bankAccountNumber} onChange={handleInputChange} placeholder="e.g., 1234567890" required />
            <Label htmlFor="ifscCode">IFSC Code <span className="text-red-500">*</span></Label>
            <Input id="ifscCode" name="ifscCode" value={formData.ifscCode} onChange={handleInputChange} placeholder="e.g., SBIN0001234" required />
          </div>
        )
      case 4:
        return (
          <div className="space-y-4">
            <Label htmlFor="password">Set a Password <span className="text-red-500">*</span></Label>
            <Input id="password" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleInputChange} placeholder="Create a strong password" required />
            <button type="button" onClick={togglePasswordVisibility} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
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
          <div className="absolute top-0 left-0 h-full bg-gray-700 transition-all duration-500 ease-out rounded-full" style={{ width: `${(step / steps.length) * 100}%` }} />
        </div>
        <div className="flex justify-between mt-2">
          {steps.map((s) => (
            <div key={s.number} className={`flex flex-col items-center ${step >= s.number ? 'text-gray-800' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mb-1 transition-all duration-500 ${step >= s.number ? 'border-gray-800 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-300'}`}>
                {step > s.number ? <Check className="w-5 h-5" /> : <span className="text-sm font-medium">{s.number}</span>}
              </div>
              <span className="text-xs font-medium">{s.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Step {step}: {steps[step - 1].name} Info</h2>
        {renderStep()}
        <div className="flex justify-between mt-8">
          {step > 1 && (
            <Button type="button" onClick={() => setStep((prev) => prev - 1)} variant="outline">
              <ChevronLeft className="w-5 h-5 mr-2" /> Back
            </Button>
          )}
          <Button type="button" onClick={nextStep} className="ml-auto" variant="outline">
            {step === steps.length ? 'Confirm' : 'Next'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
      {isConfirming && bankDetails && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4">Please confirm the bank details</h3>
            {/* <p><strong>Bank:</strong> {BankDetails.BANK}</p>
            <p><strong>Branch:</strong> {BankDetails.BRANCH}</p>
            <p><strong>Address:</strong> {BankDetails.ADDRESS}</p>
            <p><strong>City:</strong> {BankDetails.CITY}</p>
            <p><strong>State:</strong> {BankDetails.STATE}</p> */}
            <div className="flex justify-end mt-6">
              <Button type="button" onClick={() => setIsConfirming(false)} variant="outline" className="mr-4">
                Cancel
              </Button>
              <Button type="button" onClick={confirmDetails} className="bg-green-600 text-white">
                Confirm and Proceed
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
