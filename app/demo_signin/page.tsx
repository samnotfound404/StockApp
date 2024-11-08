'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from 'lucide-react'

export default function SignIn() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }

  const handleSignIn = () => {
    if (!formData.identifier || !formData.password) {
      setError("All fields are required")
      return
    }
    console.log('Sign-in data:', formData)
    setError('')
    // Proceed with authentication logic here
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <header className="absolute top-8 left-20 text-2xl font-bold text-gray-700">StockSignal</header>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-700">Sign In to Your Account</h2>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4">
            <Label htmlFor="identifier">
              Username or Email<span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="identifier"
              name="identifier"
              value={formData.identifier}
              onChange={handleInputChange}
              placeholder="Username or Email"
              required
            />
            <Label htmlFor="password">
              Password<span className="text-red-500 ml-1">*</span>
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            type="button"
            onClick={handleSignIn}
            className="w-full bg-gray-700 text-white"
          >
            Sign In
          </Button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <button
            onClick={() => router.push('/demo')}
            className="text-blue-600 hover:underline"
          >
            Sign up here
          </button>
        </div>
      </div>
      <footer className="mt-8 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} StockSignal. All rights reserved.
      </footer>
    </div>
  )
}