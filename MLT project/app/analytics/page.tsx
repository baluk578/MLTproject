"use client"

import { useState } from "react"
import { Calendar, Download, Leaf, RefreshCw } from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("month")

  // Sample data for charts
  const wasteReductionData = [
    { month: "Jan", reduction: 15, target: 10 },
    { month: "Feb", reduction: 18, target: 15 },
    { month: "Mar", reduction: 22, target: 20 },
    { month: "Apr", reduction: 25, target: 25 },
    { month: "May", reduction: 28, target: 30 },
    { month: "Jun", reduction: 32, target: 35 },
    { month: "Jul", reduction: 35, target: 40 },
    { month: "Aug", reduction: 38, target: 45 },
    { month: "Sep", reduction: 42, target: 50 },
    { month: "Oct", reduction: 45, target: 55 },
    { month: "Nov", reduction: 48, target: 60 },
    { month: "Dec", reduction: 52, target: 65 },
  ]

  const costSavingsData = [
    { month: "Jan", savings: 2500 },
    { month: "Feb", savings: 3200 },
    { month: "Mar", savings: 4100 },
    { month: "Apr", savings: 4800 },
    { month: "May", savings: 5500 },
    { month: "Jun", savings: 6200 },
    { month: "Jul", savings: 7000 },
    { month: "Aug", savings: 7800 },
    { month: "Sep", savings: 8600 },
    { month: "Oct", savings: 9500 },
    { month: "Nov", savings: 10400 },
    { month: "Dec", savings: 11500 },
  ]

  const wasteCategoryData = [
    { name: "Fruits & Vegetables", value: 35, color: "#4ade80" },
    { name: "Dairy Products", value: 25, color: "#60a5fa" },
    { name: "Bakery Items", value: 20, color: "#f97316" },
    { name: "Meat & Seafood", value: 15, color: "#f43f5e" },
    { name: "Other", value: 5, color: "#a3a3a3" },
  ]

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
            <a href="/predictions" className="text-sm font-medium hover:underline">
              Predictions
            </a>
            <a href="#" className="text-sm font-medium text-green-600 underline underline-offset-4">
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
            <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground">Detailed analysis of food waste reduction and impact.</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last 7 days</SelectItem>
                <SelectItem value="month">Last 30 days</SelectItem>
                <SelectItem value="quarter">Last 90 days</SelectItem>
                <SelectItem value="year">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="waste">Waste Analysis</TabsTrigger>
            <TabsTrigger value="financial">Financial Impact</TabsTrigger>
            <TabsTrigger value="environmental">Environmental Impact</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Waste Reduction Progress</CardTitle>
                  <CardDescription>Tracking waste reduction against targets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={wasteReductionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={(value) => `${value}%`} />
                        <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                        <Legend />
                        <Line type="monotone" dataKey="reduction" stroke="#4ade80" name="Actual Reduction" />
                        <Line type="monotone" dataKey="target" stroke="#94a3b8" strokeDasharray="5 5" name="Target" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cost Savings</CardTitle>
                  <CardDescription>Financial impact of waste reduction</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={costSavingsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={(value) => `$${value}`} />
                        <Tooltip formatter={(value) => [`$${value}`, "Savings"]} />
                        <Bar dataKey="savings" fill="#3b82f6" name="Cost Savings" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Waste by Category</CardTitle>
                  <CardDescription>Distribution across product categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={wasteCategoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {wasteCategoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>SDG Impact Analysis</CardTitle>
                <CardDescription>Contribution to Sustainable Development Goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">SDG 2: Zero Hunger</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Food Redirected to Food Banks</span>
                        <span className="text-sm font-medium">2,450 kg</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div className="h-2 rounded-full bg-green-600" style={{ width: "70%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Meals Provided</span>
                        <span className="text-sm font-medium">4,900</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div className="h-2 rounded-full bg-green-600" style={{ width: "65%" }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">SDG 12: Responsible Consumption</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Waste Reduction</span>
                        <span className="text-sm font-medium">32.5%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div className="h-2 rounded-full bg-blue-600" style={{ width: "32.5%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Resource Efficiency</span>
                        <span className="text-sm font-medium">28.7%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div className="h-2 rounded-full bg-blue-600" style={{ width: "28.7%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="waste" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Waste Analysis</CardTitle>
                <CardDescription>Comprehensive breakdown of food waste metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center border rounded-md">
                  <div className="text-center">
                    <h3 className="mt-2 text-lg font-medium">Detailed Waste Analysis</h3>
                    <p className="text-sm text-gray-500">
                      This section would contain detailed waste analysis charts and metrics
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Financial Impact Analysis</CardTitle>
                <CardDescription>Detailed financial benefits of waste reduction</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center border rounded-md">
                  <div className="text-center">
                    <h3 className="mt-2 text-lg font-medium">Financial Impact Analysis</h3>
                    <p className="text-sm text-gray-500">
                      This section would contain detailed financial analysis charts and metrics
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="environmental" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Environmental Impact Analysis</CardTitle>
                <CardDescription>Environmental benefits of food waste reduction</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center border rounded-md">
                  <div className="text-center">
                    <h3 className="mt-2 text-lg font-medium">Environmental Impact Analysis</h3>
                    <p className="text-sm text-gray-500">
                      This section would contain detailed environmental impact charts and metrics
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

