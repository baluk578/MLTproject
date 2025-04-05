import Link from "next/link"
import { ArrowRight, BarChart3, Clock, Leaf, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">FoodSave AI</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#" className="text-sm font-medium hover:underline">
              Dashboard
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline">
              Predictions
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline">
              Analytics
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline">
              About
            </Link>
          </nav>
          <Button>Get Started</Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Reducing Food Waste with Machine Learning
                </h1>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our AI-powered platform helps food businesses predict demand, optimize inventory, and reduce waste
                  throughout the supply chain - supporting SDG 2 (Zero Hunger) and SDG 12 (Responsible Consumption).
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg">
                    View Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-[500px] aspect-video rounded-xl overflow-hidden shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-green-600 opacity-80"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white p-6">
                      <h3 className="text-2xl font-bold mb-2">1.3 Billion Tons</h3>
                      <p className="text-lg">of food wasted annually worldwide</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform uses advanced machine learning algorithms to analyze historical data, predict demand
                  patterns, and optimize inventory management.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                  <CardTitle>Demand Prediction</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    ML models analyze historical sales data, seasonal trends, and external factors to accurately predict
                    demand patterns.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <BarChart3 className="h-8 w-8 text-green-600" />
                  <CardTitle>Inventory Optimization</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Optimize stock levels based on predicted demand, shelf life, and supply chain constraints to
                    minimize waste.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Clock className="h-8 w-8 text-green-600" />
                  <CardTitle>Real-time Monitoring</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Track inventory levels, sales, and waste metrics in real-time to enable quick adjustments and
                    interventions.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Dashboard Preview</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Interactive visualizations powered by PowerBI help you understand your data and make informed
                  decisions.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-4xl mt-12">
              <div className="rounded-xl overflow-hidden shadow-lg border">
                <img src="/placeholder.svg?height=600&width=1200" alt="Dashboard Preview" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-gray-100">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-600" />
              <span className="text-lg font-semibold">FoodSave AI</span>
            </div>
            <p className="text-sm text-gray-500">Reducing food waste through machine learning and data analytics.</p>
          </div>
          <div className="flex-1 space-y-4">
            <div className="text-sm font-medium">SDG Alignment</div>
            <ul className="grid gap-2 text-sm text-gray-500">
              <li>SDG 2: Zero Hunger</li>
              <li>SDG 12: Responsible Consumption and Production</li>
            </ul>
          </div>
          <div className="flex-1 space-y-4">
            <div className="text-sm font-medium">Contact</div>
            <ul className="grid gap-2 text-sm text-gray-500">
              <li>Email: info@foodsave.ai</li>
              <li>Phone: +1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className="border-t py-6">
          <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-gray-500">© 2025 FoodSave AI. All rights reserved.</p>
            <p className="text-xs text-gray-500">Powered by Django, Machine Learning, and PowerBI</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

