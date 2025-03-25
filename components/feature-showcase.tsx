import { ArrowRight, BarChart3, BookOpen, Calculator, FileText, PieChart, Target, Wallet } from "lucide-react"
import Link from "next/link"

export default function FeatureShowcase() {
  const features = [
    {
      icon: Calculator,
      title: "SIP & Investment Calculators",
      description: "Calculate returns on SIP, SWP, RD investments with adjustable parameters",
      link: "/calculators/sip",
      color: "from-blue-500/20 to-blue-600/20",
      iconColor: "text-blue-500",
    },
    {
      icon: Target,
      title: "Goal-based Planning",
      description: "Set financial goals and get a personalized savings plan with visual tracking",
      link: "/goal-planner",
      color: "from-emerald-500/20 to-emerald-600/20",
      iconColor: "text-emerald-500",
    },
    {
      icon: PieChart,
      title: "Investor Behavior Analysis",
      description: "Discover if you're an aggressive, defensive, or balanced investor",
      link: "/investor-profile",
      color: "from-purple-500/20 to-purple-600/20",
      iconColor: "text-purple-500",
    },
    {
      icon: Wallet,
      title: "Tax Planning & Calculation",
      description: "Updated with 2025 Indian tax rules to optimize your tax planning",
      link: "/tax-calculator",
      color: "from-amber-500/20 to-amber-600/20",
      iconColor: "text-amber-500",
    },
    {
      icon: BarChart3,
      title: "Risk Assessment Tools",
      description: "Analyze financial risks based on your income, expenses, and investments",
      link: "/calculators/net-worth",
      color: "from-rose-500/20 to-rose-600/20",
      iconColor: "text-rose-500",
    },
    {
      icon: FileText,
      title: "Financial Education",
      description: "Expert blogs and resources on financial planning and wealth management",
      link: "/blogs",
      color: "from-cyan-500/20 to-cyan-600/20",
      iconColor: "text-cyan-500",
    },
    {
      icon: FileText,
      title: "Learning Paths",
      description: "Structured financial education from beginner to advanced levels",
      link: "/learning-paths",
      color: "from-emerald-500/20 to-emerald-600/20",
      iconColor: "text-emerald-500",
    },
    {
      icon: BookOpen,
      title: "Financial Glossary",
      description: "Comprehensive dictionary of financial terms with simple explanations",
      link: "/glossary",
      color: "from-indigo-500/20 to-indigo-600/20",
      iconColor: "text-indigo-500",
    },
  ]

  return (
    <section className="bg-muted/50 py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 hero-pattern opacity-30"></div>
      <div className="container relative z-10">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
            Powerful <span className="gradient-text">Financial Tools</span>
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Everything you need to plan, track, and achieve your financial goals
          </p>
        </div>

        <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
          {features.map((feature, index) => (
            <div key={index} className="feature-card p-6 relative">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r ${feature.color}`}
              >
                <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
              </div>
              <h3 className="mt-4 text-xl font-bold">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground">{feature.description}</p>
              <div className="relative z-10">
                <Link href={feature.link} className="inline-flex items-center mt-4 text-primary hover:underline group">
                  Learn more <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

