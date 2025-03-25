"use client"

import { useState, useEffect } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, ArrowRight, CheckCircle, HelpCircle, Info, Percent, TrendingUp } from "lucide-react"
import { Tooltip as TooltipUI, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function RetirementCalculator() {
  // Form state
  const [currentAge, setCurrentAge] = useState(30)
  const [retirementAge, setRetirementAge] = useState(60)
  const [lifeExpectancy, setLifeExpectancy] = useState(85)
  const [currentSavings, setCurrentSavings] = useState(1000000)
  const [monthlyContribution, setMonthlyContribution] = useState(20000)
  const [expectedMonthlyExpenses, setExpectedMonthlyExpenses] = useState(50000)
  const [preRetirementReturn, setPreRetirementReturn] = useState(12)
  const [postRetirementReturn, setPostRetirementReturn] = useState(7)
  const [inflationRate, setInflationRate] = useState(6)
  const [epfContribution, setEpfContribution] = useState(1800)
  const [npsContribution, setNpsContribution] = useState(5000)
  const [withdrawalStrategy, setWithdrawalStrategy] = useState("4percent")

  // Calculated results
  const [retirementCorpus, setRetirementCorpus] = useState(0)
  const [monthlyIncomeNeeded, setMonthlyIncomeNeeded] = useState(0)
  const [retirementShortfall, setRetirementShortfall] = useState(0)
  const [confidenceScore, setConfidenceScore] = useState(0)
  const [fundDepletionAge, setFundDepletionAge] = useState(0)
  const [chartData, setChartData] = useState<any[]>([])
  const [withdrawalChartData, setWithdrawalChartData] = useState<any[]>([])
  const [allocationData, setAllocationData] = useState<any[]>([])

  // Calculate retirement needs
  useEffect(() => {
    // Years until retirement
    const yearsToRetirement = retirementAge - currentAge

    // Years in retirement
    const yearsInRetirement = lifeExpectancy - retirementAge

    // Monthly expenses adjusted for inflation at retirement
    const inflationAdjustedExpenses = expectedMonthlyExpenses * Math.pow(1 + inflationRate / 100, yearsToRetirement)
    setMonthlyIncomeNeeded(inflationAdjustedExpenses)

    // Calculate retirement corpus needed
    let corpus = 0
    let currentCorpus = currentSavings
    const monthlyInvestment = monthlyContribution + epfContribution + npsContribution

    // Pre-retirement growth
    const monthlyReturnRate = Math.pow(1 + preRetirementReturn / 100, 1 / 12) - 1

    // Generate chart data for corpus growth
    const growthData = []

    // Calculate corpus growth year by year
    for (let year = 0; year <= yearsToRetirement; year++) {
      growthData.push({
        age: currentAge + year,
        corpus: Math.round(currentCorpus),
        contribution: year === 0 ? 0 : Math.round(monthlyInvestment * 12),
        returns: year === 0 ? 0 : Math.round(currentCorpus - growthData[year - 1].corpus - monthlyInvestment * 12),
      })

      // Grow corpus for next year
      if (year < yearsToRetirement) {
        for (let month = 0; month < 12; month++) {
          currentCorpus = currentCorpus * (1 + monthlyReturnRate) + monthlyInvestment
        }
      }
    }

    corpus = currentCorpus
    setRetirementCorpus(corpus)

    // Calculate withdrawal phase
    const withdrawalData = []
    const monthlyPostReturnRate = Math.pow(1 + postRetirementReturn / 100, 1 / 12) - 1
    const monthlyInflationRate = Math.pow(1 + inflationRate / 100, 1 / 12) - 1

    let currentWithdrawalAmount = inflationAdjustedExpenses
    let remainingCorpus = corpus
    let depletionAge = retirementAge

    // Different withdrawal strategies
    let withdrawalRate = 0
    switch (withdrawalStrategy) {
      case "4percent":
        withdrawalRate = 0.04 / 12
        break
      case "5percent":
        withdrawalRate = 0.05 / 12
        break
      case "6percent":
        withdrawalRate = 0.06 / 12
        break
      case "dynamic":
        // Dynamic withdrawal will be calculated inside the loop
        break
      default:
        withdrawalRate = 0.04 / 12
    }

    for (let year = 0; year <= yearsInRetirement && remainingCorpus > 0; year++) {
      const age = retirementAge + year

      if (withdrawalStrategy === "dynamic") {
        // Dynamic withdrawal adjusts based on remaining corpus
        const annualWithdrawal = Math.min(currentWithdrawalAmount * 12, remainingCorpus * 0.05)
        currentWithdrawalAmount = annualWithdrawal / 12
      } else {
        // Fixed percentage withdrawal
        if (year > 0) {
          // Adjust for inflation each year
          currentWithdrawalAmount = currentWithdrawalAmount * (1 + inflationRate / 100)
        }
      }

      withdrawalData.push({
        age: age,
        corpus: Math.max(0, Math.round(remainingCorpus)),
        withdrawal: Math.round(currentWithdrawalAmount * 12),
        returns:
          year === 0
            ? 0
            : Math.round(remainingCorpus - withdrawalData[year - 1].corpus + withdrawalData[year - 1].withdrawal),
      })

      // Calculate corpus for next year
      if (withdrawalStrategy !== "dynamic") {
        for (let month = 0; month < 12 && remainingCorpus > 0; month++) {
          remainingCorpus = Math.max(0, remainingCorpus * (1 + monthlyPostReturnRate) - currentWithdrawalAmount)
        }
      } else {
        // For dynamic strategy, calculate yearly
        remainingCorpus = Math.max(0, remainingCorpus * (1 + postRetirementReturn / 100) - currentWithdrawalAmount * 12)
      }

      if (remainingCorpus <= 0 && depletionAge === retirementAge) {
        depletionAge = age
      }
    }

    // If corpus never depletes within life expectancy
    if (depletionAge === retirementAge && remainingCorpus > 0) {
      depletionAge = lifeExpectancy + 1
    }

    setFundDepletionAge(depletionAge)

    // Calculate shortfall or surplus
    const shortfall =
      depletionAge < lifeExpectancy
        ? -1 *
          (lifeExpectancy - depletionAge) *
          12 *
          inflationAdjustedExpenses *
          Math.pow(1 + inflationRate / 100, depletionAge - retirementAge)
        : remainingCorpus

    setRetirementShortfall(shortfall)

    // Calculate confidence score (0-100)
    let score = 0
    if (depletionAge >= lifeExpectancy) {
      // If funds last beyond life expectancy, score based on surplus
      const surplusYears =
        remainingCorpus /
        (12 * inflationAdjustedExpenses * Math.pow(1 + inflationRate / 100, lifeExpectancy - retirementAge))
      score = Math.min(100, 80 + surplusYears * 4)
    } else {
      // If funds deplete before life expectancy, score based on how close to life expectancy
      score = Math.max(0, Math.min(75, ((depletionAge - retirementAge) / (lifeExpectancy - retirementAge)) * 75))
    }

    setConfidenceScore(Math.round(score))

    // Combine growth and withdrawal data for the chart
    setChartData([...growthData, ...withdrawalData.slice(1)])
    setWithdrawalChartData(withdrawalData)

    // Calculate recommended allocation
    const equityAllocation = Math.max(0, Math.min(80, 100 - currentAge))
    const debtAllocation = 100 - equityAllocation

    setAllocationData([
      { name: "Equity", value: equityAllocation },
      { name: "Debt", value: debtAllocation },
    ])
  }, [
    currentAge,
    retirementAge,
    lifeExpectancy,
    currentSavings,
    monthlyContribution,
    expectedMonthlyExpenses,
    preRetirementReturn,
    postRetirementReturn,
    inflationRate,
    epfContribution,
    npsContribution,
    withdrawalStrategy,
  ])

  // Format currency
  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Cr`
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)} L`
    } else if (value >= 1000) {
      return `₹${(value / 1000).toFixed(2)} K`
    } else {
      return `₹${value.toFixed(0)}`
    }
  }

  // Format tooltip values
  const formatTooltipValue = (value: number, name: string) => {
    if (name === "age") return `Age: ${value}`
    return `${name}: ${formatCurrency(value)}`
  }

  // Colors for charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  return (
    <div className="container mx-auto py-8">
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Retirement Calculator</h1>
          <p className="text-muted-foreground">
            Plan your retirement with our comprehensive calculator that factors in inflation, life expectancy, and
            withdrawal strategies.
          </p>
        </div>

        <Tabs defaultValue="calculator" className="space-y-4">
          <TabsList>
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="strategy">Strategy</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Enter your current age and retirement goals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="current-age">Current Age: {currentAge}</Label>
                      <span className="text-sm text-muted-foreground">{currentAge} years</span>
                    </div>
                    <Slider
                      id="current-age"
                      min={18}
                      max={70}
                      step={1}
                      value={[currentAge]}
                      onValueChange={(value) => setCurrentAge(value[0])}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="retirement-age">Retirement Age: {retirementAge}</Label>
                      <span className="text-sm text-muted-foreground">{retirementAge} years</span>
                    </div>
                    <Slider
                      id="retirement-age"
                      min={45}
                      max={80}
                      step={1}
                      value={[retirementAge]}
                      onValueChange={(value) => setRetirementAge(value[0])}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="life-expectancy">Life Expectancy: {lifeExpectancy}</Label>
                      <span className="text-sm text-muted-foreground">{lifeExpectancy} years</span>
                    </div>
                    <Slider
                      id="life-expectancy"
                      min={70}
                      max={100}
                      step={1}
                      value={[lifeExpectancy]}
                      onValueChange={(value) => setLifeExpectancy(value[0])}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Financial Information</CardTitle>
                  <CardDescription>Enter your current savings and monthly contributions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-savings">Current Retirement Savings</Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">₹</span>
                      <Input
                        id="current-savings"
                        type="number"
                        placeholder="1,000,000"
                        className="pl-8"
                        value={currentSavings}
                        onChange={(e) => setCurrentSavings(Number(e.target.value))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="monthly-contribution">Monthly Contribution</Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">₹</span>
                      <Input
                        id="monthly-contribution"
                        type="number"
                        placeholder="20,000"
                        className="pl-8"
                        value={monthlyContribution}
                        onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="monthly-expenses">Expected Monthly Expenses in Retirement</Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">₹</span>
                      <Input
                        id="monthly-expenses"
                        type="number"
                        placeholder="50,000"
                        className="pl-8"
                        value={expectedMonthlyExpenses}
                        onChange={(e) => setExpectedMonthlyExpenses(Number(e.target.value))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Return & Inflation Assumptions</CardTitle>
                  <CardDescription>Set your expected returns and inflation rates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="pre-retirement-return" className="flex items-center">
                        Pre-Retirement Return
                        <TooltipProvider>
                          <TooltipUI>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 ml-1 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">Expected annual return on investments before retirement</p>
                            </TooltipContent>
                          </TooltipUI>
                        </TooltipProvider>
                      </Label>
                      <span className="text-sm text-muted-foreground">{preRetirementReturn}%</span>
                    </div>
                    <Slider
                      id="pre-retirement-return"
                      min={4}
                      max={18}
                      step={0.5}
                      value={[preRetirementReturn]}
                      onValueChange={(value) => setPreRetirementReturn(value[0])}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="post-retirement-return" className="flex items-center">
                        Post-Retirement Return
                        <TooltipProvider>
                          <TooltipUI>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 ml-1 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                Expected annual return on investments after retirement (typically lower due to
                                conservative allocation)
                              </p>
                            </TooltipContent>
                          </TooltipUI>
                        </TooltipProvider>
                      </Label>
                      <span className="text-sm text-muted-foreground">{postRetirementReturn}%</span>
                    </div>
                    <Slider
                      id="post-retirement-return"
                      min={4}
                      max={12}
                      step={0.5}
                      value={[postRetirementReturn]}
                      onValueChange={(value) => setPostRetirementReturn(value[0])}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="inflation-rate" className="flex items-center">
                        Inflation Rate
                        <TooltipProvider>
                          <TooltipUI>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 ml-1 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">Expected annual inflation rate</p>
                            </TooltipContent>
                          </TooltipUI>
                        </TooltipProvider>
                      </Label>
                      <span className="text-sm text-muted-foreground">{inflationRate}%</span>
                    </div>
                    <Slider
                      id="inflation-rate"
                      min={2}
                      max={10}
                      step={0.5}
                      value={[inflationRate]}
                      onValueChange={(value) => setInflationRate(value[0])}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Retirement Benefits</CardTitle>
                  <CardDescription>Include your EPF and NPS contributions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="epf-contribution">Monthly EPF Contribution</Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">₹</span>
                      <Input
                        id="epf-contribution"
                        type="number"
                        placeholder="1,800"
                        className="pl-8"
                        value={epfContribution}
                        onChange={(e) => setEpfContribution(Number(e.target.value))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nps-contribution">Monthly NPS Contribution</Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">₹</span>
                      <Input
                        id="nps-contribution"
                        type="number"
                        placeholder="5,000"
                        className="pl-8"
                        value={npsContribution}
                        onChange={(e) => setNpsContribution(Number(e.target.value))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="withdrawal-strategy">Withdrawal Strategy</Label>
                    <Select value={withdrawalStrategy} onValueChange={setWithdrawalStrategy}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a withdrawal strategy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4percent">4% Rule (Conservative)</SelectItem>
                        <SelectItem value="5percent">5% Rule (Moderate)</SelectItem>
                        <SelectItem value="6percent">6% Rule (Aggressive)</SelectItem>
                        <SelectItem value="dynamic">Dynamic Withdrawal</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">
                      The withdrawal strategy determines how much you'll withdraw from your retirement corpus each year.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Retirement Readiness</CardTitle>
                  <CardDescription>Your retirement confidence score</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="relative w-40 h-40 flex items-center justify-center">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                          className="text-muted-foreground/20"
                          strokeWidth="10"
                          stroke="currentColor"
                          fill="transparent"
                          r="40"
                          cx="50"
                          cy="50"
                        />
                        <circle
                          className={`${
                            confidenceScore >= 75
                              ? "text-green-500"
                              : confidenceScore >= 50
                                ? "text-amber-500"
                                : "text-red-500"
                          }`}
                          strokeWidth="10"
                          strokeDasharray={`${confidenceScore * 2.51} 251`}
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          r="40"
                          cx="50"
                          cy="50"
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold">{confidenceScore}</span>
                        <span className="text-xs text-muted-foreground">Confidence Score</span>
                      </div>
                    </div>

                    <div className="text-center">
                      <h3 className="text-lg font-semibold">
                        {confidenceScore >= 75
                          ? "Excellent"
                          : confidenceScore >= 50
                            ? "Good"
                            : confidenceScore >= 25
                              ? "Needs Attention"
                              : "Critical"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {confidenceScore >= 75
                          ? "You're on track for a comfortable retirement"
                          : confidenceScore >= 50
                            ? "You're making good progress, but could improve"
                            : confidenceScore >= 25
                              ? "Your retirement plan needs significant improvements"
                              : "Your retirement plan needs immediate attention"}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Years until retirement:</span>
                      <span className="font-medium">{retirementAge - currentAge} years</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Expected retirement duration:</span>
                      <span className="font-medium">{lifeExpectancy - retirementAge} years</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Funds will last until age:</span>
                      <span
                        className={`font-medium ${fundDepletionAge >= lifeExpectancy ? "text-green-500" : "text-red-500"}`}
                      >
                        {fundDepletionAge > lifeExpectancy ? "Beyond life expectancy" : fundDepletionAge}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Retirement Summary</CardTitle>
                  <CardDescription>Key financial metrics for your retirement</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Retirement Corpus</span>
                        <span className="text-sm font-medium">{formatCurrency(retirementCorpus)}</span>
                      </div>
                      <Progress value={100} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">Estimated savings at retirement age</p>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Monthly Income Needed</span>
                        <span className="text-sm font-medium">{formatCurrency(monthlyIncomeNeeded)}</span>
                      </div>
                      <Progress value={100} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        Inflation-adjusted monthly expenses at retirement
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">
                          {retirementShortfall >= 0 ? "Surplus" : "Shortfall"}
                        </span>
                        <span
                          className={`text-sm font-medium ${retirementShortfall >= 0 ? "text-green-500" : "text-red-500"}`}
                        >
                          {formatCurrency(Math.abs(retirementShortfall))}
                        </span>
                      </div>
                      <Progress value={100} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {retirementShortfall >= 0
                          ? "Extra funds available at life expectancy"
                          : "Additional funds needed to reach life expectancy"}
                      </p>
                    </div>

                    <Alert
                      className={
                        retirementShortfall >= 0 ? "bg-green-50 dark:bg-green-950/20" : "bg-red-50 dark:bg-red-950/20"
                      }
                    >
                      <div className="flex items-start">
                        {retirementShortfall >= 0 ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 mr-2" />
                        )}
                        <div>
                          <AlertTitle
                            className={
                              retirementShortfall >= 0
                                ? "text-green-700 dark:text-green-300"
                                : "text-red-700 dark:text-red-300"
                            }
                          >
                            {retirementShortfall >= 0 ? "On Track" : "Action Needed"}
                          </AlertTitle>
                          <AlertDescription className="text-sm">
                            {retirementShortfall >= 0
                              ? `Your retirement plan is on track. You'll have approximately ${formatCurrency(retirementShortfall)} remaining at your life expectancy.`
                              : `To meet your retirement goals, consider increasing your monthly contribution by approximately ${formatCurrency(Math.abs(retirementShortfall) / ((retirementAge - currentAge) * 12))}.`}
                          </AlertDescription>
                        </div>
                      </div>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Retirement Fund Projection</CardTitle>
                <CardDescription>Projected growth and depletion of your retirement corpus</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="age" label={{ value: "Age", position: "insideBottomRight", offset: -10 }} />
                      <YAxis tickFormatter={(value) => formatCurrency(value)} width={80} />
                      <Tooltip
                        formatter={(value, name) => [
                          formatCurrency(value as number),
                          name === "corpus"
                            ? "Corpus"
                            : name === "contribution"
                              ? "Annual Contribution"
                              : "Annual Returns",
                        ]}
                        labelFormatter={(value) => `Age: ${value}`}
                      />
                      <Area
                        type="monotone"
                        dataKey="corpus"
                        stackId="1"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.6}
                        name="Corpus"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center mt-4 text-sm text-muted-foreground">
                  <div className="flex items-center mr-4">
                    <div className="w-3 h-3 bg-[#8884d8] rounded-sm mr-1"></div>
                    <span>Retirement Corpus</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 border border-dashed border-red-500 rounded-sm mr-1"></div>
                    <span>Retirement Age ({retirementAge})</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="strategy" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Asset Allocation</CardTitle>
                  <CardDescription>Suggested investment allocation based on your age</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={allocationData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {allocationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend />
                        <Tooltip formatter={(value) => [`${value}%`, ""]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">
                      This allocation follows the age-based rule of thumb: "100 minus your age" for equity allocation.
                      Adjust based on your risk tolerance and financial goals.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Withdrawal Strategy</CardTitle>
                  <CardDescription>Understanding your selected withdrawal approach</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-medium mb-2 flex items-center">
                      <Percent className="h-4 w-4 mr-2" />
                      {withdrawalStrategy === "4percent"
                        ? "4% Rule (Conservative)"
                        : withdrawalStrategy === "5percent"
                          ? "5% Rule (Moderate)"
                          : withdrawalStrategy === "6percent"
                            ? "6% Rule (Aggressive)"
                            : "Dynamic Withdrawal"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {withdrawalStrategy === "4percent"
                        ? "Withdraw 4% of your initial retirement corpus in the first year, then adjust that amount for inflation each year. This is considered safe for a 30-year retirement."
                        : withdrawalStrategy === "5percent"
                          ? "Withdraw 5% of your initial retirement corpus in the first year, then adjust for inflation. This provides more income but increases the risk of running out of money."
                          : withdrawalStrategy === "6percent"
                            ? "Withdraw 6% of your initial retirement corpus in the first year, then adjust for inflation. This maximizes early retirement income but has the highest risk."
                            : "Adjust your withdrawal rate based on market performance and remaining corpus. This provides flexibility but requires more active management."}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Withdrawal Projection
                    </h3>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={withdrawalChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="age" />
                          <YAxis tickFormatter={(value) => formatCurrency(value)} width={80} />
                          <Tooltip
                            formatter={(value, name) => [
                              formatCurrency(value as number),
                              name === "withdrawal" ? "Annual Withdrawal" : "Remaining Corpus",
                            ]}
                            labelFormatter={(value) => `Age: ${value}`}
                          />
                          <Area
                            type="monotone"
                            dataKey="withdrawal"
                            stroke="#82ca9d"
                            fill="#82ca9d"
                            fillOpacity={0.6}
                            name="Annual Withdrawal"
                          />
                          <Area
                            type="monotone"
                            dataKey="corpus"
                            stroke="#8884d8"
                            fill="#8884d8"
                            fillOpacity={0.3}
                            name="Remaining Corpus"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Withdrawal Strategy Tips</AlertTitle>
                    <AlertDescription>
                      <ul className="list-disc pl-5 text-sm space-y-1 mt-2">
                        <li>Consider a more conservative withdrawal rate if you expect to live longer than average</li>
                        <li>Adjust your withdrawal strategy during market downturns to preserve capital</li>
                        <li>Review and adjust your plan annually based on actual returns and expenses</li>
                        <li>Consider annuities for guaranteed income to cover essential expenses</li>
                      </ul>
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Retirement Planning Tips</CardTitle>
                <CardDescription>Strategies to improve your retirement readiness</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2 flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                      Increase Savings Rate
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Aim to save at least 15-20% of your income for retirement. Even small increases can have a
                      significant impact over time.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2 flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                      Maximize EPF & NPS
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Take full advantage of employer matching in EPF and consider additional voluntary contributions to
                      NPS for tax benefits.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2 flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                      Diversify Investments
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Spread your investments across different asset classes including equity, debt, gold, and real
                      estate to manage risk.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2 flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                      Reduce Debt
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Aim to be debt-free by retirement, especially high-interest debt like credit cards and personal
                      loans.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2 flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                      Health Insurance
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Secure comprehensive health insurance to protect your retirement corpus from unexpected medical
                      expenses.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2 flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                      Regular Reviews
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Review your retirement plan annually and adjust as needed based on changing circumstances and
                      goals.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

