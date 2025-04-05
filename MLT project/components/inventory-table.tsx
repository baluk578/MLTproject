"use client"

import { useState } from "react"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const inventoryData = [
  {
    id: "INV001",
    product: "Organic Apples",
    category: "Fruits & Vegetables",
    currentStock: 120,
    optimalStock: 150,
    expiryDays: 7,
    status: "Low",
    recommendation: "Increase order by 30 units",
  },
  {
    id: "INV002",
    product: "Whole Milk",
    category: "Dairy Products",
    currentStock: 85,
    optimalStock: 80,
    expiryDays: 5,
    status: "Optimal",
    recommendation: "Maintain current levels",
  },
  {
    id: "INV003",
    product: "Sourdough Bread",
    category: "Bakery Items",
    currentStock: 45,
    optimalStock: 30,
    expiryDays: 2,
    status: "Overstocked",
    recommendation: "Apply 15% discount to reduce stock",
  },
  {
    id: "INV004",
    product: "Atlantic Salmon",
    category: "Meat & Seafood",
    currentStock: 25,
    optimalStock: 20,
    expiryDays: 3,
    status: "Optimal",
    recommendation: "Maintain current levels",
  },
  {
    id: "INV005",
    product: "Organic Spinach",
    category: "Fruits & Vegetables",
    currentStock: 30,
    optimalStock: 50,
    expiryDays: 4,
    status: "Low",
    recommendation: "Increase order by 20 units",
  },
]

export function InventoryTable() {
  const [sorting, setSorting] = useState<{ column: string | null; direction: "asc" | "desc" }>({
    column: null,
    direction: "asc",
  })

  const sortData = (column: string) => {
    const direction = sorting.column === column && sorting.direction === "asc" ? "desc" : "asc"
    setSorting({ column, direction })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Low":
        return <Badge variant="destructive">Low</Badge>
      case "Optimal":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Optimal
          </Badge>
        )
      case "Overstocked":
        return (
          <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            Overstocked
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => sortData("product")} className="p-0 h-auto font-medium">
                Product
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Current Stock</TableHead>
            <TableHead className="text-right">Optimal Stock</TableHead>
            <TableHead className="text-right">Expiry (Days)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Recommendation</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventoryData.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.product}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell className="text-right">{item.currentStock}</TableCell>
              <TableCell className="text-right">{item.optimalStock}</TableCell>
              <TableCell className="text-right">{item.expiryDays}</TableCell>
              <TableCell>{getStatusBadge(item.status)}</TableCell>
              <TableCell className="hidden md:table-cell">{item.recommendation}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Update stock</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Generate report</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

