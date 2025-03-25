"use client"

import { useState } from "react"
import { ArrowRight, Check, ChevronRight, HelpCircle, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

interface KnowledgeQuizProps {
  onComplete: () => void
}

export function KnowledgeQuiz({ onComplete }: KnowledgeQuizProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showAnswer, setShowAnswer] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const questions = [
    {
      id: 1,
      question: "Which of the following is generally considered the riskiest investment?",
      options: [
        { value: "a", label: "Government bonds" },
        { value: "b", label: "Blue-chip stocks" },
        { value: "c", label: "Small-cap stocks" },
        { value: "d", label: "Certificate of deposit" },
      ],
      correctAnswer: "c",
      explanation:
        "Small-cap stocks generally have higher volatility and risk compared to more established companies or government-backed securities.",
    },
    {
      id: 2,
      question: "What is diversification?",
      options: [
        { value: "a", label: "Investing all your money in different stocks" },
        { value: "b", label: "Spreading investments across various asset classes to reduce risk" },
        { value: "c", label: "Investing only in safe, low-return assets" },
        { value: "d", label: "Frequently buying and selling investments" },
      ],
      correctAnswer: "b",
      explanation:
        "Diversification involves spreading investments across different asset classes (stocks, bonds, real estate, etc.) to reduce risk, as different assets often respond differently to market events.",
    },
    {
      id: 3,
      question: "What is the primary advantage of a Systematic Investment Plan (SIP)?",
      options: [
        { value: "a", label: "Guaranteed returns" },
        { value: "b", label: "Tax-free withdrawals" },
        { value: "c", label: "Rupee cost averaging" },
        { value: "d", label: "Government backing" },
      ],
      correctAnswer: "c",
      explanation:
        "SIPs utilize rupee cost averaging, where you buy more units when prices are low and fewer when prices are high, potentially lowering your average cost over time.",
    },
    {
      id: 4,
      question: "What does P/E ratio stand for?",
      options: [
        { value: "a", label: "Price to Earnings ratio" },
        { value: "b", label: "Profit to Expense ratio" },
        { value: "c", label: "Performance to Expectation ratio" },
        { value: "d", label: "Potential to Earnings ratio" },
      ],
      correctAnswer: "a",
      explanation:
        "Price to Earnings (P/E) ratio is a valuation metric that compares a company's share price to its earnings per share, helping investors assess if a stock is overvalued or undervalued.",
    },
    {
      id: 5,
      question: "Which of these is NOT a factor that affects bond prices?",
      options: [
        { value: "a", label: "Interest rates" },
        { value: "b", label: "Credit quality of the issuer" },
        { value: "c", label: "Stock market performance" },
        { value: "d", label: "Time to maturity" },
      ],
      correctAnswer: "c",
      explanation:
        "While interest rates, credit quality, and time to maturity directly affect bond prices, stock market performance generally doesn't have a direct impact on bond pricing.",
    },
  ]

  const handleNext = () => {
    if (showAnswer) {
      setShowAnswer(false)
      if (currentStep < questions.length) {
        setCurrentStep(currentStep + 1)
      } else {
        setQuizCompleted(true)
      }
    } else {
      if (answers[currentStep]) {
        setShowAnswer(true)
        if (answers[currentStep] === questions[currentStep - 1].correctAnswer) {
          setScore(score + 1)
        }
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setShowAnswer(false)
    }
  }

  const handleAnswerChange = (value: string) => {
    setAnswers({ ...answers, [currentStep]: value })
  }

  const currentQuestion = questions[currentStep - 1]
  const progress = (currentStep / questions.length) * 100
  const isAnswerCorrect = answers[currentStep] === currentQuestion.correctAnswer

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100)

    return (
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Financial Knowledge Quiz</h1>

        <Card>
          <CardHeader>
            <CardTitle>Quiz Results</CardTitle>
            <CardDescription>You've completed the financial knowledge assessment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center py-4">
              <div className="text-5xl font-bold mb-2">
                {score}/{questions.length}
              </div>
              <div className="text-xl font-medium mb-4">Your Score: {percentage}%</div>
              <Progress value={percentage} className="h-3 w-full max-w-md mx-auto" />
            </div>

            <div className="space-y-2">
              {percentage >= 80 ? (
                <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                  <h3 className="font-semibold text-green-600 flex items-center gap-2">
                    <Check className="h-5 w-5" />
                    Excellent Knowledge
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    You have a strong understanding of investment concepts. You're well-equipped to make informed
                    investment decisions.
                  </p>
                </div>
              ) : percentage >= 60 ? (
                <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
                  <h3 className="font-semibold text-amber-600 flex items-center gap-2">
                    <Check className="h-5 w-5" />
                    Good Knowledge
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    You have a good understanding of investment basics. Consider learning more about the areas you
                    missed to strengthen your knowledge.
                  </p>
                </div>
              ) : (
                <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                  <h3 className="font-semibold text-blue-600 flex items-center gap-2">
                    <HelpCircle className="h-5 w-5" />
                    Building Knowledge
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    You're on your way to understanding investments. Consider reviewing educational resources to
                    strengthen your financial knowledge.
                  </p>
                </div>
              )}
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-lg mb-3">Question Review</h3>
              <div className="space-y-4">
                {questions.map((question, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-start gap-2">
                      {answers[index + 1] === question.correctAnswer ? (
                        <Check className="h-5 w-5 text-green-500 mt-0.5" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mt-0.5" />
                      )}
                      <div>
                        <p className="font-medium">{question.question}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Correct answer: {question.options.find((opt) => opt.value === question.correctAnswer)?.label}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={onComplete}>
              Complete Assessment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Financial Knowledge Quiz</h1>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                Question {currentStep} of {questions.length}
              </CardTitle>
              <CardDescription>Test your understanding of investment concepts</CardDescription>
            </div>
            <div className="text-sm text-muted-foreground">Progress: {Math.round(progress)}%</div>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">{currentQuestion.question}</h2>

            <RadioGroup
              value={answers[currentStep] || ""}
              onValueChange={handleAnswerChange}
              disabled={showAnswer}
              className="space-y-3"
            >
              {currentQuestion.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option.value}
                    id={`option-${option.value}`}
                    className={
                      showAnswer
                        ? option.value === currentQuestion.correctAnswer
                          ? "border-green-500 text-green-500"
                          : option.value === answers[currentStep]
                            ? "border-red-500 text-red-500"
                            : ""
                        : ""
                    }
                  />
                  <Label
                    htmlFor={`option-${option.value}`}
                    className={`flex-1 ${showAnswer && option.value === currentQuestion.correctAnswer ? "text-green-600 font-medium" : ""}`}
                  >
                    {option.label}
                    {showAnswer && option.value === currentQuestion.correctAnswer && (
                      <Check className="inline ml-2 h-4 w-4 text-green-500" />
                    )}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {showAnswer && (
              <div
                className={`p-4 rounded-lg ${isAnswerCorrect ? "bg-green-500/10 border border-green-500/20" : "bg-amber-500/10 border border-amber-500/20"}`}
              >
                <div className="flex items-center gap-2 font-medium mb-1">
                  {isAnswerCorrect ? (
                    <>
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="text-green-600">Correct!</span>
                    </>
                  ) : (
                    <>
                      <X className="h-5 w-5 text-amber-500" />
                      <span className="text-amber-600">Incorrect</span>
                    </>
                  )}
                </div>
                <p className="text-muted-foreground">{currentQuestion.explanation}</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1 || showAnswer}>
            Previous
          </Button>
          <Button onClick={handleNext} disabled={!answers[currentStep] && !showAnswer}>
            {showAnswer ? (currentStep === questions.length ? "See Results" : "Next Question") : "Check Answer"}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

