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

export default function SWPCalculator() {
  const [initialInvestment, setInitialInvestment] = useState(5000000)
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(25000)
  const [years, setYears] = useState(20)
  const [expectedReturn, setExpectedReturn] = useState(10)
  const [activeTab, setActiveTab] = useState("calculator")

  // Calculate SWP returns
  const calculateSWP = () => {
    const monthlyRate = expectedReturn / 12 / 100
    const months = years * 12

    let remainingAmount = initialInvestment
    let totalWithdrawal = 0

    for (let i = 0; i < months; i++) {
      // Add monthly interest
      remainingAmount = remainingAmount * (1 + monthlyRate)

      // Subtract withdrawal
      remainingAmount -= monthlyWithdrawal
      totalWithdrawal += monthlyWithdrawal

      // Check if corpus is depleted
      if (remainingAmount <= 0) {
        return {
          finalCorpus: 0,
          totalWithdrawal: totalWithdrawal,
          monthsLasted: i + 1,
          corpusDepleted: true,
        }
      }
    }

    return {
      finalCorpus: Math.round(remainingAmount),
      totalWithdrawal: totalWithdrawal,
      monthsLasted: months,
      corpusDepleted: false,
    }
  }

  const results = calculateSWP()

  // Generate chart data
  const generateChartData = () => {
    const data = []
    const monthlyRate = expectedReturn / 12 / 100
    let remainingAmount = initialInvestment

    for (let year = 0; year <= years; year++) {
      if (year === 0) {
        data.push({
          year: `Year ${year}`,
          corpus: Math.round(initialInvestment),
          withdrawal: 0,
        })
        continue
      }

      let yearlyWithdrawal = 0
      for (let month = 1; month <= 12; month++) {
        // Add monthly interest
        remainingAmount = remainingAmount * (1 + monthlyRate)

        // Subtract withdrawal
        remainingAmount -= monthlyWithdrawal
        yearlyWithdrawal += monthlyWithdrawal

        // Check if corpus is depleted
        if (remainingAmount <= 0) {
          remainingAmount = 0
          break
        }
      }

      data.push({
        year: `Year ${year}`,
        corpus: Math.round(remainingAmount),
        withdrawal: Math.round(yearlyWithdrawal),
      })

      if (remainingAmount <= 0) break
    }

    return data
  }

  const chartData = generateChartData()

  const chartConfig = {
    corpus: {
      label: "Remaining Corpus",
      color: "hsl(var(--chart-1))",
    },
    withdrawal: {
      label: "Annual Withdrawal",
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
          <h1 className="text-3xl font-bold">SWP Calculator</h1>
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
                  <CardDescription>Adjust the values to calculate your SWP returns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="initial-investment">Initial Investment (₹)</Label>
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
                      min={500000}
                      max={10000000}
                      step={100000}
                      value={[initialInvestment]}
                      onValueChange={(value) => setInitialInvestment(value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>₹5,00,000</span>
                      <span>₹1,00,00,000</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="monthly-withdrawal">Monthly Withdrawal (₹)</Label>
                      <Input
                        id="monthly-withdrawal"
                        type="number"
                        value={monthlyWithdrawal}
                        onChange={(e) => setMonthlyWithdrawal(Number(e.target.value))}
                        className="w-24 text-right"
                      />
                    </div>
                    <Slider
                      id="monthly-withdrawal-slider"
                      min={5000}
                      max={100000}
                      step={1000}
                      value={[monthlyWithdrawal]}
                      onValueChange={(value) => setMonthlyWithdrawal(value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>₹5,000</span>
                      <span>₹1,00,000</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="investment-period">Withdrawal Period (Years)</Label>
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
                      max={20}
                      step={0.5}
                      value={[expectedReturn]}
                      onValueChange={(value) => setExpectedReturn(value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1%</span>
                      <span>20%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>SWP Results</CardTitle>
                  <CardDescription>Estimated returns based on your inputs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    {results.corpusDepleted ? (
                      <div className="rounded-lg bg-destructive/10 p-4">
                        <div className="text-sm font-medium text-destructive">Corpus Depleted</div>
                        <div className="text-3xl font-bold text-destructive">
                          After {Math.floor(results.monthsLasted / 12)} years {results.monthsLasted % 12} months
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-lg bg-primary/10 p-4">
                        <div className="text-sm font-medium text-muted-foreground">Final Corpus</div>
                        <div className="text-3xl font-bold text-primary">{formatCurrency(results.finalCorpus)}</div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg bg-muted p-4">
                        <div className="text-sm font-medium text-muted-foreground">Initial Investment</div>
                        <div className="text-xl font-bold">{formatCurrency(initialInvestment)}</div>
                      </div>
                      <div className="rounded-lg bg-muted p-4">
                        <div className="text-sm font-medium text-muted-foreground">Total Withdrawal</div>
                        <div className="text-xl font-bold">{formatCurrency(results.totalWithdrawal)}</div>
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
                            dataKey="corpus"
                            stroke="hsl(var(--chart-1))"
                            fill="hsl(var(--chart-1))"
                            name="Remaining Corpus"
                          />
                          <Area
                            type="monotone"
                            dataKey="withdrawal"
                            stroke="hsl(var(--chart-2))"
                            fill="hsl(var(--chart-2))"
                            name="Annual Withdrawal"
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
                <CardTitle>How SWP Calculator Works</CardTitle>
                <CardDescription>Understanding the mathematics behind SWP calculations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  A Systematic Withdrawal Plan (SWP) allows you to withdraw a fixed amount regularly from your mutual
                  fund investments. The SWP calculator helps you understand how long your corpus will last based on your
                  withdrawal rate and expected returns.
                </p>
                <div className="p-4 bg-muted rounded-md">
                  <p className="font-mono">For each month:</p>
                  <p className="font-mono mt-2">Corpus = Corpus × (1 + monthly return) - monthly withdrawal</p>
                  <p className="mt-2 text-sm text-muted-foreground">Where:</p>
                  <ul className="mt-1 space-y-1 text-sm text-muted-foreground">
                    <li>
                      <strong>Corpus</strong> = Remaining investment amount
                    </li>
                    <li>
                      <strong>Monthly return</strong> = Annual return ÷ 12 ÷ 100
                    </li>
                    <li>
                      <strong>Monthly withdrawal</strong> = Fixed amount withdrawn each month
                    </li>
                  </ul>
                </div>
                <h3 className="text-lg font-semibold mt-4">Benefits of SWP</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Regular income stream without selling your entire investment</li>
                  <li>Tax-efficient withdrawal strategy compared to lump sum withdrawals</li>
                  <li>Remaining corpus continues to earn returns</li>
                  <li>Flexibility to adjust withdrawal amount as needed</li>
                </ul>
                <h3 className="text-lg font-semibold mt-4">Factors Affecting SWP Sustainability</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>Initial Corpus Size:</strong> Larger initial investments can sustain longer withdrawal
                    periods
                  </li>
                  <li>
                    <strong>Withdrawal Rate:</strong> Higher monthly withdrawals deplete the corpus faster
                  </li>
                  <li>
                    <strong>Expected Returns:</strong> Higher returns help sustain the corpus for longer periods
                  </li>
                  <li>
                    <strong>Inflation:</strong> Consider increasing your withdrawal amount periodically to account for
                    inflation
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

