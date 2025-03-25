import Link from "next/link"
import { ArrowRight, BarChart3, BookOpen, Calculator, FileText, PieChart, Target, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import FeatureShowcase from "@/components/feature-showcase"
import HeroSection from "@/components/hero-section"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />

        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
              Comprehensive Financial Tools
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Our suite of calculators and planning tools helps you make informed financial decisions
            </p>
          </div>

          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 lg:gap-8 mt-8">
            <Card className="flex flex-col items-center justify-between p-2 card-hover">
              <CardHeader className="items-center text-center">
                <div className="rounded-full bg-gradient-to-r from-primary/20 to-primary/10 p-3 mb-2">
                  <Calculator className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Financial Calculators</CardTitle>
                <CardDescription>SIP, EMI, RD, and more calculators to plan your investments</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Calculate returns, estimate EMIs, and plan your investments with precision
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="rounded-full">
                  <Link href="/calculators">
                    Explore Calculators <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col items-center justify-between p-2 card-hover">
              <CardHeader className="items-center text-center">
                <div className="rounded-full bg-gradient-to-r from-secondary/20 to-secondary/10 p-3 mb-2">
                  <PieChart className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>Investor Profile</CardTitle>
                <CardDescription>Discover your investment style and risk tolerance</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Take our assessment to understand if you're aggressive, defensive, or balanced
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="rounded-full">
                  <Link href="/investor-profile">
                    Start Assessment <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col items-center justify-between p-2 card-hover">
              <CardHeader className="items-center text-center">
                <div className="rounded-full bg-gradient-to-r from-amber-500/20 to-amber-500/10 p-3 mb-2">
                  <Target className="h-6 w-6 text-amber-500" />
                </div>
                <CardTitle>Goal Planner</CardTitle>
                <CardDescription>Plan and visualize your financial goals</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Set targets, track progress, and adjust your savings strategy
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="rounded-full">
                  <Link href="/goal-planner">
                    Plan Goals <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col items-center justify-between p-2 card-hover">
              <CardHeader className="items-center text-center">
                <div className="rounded-full bg-gradient-to-r from-purple-500/20 to-purple-500/10 p-3 mb-2">
                  <Wallet className="h-6 w-6 text-purple-500" />
                </div>
                <CardTitle>Tax Calculator</CardTitle>
                <CardDescription>Calculate taxes under new Indian tax regime</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Updated with 2025 tax rules to help you optimize your tax planning
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="rounded-full">
                  <Link href="/tax-calculator">
                    Calculate Taxes <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col items-center justify-between p-2 card-hover">
              <CardHeader className="items-center text-center">
                <div className="rounded-full bg-gradient-to-r from-rose-500/20 to-rose-500/10 p-3 mb-2">
                  <BarChart3 className="h-6 w-6 text-rose-500" />
                </div>
                <CardTitle>Risk Analysis</CardTitle>
                <CardDescription>Analyze your financial risks and plan accordingly</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Comprehensive assessment of your financial vulnerabilities
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="rounded-full">
                  <Link href="/calculators/net-worth">
                    Analyze Risk <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col items-center justify-between p-2 card-hover">
              <CardHeader className="items-center text-center">
                <div className="rounded-full bg-gradient-to-r from-cyan-500/20 to-cyan-500/10 p-3 mb-2">
                  <FileText className="h-6 w-6 text-cyan-500" />
                </div>
                <CardTitle>Financial Blogs</CardTitle>
                <CardDescription>Expert insights on personal finance</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Stay updated with the latest financial strategies and tips
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="rounded-full">
                  <Link href="/blogs">
                    Read Blogs <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col items-center justify-between p-2 card-hover">
              <CardHeader className="items-center text-center">
                <div className="rounded-full bg-gradient-to-r from-emerald-500/20 to-emerald-500/10 p-3 mb-2">
                  <FileText className="h-6 w-6 text-emerald-500" />
                </div>
                <CardTitle>Learning Paths</CardTitle>
                <CardDescription>Structured financial education for all levels</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Follow guided learning paths from beginner to advanced financial topics
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="rounded-full">
                  <Link href="/learning-paths">
                    Start Learning <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col items-center justify-between p-2 card-hover">
              <CardHeader className="items-center text-center">
                <div className="rounded-full bg-gradient-to-r from-indigo-500/20 to-indigo-500/10 p-3 mb-2">
                  <BookOpen className="h-6 w-6 text-indigo-500" />
                </div>
                <CardTitle>Financial Glossary</CardTitle>
                <CardDescription>Comprehensive dictionary of financial terms</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Understand complex financial terminology with simple explanations
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="rounded-full">
                  <Link href="/glossary">
                    Explore Terms <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        <FeatureShowcase />
      </main>
      <SiteFooter />
    </div>
  )
}

