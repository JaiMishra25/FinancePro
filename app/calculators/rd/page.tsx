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

export default function RDCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000)
  const [years, setYears] = useState(5)
  const [interestRate, setInterestRate] = useState(7)
  const [activeTab, setActiveTab] = useState("calculator")

  // Calculate RD returns
  const calculateRD = () => {
    const months = years * 12
    const monthlyRate = interestRate / 100 / 4 // Quarterly compounding

    let totalAmount = 0
    const totalInvestment = monthlyInvestment * months

    for (let i = 0; i < months; i++) {
      // Calculate interest for each month's deposit for remaining quarters
      const remainingQuarters = Math.floor((months - i - 1) / 3) + 1
      let amount = monthlyInvestment

      for (let q = 0; q < remainingQuarters; q++) {
        amount = amount * (1 + monthlyRate)
      }

      totalAmount += amount
    }

    const interestEarned = totalAmount - totalInvestment

    return {
      maturityAmount: Math.round(totalAmount),
      totalInvestment: Math.round(totalInvestment),
      interestEarned: Math.round(interestEarned),
    }
  }

  const results = calculateRD()

  // Generate chart data
  const generateChartData = () => {
    const data = []
    const monthlyRate = interestRate / 100 / 4 // Quarterly compounding

    for (let year = 1; year <= years; year++) {
      const months = year * 12
      let totalAmount = 0
      const totalInvestment = monthlyInvestment * months

      for (let i = 0; i < months; i++) {
        // Calculate interest for each month's deposit for remaining quarters
        const remainingQuarters = Math.floor((months - i - 1) / 3) + 1
        let amount = monthlyInvestment

        for (let q = 0; q < remainingQuarters; q++) {
          amount = amount * (1 + monthlyRate)
        }

        totalAmount += amount
      }

      data.push({
        year: `Year ${year}`,
        investment: Math.round(totalInvestment),
        value: Math.round(totalAmount),
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
      label: "Maturity Value",
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
          <h1 className="text-3xl font-bold">RD Calculator</h1>
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
                  <CardDescription>Adjust the values to calculate your RD returns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="monthly-investment">Monthly Deposit (₹)</Label>
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
                      min={1000}
                      max={100000}
                      step={1000}
                      value={[monthlyInvestment]}
                      onValueChange={(value) => setMonthlyInvestment(value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>₹1,000</span>
                      <span>₹1,00,000</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="investment-period">Time Period (Years)</Label>
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
                      max={10}
                      step={1}
                      value={[years]}
                      onValueChange={(value) => setYears(value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1 Year</span>
                      <span>10 Years</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Label htmlFor="interest-rate">Interest Rate (%)</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                Current RD interest rates typically range from 6% to 7.5% depending on the bank and
                                tenure.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Input
                        id="interest-rate"
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-24 text-right"
                      />
                    </div>
                    <Slider
                      id="interest-rate-slider"
                      min={4}
                      max={10}
                      step={0.1}
                      value={[interestRate]}
                      onValueChange={(value) => setInterestRate(value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>4%</span>
                      <span>10%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>RD Results</CardTitle>
                  <CardDescription>Estimated returns based on your inputs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="rounded-lg bg-primary/10 p-4">
                      <div className="text-sm font-medium text-muted-foreground">Maturity Amount</div>
                      <div className="text-3xl font-bold text-primary">{formatCurrency(results.maturityAmount)}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg bg-muted p-4">
                        <div className="text-sm font-medium text-muted-foreground">Total Investment</div>
                        <div className="text-xl font-bold">{formatCurrency(results.totalInvestment)}</div>
                      </div>
                      <div className="rounded-lg bg-muted p-4">
                        <div className="text-sm font-medium text-muted-foreground">Interest Earned</div>
                        <div className="text-xl font-bold">{formatCurrency(results.interestEarned)}</div>
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
                            name="Maturity Value"
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
                <CardTitle>How RD Calculator Works</CardTitle>
                <CardDescription>Understanding the mathematics behind RD calculations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  A Recurring Deposit (RD) is a type of term deposit where you deposit a fixed amount every month for a
                  specified period. The RD calculator helps you estimate the maturity amount based on your monthly
                  deposits, interest rate, and tenure.
                </p>
                <div className="p-4 bg-muted rounded-md">
                  <p className="font-mono">For each monthly deposit:</p>
                  <p className="font-mono mt-2">A = P × (1 + r/4)^(4t)</p>
                  <p className="mt-2 text-sm text-muted-foreground">Where:</p>
                  <ul className="mt-1 space-y-1 text-sm text-muted-foreground">
                    <li>
                      <strong>A</strong> = Maturity amount for each deposit
                    </li>
                    <li>
                      <strong>P</strong> = Monthly deposit amount
                    </li>
                    <li>
                      <strong>r</strong> = Annual interest rate (in decimal)
                    </li>
                    <li>
                      <strong>t</strong> = Time period in years for each deposit
                    </li>
                  </ul>
                </div>
                <h3 className="text-lg font-semibold mt-4">Benefits of Recurring Deposits</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Encourages regular savings habit</li>
                  <li>Fixed and guaranteed returns</li>
                  <li>Lower risk compared to market-linked investments</li>
                  <li>Flexible tenure options from 6 months to 10 years</li>
                  <li>Option for premature withdrawal with penalty</li>
                </ul>
                <h3 className="text-lg font-semibold mt-4">Factors Affecting RD Returns</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>Monthly Deposit Amount:</strong> Higher deposits lead to higher returns
                  </li>
                  <li>
                    <strong>Interest Rate:</strong> Higher interest rates yield better returns
                  </li>
                  <li>
                    <strong>Tenure:</strong> Longer tenures generally offer higher interest rates
                  </li>
                  <li>
                    <strong>Compounding Frequency:</strong> Most banks compound RD interest quarterly
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

