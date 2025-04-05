"use client"

import type React from "react"

import { useState } from "react"
import { Calendar, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { toast } from "@/hooks/use-toast"

interface PredictionFormProps {
  modelType: string
}

export function PredictionForm({ modelType }: PredictionFormProps) {
  const [date, setDate] = useState<Date>(new Date())
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [productCategory, setProductCategory] = useState("fruits")
  const [location, setLocation] = useState("store1")
  const [temperature, setTemperature] = useState("4")
  const [leadTime, setLeadTime] = useState("3")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      // Prepare request data based on model type
      const requestData = {
        modelType,
        productCategory,
        date: date ? format(date, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
      }

      // Add model-specific parameters
      if (modelType === "demand") {
        Object.assign(requestData, { location })
      } else if (modelType === "shelf-life") {
        Object.assign(requestData, { temperature })
      } else if (modelType === "inventory") {
        Object.assign(requestData, { leadTime })
      }

      // Make API call
      const response = await fetch("/api/ml-models", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })

      if (!response.ok) {
        throw new Error("Failed to get prediction")
      }

      const data = await response.json()

      // Format result based on model type
      if (modelType === "demand") {
        setResult(`Predicted demand: ${data.result.prediction} units (±${data.result.confidenceInterval} units)`)
      } else if (modelType === "shelf-life") {
        setResult(`Predicted shelf life: ${data.result.prediction} days under current conditions`)
      } else {
        setResult(`Optimal inventory: ${data.result.optimal} units (min: ${data.result.min}, max: ${data.result.max})`)
      }
    } catch (error) {
      console.error("Error making prediction:", error)
      toast({
        title: "Error",
        description: "Failed to generate prediction. Please try again.",
        variant: "destructive",
      })
      setResult("Error: Failed to generate prediction")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <FormLabel>Product Category</FormLabel>
          <Select value={productCategory} onValueChange={setProductCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fruits">Fruits & Vegetables</SelectItem>
              <SelectItem value="dairy">Dairy Products</SelectItem>
              <SelectItem value="bakery">Bakery Items</SelectItem>
              <SelectItem value="meat">Meat & Seafood</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <FormLabel>Product Name</FormLabel>
          <Input placeholder="e.g., Organic Apples" />
        </div>

        <div className="space-y-2">
          <FormLabel>Date</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && setDate(newDate)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {modelType === "demand" && (
          <div className="space-y-2">
            <FormLabel>Location</FormLabel>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="store1">Main Store</SelectItem>
                <SelectItem value="store2">Downtown Branch</SelectItem>
                <SelectItem value="store3">Suburban Location</SelectItem>
                <SelectItem value="warehouse">Central Warehouse</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {modelType === "shelf-life" && (
          <div className="space-y-2">
            <FormLabel>Storage Temperature (°C)</FormLabel>
            <Input
              type="number"
              placeholder="e.g., 4"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
            />
          </div>
        )}

        {modelType === "inventory" && (
          <div className="space-y-2">
            <FormLabel>Supplier Lead Time (days)</FormLabel>
            <Input type="number" placeholder="e.g., 3" value={leadTime} onChange={(e) => setLeadTime(e.target.value)} />
          </div>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Generate Prediction"
          )}
        </Button>
      </form>

      {result && (
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <h4 className="text-sm font-medium mb-2">Prediction Result:</h4>
            <p className="text-sm">{result}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

