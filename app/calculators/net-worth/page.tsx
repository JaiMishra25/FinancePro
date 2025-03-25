"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Trash } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { ChartContainer } from "@/components/ui/chart"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function NetWorthCalculator() {
  const [assets, setAssets] = useState([
    { id: 1, name: "Cash & Bank Accounts", value: 100000, category: "liquid" },
    { id: 2, name: "Fixed Deposits", value: 200000, category: "liquid" },
    { id: 3, name: "Stocks & Mutual Funds", value: 300000, category: "investment" },
    { id: 4, name: "Real Estate", value: 2500000, category: "property" },
    { id: 5, name: "Vehicles", value: 500000, category: "personal" },
  ])

  const [liabilities, setLiabilities] = useState([
    { id: 1, name: "Home Loan", value: 1500000, category: "secured" },
    { id: 2, name: "Car Loan", value: 300000, category: "secured" },
    { id: 3, name: "Personal Loan", value: 100000, category: "unsecured" },
    { id: 4, name: "Credit Card Debt", value: 50000, category: "unsecured" },
  ])

  const [newAsset, setNewAsset] = useState({ name: "", value: 0, category: "liquid" })
  const [newLiability, setNewLiability] = useState({ name: "", value: 0, category: "secured" })

  const assetCategories = [
    { value: "liquid", label: "Liquid Assets" },
    { value: "investment", label: "Investments" },
    { value: "property", label: "Property & Real Estate" },
    { value: "personal", label: "Personal Assets" },
    { value: "other", label: "Other Assets" },
  ]

  const liabilityCategories = [
    { value: "secured", label: "Secured Loans" },
    { value: "unsecured", label: "Unsecured Loans" },
    { value: "other", label: "Other Liabilities" },
  ]

  // Calculate net worth
  const calculateNetWorth = () => {
    const totalAssets = assets.reduce((sum, asset) => sum + asset.value, 0)
    const totalLiabilities = liabilities.reduce((sum, liability) => sum + liability.value, 0)
    const netWorth = totalAssets - totalLiabilities

    return {
      totalAssets,
      totalLiabilities,
      netWorth,
    }
  }

  const results = calculateNetWorth()

  // Add new asset
  const handleAddAsset = () => {
    if (newAsset.name && newAsset.value > 0) {
      setAssets([...assets, { ...newAsset, id: assets.length + 1 }])
      setNewAsset({ name: "", value: 0, category: "liquid" })
    }
  }

  // Add new liability
  const handleAddLiability = () => {
    if (newLiability.name && newLiability.value > 0) {
      setLiabilities([...liabilities, { ...newLiability, id: liabilities.length + 1 }])
      setNewLiability({ name: "", value: 0, category: "secured" })
    }
  }

  // Remove asset
  const handleRemoveAsset = (id: number) => {
    setAssets(assets.filter((asset) => asset.id !== id))
  }

  // Remove liability
  const handleRemoveLiability = (id: number) => {
    setLiabilities(liabilities.filter((liability) => liability.id !== id))
  }

  // Prepare chart data
  const assetChartData = assetCategories
    .map((category) => {
      const total = assets
        .filter((asset) => asset.category === category.value)
        .reduce((sum, asset) => sum + asset.value, 0)

      return {
        name: category.label,
        value: total,
      }
    })
    .filter((item) => item.value > 0)

  const liabilityChartData = liabilityCategories
    .map((category) => {
      const total = liabilities
        .filter((liability) => liability.category === category.value)
        .reduce((sum, liability) => sum + liability.value, 0)

      return {
        name: category.label,
        value: total,
      }
    })
    .filter((item) => item.value > 0)

  const netWorthChartData = [
    { name: "Assets", value: results.totalAssets },
    { name: "Liabilities", value: results.totalLiabilities },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-10">
        <div className="flex items-center mb-6">
          <Button variant="outline" size="icon" asChild className="mr-4">
            <Link href="/calculators">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to calculators</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Net Worth Calculator</h1>
        </div>

        <div className="grid gap-8 md:grid-cols-[1fr_300px]">
          <div className="space-y-8">
            <Tabs defaultValue="assets" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="assets">Assets</TabsTrigger>
                <TabsTrigger value="liabilities">Liabilities</TabsTrigger>
              </TabsList>
              <TabsContent value="assets" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Assets</CardTitle>
                    <CardDescription>Add all your assets to calculate your net worth</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      {assets.map((asset) => (
                        <div key={asset.id} className="flex items-center space-x-2">
                          <div className="flex-1">
                            <Label>{asset.name}</Label>
                            <div className="text-sm text-muted-foreground">
                              {assetCategories.find((cat) => cat.value === asset.category)?.label}
                            </div>
                          </div>
                          <div className="w-32 text-right font-medium">{formatCurrency(asset.value)}</div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveAsset(asset.id)}
                            className="text-destructive"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4">
                      <h3 className="text-lg font-medium mb-2">Add New Asset</h3>
                      <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="asset-name">Asset Name</Label>
                            <Input
                              id="asset-name"
                              placeholder="e.g., Savings Account"
                              value={newAsset.name}
                              onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="asset-value">Value (₹)</Label>
                            <Input
                              id="asset-value"
                              type="number"
                              placeholder="e.g., 100000"
                              value={newAsset.value || ""}
                              onChange={(e) => setNewAsset({ ...newAsset, value: Number(e.target.value) })}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="asset-category">Category</Label>
                          <Select
                            value={newAsset.category}
                            onValueChange={(value) => setNewAsset({ ...newAsset, category: value })}
                          >
                            <SelectTrigger id="asset-category">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {assetCategories.map((category) => (
                                <SelectItem key={category.value} value={category.value}>
                                  {category.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <Button onClick={handleAddAsset} className="w-full">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Asset
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="liabilities" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Liabilities</CardTitle>
                    <CardDescription>Add all your debts and liabilities</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      {liabilities.map((liability) => (
                        <div key={liability.id} className="flex items-center space-x-2">
                          <div className="flex-1">
                            <Label>{liability.name}</Label>
                            <div className="text-sm text-muted-foreground">
                              {liabilityCategories.find((cat) => cat.value === liability.category)?.label}
                            </div>
                          </div>
                          <div className="w-32 text-right font-medium">{formatCurrency(liability.value)}</div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveLiability(liability.id)}
                            className="text-destructive"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4">
                      <h3 className="text-lg font-medium mb-2">Add New Liability</h3>
                      <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="liability-name">Liability Name</Label>
                            <Input
                              id="liability-name"
                              placeholder="e.g., Home Loan"
                              value={newLiability.name}
                              onChange={(e) => setNewLiability({ ...newLiability, name: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="liability-value">Value (₹)</Label>
                            <Input
                              id="liability-value"
                              type="number"
                              placeholder="e.g., 1000000"
                              value={newLiability.value || ""}
                              onChange={(e) => setNewLiability({ ...newLiability, value: Number(e.target.value) })}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="liability-category">Category</Label>
                          <Select
                            value={newLiability.category}
                            onValueChange={(value) => setNewLiability({ ...newLiability, category: value })}
                          >
                            <SelectTrigger id="liability-category">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {liabilityCategories.map((category) => (
                                <SelectItem key={category.value} value={category.value}>
                                  {category.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <Button onClick={handleAddLiability} className="w-full">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Liability
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Net Worth Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-primary/10 p-4">
                  <div className="text-sm font-medium text-muted-foreground">Net Worth</div>
                  <div className="text-3xl font-bold text-primary">{formatCurrency(results.netWorth)}</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-muted p-4">
                    <div className="text-sm font-medium text-muted-foreground">Total Assets</div>
                    <div className="text-xl font-bold">{formatCurrency(results.totalAssets)}</div>
                  </div>
                  <div className="rounded-lg bg-muted p-4">
                    <div className="text-sm font-medium text-muted-foreground">Total Liabilities</div>
                    <div className="text-xl font-bold">{formatCurrency(results.totalLiabilities)}</div>
                  </div>
                </div>

                <div className="h-48">
                  <h3 className="text-sm font-medium mb-2">Assets vs Liabilities</h3>
                  <ChartContainer className="h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={netWorthChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={60}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {netWorthChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip formatter={(value) => formatCurrency(value as number)} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Health Indicators</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Debt-to-Asset Ratio</Label>
                    <span className="font-medium">
                      {((results.totalLiabilities / results.totalAssets) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {results.totalLiabilities / results.totalAssets < 0.5
                      ? "Good: Your debt is less than 50% of your assets"
                      : "Warning: Your debt exceeds 50% of your assets"}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Liquidity Ratio</Label>
                    <span className="font-medium">
                      {(
                        assets.filter((a) => a.category === "liquid").reduce((sum, a) => sum + a.value, 0) /
                        liabilities.filter((l) => l.category === "unsecured").reduce((sum, l) => sum + l.value, 0)
                      ).toFixed(1)}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {assets.filter((a) => a.category === "liquid").reduce((sum, a) => sum + a.value, 0) /
                      liabilities.filter((l) => l.category === "unsecured").reduce((sum, l) => sum + l.value, 0) >
                    3
                      ? "Good: You have sufficient liquid assets to cover short-term liabilities"
                      : "Warning: You may need more liquid assets for emergencies"}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

