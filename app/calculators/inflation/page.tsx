"use client"

import { useState } from "react"
import { ArrowLeft, Info } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { SiteHeader } from "@/components/site-header"
import { ChartContainer } from "@/components/ui/chart"
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts"

export default function InflationCalculator() {
  const [currentAmount, setCurrentAmount] = useState(100000)
  const [inflationRate, setInflationRate] = useState(6)
  const [years, setYears] = useState(20)
  const [activeTab, setActiveTab] = useState("calculator")

  // Calculate inflation impact
  const calculateInflation = () => {
    const futureValue = currentAmount * Math.pow(1 + inflationRate / 100, years)
    const purchasingPowerLoss = currentAmount - currentAmount * Math.pow(1 / (1 + inflationRate / 100), years)

    return {
      futureValue: Math.round(futureValue),
      purchasingPowerLoss: Math.round(purchasingPowerLoss),
      purchasingPower: Math.round(currentAmount * Math.pow(1 / (1 + inflationRate / 100), years)),
    }
  }

  const results = calculateInflation()

  // Generate chart data
  const generateChartData = () => {
    const data = []

    for (let year = 0; year <= years; year++) {
      const futureValue = currentAmount * Math.pow(1 + inflationRate / 100, year)
      const purchasingPower = currentAmount * Math.pow(1 / (1 + inflationRate / 100), year)

      data.push({
        year: `Year ${year}`,
        futureValue: Math.round(futureValue),
        purchasingPower: Math.round(purchasingPower),
      })
    }

    return data
  }

  const chartData = generateChartData()

  const chartConfig = {
    futureValue: {
      label: "Amount Needed",
      color: "hsl(var(--chart-1))",
    },
    purchasingPower: {
      label: "Purchasing Power",
      color: "hsl(var(--chart-2))",
    },
  }

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
          <h1 className="text-3xl font-bold">Inflation Calculator</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
          </TabsList>
          <TabsContent value="calculator" className="mt-6">
            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Input Parameters</CardTitle>
                  <CardDescription>Adjust the values to calculate inflation impact</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="current-amount">Current Amount (₹)</Label>
                      <Input
                        id="current-amount"
                        type="number"
                        value={currentAmount}
                        onChange={(e) => setCurrentAmount(Number(e.target.value))}
                        className="w-24 text-right"
                      />
                    </div>
                    <Slider
                      id="current-amount-slider"
                      min={1000}
                      max={1000000}
                      step={1000}
                      value={[currentAmount]}
                      onValueChange={(value) => setCurrentAmount(value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>₹1,000</span>
                      <span>₹10,00,000</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Label htmlFor="inflation-rate">Annual Inflation Rate (%)</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                Average inflation in India has been around 5-6% in recent years.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Input
                        id="inflation-rate"
                        type="number"
                        value={inflationRate}
                        onChange={(e) => setInflationRate(Number(e.target.value))}
                        className="w-24 text-right"
                      />
                    </div>
                    <Slider
                      id="inflation-rate-slider"
                      min={1}
                      max={15}
                      step={0.5}
                      value={[inflationRate]}
                      onValueChange={(value) => setInflationRate(value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1%</span>
                      <span>15%</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="time-period">Time Period (Years)</Label>
                      <Input
                        id="time-period"
                        type="number"
                        value={years}
                        onChange={(e) => setYears(Number(e.target.value))}
                        className="w-24 text-right"
                      />
                    </div>
                    <Slider
                      id="time-period-slider"
                      min={1}
                      max={30}
                      step={1}
                      value={[years]}
                      onValueChange={(value) => setYears(value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1 Year</span>
                      <span>30 Years</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Inflation Impact</CardTitle>
                  <CardDescription>See how inflation affects your money over time</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="rounded-lg bg-primary/10 p-4">
                      <div className="text-sm font-medium text-muted-foreground">Future Value Needed</div>
                      <div className="text-3xl font-bold text-primary">{formatCurrency(results.futureValue)}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Amount needed in {years} years to maintain the same purchasing power
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg bg-muted p-4">
                        <div className="text-sm font-medium text-muted-foreground">Purchasing Power Loss</div>
                        <div className="text-xl font-bold">{formatCurrency(results.purchasingPowerLoss)}</div>
                      </div>
                      <div className="rounded-lg bg-muted p-4">
                        <div className="text-sm font-medium text-muted-foreground">Future Purchasing Power</div>
                        <div className="text-xl font-bold">{formatCurrency(results.purchasingPower)}</div>
                      </div>
                    </div>
                  </div>

                  <div className="h-64">
                    <ChartContainer config={chartConfig} className="h-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis
                            tickFormatter={(value) => {
                              if (value >= 10000000) return `${(value / 10000000).toFixed(1)}Cr`
                              if (value >= 100000) return `${(value / 100000).toFixed(1)}L`
                              if (value >= 1000) return `${(value / 1000).toFixed(0)}K`
                              return value
                            }}
                          />
                          <RechartsTooltip
                            formatter={(value) => formatCurrency(value as number)}
                            labelFormatter={(label) => label}
                          />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="futureValue"
                            stroke="hsl(var(--chart-1))"
                            fill="hsl(var(--chart-1))"
                            name="Amount Needed"
                          />
                          <Area
                            type="monotone"
                            dataKey="purchasingPower"
                            stroke="hsl(var(--chart-2))"
                            fill="hsl(var(--chart-2))"
                            name="Purchasing Power"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="how-it-works" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>How Inflation Calculator Works</CardTitle>
                <CardDescription>Understanding the impact of inflation on your money</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Inflation is the rate at which the general level of prices for goods and services rises, causing
                  purchasing power to fall over time. This calculator helps you understand how inflation erodes the
                  value of your money.
                </p>
                <div className="p-4 bg-muted rounded-md">
                  <p className="font-mono">Future Value = Present Value × (1 + Inflation Rate)^Years</p>
                  <p className="font-mono mt-2">
                    Future Purchasing Power = Present Value × (1 / (1 + Inflation Rate)^Years)
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">Where:</p>
                  <ul className="mt-1 space-y-1 text-sm text-muted-foreground">
                    <li>
                      <strong>Future Value</strong> = Amount needed in the future to maintain the same purchasing power
                    </li>
                    <li>
                      <strong>Present Value</strong> = Current amount of money
                    </li>
                    <li>
                      <strong>Inflation Rate</strong> = Annual rate of inflation (in decimal)
                    </li>
                    <li>
                      <strong>Years</strong> = Number of years in the future
                    </li>
                  </ul>
                </div>
                <h3 className="text-lg font-semibold mt-4">Impact of Inflation</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>At 6% annual inflation, the value of money halves approximately every 12 years</li>
                  <li>Inflation affects fixed income earners more severely</li>
                  <li>Long-term financial goals need to account for inflation</li>
                  <li>Retirement planning is particularly vulnerable to inflation risk</li>
                </ul>
                <h3 className="text-lg font-semibold mt-4">Strategies to Combat Inflation</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>Invest in equity:</strong> Historically, equity investments have outpaced inflation over the
                    long term
                  </li>
                  <li>
                    <strong>Consider real assets:</strong> Real estate and commodities often appreciate with inflation
                  </li>
                  <li>
                    <strong>Inflation-indexed bonds:</strong> Government securities like Inflation-Indexed Bonds are
                    designed to protect against inflation
                  </li>
                  <li>
                    <strong>Regular income increases:</strong> Ensure your income grows at least at the rate of
                    inflation
                  </li>
                  <li>
                    <strong>Review financial plan:</strong> Periodically review and adjust your financial plan to
                    account for inflation
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

