"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface DemandChartProps {
  timeRange: string
}

export function DemandChart({ timeRange }: DemandChartProps) {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    // In a real application, this would fetch data from an API
    // Here we're generating mock data based on the selected time range
    const generateData = () => {
      if (timeRange === "week") {
        return [
          { name: "Mon", predicted: 400, actual: 380 },
          { name: "Tue", predicted: 430, actual: 450 },
          { name: "Wed", predicted: 520, actual: 500 },
          { name: "Thu", predicted: 490, actual: 480 },
          { name: "Fri", predicted: 600, actual: 620 },
          { name: "Sat", predicted: 700, actual: 680 },
          { name: "Sun", predicted: 580, actual: 570 },
        ]
      } else if (timeRange === "month") {
        return Array.from({ length: 30 }, (_, i) => {
          const day = i + 1
          const predicted = 300 + Math.floor(Math.random() * 400)
          const actual = predicted + Math.floor(Math.random() * 100) - 50
          return { name: `Day ${day}`, predicted, actual }
        })
      } else {
        // Year
        return Array.from({ length: 12 }, (_, i) => {
          const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i]
          const predicted = 8000 + Math.floor(Math.random() * 4000)
          const actual = predicted + Math.floor(Math.random() * 1000) - 500
          return { name: month, predicted, actual }
        })
      }
    }

    setData(generateData())
  }, [timeRange])

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Line type="monotone" dataKey="predicted" stroke="#4ade80" strokeWidth={2} dot={{ r: 4 }} name="Predicted" />
        <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} name="Actual" />
      </LineChart>
    </ResponsiveContainer>
  )
}

