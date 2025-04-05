"use client"

import { useState } from "react"
import { BarChart, Calendar, Clock, Download, Filter, Leaf, PieChart, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DemandChart } from "@/components/demand-chart"
import { WasteMetricsChart } from "@/components/waste-metrics-chart"
import { InventoryTable } from "@/components/inventory-table"
import { toast } from "@/hooks/use-toast"

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("week")
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [metrics, setMetrics] = useState({
    wasteReduction: 32.5,
    costSavings: 12543,
    predictionAccuracy: 94.2,
    environmentalImpact: 28.4,
  })

  // Function to fetch dashboard data
  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      // In a real app, this would fetch from an API
      // For now, we'll simulate a successful API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update last updated time
      setLastUpdated(new Date())

      // Add some randomness to the metrics to simulate real data changes
      setMetrics({
        wasteReduction: 32.5 + (Math.random() * 2 - 1),
        costSavings: 12543 + Math.floor(Math.random() * 1000 - 500),
        predictionAccuracy: 94.2 + (Math.random() * 0.6 - 0.3),
        environmentalImpact: 28.4 + (Math.random() * 1 - 0.5),
      })

      toast({
        title: "Dashboard Updated",
        description: "Latest data has been loaded successfully.",
      })
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      toast({
        title: "Update Failed",
        description: "Failed to load the latest data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Format the last updated time
  const formatLastUpdated = () => {
    const now = new Date()
    const diffMs = now.getTime() - lastUpdated.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) return "Just now"
    if (diffMins === 1) return "1 min ago"
    if (diffMins < 60) return `${diffMins} mins ago`

    const diffHours = Math.floor(diffMins / 60)
    if (diffHours === 1) return "1 hour ago"
    return `${diffHours} hours ago`
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">FoodSave AI</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#" className="text-sm font-medium text-green-600 underline underline-offset-4">
              Dashboard
            </a>
            <a href="/predictions" className="text-sm font-medium hover:underline">
              Predictions
            </a>
            <a href="/analytics" className="text-sm font-medium hover:underline">
              Analytics
            </a>
            <a href="/" className="text-sm font-medium hover:underline">
              About
            </a>
          </nav>
          <Button variant="outline" size="sm" onClick={fetchDashboardData} disabled={loading}>
            {loading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Clock className="mr-2 h-4 w-4" />
                Last updated: {formatLastUpdated()}
              </>
            )}
          </Button>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Monitor food waste metrics and inventory optimization.</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Product Category</DropdownMenuItem>
                <DropdownMenuItem>Location</DropdownMenuItem>
                <DropdownMenuItem>Supplier</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Date Range
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm" onClick={fetchDashboardData} disabled={loading}>
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Waste Reduction</CardTitle>
              <div className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.wasteReduction.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">+4.3% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
              <div className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${metrics.costSavings.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+$2,145 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Prediction Accuracy</CardTitle>
              <div className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.predictionAccuracy.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">+1.2% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Environmental Impact</CardTitle>
              <div className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-{metrics.environmentalImpact.toFixed(1)} CO₂</div>
              <p className="text-xs text-muted-foreground">Tons of emissions saved</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="mb-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="waste">Waste Metrics</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Demand Prediction vs. Actual</CardTitle>
                    <CardDescription>Comparison of predicted demand against actual sales</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={timeRange === "week" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTimeRange("week")}
                    >
                      Week
                    </Button>
                    <Button
                      variant={timeRange === "month" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTimeRange("month")}
                    >
                      Month
                    </Button>
                    <Button
                      variant={timeRange === "year" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTimeRange("year")}
                    >
                      Year
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pl-2">
                  <DemandChart timeRange={timeRange} />
                </CardContent>
              </Card>
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Waste by Category</CardTitle>
                  <CardDescription>Distribution of food waste across different categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <WasteMetricsChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="inventory">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Status</CardTitle>
                <CardDescription>Current inventory levels and optimization recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <InventoryTable />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="predictions">
            <Card>
              <CardHeader>
                <CardTitle>Demand Predictions</CardTitle>
                <CardDescription>7-day forecast for product demand based on ML models</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center border rounded-md">
                  <div className="text-center">
                    <BarChart className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium">Prediction Charts</h3>
                    <p className="text-sm text-gray-500">Detailed prediction charts would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="waste">
            <Card>
              <CardHeader>
                <CardTitle>Waste Metrics</CardTitle>
                <CardDescription>Detailed breakdown of waste metrics and reduction opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center border rounded-md">
                  <div className="text-center">
                    <PieChart className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium">Waste Analysis</h3>
                    <p className="text-sm text-gray-500">Detailed waste analysis charts would be displayed here</p>
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

