"use client"

import { useState } from "react"
import {
  ArrowRight,
  BarChart3,
  Brain,
  ChevronRight,
  Compass,
  Download,
  HelpCircle,
  LineChart,
  Target,
  Trophy,
  User,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SiteHeader } from "@/components/site-header"
import { Progress } from "@/components/ui/progress"
import { ChartContainer } from "@/components/ui/chart"
import {
  Cell,
  Pie,
  ResponsiveContainer,
  Tooltip,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  PieChart,
  Legend,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { RiskToleranceSlider } from "@/components/risk-tolerance-slider"
import { InvestorTypeComparison } from "@/components/investor-type-comparison"
import { KnowledgeQuiz } from "@/components/knowledge-quiz"
import { InvestmentStyleAnalysis } from "@/components/investment-style-analysis"
import { GoalAlignmentCheck } from "@/components/goal-alignment-check"
import { AssetAllocationRecommendation } from "@/components/asset-allocation-recommendation"

// Now update the currentAssessment handling to use the new components
export default function InvestorProfilePage() {
  const [activeTab, setActiveTab] = useState("risk-profile")
  const [showResults, setShowResults] = useState(false)
  const [currentAssessment, setCurrentAssessment] = useState<string | null>(null)
  const [completedAssessments, setCompletedAssessments] = useState<string[]>([])

  // Mock function to simulate completing an assessment
  const completeAssessment = (assessmentId: string) => {
    if (!completedAssessments.includes(assessmentId)) {
      setCompletedAssessments([...completedAssessments, assessmentId])
    }
    setCurrentAssessment(null)
    setShowResults(true)
  }

  // Calculate overall profile completion percentage
  const totalAssessments = 4
  const completionPercentage = (completedAssessments.length / totalAssessments) * 100

  // Mock investor profile data
  const investorProfile = {
    type: "Growth-oriented",
    description:
      "You prioritize long-term growth and can tolerate significant market volatility. You have a longer investment horizon.",
    riskScore: 72,
    investmentStyle: {
      active: 65,
      passive: 35,
      fundamental: 70,
      technical: 30,
      domestic: 60,
      international: 40,
    },
    allocation: [
      { name: "Equity", value: 65 },
      { name: "Debt Funds", value: 20 },
      { name: "International Equity", value: 10 },
      { name: "Cash", value: 5 },
    ],
    characteristics: [
      "Focus on capital appreciation",
      "Comfortable with market volatility",
      "Long-term investment perspective",
      "Willing to take calculated risks for higher returns",
    ],
    recommendations: [
      "Diversified equity mutual funds",
      "Mid and small-cap funds for growth",
      "Sectoral and thematic funds",
      "International equity for diversification",
    ],
    strengths: ["Long-term perspective", "Disciplined approach", "Diversification awareness"],
    weaknesses: [
      "May react to short-term volatility",
      "Could benefit from more international exposure",
      "Needs to increase emergency fund",
    ],
  }

  const assessmentCards = [
    {
      id: "risk-profile",
      title: "Risk Tolerance Assessment",
      description: "Discover your comfort level with investment risk and volatility",
      icon: BarChart3,
      color: "from-blue-500/20 to-blue-600/20",
      iconColor: "text-blue-500",
      duration: "5 min",
      questions: 8,
    },
    {
      id: "investment-style",
      title: "Investment Style Analysis",
      description: "Understand your approach to investment decisions and strategies",
      icon: Brain,
      color: "from-purple-500/20 to-purple-600/20",
      iconColor: "text-purple-500",
      duration: "7 min",
      questions: 10,
    },
    {
      id: "financial-knowledge",
      title: "Financial Knowledge Quiz",
      description: "Test your understanding of investment concepts and financial markets",
      icon: Compass,
      color: "from-emerald-500/20 to-emerald-600/20",
      iconColor: "text-emerald-500",
      duration: "8 min",
      questions: 12,
    },
    {
      id: "goal-alignment",
      title: "Goal Alignment Check",
      description: "Ensure your investment approach matches your financial goals",
      icon: Target,
      color: "from-amber-500/20 to-amber-600/20",
      iconColor: "text-amber-500",
      duration: "6 min",
      questions: 8,
    },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  const radarData = [
    { subject: "Risk Tolerance", A: 72, fullMark: 100 },
    { subject: "Time Horizon", A: 85, fullMark: 100 },
    { subject: "Financial Knowledge", A: 65, fullMark: 100 },
    { subject: "Investment Experience", A: 60, fullMark: 100 },
    { subject: "Goal Clarity", A: 80, fullMark: 100 },
    { subject: "Liquidity Needs", A: 55, fullMark: 100 },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-10">
        {!currentAssessment && !showResults ? (
          <>
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Investor Profile Dashboard</h1>
                <p className="text-muted-foreground">
                  Complete assessments to discover your investment personality and get personalized recommendations
                </p>
              </div>
              <Card className="w-full md:w-auto">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <p className="text-sm font-medium mb-1">Profile Completion</p>
                      <Progress value={completionPercentage} className="h-2" />
                    </div>
                    <div className="text-2xl font-bold text-primary">{Math.round(completionPercentage)}%</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
              {assessmentCards.map((card) => (
                <Card key={card.id} className="relative overflow-hidden card-hover">
                  {completedAssessments.includes(card.id) && (
                    <div className="absolute top-2 right-2 z-10">
                      <Badge variant="secondary" className="gap-1">
                        <CheckCircle2 className="h-3 w-3 text-green-500" />
                        Completed
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="pb-2">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r ${card.color}`}
                    >
                      <card.icon className={`h-6 w-6 ${card.iconColor}`} />
                    </div>
                    <CardTitle className="mt-4 text-xl">{card.title}</CardTitle>
                    <CardDescription>{card.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Duration: {card.duration}</span>
                      <span>{card.questions} questions</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={() => setCurrentAssessment(card.id)}
                      variant={completedAssessments.includes(card.id) ? "outline" : "default"}
                    >
                      {completedAssessments.includes(card.id) ? "Retake Assessment" : "Start Assessment"}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {completedAssessments.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-6">Your Investor Profile</h2>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full max-w-md grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="details">Detailed Analysis</TabsTrigger>
                    <TabsTrigger value="allocation">Asset Allocation</TabsTrigger>
                    <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="mt-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5 text-primary" />
                            Your Investor Type
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-col md:flex-row gap-6 items-center">
                            <div className="w-full md:w-1/2">
                              <h2 className="text-3xl font-bold text-primary mb-2">{investorProfile.type}</h2>
                              <p className="text-muted-foreground mb-4">{investorProfile.description}</p>
                              <div className="flex items-center gap-2 mb-4">
                                <div className="text-sm font-medium">Risk Score:</div>
                                <div className="flex-1">
                                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full"
                                      style={{ width: `${investorProfile.riskScore}%` }}
                                    ></div>
                                  </div>
                                </div>
                                <div className="font-bold">{investorProfile.riskScore}/100</div>
                              </div>
                            </div>
                            <div className="w-full md:w-1/2 h-64">
                              <ChartContainer className="h-full">
                                <ResponsiveContainer width="100%" height="100%">
                                  <PieChart>
                                    <Pie
                                      data={investorProfile.allocation}
                                      cx="50%"
                                      cy="50%"
                                      labelLine={true}
                                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                      outerRadius={80}
                                      fill="#8884d8"
                                      dataKey="value"
                                      animationDuration={1000}
                                    >
                                      {investorProfile.allocation.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                      ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => `${value}%`} />
                                  </PieChart>
                                </ResponsiveContainer>
                              </ChartContainer>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full" asChild>
                            <Link href="/goal-planner">
                              Apply This Profile to Goal Planner
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <LineChart className="h-5 w-5 text-primary" />
                            Investment Style
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Active Investing</span>
                                <span>Passive Investing</span>
                              </div>
                              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary rounded-full"
                                  style={{ width: `${investorProfile.investmentStyle.active}%` }}
                                ></div>
                              </div>
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>{investorProfile.investmentStyle.active}%</span>
                                <span>{investorProfile.investmentStyle.passive}%</span>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Fundamental Analysis</span>
                                <span>Technical Analysis</span>
                              </div>
                              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-secondary rounded-full"
                                  style={{ width: `${investorProfile.investmentStyle.fundamental}%` }}
                                ></div>
                              </div>
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>{investorProfile.investmentStyle.fundamental}%</span>
                                <span>{investorProfile.investmentStyle.technical}%</span>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Domestic Markets</span>
                                <span>International Markets</span>
                              </div>
                              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-amber-500 rounded-full"
                                  style={{ width: `${investorProfile.investmentStyle.domestic}%` }}
                                ></div>
                              </div>
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>{investorProfile.investmentStyle.domestic}%</span>
                                <span>{investorProfile.investmentStyle.international}%</span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6 h-64">
                            <ChartContainer className="h-full">
                              <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                  <PolarGrid stroke="#e5e7eb" />
                                  <PolarAngleAxis dataKey="subject" tick={{ fill: "var(--muted-foreground)" }} />
                                  <PolarRadiusAxis
                                    angle={30}
                                    domain={[0, 100]}
                                    tick={{ fill: "var(--muted-foreground)" }}
                                  />
                                  <Radar
                                    name="Investor"
                                    dataKey="A"
                                    stroke="hsl(var(--primary))"
                                    fill="hsl(var(--primary))"
                                    fillOpacity={0.6}
                                    animationDuration={1000}
                                  />
                                  <Tooltip />
                                </RadarChart>
                              </ResponsiveContainer>
                            </ChartContainer>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  <TabsContent value="details" className="mt-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle>Strengths & Weaknesses</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            <div>
                              <h3 className="font-semibold text-lg mb-2 text-green-600">Your Strengths</h3>
                              <ul className="space-y-2">
                                {investorProfile.strengths.map((strength, index) => (
                                  <li key={index} className="flex items-start">
                                    <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                                    <span>{strength}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <Separator />
                            <div>
                              <h3 className="font-semibold text-lg mb-2 text-amber-600">Areas for Improvement</h3>
                              <ul className="space-y-2">
                                {investorProfile.weaknesses.map((weakness, index) => (
                                  <li key={index} className="flex items-start">
                                    <HelpCircle className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
                                    <span>{weakness}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Investor Type Comparison</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <InvestorTypeComparison currentType="Growth-oriented" />
                        </CardContent>
                      </Card>

                      <Card className="md:col-span-2">
                        <CardHeader>
                          <CardTitle>Detailed Characteristics</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid gap-6 sm:grid-cols-2">
                            <div>
                              <h3 className="font-semibold text-lg mb-3">Risk Management</h3>
                              <ul className="space-y-2">
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                                  <span>You're comfortable with moderate to high volatility</span>
                                </li>
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                                  <span>You understand that short-term losses are part of long-term investing</span>
                                </li>
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                                  <span>You prefer growth over capital preservation</span>
                                </li>
                              </ul>
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg mb-3">Investment Approach</h3>
                              <ul className="space-y-2">
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                                  <span>You prefer a mix of active and passive investment strategies</span>
                                </li>
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                                  <span>You value fundamental analysis over technical indicators</span>
                                </li>
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                                  <span>You're interested in both domestic and international markets</span>
                                </li>
                              </ul>
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg mb-3">Time Horizon</h3>
                              <ul className="space-y-2">
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                                  <span>You have a long-term investment horizon (7+ years)</span>
                                </li>
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                                  <span>You're willing to wait out market cycles</span>
                                </li>
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                                  <span>You prioritize long-term growth over short-term gains</span>
                                </li>
                              </ul>
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg mb-3">Financial Knowledge</h3>
                              <ul className="space-y-2">
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                                  <span>You have a good understanding of basic investment concepts</span>
                                </li>
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                                  <span>You're familiar with different asset classes and their characteristics</span>
                                </li>
                                <li className="flex items-start">
                                  <HelpCircle className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
                                  <span>You could benefit from more knowledge about international markets</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">
                            <Download className="mr-2 h-4 w-4" />
                            Download Full Profile Report
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </TabsContent>
                  <TabsContent value="allocation" className="mt-6">
                    <AssetAllocationRecommendation investorType={investorProfile.type} />
                  </TabsContent>
                  <TabsContent value="recommendations" className="mt-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle>Recommended Investment Vehicles</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="p-4 bg-primary/10 rounded-lg">
                              <h3 className="font-semibold mb-2">Equity (65%)</h3>
                              <ul className="space-y-2">
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                                  <div>
                                    <span className="font-medium">Large-cap Index Funds (25%)</span>
                                    <p className="text-sm text-muted-foreground">
                                      For stable growth and lower volatility
                                    </p>
                                  </div>
                                </li>
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                                  <div>
                                    <span className="font-medium">Mid-cap Funds (25%)</span>
                                    <p className="text-sm text-muted-foreground">
                                      For growth potential with moderate risk
                                    </p>
                                  </div>
                                </li>
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                                  <div>
                                    <span className="font-medium">Small-cap Funds (15%)</span>
                                    <p className="text-sm text-muted-foreground">
                                      For high growth potential with higher risk
                                    </p>
                                  </div>
                                </li>
                              </ul>
                            </div>

                            <div className="p-4 bg-secondary/10 rounded-lg">
                              <h3 className="font-semibold mb-2">Debt (20%)</h3>
                              <ul className="space-y-2">
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                                  <div>
                                    <span className="font-medium">Short-term Debt Funds (10%)</span>
                                    <p className="text-sm text-muted-foreground">For stability and liquidity</p>
                                  </div>
                                </li>
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-secondary mr-2 mt-0.5" />
                                  <div>
                                    <span className="font-medium">Corporate Bond Funds (10%)</span>
                                    <p className="text-sm text-muted-foreground">
                                      For higher yields with moderate risk
                                    </p>
                                  </div>
                                </li>
                              </ul>
                            </div>

                            <div className="p-4 bg-amber-500/10 rounded-lg">
                              <h3 className="font-semibold mb-2">International & Cash (15%)</h3>
                              <ul className="space-y-2">
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                                  <div>
                                    <span className="font-medium">International Equity Funds (10%)</span>
                                    <p className="text-sm text-muted-foreground">For geographical diversification</p>
                                  </div>
                                </li>
                                <li className="flex items-start">
                                  <Check className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                                  <div>
                                    <span className="font-medium">Liquid Funds (5%)</span>
                                    <p className="text-sm text-muted-foreground">
                                      For emergency needs and opportunities
                                    </p>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full" asChild>
                            <Link href="/calculators">
                              Explore Investment Options
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Investment Strategy Recommendations</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="p-4 bg-muted rounded-lg">
                            <h3 className="font-semibold mb-2">Core Strategy</h3>
                            <p className="text-sm text-muted-foreground">
                              Focus on a core-satellite approach with index funds as your foundation and active funds
                              for alpha generation. Maintain a long-term perspective and avoid reacting to short-term
                              market fluctuations.
                            </p>
                          </div>

                          <div className="p-4 bg-muted rounded-lg">
                            <h3 className="font-semibold mb-2">Rebalancing</h3>
                            <p className="text-sm text-muted-foreground">
                              Rebalance your portfolio semi-annually or when asset allocations drift more than 10% from
                              targets. This maintains your risk profile while potentially enhancing returns.
                            </p>
                          </div>

                          <div className="p-4 bg-muted rounded-lg">
                            <h3 className="font-semibold mb-2">Tax Efficiency</h3>
                            <p className="text-sm text-muted-foreground">
                              Utilize tax-efficient investment vehicles like ELSS funds for equity exposure. Consider
                              holding debt investments for over 3 years to benefit from indexation.
                            </p>
                          </div>

                          <div className="p-4 bg-muted rounded-lg">
                            <h3 className="font-semibold mb-2">Risk Management</h3>
                            <p className="text-sm text-muted-foreground">
                              Maintain an adequate emergency fund (6 months of expenses) before increasing equity
                              allocation. Consider adding a small allocation to gold or REITs for additional
                              diversification.
                            </p>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">
                            <Download className="mr-2 h-4 w-4" />
                            Download Strategy Guide
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </>
        ) : currentAssessment ? (
          <>
            {currentAssessment === "risk-profile" && (
              <RiskToleranceSlider onComplete={() => completeAssessment("risk-profile")} />
            )}
            {currentAssessment === "financial-knowledge" && (
              <KnowledgeQuiz onComplete={() => completeAssessment("financial-knowledge")} />
            )}
            {currentAssessment === "investment-style" && (
              <InvestmentStyleAnalysis onComplete={() => completeAssessment("investment-style")} />
            )}
            {currentAssessment === "goal-alignment" && (
              <GoalAlignmentCheck onComplete={() => completeAssessment("goal-alignment")} />
            )}
          </>
        ) : (
          <div className="max-w-3xl mx-auto">
            <Button variant="outline" onClick={() => setShowResults(false)} className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Assessments
            </Button>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Your Investor Profile</CardTitle>
                    <CardDescription>Based on your assessment results</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="gap-1">
                      <Trophy className="h-3.5 w-3.5 text-amber-500" />
                      {completedAssessments.length}/{totalAssessments} Completed
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-full md:w-1/2">
                    <h2 className="text-3xl font-bold text-primary mb-2">{investorProfile.type}</h2>
                    <p className="text-muted-foreground mb-4">{investorProfile.description}</p>

                    <h3 className="font-semibold text-lg mt-4">Key Characteristics</h3>
                    <ul className="mt-2 space-y-2">
                      {investorProfile.characteristics.map((characteristic, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                          <span>{characteristic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-full md:w-1/2 h-64">
                    <h3 className="font-semibold text-lg mb-2 text-center">Suggested Asset Allocation</h3>
                    <ChartContainer className="h-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={investorProfile.allocation}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            animationDuration={1000}
                          >
                            {investorProfile.allocation.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `${value}%`} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </div>

                <Separator className="my-6" />

                <div>
                  <h3 className="font-semibold text-lg mb-3">Recommended Investment Options</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {investorProfile.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <span>{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="w-full sm:w-auto" onClick={() => setShowResults(false)}>
                  Take More Assessments
                </Button>
                <Button className="w-full sm:w-auto" asChild>
                  <Link href="/goal-planner">
                    Continue to Goal Planner
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}

