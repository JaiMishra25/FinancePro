import Link from "next/link"
import { ArrowRight, Calculator } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"

export default function CalculatorsPage() {
  const calculators = [
    {
      title: "SIP Calculator",
      description: "Calculate returns on your Systematic Investment Plan",
      link: "/calculators/sip",
      features: ["Monthly investment calculation", "Compounding returns visualization", "Goal-based planning"],
    },
    {
      title: "SWP Calculator",
      description: "Plan your Systematic Withdrawal Plan effectively",
      link: "/calculators/swp",
      features: ["Withdrawal planning", "Corpus depletion analysis", "Inflation-adjusted calculations"],
    },
    {
      title: "RD Calculator",
      description: "Calculate returns on Recurring Deposits",
      link: "/calculators/rd",
      features: ["Interest calculation", "Maturity value projection", "Comparative analysis"],
    },
    {
      title: "EMI Calculator",
      description: "Calculate Equated Monthly Installments for loans",
      link: "/calculators/emi",
      features: ["Loan EMI calculation", "Amortization schedule", "Total interest visualization"],
    },
    {
      title: "Step-up SIP Calculator",
      description: "Calculate returns with annual SIP increments",
      link: "/calculators/step-up-sip",
      features: ["Annual increment planning", "Compounding visualization", "Goal achievement timeline"],
    },
    {
      title: "Goal Planner",
      description: "Plan your financial goals with precision",
      link: "/goal-planner",
      features: ["Goal-based savings plan", "Multiple goal management", "Progress tracking"],
    },
    {
      title: "Inflation Calculator",
      description: "See how inflation affects your savings over time",
      link: "/calculators/inflation",
      features: ["Future value calculation", "Purchasing power analysis", "Inflation-adjusted returns"],
    },
    {
      title: "Net Worth Calculator",
      description: "Calculate your total financial worth",
      link: "/calculators/net-worth",
      features: ["Asset and liability tracking", "Net worth trends", "Financial health assessment"],
    },
    {
      title: "Loan Comparison Tool",
      description: "Compare different loan options side by side",
      link: "/calculators/loan-comparison",
      features: ["Interest rate comparison", "EMI comparison", "Total cost analysis"],
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="container py-10">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h1 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Financial Calculators</h1>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Powerful tools to help you make informed financial decisions
            </p>
          </div>

          <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10">
            {calculators.map((calculator, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader>
                  <div className="rounded-full bg-primary/10 p-2 w-10 h-10 flex items-center justify-center mb-2">
                    <Calculator className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>{calculator.title}</CardTitle>
                  <CardDescription>{calculator.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {calculator.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={calculator.link}>
                      Use Calculator <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

