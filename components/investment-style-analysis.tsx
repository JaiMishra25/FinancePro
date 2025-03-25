// Create a new component for the Investment Style Analysis with 8 questions

"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

interface InvestmentStyleAnalysisProps {
  onComplete: () => void
}

export function InvestmentStyleAnalysis({ onComplete }: InvestmentStyleAnalysisProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [answers, setAnswers] = useState<Record<number, string>>({})

  const questions = [
    {
      id: 1,
      question: "When researching investments, you primarily focus on:",
      options: [
        { value: "fundamental", label: "Company fundamentals (financials, management, business model)" },
        { value: "technical", label: "Price patterns and technical indicators" },
        { value: "both", label: "A combination of both approaches" },
        { value: "advisor", label: "I rely on advisor recommendations" },
      ],
    },
    {
      id: 2,
      question: "How often do you typically review your investments?",
      options: [
        { value: "daily", label: "Daily or multiple times per week" },
        { value: "weekly", label: "Weekly" },
        { value: "monthly", label: "Monthly or quarterly" },
        { value: "annually", label: "Annually or less frequently" },
      ],
    },
    {
      id: 3,
      question: "Which statement best describes your investment approach?",
      options: [
        { value: "active", label: "I actively trade to maximize returns" },
        { value: "buy-hold", label: "I buy and hold for the long term" },
        { value: "mixed", label: "I maintain core holdings but actively manage a portion" },
        { value: "passive", label: "I prefer passive index investing" },
      ],
    },
    {
      id: 4,
      question: "When making investment decisions, what information sources do you rely on most?",
      options: [
        { value: "news", label: "Financial news and media" },
        { value: "research", label: "Professional research reports and analysis" },
        { value: "social", label: "Social media and investment forums" },
        { value: "personal", label: "Personal research and analysis" },
      ],
    },
    {
      id: 5,
      question: "How do you typically react to new investment trends or opportunities?",
      options: [
        { value: "early", label: "I try to be an early adopter to maximize potential returns" },
        { value: "wait", label: "I wait for validation before investing" },
        { value: "skeptical", label: "I'm generally skeptical and stick to proven investments" },
        { value: "avoid", label: "I avoid trends and focus on fundamentals" },
      ],
    },
    {
      id: 6,
      question: "What is your preferred investment vehicle?",
      options: [
        { value: "individual", label: "Individual stocks and bonds" },
        { value: "mutual", label: "Mutual funds and ETFs" },
        { value: "mixed", label: "A mix of individual securities and funds" },
        { value: "alternative", label: "Alternative investments (real estate, private equity, etc.)" },
      ],
    },
    {
      id: 7,
      question: "How important is dividend or interest income in your investment strategy?",
      options: [
        { value: "very", label: "Very important - I focus on income-generating investments" },
        { value: "somewhat", label: "Somewhat important - I like a balance of income and growth" },
        { value: "little", label: "Not very important - I prioritize growth over income" },
        { value: "reinvest", label: "I prefer dividends to be reinvested for compound growth" },
      ],
    },
    {
      id: 8,
      question: "How would you describe your investment decision-making process?",
      options: [
        { value: "analytical", label: "Highly analytical with detailed research" },
        { value: "intuitive", label: "Balanced between analysis and intuition" },
        { value: "emotional", label: "Sometimes influenced by emotions or market sentiment" },
        { value: "delegated", label: "I often delegate decisions to advisors or follow recommendations" },
      ],
    },
  ]

  const handleNext = () => {
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleAnswerChange = (value: string) => {
    setAnswers({ ...answers, [currentStep]: value })
  }

  const currentQuestion = questions[currentStep - 1]
  const progress = (currentStep / questions.length) * 100

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Investment Style Analysis</h1>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                Question {currentStep} of {questions.length}
              </CardTitle>
              <CardDescription>Understand your approach to investment decisions</CardDescription>
            </div>
            <div className="text-sm text-muted-foreground">Progress: {Math.round(progress)}%</div>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">{currentQuestion.question}</h2>

            <RadioGroup value={answers[currentStep] || ""} onValueChange={handleAnswerChange} className="space-y-3">
              {currentQuestion.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
            Previous
          </Button>
          <Button onClick={handleNext} disabled={!answers[currentStep]}>
            {currentStep === questions.length ? "Complete Assessment" : "Next"}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

