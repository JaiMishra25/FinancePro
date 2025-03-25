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

export default function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000)
  const [years, setYears] = useState(10)
  const [expectedReturn, setExpectedReturn] = useState(12)
  const [activeTab, setActiveTab] = useState("calculator")

  // Calculate SIP returns
  const calculateSIP = () => {
    const monthlyRate = expectedReturn / 12 / 100
    const months = years * 12
    const futureValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate)

    const totalInvestment = monthlyInvestment * months
    const estimatedReturns = futureValue - totalInvestment

    return {
      futureValue: Math.round(futureValue),
      totalInvestment: Math.round(totalInvestment),
      estimatedReturns: Math.round(estimatedReturns),
    }
  }

  const results = calculateSIP()

  // Generate chart data
  const generateChartData = () => {
    const data = []
    for (let year = 1; year <= years; year++) {
      const monthlyRate = expectedReturn / 12 / 100
      const months = year * 12
      const futureValue =
        monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate)
      const totalInvestment = monthlyInvestment * months

      data.push({
        year: `Year ${year}`,
        investment: Math.round(totalInvestment),
        value: Math.round(futureValue),
      })
    }
    return data
  }

  const chartData = generateChartData()

  const chartConfig = {
    investment: {
      label: "Investment",
      color: "hsl(var(--chart-1))",
    },
    value: {
      label: "Future Value",
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
          <h1 className="text-3xl font-bold">SIP Calculator</h1>
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
                  <CardDescription>Adjust the values to calculate your SIP returns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="monthly-investment">Monthly Investment (₹)</Label>
                      <Input
                        id="monthly-investment"
                        type="number"
                        value={monthlyInvestment}
                        onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                        className="w-24 text-right"
                      />
                    </div>
                    <Slider
                      id="monthly-investment-slider"
                      min={500}
                      max={100000}
                      step={500}
                      value={[monthlyInvestment]}
                      onValueChange={(value) => setMonthlyInvestment(value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>₹500</span>
                      <span>₹100,000</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="investment-period">Investment Period (Years)</Label>
                      <Input
                        id="investment-period"
                        type="number"
                        value={years}
                        onChange={(e) => setYears(Number(e.target.value))}
                        className="w-24 text-right"
                      />
                    </div>
                    <Slider
                      id="investment-period-slider"
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

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Label htmlFor="expected-return">Expected Annual Return (%)</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                Historical equity returns have been around 12-15% annually. Debt funds typically return
                                6-8%.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Input
                        id="expected-return"
                        type="number"
                        value={expectedReturn}
                        onChange={(e) => setExpectedReturn(Number(e.target.value))}
                        className="w-24 text-right"
                      />
                    </div>
                    <Slider
                      id="expected-return-slider"
                      min={1}
                      max={30}
                      step={0.5}
                      value={[expectedReturn]}
                      onValueChange={(value) => setExpectedReturn(value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1%</span>
                      <span>30%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>SIP Results</CardTitle>
                  <CardDescription>Estimated returns based on your inputs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="rounded-lg bg-primary/10 p-4">
                      <div className="text-sm font-medium text-muted-foreground">Future Value</div>
                      <div className="text-3xl font-bold text-primary">{formatCurrency(results.futureValue)}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg bg-muted p-4">
                        <div className="text-sm font-medium text-muted-foreground">Total Investment</div>
                        <div className="text-xl font-bold">{formatCurrency(results.totalInvestment)}</div>
                      </div>
                      <div className="rounded-lg bg-muted p-4">
                        <div className="text-sm font-medium text-muted-foreground">Estimated Returns</div>
                        <div className="text-xl font-bold">{formatCurrency(results.estimatedReturns)}</div>
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
                            formatter={(value) => formatCurrency(value)}
                            labelFormatter={(label) => label}
                          />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="investment"
                            stackId="1"
                            stroke="hsl(var(--chart-1))"
                            fill="hsl(var(--chart-1))"
                            name="Investment"
                          />
                          <Area
                            type="monotone"
                            dataKey="value"
                            stackId="2"
                            stroke="hsl(var(--chart-2))"
                            fill="hsl(var(--chart-2))"
                            name="Future Value"
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
                <CardTitle>How SIP Calculator Works</CardTitle>
                <CardDescription>Understanding the mathematics behind SIP calculations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  A Systematic Investment Plan (SIP) allows you to invest a fixed amount regularly in mutual funds. The
                  SIP calculator uses the following formula to calculate the future value of your investments:
                </p>
                <div className="p-4 bg-muted rounded-md">
                  <p className="font-mono">FV = P × ((1 + r)^n - 1) / r × (1 + r)</p>
                  <p className="mt-2 text-sm text-muted-foreground">Where:</p>
                  <ul className="mt-1 space-y-1 text-sm text-muted-foreground">
                    <li>
                      <strong>FV</strong> = Future Value
                    </li>
                    <li>
                      <strong>P</strong> = Monthly SIP amount
                    </li>
                    <li>
                      <strong>r</strong> = Monthly rate of return (Annual rate ÷ 12 ÷ 100)
                    </li>
                    <li>
                      <strong>n</strong> = Total number of SIP installments (Investment period in years × 12)
                    </li>
                  </ul>
                </div>
                <h3 className="text-lg font-semibold mt-4">Benefits of SIP Investing</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Disciplined approach to investing without timing the market</li>
                  <li>Benefit from rupee-cost averaging by buying more units when prices are low</li>
                  <li>Power of compounding works in your favor over the long term</li>
                  <li>Start with small amounts and increase gradually as your income grows</li>
                </ul>
                <h3 className="text-lg font-semibold mt-4">Factors Affecting SIP Returns</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>Investment Amount:</strong> Higher monthly investments lead to larger corpus
                  </li>
                  <li>
                    <strong>Investment Duration:</strong> Longer investment periods benefit more from compounding
                  </li>
                  <li>
                    <strong>Expected Returns:</strong> Based on the fund's historical performance and market conditions
                  </li>
                  <li>
                    <strong>Investment Frequency:</strong> Monthly SIPs are most common, but weekly or quarterly options
                    exist
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

