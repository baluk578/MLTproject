"use client"

import { useState } from "react"
import { Calendar, Download, Leaf, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MLModelDescription } from "@/components/ml-model-description"
import { PredictionForm } from "@/components/prediction-form"

export default function PredictionsPage() {
  const [activeTab, setActiveTab] = useState("demand")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">FoodSave AI</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="/dashboard" className="text-sm font-medium hover:underline">
              Dashboard
            </a>
            <a href="#" className="text-sm font-medium text-green-600 underline underline-offset-4">
              Predictions
            </a>
            <a href="#" className="text-sm font-medium hover:underline">
              Analytics
            </a>
            <a href="#" className="text-sm font-medium hover:underline">
              About
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Date Range
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">ML Predictions</h1>
            <p className="text-muted-foreground">Generate predictions using our trained ML models.</p>
          </div>
          <Button size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retrain Models
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Machine Learning Models</CardTitle>
              <CardDescription>
                Our system uses multiple ML models to predict different aspects of food supply chain management.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="demand" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="demand">Demand Prediction</TabsTrigger>
                  <TabsTrigger value="shelf-life">Shelf Life Prediction</TabsTrigger>
                  <TabsTrigger value="inventory">Inventory Optimization</TabsTrigger>
                </TabsList>
                <TabsContent value="demand">
                  <MLModelDescription
                    title="Demand Prediction Model"
                    description="This model uses historical sales data, seasonal patterns, weather forecasts, and local events to predict product demand with high accuracy."
                    algorithm="Ensemble of LSTM Neural Networks and XGBoost"
                    features={[
                      "Historical sales data (2+ years)",
                      "Seasonal and holiday patterns",
                      "Weather forecasts",
                      "Local events and promotions",
                      "Day of week and time of day",
                    ]}
                    accuracy="94.2%"
                  />
                </TabsContent>
                <TabsContent value="shelf-life">
                  <MLModelDescription
                    title="Shelf Life Prediction Model"
                    description="This model predicts the remaining shelf life of perishable products based on storage conditions, handling, and product characteristics."
                    algorithm="Random Forest with Bayesian Optimization"
                    features={[
                      "Product category and type",
                      "Storage temperature and humidity",
                      "Packaging type",
                      "Supply chain handling time",
                      "Visual characteristics (via computer vision)",
                    ]}
                    accuracy="91.7%"
                  />
                </TabsContent>
                <TabsContent value="inventory">
                  <MLModelDescription
                    title="Inventory Optimization Model"
                    description="This model recommends optimal inventory levels based on predicted demand, shelf life, and supply chain constraints."
                    algorithm="Reinforcement Learning with Deep Q-Networks"
                    features={[
                      "Demand predictions",
                      "Shelf life predictions",
                      "Storage capacity",
                      "Supplier lead times",
                      "Cost structures and margins",
                    ]}
                    accuracy="89.5%"
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generate Predictions</CardTitle>
              <CardDescription>
                Use our ML models to generate predictions for your specific products and scenarios.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PredictionForm modelType={activeTab} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Model Performance</CardTitle>
              <CardDescription>Track the accuracy and performance of our ML models over time.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Demand Prediction Accuracy</span>
                    <span className="text-sm font-medium">94.2%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div className="h-2 rounded-full bg-green-600" style={{ width: "94.2%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Shelf Life Prediction Accuracy</span>
                    <span className="text-sm font-medium">91.7%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div className="h-2 rounded-full bg-green-600" style={{ width: "91.7%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Inventory Optimization Accuracy</span>
                    <span className="text-sm font-medium">89.5%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div className="h-2 rounded-full bg-green-600" style={{ width: "89.5%" }}></div>
                  </div>
                </div>
                <div className="pt-4">
                  <h4 className="text-sm font-medium mb-2">Recent Improvements</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">+</span>
                      <span>Added seasonal adjustment factors to demand prediction model (+2.1% accuracy)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">+</span>
                      <span>Integrated computer vision for shelf life prediction (+3.5% accuracy)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">+</span>
                      <span>Optimized reinforcement learning parameters for inventory model (+1.8% accuracy)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

