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

export default function StepUpSIPCalculator() {
  const [initialInvestment, setInitialInvestment] = useState(10000)
  const [annualIncrease, setAnnualIncrease] = useState(10)
  const [years, setYears] = useState(15)
  const [expectedReturn, setExpectedReturn] = useState(12)
  const [activeTab, setActiveTab] = useState("calculator")

  // Calculate Step-up SIP returns
  const calculateStepUpSIP = () => {
    const monthlyRate = expectedReturn / 12 / 100
    const months = years * 12

    let totalInvestment = 0
    let futureValue = 0
    let currentMonthlyInvestment = initialInvestment

    for (let year = 0; year < years; year++) {
      // Set the monthly investment for this year
      if (year > 0) {
        currentMonthlyInvestment += (currentMonthlyInvestment * annualIncrease) / 100
      }

      for (let month = 0; month < 12; month++) {
        const currentMonth = year * 12 + month
        if (currentMonth >= months) break

        // Add this month's investment
        totalInvestment += currentMonthlyInvestment

        // Calculate future value of this month's investment
        const monthsRemaining = months - currentMonth - 1
        const thisMonthFV = currentMonthlyInvestment * Math.pow(1 + monthlyRate, monthsRemaining + 1)

        futureValue += thisMonthFV
      }
    }

    const estimatedReturns = futureValue - totalInvestment

    return {
      futureValue: Math.round(futureValue),
      totalInvestment: Math.round(totalInvestment),
      estimatedReturns: Math.round(estimatedReturns),
    }
  }

  const results = calculateStepUpSIP()

  // Generate chart data
  const generateChartData = () => {
    const data = []
    const monthlyRate = expectedReturn / 12 / 100

    let totalInvestment = 0
    let futureValue = 0
    let currentMonthlyInvestment = initialInvestment

    for (let year = 1; year <= years; year++) {
      // Reset for this year's calculation
      totalInvestment = 0
      futureValue = 0
      currentMonthlyInvestment = initialInvestment

      for (let y = 0; y < year; y++) {
        // Set the monthly investment for this year
        if (y > 0) {
          currentMonthlyInvestment += (currentMonthlyInvestment * annualIncrease) / 100
        }

        for (let month = 0; month < 12; month++) {
          const currentMonth = y * 12 + month
          if (currentMonth >= year * 12) break

          // Add this month's investment
          totalInvestment += currentMonthlyInvestment

          // Calculate future value of this month's investment
          const monthsRemaining = year * 12 - currentMonth - 1
          const thisMonthFV = currentMonthlyInvestment * Math.pow(1 + monthlyRate, monthsRemaining + 1)

          futureValue += thisMonthFV
        }
      }

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
          <h1 className="text-3xl font-bold">Step-up SIP Calculator</h1>
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
                  <CardDescription>Adjust the values to calculate your Step-up SIP returns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="initial-investment">Initial Monthly Investment (₹)</Label>
                      <Input
                        id="initial-investment"
                        type="number"
                        value={initialInvestment}
                        onChange={(e) => setInitialInvestment(Number(e.target.value))}
                        className="w-24 text-right"
                      />
                    </div>
                    <Slider
                      id="initial-investment-slider"
                      min={1000}
                      max={100000}
                      step={1000}
                      value={[initialInvestment]}
                      onValueChange={(value) => setInitialInvestment(value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>₹1,000</span>
                      <span>₹1,00,000</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Label htmlFor="annual-increase">Annual Increase (%)</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                The percentage by which your monthly SIP amount will increase each year.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Input
                        id="annual-increase"
                        type="number"
                        value={annualIncrease}
                        onChange={(e) => setAnnualIncrease(Number(e.target.value))}
                        className="w-24 text-right"
                      />
                    </div>
                    <Slider
                      id="annual-increase-slider"
                      min={0}
                      max={25}
                      step={1}
                      value={[annualIncrease]}
                      onValueChange={(value) => setAnnualIncrease(value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0%</span>
                      <span>25%</span>
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
                      <Label htmlFor="expected-return">Expected Annual Return (%)</Label>
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
                  <CardTitle>Step-up SIP Results</CardTitle>
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
                            formatter={(value) => formatCurrency(value as number)}
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
                <CardTitle>How Step-up SIP Calculator Works</CardTitle>
                <CardDescription>Understanding the mathematics behind Step-up SIP calculations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  A Step-up SIP (Systematic Investment Plan) is an investment strategy where you increase your monthly
                  investment amount every year. This calculator helps you estimate the future value of your investments
                  with annual increments.
                </p>
                <div className="p-4 bg-muted rounded-md">
                  <p className="font-mono">For each year:</p>
                  <p className="font-mono mt-2">
                    Monthly Investment = Previous Year's Monthly Investment × (1 + Annual Increase %)
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">The future value is calculated by:</p>
                  <ul className="mt-1 space-y-1 text-sm text-muted-foreground">
                    <li>
                      <strong>1.</strong> Calculating the future value of each monthly investment separately
                    </li>
                    <li>
                      <strong>2.</strong> Each month's investment grows at the expected rate of return for its remaining
                      period
                    </li>
                    <li>
                      <strong>3.</strong> The sum of all these future values gives the total corpus
                    </li>
                  </ul>
                </div>
                <h3 className="text-lg font-semibold mt-4">Benefits of Step-up SIP</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Aligns with your increasing income over the years</li>
                  <li>Helps achieve larger financial goals with relatively smaller initial investments</li>
                  <li>Accelerates wealth creation through the power of compounding</li>
                  <li>Provides flexibility to increase investments as your financial capacity grows</li>
                </ul>
                <h3 className="text-lg font-semibold mt-4">Factors Affecting Step-up SIP Returns</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>Initial Investment Amount:</strong> Higher starting amount leads to larger corpus
                  </li>
                  <li>
                    <strong>Annual Increment Rate:</strong> Higher step-up percentage significantly boosts final returns
                  </li>
                  <li>
                    <strong>Investment Duration:</strong> Longer investment periods benefit more from the step-up effect
                  </li>
                  <li>
                    <strong>Expected Returns:</strong> Higher returns compound more effectively with increasing
                    investments
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

