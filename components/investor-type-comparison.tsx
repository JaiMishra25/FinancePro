"use client"

import { Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface InvestorTypeComparisonProps {
  currentType: string
}

export function InvestorTypeComparison({ currentType }: InvestorTypeComparisonProps) {
  const investorTypes = [
    {
      type: "Conservative",
      riskTolerance: "Low",
      timeHorizon: "Short to Medium",
      returnExpectation: "Low to Moderate",
      volatilityTolerance: "Low",
      equityAllocation: "10-30%",
      primaryFocus: "Capital Preservation",
      description: "Focus on protecting capital with minimal risk exposure",
    },
    {
      type: "Moderate",
      riskTolerance: "Medium",
      timeHorizon: "Medium",
      returnExpectation: "Moderate",
      volatilityTolerance: "Medium",
      equityAllocation: "40-60%",
      primaryFocus: "Balanced Growth & Income",
      description: "Balance between growth and income with moderate risk",
    },
    {
      type: "Growth-oriented",
      riskTolerance: "Medium to High",
      timeHorizon: "Medium to Long",
      returnExpectation: "Moderate to High",
      volatilityTolerance: "Medium to High",
      equityAllocation: "65-80%",
      primaryFocus: "Capital Appreciation",
      description: "Focus on long-term growth with acceptance of volatility",
    },
    {
      type: "Aggressive",
      riskTolerance: "High",
      timeHorizon: "Long",
      returnExpectation: "High",
      volatilityTolerance: "High",
      equityAllocation: "80-100%",
      primaryFocus: "Maximum Growth",
      description: "Maximize growth potential with high risk tolerance",
    },
  ]

  // Get color based on investor type
  const getTypeColor = (type: string) => {
    switch (type) {
      case "Conservative":
        return "bg-blue-50 dark:bg-blue-950"
      case "Moderate":
        return "bg-green-50 dark:bg-green-950"
      case "Growth-oriented":
        return "bg-amber-50 dark:bg-amber-950"
      case "Aggressive":
        return "bg-red-50 dark:bg-red-950"
      default:
        return ""
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Characteristic</th>
            {investorTypes.map((type) => (
              <th
                key={type.type}
                className={`text-center p-2 ${type.type === currentType ? getTypeColor(type.type) : ""}`}
              >
                <div className="flex flex-col items-center">
                  {type.type}
                  {type.type === currentType && (
                    <Badge variant="secondary" className="mt-1">
                      Your Profile
                    </Badge>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="p-2 font-medium">Description</td>
            {investorTypes.map((type) => (
              <td
                key={`${type.type}-desc`}
                className={`text-center p-2 text-sm ${type.type === currentType ? getTypeColor(type.type) : ""}`}
              >
                {type.description}
                {type.type === currentType && <Check className="inline ml-1 h-4 w-4 text-green-500" />}
              </td>
            ))}
          </tr>
          <tr className="border-b">
            <td className="p-2 font-medium">Risk Tolerance</td>
            {investorTypes.map((type) => (
              <td
                key={`${type.type}-risk`}
                className={`text-center p-2 ${type.type === currentType ? getTypeColor(type.type) : ""}`}
              >
                {type.riskTolerance}
                {type.type === currentType && <Check className="inline ml-1 h-4 w-4 text-green-500" />}
              </td>
            ))}
          </tr>
          <tr className="border-b">
            <td className="p-2 font-medium">Time Horizon</td>
            {investorTypes.map((type) => (
              <td
                key={`${type.type}-time`}
                className={`text-center p-2 ${type.type === currentType ? getTypeColor(type.type) : ""}`}
              >
                {type.timeHorizon}
                {type.type === currentType && <Check className="inline ml-1 h-4 w-4 text-green-500" />}
              </td>
            ))}
          </tr>
          <tr className="border-b">
            <td className="p-2 font-medium">Return Expectation</td>
            {investorTypes.map((type) => (
              <td
                key={`${type.type}-return`}
                className={`text-center p-2 ${type.type === currentType ? getTypeColor(type.type) : ""}`}
              >
                {type.returnExpectation}
                {type.type === currentType && <Check className="inline ml-1 h-4 w-4 text-green-500" />}
              </td>
            ))}
          </tr>
          <tr className="border-b">
            <td className="p-2 font-medium">Volatility Tolerance</td>
            {investorTypes.map((type) => (
              <td
                key={`${type.type}-volatility`}
                className={`text-center p-2 ${type.type === currentType ? getTypeColor(type.type) : ""}`}
              >
                {type.volatilityTolerance}
                {type.type === currentType && <Check className="inline ml-1 h-4 w-4 text-green-500" />}
              </td>
            ))}
          </tr>
          <tr className="border-b">
            <td className="p-2 font-medium">Equity Allocation</td>
            {investorTypes.map((type) => (
              <td
                key={`${type.type}-equity`}
                className={`text-center p-2 ${type.type === currentType ? getTypeColor(type.type) : ""}`}
              >
                <span className="font-semibold">{type.equityAllocation}</span>
                {type.type === currentType && <Check className="inline ml-1 h-4 w-4 text-green-500" />}
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-2 font-medium">Primary Focus</td>
            {investorTypes.map((type) => (
              <td
                key={`${type.type}-focus`}
                className={`text-center p-2 ${type.type === currentType ? getTypeColor(type.type) : ""}`}
              >
                {type.primaryFocus}
                {type.type === currentType && <Check className="inline ml-1 h-4 w-4 text-green-500" />}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

