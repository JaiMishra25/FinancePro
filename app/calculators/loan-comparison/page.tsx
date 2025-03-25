"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Trash } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SiteHeader } from "@/components/site-header"
import { ChartContainer } from "@/components/ui/chart"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function LoanComparisonCalculator() {
  const [loans, setLoans] = useState([
    {
      id: 1,
      name: "Bank A Home Loan",
      amount: 2000000,
      interestRate: 8.5,
      tenure: 20,
      processingFee: 10000,
      prepaymentPenalty: 2,
      type: "home",
    },
    {
      id: 2,
      name: "Bank B Home Loan",
      amount: 2000000,
      interestRate: 8.75,
      tenure: 20,
      processingFee: 5000,
      prepaymentPenalty: 3,
      type: "home",
    },
  ])

  const [newLoan, setNewLoan] = useState({
    name: "",
    amount: 2000000,
    interestRate: 8.5,
    tenure: 20,
    processingFee: 10000,
    prepaymentPenalty: 2,
    type: "home",
  })

  const loanTypes = [
    { value: "home", label: "Home Loan" },
    { value: "car", label: "Car Loan" },
    { value: "personal", label: "Personal Loan" },
    { value: "education", label: "Education Loan" },
    { value: "business", label: "Business Loan" },
  ]

  // Calculate EMI
  const calculateEMI = (loan: (typeof loans)[0]) => {
    const principal = loan.amount
    const ratePerMonth = loan.interestRate / 12 / 100
    const tenureInMonths = loan.tenure * 12

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
      totalCost: Math.round(totalAmount + loan.processingFee),
    }
  }

  // Add new loan
  const handleAddLoan = () => {
    if (newLoan.name && newLoan.amount > 0 && newLoan.interestRate > 0 && newLoan.tenure > 0) {
      setLoans([...loans, { ...newLoan, id: loans.length + 1 }])
      setNewLoan({
        name: "",
        amount: 2000000,
        interestRate: 8.5,
        tenure: 20,
        processingFee: 10000,
        prepaymentPenalty: 2,
        type: "home",
      })
    }
  }

  // Remove loan
  const handleRemoveLoan = (id: number) => {
    setLoans(loans.filter((loan) => loan.id !== id))
  }

  // Prepare chart data
  const emiChartData = loans.map((loan) => {
    const result = calculateEMI(loan)
    return {
      name: loan.name,
      emi: result.emi,
    }
  })

  const totalCostChartData = loans.map((loan) => {
    const result = calculateEMI(loan)
    return {
      name: loan.name,
      principal: loan.amount,
      interest: result.totalInterest,
      processingFee: loan.processingFee,
    }
  })

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
          <h1 className="text-3xl font-bold">Loan Comparison Tool</h1>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Add Loan Options</CardTitle>
              <CardDescription>Enter details of different loan options to compare</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <Label htmlFor="loan-name">Loan Name</Label>
                    <Input
                      id="loan-name"
                      placeholder="e.g., Bank A Home Loan"
                      value={newLoan.name}
                      onChange={(e) => setNewLoan({ ...newLoan, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="loan-type">Loan Type</Label>
                    <Select value={newLoan.type} onValueChange={(value) => setNewLoan({ ...newLoan, type: value })}>
                      <SelectTrigger id="loan-type">
                        <SelectValue placeholder="Select loan type" />
                      </SelectTrigger>
                      <SelectContent>
                        {loanTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="loan-amount">Loan Amount (₹)</Label>
                    <Input
                      id="loan-amount"
                      type="number"
                      value={newLoan.amount}
                      onChange={(e) => setNewLoan({ ...newLoan, amount: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="interest-rate">Interest Rate (% p.a.)</Label>
                    <Input
                      id="interest-rate"
                      type="number"
                      step="0.01"
                      value={newLoan.interestRate}
                      onChange={(e) => setNewLoan({ ...newLoan, interestRate: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tenure">Tenure (Years)</Label>
                    <Input
                      id="tenure"
                      type="number"
                      value={newLoan.tenure}
                      onChange={(e) => setNewLoan({ ...newLoan, tenure: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="processing-fee">Processing Fee (₹)</Label>
                    <Input
                      id="processing-fee"
                      type="number"
                      value={newLoan.processingFee}
                      onChange={(e) => setNewLoan({ ...newLoan, processingFee: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prepayment-penalty">Prepayment Penalty (%)</Label>
                    <Input
                      id="prepayment-penalty"
                      type="number"
                      step="0.01"
                      value={newLoan.prepaymentPenalty}
                      onChange={(e) => setNewLoan({ ...newLoan, prepaymentPenalty: Number(e.target.value) })}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={handleAddLoan} className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Loan
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {loans.length > 0 && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Loan Comparison</CardTitle>
                  <CardDescription>Compare different loan options side by side</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Loan Name</TableHead>
                          <TableHead>Loan Type</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Interest Rate</TableHead>
                          <TableHead>Tenure</TableHead>
                          <TableHead>Monthly EMI</TableHead>
                          <TableHead>Total Interest</TableHead>
                          <TableHead>Total Cost</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {loans.map((loan) => {
                          const result = calculateEMI(loan)
                          return (
                            <TableRow key={loan.id}>
                              <TableCell className="font-medium">{loan.name}</TableCell>
                              <TableCell>{loanTypes.find((t) => t.value === loan.type)?.label}</TableCell>
                              <TableCell>{formatCurrency(loan.amount)}</TableCell>
                              <TableCell>{loan.interestRate}%</TableCell>
                              <TableCell>{loan.tenure} years</TableCell>
                              <TableCell>{formatCurrency(result.emi)}</TableCell>
                              <TableCell>{formatCurrency(result.totalInterest)}</TableCell>
                              <TableCell>{formatCurrency(result.totalCost)}</TableCell>
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleRemoveLoan(loan.id)}
                                  className="text-destructive"
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-8 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly EMI Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ChartContainer className="h-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={emiChartData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                            <YAxis
                              tickFormatter={(value) => {
                                if (value >= 100000) return `${(value / 100000).toFixed(1)}L`
                                if (value >= 1000) return `${(value / 1000).toFixed(0)}K`
                                return value
                              }}
                            />
                            <RechartsTooltip formatter={(value) => formatCurrency(value as number)} />
                            <Bar dataKey="emi" name="Monthly EMI">
                              {emiChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Total Cost Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ChartContainer className="h-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={totalCostChartData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                            <YAxis
                              tickFormatter={(value) => {
                                if (value >= 10000000) return `${(value / 10000000).toFixed(1)}Cr`
                                if (value >= 100000) return `${(value / 100000).toFixed(1)}L`
                                if (value >= 1000) return `${(value / 1000).toFixed(0)}K`
                                return value
                              }}
                            />
                            <RechartsTooltip formatter={(value) => formatCurrency(value as number)} />
                            <Legend />
                            <Bar dataKey="principal" name="Principal" fill="#0088FE" stackId="a" />
                            <Bar dataKey="interest" name="Interest" fill="#00C49F" stackId="a" />
                            <Bar dataKey="processingFee" name="Processing Fee" fill="#FFBB28" stackId="a" />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

