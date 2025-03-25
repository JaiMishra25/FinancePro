// Create a new component for displaying asset allocation recommendations

"use client"

import { useState } from "react"
import { Download, Info } from "lucide-react"
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer } from "@/components/ui/chart"
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface AssetAllocationRecommendationProps {
  investorType: string
}

export function AssetAllocationRecommendation({ investorType }: AssetAllocationRecommendationProps) {
  const [activeTab, setActiveTab] = useState("pie")

  // Define allocation data based on investor type
  const getAllocationData = () => {
    switch (investorType) {
      case "Conservative":
        return [
          { name: "Bonds", value: 50, color: "#0088FE" },
          { name: "Large-Cap Equity", value: 20, color: "#00C49F" },
          { name: "Cash & Equivalents", value: 15, color: "#FFBB28" },
          { name: "International Bonds", value: 10, color: "#FF8042" },
          { name: "Real Estate", value: 5, color: "#8884d8" },
        ]
      case "Moderate":
        return [
          { name: "Large-Cap Equity", value: 30, color: "#00C49F" },
          { name: "Bonds", value: 30, color: "#0088FE" },
          { name: "Mid-Cap Equity", value: 15, color: "#FF8042" },
          { name: "International Equity", value: 15, color: "#8884d8" },
          { name: "Cash & Equivalents", value: 5, color: "#FFBB28" },
          { name: "Real Estate", value: 5, color: "#82ca9d" },
        ]
      case "Growth-oriented":
        return [
          { name: "Large-Cap Equity", value: 35, color: "#00C49F" },
          { name: "Mid-Cap Equity", value: 20, color: "#FF8042" },
          { name: "International Equity", value: 20, color: "#8884d8" },
          { name: "Bonds", value: 15, color: "#0088FE" },
          { name: "Small-Cap Equity", value: 5, color: "#82ca9d" },
          { name: "Real Estate", value: 5, color: "#ffc658" },
        ]
      case "Aggressive":
        return [
          { name: "Large-Cap Equity", value: 30, color: "#00C49F" },
          { name: "Mid-Cap Equity", value: 25, color: "#FF8042" },
          { name: "International Equity", value: 25, color: "#8884d8" },
          { name: "Small-Cap Equity", value: 10, color: "#82ca9d" },
          { name: "Emerging Markets", value: 5, color: "#ffc658" },
          { name: "Bonds", value: 5, color: "#0088FE" },
        ]
      default:
        return [
          { name: "Large-Cap Equity", value: 35, color: "#00C49F" },
          { name: "Mid-Cap Equity", value: 20, color: "#FF8042" },
          { name: "International Equity", value: 20, color: "#8884d8" },
          { name: "Bonds", value: 15, color: "#0088FE" },
          { name: "Small-Cap Equity", value: 5, color: "#82ca9d" },
          { name: "Real Estate", value: 5, color: "#ffc658" },
        ]
    }
  }

  const allocationData = getAllocationData()

  // Get specific fund recommendations based on investor type
  const getFundRecommendations = () => {
    switch (investorType) {
      case "Conservative":
        return [
          { category: "Bonds", recommendation: "Government Bond Funds, Corporate Bond Funds (AAA-rated)" },
          { category: "Large-Cap Equity", recommendation: "Blue-chip focused Index Funds" },
          { category: "Cash & Equivalents", recommendation: "Money Market Funds, Short-term FDs" },
          { category: "International Bonds", recommendation: "International Bond Funds with currency hedging" },
          { category: "Real Estate", recommendation: "REITs with focus on income generation" },
        ]
      case "Moderate":
        return [
          { category: "Large-Cap Equity", recommendation: "Index Funds, Quality-focused Active Funds" },
          { category: "Bonds", recommendation: "Mix of Government and Corporate Bond Funds" },
          { category: "Mid-Cap Equity", recommendation: "Mid-cap Index Funds, Value-oriented Mid-cap Funds" },
          { category: "International Equity", recommendation: "Developed Market Equity Funds" },
          { category: "Cash & Equivalents", recommendation: "Liquid Funds, Ultra Short-term Funds" },
          { category: "Real Estate", recommendation: "Diversified REIT Funds" },
        ]
      case "Growth-oriented":
        return [
          { category: "Large-Cap Equity", recommendation: "Growth-oriented Large-cap Funds, Index Funds" },
          { category: "Mid-Cap Equity", recommendation: "Growth-focused Mid-cap Funds" },
          { category: "International Equity", recommendation: "Global Equity Funds, Developed Markets Funds" },
          { category: "Bonds", recommendation: "Short to Medium Duration Bond Funds" },
          { category: "Small-Cap Equity", recommendation: "Quality-focused Small-cap Funds" },
          { category: "Real Estate", recommendation: "Growth-oriented REITs" },
        ]
      case "Aggressive":
        return [
          { category: "Large-Cap Equity", recommendation: "Aggressive Growth Funds, Sector-specific Funds" },
          { category: "Mid-Cap Equity", recommendation: "High-growth Mid-cap Funds" },
          { category: "International Equity", recommendation: "Global Equity Funds, Thematic International Funds" },
          { category: "Small-Cap Equity", recommendation: "Small-cap Growth Funds" },
          { category: "Emerging Markets", recommendation: "Emerging Market Equity Funds" },
          { category: "Bonds", recommendation: "High-yield Bond Funds" },
        ]
      default:
        return [
          { category: "Large-Cap Equity", recommendation: "Growth-oriented Large-cap Funds, Index Funds" },
          { category: "Mid-Cap Equity", recommendation: "Growth-focused Mid-cap Funds" },
          { category: "International Equity", recommendation: "Global Equity Funds, Developed Markets Funds" },
          { category: "Bonds", recommendation: "Short to Medium Duration Bond Funds" },
          { category: "Small-Cap Equity", recommendation: "Quality-focused Small-cap Funds" },
          { category: "Real Estate", recommendation: "Growth-oriented REITs" },
        ]
    }
  }

  const fundRecommendations = getFundRecommendations()

  // Get rebalancing strategy based on investor type
  const getRebalancingStrategy = () => {
    switch (investorType) {
      case "Conservative":
        return "Annual rebalancing is recommended to maintain your conservative allocation. Consider rebalancing when any asset class deviates by more than 5% from its target allocation."
      case "Moderate":
        return "Semi-annual rebalancing is recommended. Consider rebalancing when any asset class deviates by more than 7% from its target allocation."
      case "Growth-oriented":
        return "Semi-annual or annual rebalancing is suitable. Consider rebalancing when any asset class deviates by more than 10% from its target allocation."
      case "Aggressive":
        return "Annual rebalancing is typically sufficient. Consider rebalancing when any asset class deviates by more than 15% from its target allocation, or use market dips as opportunities to rebalance into undervalued assets."
      default:
        return "Semi-annual or annual rebalancing is recommended. Consider rebalancing when any asset class deviates significantly from its target allocation."
    }
  }

  const rebalancingStrategy = getRebalancingStrategy()

  // Custom tooltip formatter
  const tooltipFormatter = (value: number) => {
    return [`${value}%`, "Allocation"]
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Recommended Asset Allocation</span>
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  This allocation is tailored to your {investorType} investor profile. Adjust based on your specific
                  circumstances.
                </p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </CardTitle>
        <CardDescription>Optimized for {investorType.toLowerCase()} investors</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pie">Pie Chart</TabsTrigger>
            <TabsTrigger value="bar">Bar Chart</TabsTrigger>
          </TabsList>
          <TabsContent value="pie" className="pt-4">
            <div className="h-80">
              <ChartContainer className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={allocationData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      animationDuration={1000}
                      animationBegin={200}
                    >
                      {allocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="#fff" strokeWidth={1} />
                      ))}
                    </Pie>
                    <Tooltip formatter={tooltipFormatter} />
                    <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>
          <TabsContent value="bar" className="pt-4">
            <div className="h-80">
              <ChartContainer className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={allocationData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                    <YAxis dataKey="name" type="category" width={120} />
                    <Tooltip formatter={tooltipFormatter} />
                    <Bar dataKey="value" nameKey="name" animationDuration={1500}>
                      {allocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold">Recommended Funds by Category</h3>
          <div className="space-y-3">
            {fundRecommendations.map((item, index) => (
              <div key={index} className="p-3 bg-muted/50 rounded-lg">
                <div className="font-medium">{item.category}</div>
                <div className="text-sm text-muted-foreground mt-1">{item.recommendation}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 p-4 bg-primary/10 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Rebalancing Strategy</h3>
          <p className="text-sm text-muted-foreground">{rebalancingStrategy}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Download Allocation Report
        </Button>
      </CardFooter>
    </Card>
  )
}

