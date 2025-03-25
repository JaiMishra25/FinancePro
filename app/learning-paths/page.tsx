"use client"

import Link from "next/link"
import { ArrowRight, BookOpen, ChevronRight, Clock, FileText, LineChart, PieChart, Target, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function LearningPathsPage() {
  // Learning paths data
  const learningPaths = [
    {
      id: "investing-basics",
      title: "Investing Fundamentals",
      description: "Learn the core principles of investing and build a solid foundation",
      category: "investing",
      level: "Easy",
      readTime: "15 min",
      icon: BookOpen,
      color: "from-blue-500/20 to-blue-600/20",
      iconColor: "text-blue-500",
      progress: 0,
      topics: ["What is investing?", "Types of investments", "Risk and return", "Getting started"],
    },
    {
      id: "retirement-planning",
      title: "Retirement Planning",
      description: "Create a comprehensive retirement strategy tailored to your goals",
      category: "planning",
      level: "Medium",
      readTime: "20 min",
      icon: Target,
      color: "from-amber-500/20 to-amber-600/20",
      iconColor: "text-amber-500",
      progress: 30,
      topics: ["Retirement goals", "Savings strategies", "Investment allocation", "Withdrawal plans"],
    },
    {
      id: "stock-market",
      title: "Stock Market Basics",
      description: "Understand how to analyze and invest in stocks with confidence",
      category: "investing",
      level: "Medium",
      readTime: "25 min",
      icon: LineChart,
      color: "from-green-500/20 to-green-600/20",
      iconColor: "text-green-500",
      progress: 0,
      topics: ["Stock fundamentals", "Market analysis", "Trading basics", "Building a portfolio"],
    },
    {
      id: "tax-optimization",
      title: "Tax Optimization Strategies",
      description: "Learn legal ways to minimize your tax burden and maximize returns",
      category: "planning",
      level: "Hard",
      readTime: "30 min",
      icon: Wallet,
      color: "from-purple-500/20 to-purple-600/20",
      iconColor: "text-purple-500",
      progress: 0,
      topics: ["Tax-advantaged accounts", "Capital gains strategies", "Tax-loss harvesting", "Estate planning"],
    },
    {
      id: "mutual-funds",
      title: "Mutual Fund Investing",
      description: "Master the art of selecting and investing in mutual funds",
      category: "investing",
      level: "Easy",
      readTime: "20 min",
      icon: PieChart,
      color: "from-cyan-500/20 to-cyan-600/20",
      iconColor: "text-cyan-500",
      progress: 60,
      topics: ["Fund types", "Expense ratios", "Performance metrics", "Selection criteria"],
    },
    {
      id: "debt-management",
      title: "Debt Management",
      description: "Strategies to manage, reduce, and eliminate debt effectively",
      category: "planning",
      level: "Easy",
      readTime: "15 min",
      icon: FileText,
      color: "from-rose-500/20 to-rose-600/20",
      iconColor: "text-rose-500",
      progress: 0,
      topics: ["Debt prioritization", "Repayment strategies", "Interest management", "Building credit"],
    },
  ]

  // Group paths by difficulty level
  const easyPaths = learningPaths.filter((path) => path.level === "Easy")
  const mediumPaths = learningPaths.filter((path) => path.level === "Medium")
  const hardPaths = learningPaths.filter((path) => path.level === "Hard")

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Learning Paths</h1>
            <p className="text-muted-foreground">
              Simple, text-based guides to build your financial knowledge and skills
            </p>
          </div>
        </div>

        <div className="space-y-10">
          {/* Easy Topics */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-2xl font-bold">Easy Topics</h2>
              <Badge variant="outline" className="text-green-500 border-green-500">
                Beginner Friendly
              </Badge>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {easyPaths.map((path) => (
                <Card key={path.id} className="flex flex-col h-full hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r ${path.color}`}
                      >
                        <path.icon className={`h-6 w-6 ${path.iconColor}`} />
                      </div>
                      <Badge variant="outline">{path.level}</Badge>
                    </div>
                    <CardTitle className="mt-4 text-xl">{path.title}</CardTitle>
                    <CardDescription>{path.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4 flex-grow">
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <Clock className="mr-1 h-3 w-3" />
                      {path.readTime} read
                    </div>

                    <div className="space-y-1 mb-4">
                      <p className="text-sm font-medium">Topics covered:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {path.topics.map((topic, index) => (
                          <li key={index} className="flex items-center">
                            <ChevronRight className="h-3 w-3 mr-1 flex-shrink-0" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {path.progress > 0 && (
                      <div className="mt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{path.progress}%</span>
                        </div>
                        <Progress value={path.progress} className="h-2" />
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button className="w-full" asChild>
                      <Link href={`/learning-paths/${path.id}`}>
                        {path.progress > 0 ? "Continue Reading" : "Start Reading"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* Medium Topics */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-2xl font-bold">Medium Topics</h2>
              <Badge variant="outline" className="text-blue-500 border-blue-500">
                Intermediate
              </Badge>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {mediumPaths.map((path) => (
                <Card key={path.id} className="flex flex-col h-full hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r ${path.color}`}
                      >
                        <path.icon className={`h-6 w-6 ${path.iconColor}`} />
                      </div>
                      <Badge variant="outline">{path.level}</Badge>
                    </div>
                    <CardTitle className="mt-4 text-xl">{path.title}</CardTitle>
                    <CardDescription>{path.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4 flex-grow">
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <Clock className="mr-1 h-3 w-3" />
                      {path.readTime} read
                    </div>

                    <div className="space-y-1 mb-4">
                      <p className="text-sm font-medium">Topics covered:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {path.topics.map((topic, index) => (
                          <li key={index} className="flex items-center">
                            <ChevronRight className="h-3 w-3 mr-1 flex-shrink-0" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {path.progress > 0 && (
                      <div className="mt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{path.progress}%</span>
                        </div>
                        <Progress value={path.progress} className="h-2" />
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button className="w-full" asChild>
                      <Link href={`/learning-paths/${path.id}`}>
                        {path.progress > 0 ? "Continue Reading" : "Start Reading"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* Hard Topics */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-2xl font-bold">Advanced Topics</h2>
              <Badge variant="outline" className="text-purple-500 border-purple-500">
                Advanced
              </Badge>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {hardPaths.map((path) => (
                <Card key={path.id} className="flex flex-col h-full hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r ${path.color}`}
                      >
                        <path.icon className={`h-6 w-6 ${path.iconColor}`} />
                      </div>
                      <Badge variant="outline">{path.level}</Badge>
                    </div>
                    <CardTitle className="mt-4 text-xl">{path.title}</CardTitle>
                    <CardDescription>{path.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4 flex-grow">
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <Clock className="mr-1 h-3 w-3" />
                      {path.readTime} read
                    </div>

                    <div className="space-y-1 mb-4">
                      <p className="text-sm font-medium">Topics covered:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {path.topics.map((topic, index) => (
                          <li key={index} className="flex items-center">
                            <ChevronRight className="h-3 w-3 mr-1 flex-shrink-0" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {path.progress > 0 && (
                      <div className="mt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{path.progress}%</span>
                        </div>
                        <Progress value={path.progress} className="h-2" />
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button className="w-full" asChild>
                      <Link href={`/learning-paths/${path.id}`}>
                        {path.progress > 0 ? "Continue Reading" : "Start Reading"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

