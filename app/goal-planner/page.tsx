"use client"

import { useState } from "react"
import { ArrowRight, Calculator, ChevronRight, Home, Landmark, GraduationCap, Plus, Edit, Save, X } from "lucide-react"
import Link from "next/link"
import React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { Progress } from "@/components/ui/progress"
import { ChartContainer } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export default function GoalPlannerPage() {
  const [goals, setGoals] = useState([
    {
      id: 1,
      name: "Home Purchase",
      icon: Home,
      targetAmount: 5000000,
      currentSavings: 1000000,
      timeframe: 5,
      inflationRate: 6,
      expectedReturn: 12,
      monthlyContribution: 50000,
    },
  ])
  const [editingGoalId, setEditingGoalId] = useState<number | null>(null)

  const [editedGoal, setEditedGoal] = useState<{
    name: string
    targetAmount: number
    currentSavings: number
    timeframe: number
    inflationRate: number
    expectedReturn: number
  } | null>(null)

  const [activeGoalId, setActiveGoalId] = useState(1)
  const [showAddGoal, setShowAddGoal] = useState(false)
  const [newGoal, setNewGoal] = useState({
    name: "",
    targetAmount: 1000000,
    currentSavings: 0,
    timeframe: 5,
    inflationRate: 6,
    expectedReturn: 12,
  })

  // Add defensive checks for goal calculations
  const calculateMonthlyContribution = (goal: typeof safeActiveGoal) => {
    if (!goal || goal.targetAmount <= 0 || goal.timeframe <= 0) return 0

    const inflationAdjustedTarget = goal.targetAmount * Math.pow(1 + goal.inflationRate / 100, goal.timeframe)
    const monthlyRate = goal.expectedReturn / 12 / 100
    const months = goal.timeframe * 12

    // Handle edge case where current savings might exceed target
    if (goal.currentSavings >= inflationAdjustedTarget) return 0

    const futureValueOfCurrentSavings = goal.currentSavings * Math.pow(1 + monthlyRate, months)
    const amountNeeded = inflationAdjustedTarget - futureValueOfCurrentSavings

    if (amountNeeded <= 0) return 0

    // Handle edge case where monthly rate is very close to zero
    if (Math.abs(monthlyRate) < 0.0001) {
      return amountNeeded / months
    }

    const monthlyContribution = (amountNeeded * monthlyRate) / (Math.pow(1 + monthlyRate, months) - 1)
    return Math.round(monthlyContribution)
  }

  const generateProjectionData = (goal: typeof safeActiveGoal) => {
    if (!goal || goal.timeframe <= 0) return []

    const data = []
    const monthlyRate = goal.expectedReturn / 12 / 100
    const inflationMonthlyRate = goal.inflationRate / 12 / 100
    const currentSavings = goal.currentSavings
    const monthlyContribution = calculateMonthlyContribution(goal)

    for (let year = 0; year <= goal.timeframe; year++) {
      const months = year * 12
      let futureValue = currentSavings * Math.pow(1 + monthlyRate, months)

      if (year > 0) {
        futureValue += monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
      }

      const inflationAdjustedTarget = goal.targetAmount * Math.pow(1 + inflationMonthlyRate, months)

      data.push({
        year: `Year ${year}`,
        savings: Math.round(futureValue),
        target: Math.round(inflationAdjustedTarget),
      })
    }

    return data
  }

  // Find the active goal
  const activeGoal = goals.find((goal) => goal.id === activeGoalId) || goals[0]

  // If no active goal exists, redirect to add goal form
  React.useEffect(() => {
    if (goals.length === 0 && !showAddGoal) {
      setShowAddGoal(true)
    }
  }, [goals, showAddGoal])

  // If no active goal and we're not showing add goal form, use a default
  const safeActiveGoal = activeGoal || {
    id: 0,
    name: "Default Goal",
    icon: Home,
    targetAmount: 0,
    currentSavings: 0,
    timeframe: 5,
    inflationRate: 6,
    expectedReturn: 12,
    monthlyContribution: 0,
  }

  // Add a check before adding a new goal
  const handleAddGoal = () => {
    if (!newGoal.name) return

    const newGoalWithId = {
      ...newGoal,
      id: goals.length + 1,
      icon: getIconForGoal(newGoal.name),
      monthlyContribution: calculateMonthlyContribution({
        ...newGoal,
        id: goals.length + 1,
        icon: getIconForGoal(newGoal.name),
        currentSavings: newGoal.currentSavings,
        targetAmount: newGoal.targetAmount,
        timeframe: newGoal.timeframe,
        inflationRate: newGoal.inflationRate,
        expectedReturn: newGoal.expectedReturn,
        monthlyContribution: 0,
      }),
    }

    setGoals([...goals, newGoalWithId])
    setActiveGoalId(newGoalWithId.id)
    setShowAddGoal(false)
    setNewGoal({
      name: "",
      targetAmount: 1000000,
      currentSavings: 0,
      timeframe: 5,
      inflationRate: 6,
      expectedReturn: 12,
    })
  }

  const getIconForGoal = (goalName: string) => {
    const lowerCaseName = goalName.toLowerCase()
    if (lowerCaseName.includes("home") || lowerCaseName.includes("house")) return Home
    if (lowerCaseName.includes("education") || lowerCaseName.includes("college")) return GraduationCap
    if (lowerCaseName.includes("retirement")) return Landmark
    return Calculator
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value)
  }

  const chartConfig = {
    savings: {
      label: "Projected Savings",
      color: "hsl(var(--chart-1))",
    },
    target: {
      label: "Target (Inflation Adjusted)",
      color: "hsl(var(--chart-2))",
    },
  }

  const projectionData = generateProjectionData(safeActiveGoal)
  const progressPercentage = Math.min(100, (safeActiveGoal.currentSavings / safeActiveGoal.targetAmount) * 100 || 0)
  const monthlyContribution = calculateMonthlyContribution(safeActiveGoal)

  // Start editing a goal
  const handleEditGoal = (goalId: number) => {
    const goalToEdit = goals.find((goal) => goal.id === goalId)
    if (!goalToEdit) return

    setEditingGoalId(goalId)
    setEditedGoal({
      name: goalToEdit.name,
      targetAmount: goalToEdit.targetAmount,
      currentSavings: goalToEdit.currentSavings,
      timeframe: goalToEdit.timeframe,
      inflationRate: goalToEdit.inflationRate,
      expectedReturn: goalToEdit.expectedReturn,
    })
  }

  // Save edited goal
  const handleSaveEdit = () => {
    if (!editedGoal || editingGoalId === null) return

    const updatedGoals = goals.map((goal) => {
      if (goal.id === editingGoalId) {
        const updatedGoal = {
          ...goal,
          ...editedGoal,
          monthlyContribution: calculateMonthlyContribution({
            ...goal,
            ...editedGoal,
          }),
        }
        return updatedGoal
      }
      return goal
    })

    setGoals(updatedGoals)
    setEditingGoalId(null)
    setEditedGoal(null)
  }

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingGoalId(null)
    setEditedGoal(null)
  }

  // Delete a goal
  const handleDeleteGoal = (goalId: number) => {
    const updatedGoals = goals.filter((goal) => goal.id !== goalId)
    setGoals(updatedGoals)

    // If we deleted the active goal, set a new active goal
    if (activeGoalId === goalId && updatedGoals.length > 0) {
      setActiveGoalId(updatedGoals[0].id)
    } else if (updatedGoals.length === 0) {
      setShowAddGoal(true)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-10">
        <h1 className="text-3xl font-bold mb-6">Financial Goal Planner</h1>

        <div className="grid gap-6 md:grid-cols-[300px_1fr]">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Goals</CardTitle>
                <CardDescription>Track and manage your financial goals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {goals.map((goal) => (
                  <div key={goal.id} className="flex items-center w-full">
                    <Button
                      variant={activeGoalId === goal.id ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setActiveGoalId(goal.id)}
                    >
                      <goal.icon className="mr-2 h-4 w-4" />
                      {goal.name}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleEditGoal(goal.id)} className="ml-1">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteGoal(goal.id)}
                      className="ml-1 text-destructive"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                ))}

                <Button variant="outline" className="w-full justify-start" onClick={() => setShowAddGoal(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Goal
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">Use our calculators to plan your investments better</p>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/calculators/sip">
                    <Calculator className="mr-2 h-4 w-4" />
                    SIP Calculator
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/investor-profile">
                    <Calculator className="mr-2 h-4 w-4" />
                    Investor Profile
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div>
            {showAddGoal ? (
              <Card>
                <CardHeader>
                  <CardTitle>Add New Goal</CardTitle>
                  <CardDescription>Set up a new financial goal to track</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="goal-name">Goal Name</Label>
                    <Input
                      id="goal-name"
                      placeholder="e.g., Home Purchase, Education, Retirement"
                      value={newGoal.name}
                      onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="target-amount">Target Amount (₹)</Label>
                      <Input
                        id="target-amount"
                        type="number"
                        value={newGoal.targetAmount}
                        onChange={(e) => setNewGoal({ ...newGoal, targetAmount: Number(e.target.value) })}
                        className="w-32 text-right"
                      />
                    </div>
                    <Slider
                      id="target-amount-slider"
                      min={100000}
                      max={10000000}
                      step={100000}
                      value={[newGoal.targetAmount]}
                      onValueChange={(value) => setNewGoal({ ...newGoal, targetAmount: value[0] })}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="current-savings">Current Savings (₹)</Label>
                      <Input
                        id="current-savings"
                        type="number"
                        value={newGoal.currentSavings}
                        onChange={(e) => setNewGoal({ ...newGoal, currentSavings: Number(e.target.value) })}
                        className="w-32 text-right"
                      />
                    </div>
                    <Slider
                      id="current-savings-slider"
                      min={0}
                      max={newGoal.targetAmount}
                      step={10000}
                      value={[newGoal.currentSavings]}
                      onValueChange={(value) => setNewGoal({ ...newGoal, currentSavings: value[0] })}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="timeframe">Timeframe (Years)</Label>
                      <Input
                        id="timeframe"
                        type="number"
                        value={newGoal.timeframe}
                        onChange={(e) => setNewGoal({ ...newGoal, timeframe: Number(e.target.value) })}
                        className="w-32 text-right"
                      />
                    </div>
                    <Slider
                      id="timeframe-slider"
                      min={1}
                      max={30}
                      step={1}
                      value={[newGoal.timeframe]}
                      onValueChange={(value) => setNewGoal({ ...newGoal, timeframe: value[0] })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="inflation-rate">Inflation Rate (%)</Label>
                      <Select
                        value={newGoal.inflationRate.toString()}
                        onValueChange={(value) => setNewGoal({ ...newGoal, inflationRate: Number(value) })}
                      >
                        <SelectTrigger id="inflation-rate">
                          <SelectValue placeholder="Select inflation rate" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="4">4%</SelectItem>
                          <SelectItem value="5">5%</SelectItem>
                          <SelectItem value="6">6%</SelectItem>
                          <SelectItem value="7">7%</SelectItem>
                          <SelectItem value="8">8%</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expected-return">Expected Return (%)</Label>
                      <Select
                        value={newGoal.expectedReturn.toString()}
                        onValueChange={(value) => setNewGoal({ ...newGoal, expectedReturn: Number(value) })}
                      >
                        <SelectTrigger id="expected-return">
                          <SelectValue placeholder="Select expected return" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="8">8%</SelectItem>
                          <SelectItem value="10">10%</SelectItem>
                          <SelectItem value="12">12%</SelectItem>
                          <SelectItem value="14">14%</SelectItem>
                          <SelectItem value="16">16%</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setShowAddGoal(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddGoal} disabled={!newGoal.name}>
                    Add Goal
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center">
                          <safeActiveGoal.icon className="mr-2 h-5 w-5" />
                          {safeActiveGoal.name}
                        </CardTitle>
                        <CardDescription>Target: {formatCurrency(safeActiveGoal.targetAmount)}</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleEditGoal(safeActiveGoal.id)}>
                        Edit Goal
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress: {Math.round(progressPercentage)}%</span>
                        <span>
                          {formatCurrency(safeActiveGoal.currentSavings)} of{" "}
                          {formatCurrency(safeActiveGoal.targetAmount)}
                        </span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="rounded-lg bg-muted p-4">
                        <div className="text-sm font-medium text-muted-foreground">Monthly Contribution</div>
                        <div className="text-2xl font-bold">{formatCurrency(monthlyContribution)}</div>
                      </div>
                      <div className="rounded-lg bg-muted p-4">
                        <div className="text-sm font-medium text-muted-foreground">Time Remaining</div>
                        <div className="text-2xl font-bold">{safeActiveGoal.timeframe} years</div>
                      </div>
                      <div className="rounded-lg bg-muted p-4">
                        <div className="text-sm font-medium text-muted-foreground">Inflation-Adjusted Target</div>
                        <div className="text-2xl font-bold">
                          {formatCurrency(
                            safeActiveGoal.targetAmount *
                              Math.pow(1 + safeActiveGoal.inflationRate / 100, safeActiveGoal.timeframe),
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Savings Projection</CardTitle>
                    <CardDescription>
                      Based on monthly contribution of {formatCurrency(monthlyContribution)} with{" "}
                      {safeActiveGoal.expectedReturn}% expected return
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="chart">
                      <TabsList className="grid w-full max-w-md grid-cols-2">
                        <TabsTrigger value="chart">Chart</TabsTrigger>
                        <TabsTrigger value="table">Table</TabsTrigger>
                      </TabsList>
                      <TabsContent value="chart" className="pt-4">
                        <div className="h-80">
                          <ChartContainer config={chartConfig} className="h-full">
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={projectionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
                                <Tooltip
                                  formatter={(value) => formatCurrency(value as number)}
                                  labelFormatter={(label) => label}
                                />
                                <Legend />
                                <Area
                                  type="monotone"
                                  dataKey="savings"
                                  stroke="hsl(var(--chart-1))"
                                  fill="hsl(var(--chart-1))"
                                  name="Projected Savings"
                                />
                                <Area
                                  type="monotone"
                                  dataKey="target"
                                  stroke="hsl(var(--chart-2))"
                                  fill="hsl(var(--chart-2))"
                                  name="Target (Inflation Adjusted)"
                                />
                              </AreaChart>
                            </ResponsiveContainer>
                          </ChartContainer>
                        </div>
                      </TabsContent>
                      <TabsContent value="table" className="pt-4">
                        <div className="border rounded-md">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left p-2">Year</th>
                                <th className="text-right p-2">Projected Savings</th>
                                <th className="text-right p-2">Target (Inflation Adjusted)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {projectionData.map((data, index) => (
                                <tr key={index} className="border-b">
                                  <td className="p-2">{data.year}</td>
                                  <td className="text-right p-2">{formatCurrency(data.savings)}</td>
                                  <td className="text-right p-2">{formatCurrency(data.target)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <Link href="/calculators/sip">
                        Optimize Your Investments
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}
            {editingGoalId !== null && editedGoal && (
              <Card>
                <CardHeader>
                  <CardTitle>Edit Goal</CardTitle>
                  <CardDescription>Update your financial goal</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-goal-name">Goal Name</Label>
                    <Input
                      id="edit-goal-name"
                      value={editedGoal.name}
                      onChange={(e) => setEditedGoal({ ...editedGoal, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="edit-target-amount">Target Amount (₹)</Label>
                      <Input
                        id="edit-target-amount"
                        type="number"
                        value={editedGoal.targetAmount}
                        onChange={(e) => setEditedGoal({ ...editedGoal, targetAmount: Number(e.target.value) })}
                        className="w-32 text-right"
                      />
                    </div>
                    <Slider
                      id="edit-target-amount-slider"
                      min={100000}
                      max={10000000}
                      step={100000}
                      value={[editedGoal.targetAmount]}
                      onValueChange={(value) => setEditedGoal({ ...editedGoal, targetAmount: value[0] })}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="edit-current-savings">Current Savings (₹)</Label>
                      <Input
                        id="edit-current-savings"
                        type="number"
                        value={editedGoal.currentSavings}
                        onChange={(e) => setEditedGoal({ ...editedGoal, currentSavings: Number(e.target.value) })}
                        className="w-32 text-right"
                      />
                    </div>
                    <Slider
                      id="edit-current-savings-slider"
                      min={0}
                      max={editedGoal.targetAmount}
                      step={10000}
                      value={[editedGoal.currentSavings]}
                      onValueChange={(value) => setEditedGoal({ ...editedGoal, currentSavings: value[0] })}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="edit-timeframe">Timeframe (Years)</Label>
                      <Input
                        id="edit-timeframe"
                        type="number"
                        value={editedGoal.timeframe}
                        onChange={(e) => setEditedGoal({ ...editedGoal, timeframe: Number(e.target.value) })}
                        className="w-32 text-right"
                      />
                    </div>
                    <Slider
                      id="edit-timeframe-slider"
                      min={1}
                      max={30}
                      step={1}
                      value={[editedGoal.timeframe]}
                      onValueChange={(value) => setEditedGoal({ ...editedGoal, timeframe: value[0] })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-inflation-rate">Inflation Rate (%)</Label>
                      <Select
                        value={editedGoal.inflationRate.toString()}
                        onValueChange={(value) => setEditedGoal({ ...editedGoal, inflationRate: Number(value) })}
                      >
                        <SelectTrigger id="edit-inflation-rate">
                          <SelectValue placeholder="Select inflation rate" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="4">4%</SelectItem>
                          <SelectItem value="5">5%</SelectItem>
                          <SelectItem value="6">6%</SelectItem>
                          <SelectItem value="7">7%</SelectItem>
                          <SelectItem value="8">8%</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="edit-expected-return">Expected Return (%)</Label>
                      <Select
                        value={editedGoal.expectedReturn.toString()}
                        onValueChange={(value) => setEditedGoal({ ...editedGoal, expectedReturn: Number(value) })}
                      >
                        <SelectTrigger id="edit-expected-return">
                          <SelectValue placeholder="Select expected return" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="8">8%</SelectItem>
                          <SelectItem value="10">10%</SelectItem>
                          <SelectItem value="12">12%</SelectItem>
                          <SelectItem value="14">14%</SelectItem>
                          <SelectItem value="16">16%</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleCancelEdit}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveEdit} disabled={!editedGoal.name}>
                    Save Changes
                    <Save className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

