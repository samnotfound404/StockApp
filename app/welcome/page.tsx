import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BarChart2, DollarSign, TrendingUp, Users, Shield, BookOpen } from "lucide-react"
import Link from "next/link"

export default function WelcomePage() {
  return (
    <div className="flex flex-col relative min-h-screen">
      <header className="px-4 bg-white lg:px-6 h-16 flex items-center border-b sticky top-0">
        <Link className="flex items-center justify-center" href="#">
          <DollarSign className="h-6 w-6 text-primary" />
          <span className="ml-2 text-2xl font-bold">StockSignal</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#how-it-works">
            How It Works
          </Link>
          <div className="flex justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Link href="/demo_signin">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center text-center px-4">
        <section className="w-full flex items-center justify-center py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Master the Market with StockSignal
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Empower your investment decisions with StockSignal - your all-in-one platform for advanced stock analysis, 
                  intelligent portfolio management, and real-time market insights.
                </p>
              </div>
              <div className="space-x-4">
              <Link href="/demo_signin">
                <Button size="lg">
                  Start Investing Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                </Link>
                {/* <Button variant="outline" size="lg">Learn More</Button> */}
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full flex items-center justify-center py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Powerful Features for Smart Investing</h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="flex flex-col items-center text-center">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center">
                    <BarChart2 className="h-6 w-6 text-primary mr-2" />
                    Advanced Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 dark:text-gray-400">
                    Leverage AI-powered tools for in-depth stock analysis, technical indicators, and predictive modeling. 
                    Stay ahead of market trends with our cutting-edge analytical capabilities.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center text-center">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-primary mr-2" />
                    Smart Portfolio Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 dark:text-gray-400">
                    Monitor your investments in real-time, track performance metrics, and receive personalized insights 
                    to optimize your portfolio allocation and maximize returns.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center text-center">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-primary mr-2" />
                    Intelligent Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 dark:text-gray-400">
                    Receive timely, personalized notifications on market movements, price changes, and potential 
                    investment opportunities tailored to your investment strategy and risk profile.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full flex items-center justify-center py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">How StockSignal Works</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary text-primary-foreground rounded-full p-3 mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">1. Create Your Account</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Sign up for free and set up your investor profile. Tell us about your investment goals and risk tolerance.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary text-primary-foreground rounded-full p-3 mb-4">
                  <BarChart2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">2. Analyze & Invest</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Use our advanced tools to analyze stocks, build your portfolio, and make informed investment decisions.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary text-primary-foreground rounded-full p-3 mb-4">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">3. Track & Optimize</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Monitor your portfolio performance, receive personalized insights, and optimize your investments over time.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full flex items-center justify-center py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Why Choose StockSignal?</h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    StockSignal combines cutting-edge technology with user-friendly design to provide you with the most 
                    comprehensive and intuitive stock analysis platform on the market.
                  </p>
                </div>
                <ul className="grid gap-6 text-center lg:text-left">
                  <li className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span className="font-medium">Bank-level security to protect your data and investments</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <span className="font-medium">Educational resources to help you become a better investor</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="font-medium">Community features to connect with other investors</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <img
                  alt="StockSignal Dashboard Preview"
                  className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                  height="310"
                  src="/placeholder.svg?height=310&width=550"
                  width="550"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full flex items-center justify-center py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 text-center">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Master the Market?</h2>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mt-4 mb-8">
              Join thousands of successful investors who trust StockSignal for their investment decisions.
            </p>
            <div className="space-x-4">
              <Button size="lg">
                Sign Up Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              {/* <Button variant="outline" size="lg">Schedule a Demo</Button> */}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          © 2024 StockSignal. All rights reserved. Investing involves risks. Please read our risk disclosure.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy Policy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Contact Us
          </Link>
        </nav>
      </footer>
    </div>
  )
}
