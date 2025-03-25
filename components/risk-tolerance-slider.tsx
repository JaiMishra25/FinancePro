"use client"

import { useState } from "react"
import { ChevronRight, HelpCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"

interface RiskToleranceSliderProps {
  onComplete: () => void
}

export function RiskToleranceSlider({ onComplete }: RiskToleranceSliderProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [answers, setAnswers] = useState<Record<number, number>>({
    1: 50,
    2: 50,
    3: 50,
    4: 50,
    5: 50,
  })

  const questions = [
    {
      id: 1,
      question: "How comfortable are you with investment volatility?",
      description: "This measures your emotional response to market ups and downs.",
      min: "Very uncomfortable",
      max: "Very comfortable",
    },
    {
      id: 2,
      question: "How would you react to a 20% drop in your portfolio value?",
      description: "This helps assess your behavior during market downturns.",
      min: "Sell everything",
      max: "Buy more",
    },
    {
      id: 3,
      question: "How important is capital preservation vs. growth?",
      description: "This helps determine your primary investment objective.",
      min: "Preservation is critical",
      max: "Growth is priority",
    },
    {
      id: 4,
      question: "How long can you leave your money invested?",
      description: "This helps determine your investment time horizon.",
      min: "Less than 3 years",
      max: "10+ years",
    },
    {
      id: 5,
      question: "What percentage of your portfolio would you allocate to high-risk investments?",
      description: "This helps gauge your risk appetite for portfolio construction.",
      min: "0%",
      max: "75%+",
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

  const handleSliderChange = (value: number[]) => {
    setAnswers({ ...answers, [currentStep]: value[0] })
  }

  const currentQuestion = questions[currentStep - 1]
  const progress = (currentStep / questions.length) * 100

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Risk Tolerance Assessment</h1>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                Question {currentStep} of {questions.length}
              </CardTitle>
              <CardDescription>Drag the slider to indicate your preference</CardDescription>
            </div>
            <div className="text-sm text-muted-foreground">Progress: {Math.round(progress)}%</div>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">{currentQuestion.question}</h2>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">{currentQuestion.description}</p>
            </div>

            <div className="pt-6 pb-2">
              <Slider
                defaultValue={[answers[currentStep]]}
                max={100}
                step={1}
                onValueChange={handleSliderChange}
                className="my-6"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>{currentQuestion.min}</span>
                <span>{currentQuestion.max}</span>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Your Risk Score:</span>
                <span className="font-bold text-lg">{answers[currentStep]}/100</span>
              </div>
              <div className="h-2 w-full bg-background rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full"
                  style={{ width: `${answers[currentStep]}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Conservative</span>
                <span>Moderate</span>
                <span>Aggressive</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
            Previous
          </Button>
          <Button onClick={handleNext}>
            {currentStep === questions.length ? "Complete Assessment" : "Next"}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

