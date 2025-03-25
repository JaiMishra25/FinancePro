// Create a new component for the Goal Alignment Check with 8 questions

"use client"

import { useState } from "react"
import { ChevronRight, Target } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

interface GoalAlignmentCheckProps {
  onComplete: () => void
}

export function GoalAlignmentCheck({ onComplete }: GoalAlignmentCheckProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [answers, setAnswers] = useState<Record<number, string>>({})

  const questions = [
    {
      id: 1,
      question: "What is your primary financial goal?",
      options: [
        { value: "retirement", label: "Retirement planning" },
        { value: "wealth", label: "Wealth accumulation" },
        { value: "education", label: "Education funding" },
        { value: "home", label: "Home purchase" },
      ],
    },
    {
      id: 2,
      question: "When do you plan to start using the money you're investing?",
      options: [
        { value: "0-3", label: "Within the next 3 years" },
        { value: "3-5", label: "3-5 years" },
        { value: "5-10", label: "5-10 years" },
        { value: "10-plus", label: "More than 10 years" },
      ],
    },
    {
      id: 3,
      question: "How specific are your financial goals?",
      options: [
        { value: "very-specific", label: "Very specific with exact amounts and timelines" },
        { value: "specific", label: "Somewhat specific with general amounts and timelines" },
        { value: "general", label: "General ideas but no specific numbers" },
        { value: "undefined", label: "Not clearly defined yet" },
      ],
    },
    {
      id: 4,
      question: "How would you prioritize your financial goals?",
      options: [
        { value: "single", label: "I focus on one primary goal at a time" },
        { value: "multiple-prioritized", label: "I have multiple goals with clear priorities" },
        { value: "multiple-equal", label: "I pursue multiple goals simultaneously with equal importance" },
        { value: "flexible", label: "My goals change frequently based on circumstances" },
      ],
    },
    {
      id: 5,
      question: "How do you track progress toward your financial goals?",
      options: [
        { value: "detailed", label: "Detailed tracking with regular reviews and adjustments" },
        { value: "periodic", label: "Periodic reviews (quarterly or annually)" },
        { value: "occasional", label: "Occasional checks without a formal system" },
        { value: "minimal", label: "Minimal tracking - I set goals but don't regularly monitor progress" },
      ],
    },
    {
      id: 6,
      question: "How flexible are you about the timeline for achieving your goals?",
      options: [
        { value: "very-rigid", label: "Very rigid - specific deadlines are critical" },
        { value: "somewhat-rigid", label: "Somewhat rigid - prefer to meet deadlines but can adjust if needed" },
        { value: "somewhat-flexible", label: "Somewhat flexible - general timeframes rather than specific dates" },
        { value: "very-flexible", label: "Very flexible - focused on the goal, not the timeline" },
      ],
    },
    {
      id: 7,
      question: "How do you respond when progress toward your goals is slower than expected?",
      options: [
        { value: "increase-contributions", label: "Increase contributions or adjust investment strategy" },
        { value: "extend-timeline", label: "Extend the timeline while maintaining the same contributions" },
        { value: "adjust-goal", label: "Adjust the goal to be more realistic" },
        { value: "reassess", label: "Completely reassess whether the goal is still appropriate" },
      ],
    },
    {
      id: 8,
      question: "How important is it that your investments align with your personal values?",
      options: [
        { value: "very-important", label: "Very important - I only invest in alignment with my values" },
        { value: "somewhat-important", label: "Somewhat important - I prefer alignment but returns come first" },
        { value: "nice-to-have", label: "Nice to have but not a primary consideration" },
        { value: "not-important", label: "Not important - I focus solely on financial returns" },
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
      <h1 className="text-3xl font-bold mb-6">Goal Alignment Check</h1>

      <Card>
        <CardHeader className="relative">
          <div className="absolute top-4 right-4 bg-primary/10 p-2 rounded-full">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <div className="pr-12">
            <CardTitle>
              Question {currentStep} of {questions.length}
            </CardTitle>
            <CardDescription>Ensure your investment approach matches your financial goals</CardDescription>
          </div>
          <Progress value={progress} className="h-2 mt-2" />
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

