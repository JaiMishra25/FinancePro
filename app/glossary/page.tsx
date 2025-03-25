"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, ChevronRight, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

// Mock glossary data
const glossaryTerms = [
  {
    id: "401k",
    term: "401(k)",
    shortDefinition: "A tax-advantaged retirement savings plan offered by employers.",
    category: "retirement",
    letter: "4",
  },
  {
    id: "annuity",
    term: "Annuity",
    shortDefinition: "A financial product that provides regular payments in exchange for an initial lump sum.",
    category: "insurance",
    letter: "A",
  },
  {
    id: "asset-allocation",
    term: "Asset Allocation",
    shortDefinition: "The strategy of dividing investments among different asset categories.",
    category: "investing",
    letter: "A",
  },
  {
    id: "bear-market",
    term: "Bear Market",
    shortDefinition: "A market condition in which prices are falling or expected to fall.",
    category: "investing",
    letter: "B",
  },
  {
    id: "bond",
    term: "Bond",
    shortDefinition: "A debt investment where an investor loans money to an entity for a defined period.",
    category: "investing",
    letter: "B",
  },
  {
    id: "capital-gain",
    term: "Capital Gain",
    shortDefinition: "The profit from selling an asset for more than its purchase price.",
    category: "taxes",
    letter: "C",
  },
  {
    id: "compound-interest",
    term: "Compound Interest",
    shortDefinition: "Interest calculated on the initial principal and accumulated interest.",
    category: "basics",
    letter: "C",
  },
  {
    id: "diversification",
    term: "Diversification",
    shortDefinition: "Spreading investments across various assets to reduce risk.",
    category: "investing",
    letter: "D",
  },
  {
    id: "etf",
    term: "ETF (Exchange-Traded Fund)",
    shortDefinition: "A type of investment fund traded on stock exchanges.",
    category: "investing",
    letter: "E",
  },
  {
    id: "fiduciary",
    term: "Fiduciary",
    shortDefinition: "A person legally obligated to act in the best interest of another party.",
    category: "basics",
    letter: "F",
  },
  {
    id: "inflation",
    term: "Inflation",
    shortDefinition: "The rate at which the general level of prices for goods and services rises.",
    category: "economics",
    letter: "I",
  },
  {
    id: "liquidity",
    term: "Liquidity",
    shortDefinition: "The ease with which an asset can be converted into cash without affecting its market price.",
    category: "investing",
    letter: "L",
  },
  {
    id: "mutual-fund",
    term: "Mutual Fund",
    shortDefinition: "An investment vehicle made up of a pool of funds from many investors.",
    category: "investing",
    letter: "M",
  },
  {
    id: "portfolio",
    term: "Portfolio",
    shortDefinition: "A collection of financial investments like stocks, bonds, and cash.",
    category: "investing",
    letter: "P",
  },
  {
    id: "roth-ira",
    term: "Roth IRA",
    shortDefinition: "A tax-advantaged retirement account funded with post-tax dollars.",
    category: "retirement",
    letter: "R",
  },
  {
    id: "stock",
    term: "Stock",
    shortDefinition: "A type of security that represents ownership in a corporation.",
    category: "investing",
    letter: "S",
  },
  {
    id: "tax-deduction",
    term: "Tax Deduction",
    shortDefinition: "An expense that reduces taxable income.",
    category: "taxes",
    letter: "T",
  },
  {
    id: "yield",
    term: "Yield",
    shortDefinition: "The income return on an investment, such as interest or dividends.",
    category: "investing",
    letter: "Y",
  },
]

// Group terms by letter
const groupByLetter = () => {
  const grouped = {}
  glossaryTerms.forEach((term) => {
    if (!grouped[term.letter]) {
      grouped[term.letter] = []
    }
    grouped[term.letter].push(term)
  })
  return grouped
}

// Group terms by category
const groupByCategory = () => {
  const grouped = {}
  glossaryTerms.forEach((term) => {
    if (!grouped[term.category]) {
      grouped[term.category] = []
    }
    grouped[term.category].push(term)
  })
  return grouped
}

// Get all unique letters
const getUniqueLetters = () => {
  return [...new Set(glossaryTerms.map((term) => term.letter))].sort()
}

// Get all unique categories
const getUniqueCategories = () => {
  return [...new Set(glossaryTerms.map((term) => term.category))].sort()
}

// Format category name
const formatCategoryName = (category) => {
  return category.charAt(0).toUpperCase() + category.slice(1)
}

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("alphabetical")

  const groupedByLetter = groupByLetter()
  const groupedByCategory = groupByCategory()
  const uniqueLetters = getUniqueLetters()
  const uniqueCategories = getUniqueCategories()

  // Filter terms based on search query
  const filteredTerms = searchQuery
    ? glossaryTerms.filter(
        (term) =>
          term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
          term.shortDefinition.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : []

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Financial Glossary</h1>
            <p className="text-muted-foreground">A comprehensive guide to financial terms and concepts</p>
          </div>
          <div className="w-full md:w-80">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search terms..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {searchQuery ? (
          <div>
            <h2 className="text-xl font-bold mb-4">Search Results</h2>
            {filteredTerms.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredTerms.map((term) => (
                  <Card key={term.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle>{term.term}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">{term.shortDefinition}</CardDescription>
                      <Button variant="link" className="p-0 h-auto" asChild>
                        <Link href={`/glossary/${term.id}`}>
                          Read More <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No terms found matching "{searchQuery}"</p>
            )}
          </div>
        ) : (
          <Tabs defaultValue="alphabetical" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="alphabetical">Alphabetical</TabsTrigger>
              <TabsTrigger value="category">By Category</TabsTrigger>
            </TabsList>

            <TabsContent value="alphabetical" className="mt-6">
              <div className="flex flex-wrap gap-2 mb-6">
                {uniqueLetters.map((letter) => (
                  <Button key={letter} variant="outline" size="sm" asChild>
                    <a href={`#letter-${letter}`}>{letter}</a>
                  </Button>
                ))}
              </div>

              <div className="space-y-8">
                {uniqueLetters.map((letter) => (
                  <div key={letter} id={`letter-${letter}`}>
                    <h2 className="text-2xl font-bold mb-4 flex items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 mr-2">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      {letter}
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {groupedByLetter[letter].map((term) => (
                        <Card key={term.id} className="hover:shadow-md transition-shadow">
                          <CardHeader className="pb-2">
                            <CardTitle>{term.term}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <CardDescription className="mb-4">{term.shortDefinition}</CardDescription>
                            <Button variant="link" className="p-0 h-auto" asChild>
                              <Link href={`/glossary/${term.id}`}>
                                Read More <ChevronRight className="ml-1 h-4 w-4" />
                              </Link>
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="category" className="mt-6">
              <div className="flex flex-wrap gap-2 mb-6">
                {uniqueCategories.map((category) => (
                  <Button key={category} variant="outline" size="sm" asChild>
                    <a href={`#category-${category}`}>{formatCategoryName(category)}</a>
                  </Button>
                ))}
              </div>

              <div className="space-y-8">
                {uniqueCategories.map((category) => (
                  <div key={category} id={`category-${category}`}>
                    <h2 className="text-2xl font-bold mb-4 flex items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 mr-2">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      {formatCategoryName(category)}
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {groupedByCategory[category].map((term) => (
                        <Card key={term.id} className="hover:shadow-md transition-shadow">
                          <CardHeader className="pb-2">
                            <CardTitle>{term.term}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <CardDescription className="mb-4">{term.shortDefinition}</CardDescription>
                            <Button variant="link" className="p-0 h-auto" asChild>
                              <Link href={`/glossary/${term.id}`}>
                                Read More <ChevronRight className="ml-1 h-4 w-4" />
                              </Link>
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}

