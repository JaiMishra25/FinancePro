import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background pt-16 md:pt-24 pb-12">
      <div className="absolute inset-0 hero-pattern opacity-50"></div>
      <div className="container relative z-10 flex flex-col items-center justify-center gap-4 text-center">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Smart Financial Planning <br className="hidden sm:inline" />
            <span className="gradient-text">Made Simple</span>
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Comprehensive tools to help you plan, save, and grow your wealth with confidence
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
          <Button asChild size="lg" className="rounded-full">
            <Link href="/calculators">
              Explore Calculators <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="rounded-full">
            <Link href="/investor-profile">Discover Your Investor Profile</Link>
          </Button>
        </div>
        <div className="mt-12 w-full max-w-5xl overflow-hidden rounded-xl border bg-background shadow-xl animate-float">
          <div className="relative min-h-[500px] sm:min-h-0 sm:aspect-[16/9] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/50 to-secondary/20 p-4 sm:p-8 flex flex-col justify-center items-center text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4">Your Financial Dashboard</h2>
              <p className="max-w-2xl text-muted-foreground mb-4 sm:mb-8 text-xs sm:text-sm md:text-base">
                Interactive visualizations and personalized insights to help you achieve your financial goals
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 w-full max-w-4xl">
                <div className="bg-background/80 backdrop-blur-sm p-2 sm:p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-sm sm:text-lg mb-1">Investment Growth</h3>
                  <div className="h-16 sm:h-24 bg-primary/10 rounded-md flex items-center justify-center">
                    <div className="w-full h-12 sm:h-16 flex items-end px-2 space-x-1">
                      {[30, 45, 38, 50, 65, 75, 60, 80, 90].map((height, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t-sm animate-pulse-subtle"
                          style={{
                            height: `${height}%`,
                            backgroundColor: `hsl(${210 + i * 15}, 100%, 60%)`,
                            animationDelay: `${i * 0.1}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-background/80 backdrop-blur-sm p-2 sm:p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-sm sm:text-lg mb-1">Goal Progress</h3>
                  <div className="h-16 sm:h-24 bg-primary/10 rounded-md flex items-center justify-center">
                    <div className="w-full px-2 sm:px-4">
                      <div className="h-3 sm:h-4 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse-subtle"
                          style={{ width: "65%" }}
                        ></div>
                      </div>
                      <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-center">65% Complete</div>
                    </div>
                  </div>
                </div>
                <div className="bg-background/80 backdrop-blur-sm p-2 sm:p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-sm sm:text-lg mb-1">Asset Allocation</h3>
                  <div className="h-16 sm:h-24 bg-primary/10 rounded-md flex items-center justify-center">
                    <div className="w-16 sm:w-24 h-16 sm:h-24 rounded-full border-[6px] border-primary/40 relative overflow-visible">
                      <div
                        className="absolute inset-0 border-[6px] border-transparent border-t-primary border-r-primary/80 rounded-full animate-spin"
                        style={{ animationDuration: "15s", animationTimingFunction: "linear" }}
                      ></div>
                      <div
                        className="absolute inset-0 border-[6px] border-transparent border-b-secondary border-l-secondary/80 rounded-full animate-spin"
                        style={{
                          animationDuration: "20s",
                          animationDirection: "reverse",
                          animationTimingFunction: "linear",
                        }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-30 animate-pulse-subtle dark:opacity-20 dark:bg-primary/20"></div>
      <div
        className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-30 animate-pulse-subtle dark:opacity-20 dark:bg-secondary/20"
        style={{ animationDelay: "1s" }}
      ></div>
    </section>
  )
}

