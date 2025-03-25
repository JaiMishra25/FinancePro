"use client"

import { useState } from "react"
import { ArrowLeft, Download, Info } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { SiteHeader } from "@/components/site-header"
import { ChartContainer } from "@/components/ui/chart"
import { Bar, BarChart, Cell, Legend, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, YAxis } from "recharts"

export default function TaxCalculatorPage() {
  const [income, setIncome] = useState(1000000)
  const [regime, setRegime] = useState("new")
  const [deductions, setDeductions] = useState({
    section80C: 150000,
    section80D: 25000,
    hra: 120000,
    lta: 0,
    nps: 50000,
    homeLoanInterest: 0,
  })

  // New tax regime slabs for 2025
  const newRegimeSlabs = [
    { min: 0, max: 1200000, rate: 0 },
    { min: 1200000, max: 1500000, rate: 10 },
    { min: 1500000, max: 2000000, rate: 15 },
    { min: 2000000, max: 3000000, rate: 20 },
    { min: 3000000, max: Number.POSITIVE_INFINITY, rate: 30 },
  ]

  // Old tax regime slabs
  const oldRegimeSlabs = [
    { min: 0, max: 250000, rate: 0 },
    { min: 250000, max: 500000, rate: 5 },
    { min: 500000, max: 1000000, rate: 20 },
    { min: 1000000, max: Number.POSITIVE_INFINITY, rate: 30 },
  ]

  // Add defensive checks for tax calculations
  const calculateTaxNewRegime = () => {
    if (income === undefined || income === null) {
      return {
        taxableIncome: 0,
        tax: 0,
        cess: 0,
        totalTax: 0,
      }
    }

    let taxableIncome = income
    // Standard deduction of 50,000 in new regime
    taxableIncome = Math.max(0, taxableIncome - 50000)

    // Calculate tax based on slabs
    let tax = 0
    for (const slab of newRegimeSlabs) {
      if (taxableIncome > slab.min) {
        const amountInSlab = Math.min(taxableIncome, slab.max) - slab.min
        tax += amountInSlab * (slab.rate / 100)
      }
    }

    // Add cess
    const cess = tax * 0.04

    return {
      taxableIncome,
      tax,
      cess,
      totalTax: tax + cess,
    }
  }

  const calculateTaxOldRegime = () => {
    if (income === undefined || income === null || !deductions) {
      return {
        taxableIncome: 0,
        tax: 0,
        cess: 0,
        totalTax: 0,
        totalDeductions: 0,
      }
    }

    // Calculate total deductions
    const totalDeductions =
      Math.min(150000, deductions.section80C || 0) +
      (deductions.section80D || 0) +
      (deductions.hra || 0) +
      (deductions.lta || 0) +
      Math.min(50000, deductions.nps || 0) +
      Math.min(200000, deductions.homeLoanInterest || 0)

    // Standard deduction of 50,000
    const taxableIncome = Math.max(0, income - 50000 - totalDeductions)
    let tax = 0

    // Calculate tax based on slabs
    for (const slab of oldRegimeSlabs) {
      if (taxableIncome > slab.min) {
        const amountInSlab = Math.min(taxableIncome, slab.max) - slab.min
        tax += amountInSlab * (slab.rate / 100)
      }
    }

    // Add cess
    const cess = tax * 0.04

    return {
      taxableIncome,
      tax,
      cess,
      totalTax: tax + cess,
      totalDeductions,
    }
  }

  const newRegimeTax = calculateTaxNewRegime()
  const oldRegimeTax = calculateTaxOldRegime()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Ensure comparisonData has valid values
  const comparisonData = [
    {
      name: "New Regime",
      tax: Math.round(newRegimeTax?.totalTax || 0),
      takeHome: Math.round((income || 0) - (newRegimeTax?.totalTax || 0)),
    },
    {
      name: "Old Regime",
      tax: Math.round(oldRegimeTax?.totalTax || 0),
      takeHome: Math.round((income || 0) - (oldRegimeTax?.totalTax || 0)),
    },
  ]

  const chartConfig = {
    tax: {
      label: "Tax Payable",
      color: "hsl(var(--chart-1))",
    },
    takeHome: {
      label: "Take Home",
      color: "hsl(var(--chart-2))",
    },
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-10">
        <div className="flex items-center mb-6">
          <Button variant="outline" size="icon" asChild className="mr-4">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to home</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Income Tax Calculator 2025</h1>
        </div>

        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="comparison">Regime Comparison</TabsTrigger>
          </TabsList>
          <TabsContent value="calculator" className="mt-6">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Income Details</CardTitle>
                    <CardDescription>Enter your annual income and select tax regime</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="annual-income">Annual Income (₹)</Label>
                      <Input
                        id="annual-income"
                        type="number"
                        value={income}
                        onChange={(e) => setIncome(Number(e.target.value))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Tax Regime</Label>
                      <RadioGroup value={regime} onValueChange={setRegime} className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="new" id="new-regime" />
                          <Label htmlFor="new-regime">New Tax Regime (2025)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="old" id="old-regime" />
                          <Label htmlFor="old-regime">Old Tax Regime</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </CardContent>
                </Card>

                {regime === "old" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Deductions & Exemptions</CardTitle>
                      <CardDescription>Available only in old tax regime</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Label htmlFor="section-80c">Section 80C (₹)</Label>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">
                                  Includes PPF, ELSS, Life Insurance Premium, etc. Maximum limit: ₹1,50,000
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <Input
                          id="section-80c"
                          type="number"
                          value={deductions.section80C}
                          onChange={(e) => setDeductions({ ...deductions, section80C: Number(e.target.value) })}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Label htmlFor="section-80d">Section 80D - Medical Insurance (₹)</Label>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">
                                  Health Insurance Premium. Maximum: ₹25,000 (₹50,000 for senior citizens)
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <Input
                          id="section-80d"
                          type="number"
                          value={deductions.section80D}
                          onChange={(e) => setDeductions({ ...deductions, section80D: Number(e.target.value) })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="hra">HRA Exemption (₹)</Label>
                        <Input
                          id="hra"
                          type="number"
                          value={deductions.hra}
                          onChange={(e) => setDeductions({ ...deductions, hra: Number(e.target.value) })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lta">LTA Exemption (₹)</Label>
                        <Input
                          id="lta"
                          type="number"
                          value={deductions.lta}
                          onChange={(e) => setDeductions({ ...deductions, lta: Number(e.target.value) })}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Label htmlFor="nps">NPS Contribution (₹)</Label>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">
                                  Additional deduction under Section 80CCD(1B). Maximum: ₹50,000
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <Input
                          id="nps"
                          type="number"
                          value={deductions.nps}
                          onChange={(e) => setDeductions({ ...deductions, nps: Number(e.target.value) })}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Label htmlFor="home-loan">Home Loan Interest (₹)</Label>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">
                                  Deduction under Section 24. Maximum: ₹2,00,000 for self-occupied property
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <Input
                          id="home-loan"
                          type="number"
                          value={deductions.homeLoanInterest}
                          onChange={(e) => setDeductions({ ...deductions, homeLoanInterest: Number(e.target.value) })}
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tax Calculation</CardTitle>
                    <CardDescription>{regime === "new" ? "New Tax Regime (2025)" : "Old Tax Regime"}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-lg bg-muted p-4">
                          <div className="text-sm font-medium text-muted-foreground">Gross Income</div>
                          <div className="text-xl font-bold">{formatCurrency(income)}</div>
                        </div>

                        <div className="rounded-lg bg-muted p-4">
                          <div className="text-sm font-medium text-muted-foreground">
                            {regime === "old" ? "Total Deductions" : "Standard Deduction"}
                          </div>
                          <div className="text-xl font-bold">
                            {regime === "old"
                              ? formatCurrency(oldRegimeTax.totalDeductions + 50000)
                              : formatCurrency(50000)}
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg bg-muted p-4">
                        <div className="text-sm font-medium text-muted-foreground">Taxable Income</div>
                        <div className="text-xl font-bold">
                          {regime === "new"
                            ? formatCurrency(newRegimeTax.taxableIncome)
                            : formatCurrency(oldRegimeTax.taxableIncome)}
                        </div>
                      </div>

                      <div className="rounded-lg bg-primary/10 p-4">
                        <div className="text-sm font-medium text-muted-foreground">Total Tax Payable</div>
                        <div className="text-3xl font-bold text-primary">
                          {regime === "new"
                            ? formatCurrency(newRegimeTax.totalTax)
                            : formatCurrency(oldRegimeTax.totalTax)}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-lg bg-muted p-4">
                          <div className="text-sm font-medium text-muted-foreground">Income Tax</div>
                          <div className="text-xl font-bold">
                            {regime === "new" ? formatCurrency(newRegimeTax.tax) : formatCurrency(oldRegimeTax.tax)}
                          </div>
                        </div>

                        <div className="rounded-lg bg-muted p-4">
                          <div className="text-sm font-medium text-muted-foreground">Health & Education Cess</div>
                          <div className="text-xl font-bold">
                            {regime === "new" ? formatCurrency(newRegimeTax.cess) : formatCurrency(oldRegimeTax.cess)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download Tax Report
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Tax Regime</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-lg bg-primary/10 p-4">
                        <div className="text-sm font-medium text-muted-foreground">Best Option for You</div>
                        <div className="text-xl font-bold">
                          {newRegimeTax.totalTax <= oldRegimeTax.totalTax ? "New Tax Regime (2025)" : "Old Tax Regime"}
                        </div>
                        <div className="text-sm text-muted-foreground mt-2">
                          You save {formatCurrency(Math.abs(newRegimeTax.totalTax - oldRegimeTax.totalTax))} with the{" "}
                          {newRegimeTax.totalTax <= oldRegimeTax.totalTax ? "new" : "old"} regime
                        </div>
                      </div>

                      <div className="text-sm text-muted-foreground">
                        <p className="mb-2">
                          <strong>Note:</strong> The recommendation is based on tax liability. Consider these factors:
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>New regime is the default unless you opt for the old regime</li>
                          <li>If your deductions exceed ₹3.5 lakh (for ₹12 lakh income), old regime may be better</li>
                          <li>New regime offers zero tax up to ₹12 lakh (including ₹50,000 standard deduction)</li>
                          <li>Senior citizens get higher relief with ₹1 lakh deduction on interest income</li>
                          <li>Marginal relief applies if your income is slightly above ₹12 lakh</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="comparison" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Tax Regime Comparison</CardTitle>
                <CardDescription>Compare the new and old tax regimes based on your income</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="h-80">
                  <ChartContainer config={chartConfig} className="h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={comparisonData}
                        layout="vertical"
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <XAxis type="number" tickFormatter={(value) => formatCurrency(value)} />
                        <YAxis type="category" dataKey="name" width={100} />
                        <Legend />
                        <RechartsTooltip formatter={(value) => formatCurrency(value as number)} />
                        <Bar dataKey="tax" stackId="a" name="Tax Payable" fill="hsl(var(--chart-1))">
                          {comparisonData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={entry.name === "New Regime" ? "hsl(var(--chart-1))" : "hsl(var(--chart-3))"}
                            />
                          ))}
                        </Bar>
                        <Bar dataKey="takeHome" stackId="a" name="Take Home" fill="hsl(var(--chart-2))">
                          {comparisonData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={entry.name === "New Regime" ? "hsl(var(--chart-2))" : "hsl(var(--chart-4))"}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">New Tax Regime (2025)</h3>
                    <div className="space-y-4">
                      <div className="rounded-lg bg-muted p-4">
                        <div className="text-sm font-medium text-muted-foreground">Key Features</div>
                        <ul className="mt-2 space-y-1 text-sm">
                          <li>• Zero tax up to ₹12,00,000</li>
                          <li>• Standard deduction of ₹50,000</li>
                          <li>• No additional deductions or exemptions</li>
                          <li>• Default regime unless old regime is chosen</li>
                          <li>• Simplified tax filing process</li>
                        </ul>
                      </div>

                      <div className="rounded-lg bg-muted p-4">
                        <div className="text-sm font-medium text-muted-foreground">Tax Slabs</div>
                        <div className="mt-2 text-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div>₹0 - ₹12,00,000</div>
                            <div>0%</div>
                            <div>₹12,00,001 - ₹15,00,000</div>
                            <div>10%</div>
                            <div>₹15,00,001 - ₹20,00,000</div>
                            <div>15%</div>
                            <div>₹20,00,001 - ₹30,00,000</div>
                            <div>20%</div>
                            <div>Above ₹30,00,000</div>
                            <div>30%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Old Tax Regime</h3>
                    <div className="space-y-4">
                      <div className="rounded-lg bg-muted p-4">
                        <div className="text-sm font-medium text-muted-foreground">Key Features</div>
                        <ul className="mt-2 space-y-1 text-sm">
                          <li>• Higher tax rates but with deductions</li>
                          <li>• Standard deduction of ₹50,000</li>
                          <li>• Multiple deductions under Section 80C, 80D, etc.</li>
                          <li>• HRA, LTA and other exemptions available</li>
                          <li>• Must be explicitly chosen</li>
                        </ul>
                      </div>

                      <div className="rounded-lg bg-muted p-4">
                        <div className="text-sm font-medium text-muted-foreground">Tax Slabs</div>
                        <div className="mt-2 text-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div>₹0 - ₹2,50,000</div>
                            <div>0%</div>
                            <div>₹2,50,001 - ₹5,00,000</div>
                            <div>5%</div>
                            <div>₹5,00,001 - ₹10,00,000</div>
                            <div>20%</div>
                            <div>Above ₹10,00,000</div>
                            <div>30%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

