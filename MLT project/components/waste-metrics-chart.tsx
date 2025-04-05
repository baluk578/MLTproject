"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Fruits & Vegetables", value: 35, color: "#4ade80" },
  { name: "Dairy Products", value: 25, color: "#60a5fa" },
  { name: "Bakery Items", value: 20, color: "#f97316" },
  { name: "Meat & Seafood", value: 15, color: "#f43f5e" },
  { name: "Other", value: 5, color: "#a3a3a3" },
]

export function WasteMetricsChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} contentStyle={{ borderRadius: "8px" }} />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 flex justify-center gap-4 flex-wrap">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-1">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-xs">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

