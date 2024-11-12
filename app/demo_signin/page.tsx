'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import supabase from '../../client'; // Adjust the import path if necessary
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff,DollarSign } from 'lucide-react'
import Link from 'next/link'

export default function SignIn() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  interface FormData {
    identifier: string;
    password: string;
  }

  interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & EventTarget;
  }

  const handleInputChange = (e: InputChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({ ...prev, [name]: value }));
  }

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }

  const handleSignIn = async () => {
    if (!formData.identifier || !formData.password) {
      setError("All fields are required")
      return
    }

    setError('')

    // Attempt sign-in with Supabase
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.identifier,
      password: formData.password,
    })

    if (error) {
      setError(error.message)
    } else {
      router.push('/Portfolio') // Replace with the route you want to redirect to after sign-in
    }
  }

  return (
    <div>
      <header className="px-4 lg:px-6 h-16 flex items-center border-b sticky top-0">
        <Link className="flex items-center justify-center" href="#">
          <DollarSign className="h-6 w-6 text-primary" />
          <span className="ml-2 text-2xl font-bold">StockSignal</span>
        </Link>
      </header>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-700">Sign In to Your Account</h2>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4">
            <Label htmlFor="identifier">
              Email<span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="identifier"
              name="identifier"
              type="email"
              value={formData.identifier}
              onChange={handleInputChange}
              placeholder="Email"
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
            onClick={() => router.push('/signup')}
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
            </div>
  )
}
