"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  Calculator,
  ChevronDown,
  FileText,
  GraduationCap,
  Home,
  Menu,
  PieChart,
  Target,
  Wallet,
} from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const routes = [
    {
      href: "/",
      label: "Home",
      icon: Home,
      active: pathname === "/",
    },
    {
      href: "/calculators",
      label: "Calculators",
      icon: Calculator,
      active: pathname === "/calculators" || pathname.startsWith("/calculators/"),
      children: [
        { href: "/calculators/sip", label: "SIP Calculator" },
        { href: "/calculators/swp", label: "SWP Calculator" },
        { href: "/calculators/rd", label: "RD Calculator" },
        { href: "/calculators/emi", label: "EMI Calculator" },
        { href: "/calculators/step-up-sip", label: "Step-up SIP" },
        { href: "/calculators/inflation", label: "Inflation Calculator" },
        { href: "/calculators/net-worth", label: "Net Worth Calculator" },
        { href: "/calculators/loan-comparison", label: "Loan Comparison" },
        { href: "/calculators/retirement", label: "Retirement Calculator" },
      ],
    },
    {
      href: "/investor-profile",
      label: "Investor Profile",
      icon: PieChart,
      active: pathname === "/investor-profile",
    },
    {
      href: "/goal-planner",
      label: "Goal Planner",
      icon: Target,
      active: pathname === "/goal-planner",
    },
    {
      href: "/learning-paths",
      label: "Learning Paths",
      icon: GraduationCap,
      active: pathname === "/learning-paths" || pathname.startsWith("/learning-paths/"),
    },
    {
      href: "/glossary",
      label: "Glossary",
      icon: BookOpen,
      active: pathname === "/glossary" || pathname.startsWith("/glossary/"),
    },
    {
      href: "/tax-calculator",
      label: "Tax Calculator",
      icon: Wallet,
      active: pathname === "/tax-calculator",
    },
    {
      href: "/blogs",
      label: "Blogs",
      icon: FileText,
      active: pathname === "/blogs" || pathname.startsWith("/blogs/"),
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2 mr-6">
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <Wallet className="h-4 w-4 text-white" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-50 blur-[2px] -z-10"></div>
            </div>
            <span className="font-bold text-lg hidden sm:inline-block">FinancePro</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-1 text-sm font-medium">
            {routes.map((route) =>
              route.children ? (
                <DropdownMenu key={route.href}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className={`px-3 ${route.active ? "text-primary" : ""}`}>
                      <route.icon className="mr-2 h-4 w-4" />
                      {route.label}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {route.children.map((child) => (
                      <DropdownMenuItem key={child.href} asChild>
                        <Link href={child.href}>{child.label}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  key={route.href}
                  variant="ghost"
                  className={`px-3 ${route.active ? "text-primary" : ""}`}
                  asChild
                >
                  <Link href={route.href} className="flex items-center">
                    <route.icon className="mr-2 h-4 w-4" />
                    {route.label}
                  </Link>
                </Button>
              ),
            )}
          </nav>
        </div>

        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                  <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                      <Wallet className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-bold">FinancePro</span>
                  </Link>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  <nav className="flex flex-col space-y-1">
                    {routes.map((route) =>
                      route.children ? (
                        <div key={route.href} className="space-y-1">
                          <div
                            className={`flex items-center px-3 py-2 text-base font-medium ${route.active ? "text-primary" : ""}`}
                          >
                            <route.icon className="mr-2 h-5 w-5" />
                            {route.label}
                          </div>
                          <div className="pl-10 space-y-1">
                            {route.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="block px-3 py-2 text-sm rounded-md hover:bg-accent"
                                onClick={() => setIsOpen(false)}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link
                          key={route.href}
                          href={route.href}
                          className={`flex items-center px-3 py-2 text-base font-medium rounded-md hover:bg-accent ${
                            route.active ? "text-primary" : ""
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          <route.icon className="mr-2 h-5 w-5" />
                          {route.label}
                        </Link>
                      ),
                    )}
                  </nav>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

