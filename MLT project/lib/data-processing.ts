// This file contains utility functions for data processing and analysis
// In a real application, these would connect to actual data sources and ML models

// Function to calculate waste reduction percentage
export function calculateWasteReduction(
  currentWaste: number,
  previousWaste: number,
): { percentage: number; trend: "increase" | "decrease" | "stable" } {
  const reduction = ((previousWaste - currentWaste) / previousWaste) * 100

  let trend: "increase" | "decrease" | "stable"
  if (reduction > 2) {
    trend = "increase"
  } else if (reduction < -2) {
    trend = "decrease"
  } else {
    trend = "stable"
  }

  return {
    percentage: Number.parseFloat(reduction.toFixed(1)),
    trend,
  }
}

// Function to calculate cost savings from waste reduction
export function calculateCostSavings(
  wasteReduction: number, // in kg
  averageCostPerKg: number,
): number {
  return Number.parseFloat((wasteReduction * averageCostPerKg).toFixed(2))
}

// Function to calculate environmental impact
export function calculateEnvironmentalImpact(wasteReduction: number): {
  co2Reduction: number // in kg
  waterSaved: number // in liters
  landSaved: number // in m²
} {
  // Average environmental impact factors per kg of food waste
  // These are simplified estimates - real values would vary by food type
  const CO2_PER_KG = 2.5 // kg CO2 equivalent per kg food waste
  const WATER_PER_KG = 1000 // liters of water per kg food waste
  const LAND_PER_KG = 0.5 // m² of land per kg food waste

  return {
    co2Reduction: Number.parseFloat((wasteReduction * CO2_PER_KG).toFixed(1)),
    waterSaved: Math.round(wasteReduction * WATER_PER_KG),
    landSaved: Number.parseFloat((wasteReduction * LAND_PER_KG).toFixed(1)),
  }
}

// Function to calculate SDG contribution metrics
export function calculateSDGContribution(
  wasteReduction: number,
  foodRedirected: number,
): {
  sdg2Score: number // 0-100 scale
  sdg12Score: number // 0-100 scale
  mealsProvided: number
} {
  // Estimate meals provided (assuming 0.5kg per meal)
  const mealsProvided = Math.round(foodRedirected / 0.5)

  // Calculate SDG 2 (Zero Hunger) score based on food redirected
  // This is a simplified scoring system
  const sdg2Score = Math.min(100, Math.round((foodRedirected / 5000) * 100))

  // Calculate SDG 12 (Responsible Consumption) score based on waste reduction
  // This is a simplified scoring system
  const sdg12Score = Math.min(100, Math.round((wasteReduction / 10000) * 100))

  return {
    sdg2Score,
    sdg12Score,
    mealsProvided,
  }
}

// Function to analyze inventory efficiency
export function analyzeInventoryEfficiency(
  currentStock: number,
  optimalStock: number,
  sales: number,
): {
  efficiency: number // 0-100 scale
  status: "Understocked" | "Optimal" | "Overstocked"
  recommendation: string
} {
  // Calculate inventory efficiency
  const deviation = Math.abs(currentStock - optimalStock)
  const efficiency = Math.max(0, 100 - (deviation / optimalStock) * 100)

  // Determine inventory status
  let status: "Understocked" | "Optimal" | "Overstocked"
  let recommendation: string

  if (currentStock < optimalStock * 0.8) {
    status = "Understocked"
    recommendation = `Increase stock by ${Math.round(optimalStock - currentStock)} units`
  } else if (currentStock > optimalStock * 1.2) {
    status = "Overstocked"
    const excessPercentage = Math.round(((currentStock - optimalStock) / optimalStock) * 100)
    recommendation = `Reduce stock by ${excessPercentage}% to prevent waste`
  } else {
    status = "Optimal"
    recommendation = "Maintain current inventory levels"
  }

  return {
    efficiency: Number.parseFloat(efficiency.toFixed(1)),
    status,
    recommendation,
  }
}

