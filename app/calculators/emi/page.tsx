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
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts"

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState(2000000)
  const [interestRate, setInterestRate] = useState(8.5)
  const [loanTenure, setLoanTenure] = useState(20)
  const [activeTab, setActiveTab] = useState("calculator")

  // Calculate EMI
  const calculateEMI = () => {
    const principal = loanAmount
    const ratePerMonth = interestRate / 12 / 100
    const tenureInMonths = loanTenure * 12

    // EMI formula: P * r * (1+r)^n / ((1+r)^n - 1)
    const emi =
      (principal * ratePerMonth * Math.pow(1 + ratePerMonth, tenureInMonths)) /
      (Math.pow(1 + ratePerMonth, tenureInMonths) - 1)

    const totalAmount = emi * tenureInMonths
    const totalInterest = totalAmount - principal

    return {
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
      principal: principal,
    }
  }

  const results = calculateEMI()

  // Generate amortization schedule
  const generateAmortizationData = () => {
    const data = []
    const ratePerMonth = interestRate / 12 / 100
    const tenureInMonths = loanTenure * 12
    let remainingPrincipal = loanAmount
    const emi = results.emi

    for (let year = 1; year <= loanTenure; year++) {
      let yearlyPrincipal = 0
      let yearlyInterest = 0

      for (let month = 1; month <= 12; month++) {
        if ((year - 1) * 12 + month > tenureInMonths) break

        const interestForMonth = remainingPrincipal * ratePerMonth
        const principalForMonth = emi - interestForMonth

        yearlyPrincipal += principalForMonth
        yearlyInterest += interestForMonth
        remainingPrincipal -= principalForMonth
      }

      data.push({
        year: `Year ${year}`,
        principal: Math.round(yearlyPrincipal),
        interest: Math.round(yearlyInterest),
        balance: Math.round(remainingPrincipal),
      })
    }

    return data
  }

  const pieChartData = [
    { name: "Principal", value: results.principal, color: "hsl(var(--chart-1))" },
    { name: "Interest", value: results.totalInterest, color: "hsl(var(--chart-2))" },
  ]

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
          <h1 className="text-3xl font-bold">EMI Calculator</h1>
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
                  <CardTitle>Loan Details</CardTitle>
                  <CardDescription>Adjust the values to calculate your EMI</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="loan-amount">Loan Amount (₹)</Label>
                      <Input
                        id="loan-amount"
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        className="w-32 text-right"
                      />
                    </div>
                    <Slider
                      id="loan-amount-slider"
                      min={100000}
                      max={10000000}
                      step={100000}
                      value={[loanAmount]}
                      onValueChange={(value) => setLoanAmount(value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>₹1 Lakh</span>
                      <span>₹1 Crore</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Label htmlFor="interest-rate">Interest Rate (% p.a.)</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                Current home loan interest rates typically range from 7% to 9.5% depending on the bank
                                and your credit score.
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
                        className="w-32 text-right"
                      />
                    </div>
                    <Slider
                      id="interest-rate-slider"
                      min={5}
                      max={20}
                      step={0.1}
                      value={[interestRate]}
                      onValueChange={(value) => setInterestRate(value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>5%</span>
                      <span>20%</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="loan-tenure">Loan Tenure (Years)</Label>
                      <Input
                        id="loan-tenure"
                        type="number"
                        value={loanTenure}
                        onChange={(e) => setLoanTenure(Number(e.target.value))}
                        className="w-32 text-right"
                      />
                    </div>
                    <Slider
                      id="loan-tenure-slider"
                      min={1}
                      max={30}
                      step={1}
                      value={[loanTenure]}
                      onValueChange={(value) => setLoanTenure(value[0])}
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
                  <CardTitle>EMI Results</CardTitle>
                  <CardDescription>Loan repayment details based on your inputs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="rounded-lg bg-primary/10 p-4">
                      <div className="text-sm font-medium text-muted-foreground">Monthly EMI</div>
                      <div className="text-3xl font-bold text-primary">{formatCurrency(results.emi)}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg bg-muted p-4">
                        <div className="text-sm font-medium text-muted-foreground">Total Interest</div>
                        <div className="text-xl font-bold">{formatCurrency(results.totalInterest)}</div>
                      </div>
                      <div className="rounded-lg bg-muted p-4">
                        <div className="text-sm font-medium text-muted-foreground">Total Amount</div>
                        <div className="text-xl font-bold">{formatCurrency(results.totalAmount)}</div>
                      </div>
                    </div>
                  </div>

                  <div className="h-64">
                    <h3 className="text-sm font-medium mb-2">Principal vs Interest Breakup</h3>
                    <ChartContainer className="h-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {pieChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Legend />
                          <RechartsTooltip formatter={(value) => formatCurrency(value as number)} />
                        </PieChart>
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
                <CardTitle>How EMI Calculator Works</CardTitle>
                <CardDescription>Understanding the mathematics behind EMI calculations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Equated Monthly Installment (EMI) is a fixed payment amount made by a borrower to a lender at a
                  specified date each month. The EMI calculator uses the following formula to calculate your monthly
                  payment:
                </p>
                <div className="p-4 bg-muted rounded-md">
                  <p className="font-mono">EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)</p>
                  <p className="mt-2 text-sm text-muted-foreground">Where:</p>
                  <ul className="mt-1 space-y-1 text-sm text-muted-foreground">
                    <li>
                      <strong>P</strong> = Principal loan amount
                    </li>
                    <li>
                      <strong>r</strong> = Monthly interest rate (Annual rate ÷ 12 ÷ 100)
                    </li>
                    <li>
                      <strong>n</strong> = Loan tenure in months
                    </li>
                  </ul>
                </div>
                <h3 className="text-lg font-semibold mt-4">Factors Affecting EMI</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>Loan Amount:</strong> Higher loan amounts result in higher EMIs
                  </li>
                  <li>
                    <strong>Interest Rate:</strong> Higher interest rates increase your EMI
                  </li>
                  <li>
                    <strong>Loan Tenure:</strong> Longer tenures reduce EMI but increase total interest paid
                  </li>
                  <li>
                    <strong>Prepayment:</strong> Making prepayments reduces the outstanding principal and future
                    interest
                  </li>
                </ul>
                <h3 className="text-lg font-semibold mt-4">Tips for Managing Loan EMIs</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Choose a tenure that makes your EMI 30-40% of your monthly income</li>
                  <li>Make prepayments whenever you have surplus funds</li>
                  <li>Consider refinancing if interest rates drop significantly</li>
                  <li>Maintain a good credit score to negotiate better interest rates</li>
                  <li>Compare offers from multiple lenders before finalizing</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

