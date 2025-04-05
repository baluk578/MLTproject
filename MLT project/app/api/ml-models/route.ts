import { NextResponse } from "next/server"
import { predictDemand, predictShelfLife, optimizeInventory } from "@/lib/ml-models"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { modelType, productCategory, date, location, temperature, leadTime } = body

    let result

    switch (modelType) {
      case "demand":
        // Create input for demand prediction model
        const demandInput = {
          productCategory,
          productName: "Generic Product", // Default value
          date: date || new Date().toISOString().split("T")[0],
          location: location || "store1",
        }

        // Call demand prediction model
        const demandResult = predictDemand(demandInput)

        result = {
          prediction: demandResult.predictedDemand,
          confidenceInterval: demandResult.confidenceInterval,
          factors: demandResult.factors,
        }
        break

      case "shelf-life":
        // Create input for shelf life prediction model
        const shelfLifeInput = {
          productCategory,
          productName: "Generic Product", // Default value
          storageTemperature: Number.parseFloat(temperature || "4"),
        }

        // Call shelf life prediction model
        const shelfLifeResult = predictShelfLife(shelfLifeInput)

        result = {
          prediction: shelfLifeResult.predictedDays,
          confidenceInterval: shelfLifeResult.confidenceInterval,
          optimalConditions: shelfLifeResult.optimalConditions,
        }
        break

      case "inventory":
        // Create input for inventory optimization model
        const inventoryInput = {
          productCategory,
          productName: "Generic Product", // Default value
          currentStock: 100, // Default value
          leadTime: Number.parseInt(leadTime || "3"),
          shelfLife: 7, // Default value
          demandPrediction: 150, // Default value
        }

        // Call inventory optimization model
        const inventoryResult = optimizeInventory(inventoryInput)

        result = {
          optimal: inventoryResult.optimalStock,
          min: inventoryResult.minStock,
          max: inventoryResult.maxStock,
          reorderPoint: inventoryResult.reorderPoint,
          reorderQuantity: inventoryResult.reorderQuantity,
        }
        break

      default:
        return NextResponse.json({ error: "Invalid model type" }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      result,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error processing ML request:", error)
    return NextResponse.json(
      {
        error: "Failed to process request",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

