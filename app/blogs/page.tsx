"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Calendar, Clock, Search, Tag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SiteHeader } from "@/components/site-header"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample blog data
const blogPosts = [
  {
    id: "1",
    title: "Understanding Mutual Fund Categories: A Beginner's Guide",
    excerpt:
      "Learn about the different types of mutual funds and how to choose the right ones for your investment portfolio.",
    date: "March 15, 2025",
    readTime: "8 min read",
    author: "Priya Sharma",
    authorTitle: "Senior Investment Analyst",
    category: "Investing",
    tags: ["Mutual Funds", "Investing Basics", "Portfolio Management"],
    featured: true,
  },
  {
    id: "2",
    title: "Tax-Saving Investment Options for Salaried Professionals",
    excerpt:
      "Explore various tax-saving investment options under Section 80C and beyond to optimize your tax planning.",
    date: "March 10, 2025",
    readTime: "10 min read",
    author: "Rajesh Kumar",
    authorTitle: "Tax Planning Specialist",
    category: "Tax Planning",
    tags: ["Tax Saving", "ELSS", "Section 80C"],
    featured: true,
  },
  {
    id: "3",
    title: "Emergency Fund: Why You Need One and How to Build It",
    excerpt:
      "Discover the importance of having an emergency fund and practical strategies to build one that suits your needs.",
    date: "March 5, 2025",
    readTime: "6 min read",
    author: "Ananya Patel",
    authorTitle: "Financial Planner",
    category: "Financial Planning",
    tags: ["Emergency Fund", "Financial Security", "Savings"],
    featured: false,
  },
  {
    id: "4",
    title: "Demystifying SIP: How Small Investments Create Big Wealth",
    excerpt:
      "Understand the power of Systematic Investment Plans (SIPs) and how they can help you build wealth over time.",
    date: "February 28, 2025",
    readTime: "7 min read",
    author: "Vikram Mehta",
    authorTitle: "Mutual Fund Analyst",
    category: "Investing",
    tags: ["SIP", "Wealth Creation", "Long-term Investing"],
    featured: false,
  },
  {
    id: "5",
    title: "Real Estate vs. Equity: Which is the Better Long-term Investment?",
    excerpt:
      "A comparative analysis of real estate and equity investments to help you make informed investment decisions.",
    date: "February 20, 2025",
    readTime: "12 min read",
    author: "Deepak Shenoy",
    authorTitle: "Investment Strategist",
    category: "Investing",
    tags: ["Real Estate", "Equity", "Asset Allocation"],
    featured: true,
  },
  {
    id: "6",
    title: "How to Create a Budget That Actually Works",
    excerpt:
      "Practical tips and strategies to create a budget that you can stick to and that helps you achieve your financial goals.",
    date: "February 15, 2025",
    readTime: "9 min read",
    author: "Meera Iyer",
    authorTitle: "Personal Finance Coach",
    category: "Budgeting",
    tags: ["Budgeting", "Money Management", "Financial Planning"],
    featured: false,
  },
  {
    id: "7",
    title: "Understanding Health Insurance: Coverage, Claims, and Costs",
    excerpt:
      "A comprehensive guide to health insurance policies, coverage options, claim processes, and cost considerations.",
    date: "February 10, 2025",
    readTime: "11 min read",
    author: "Dr. Sanjay Gupta",
    authorTitle: "Healthcare Finance Specialist",
    category: "Insurance",
    tags: ["Health Insurance", "Medical Coverage", "Claims"],
    featured: false,
  },
  {
    id: "8",
    title: "Retirement Planning in Your 30s: Why Starting Early Matters",
    excerpt:
      "Learn why starting retirement planning in your 30s can make a significant difference and strategies to implement.",
    date: "February 5, 2025",
    readTime: "8 min read",
    author: "Arun Mehta",
    authorTitle: "Retirement Planning Advisor",
    category: "Retirement",
    tags: ["Retirement Planning", "Early Investing", "Financial Independence"],
    featured: false,
  },
]

// Get all unique categories
const categories = Array.from(new Set(blogPosts.map((post) => post.category)))

// Get all unique tags
const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)))

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  // Filter posts based on search, category, and tag
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === null || post.category === selectedCategory

    const matchesTag = selectedTag === null || post.tags.includes(selectedTag)

    return matchesSearch && matchesCategory && matchesTag
  })

  // Filter posts based on active tab
  const displayedPosts = activeTab === "featured" ? filteredPosts.filter((post) => post.featured) : filteredPosts

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Financial <span className="gradient-text">Insights</span> Blog
            </h1>
            <p className="text-muted-foreground">
              Expert articles on personal finance, investing, and wealth management
            </p>
          </div>
          <div className="w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles..."
                className="pl-8 w-full md:w-[300px] rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
          <div className="space-y-6">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  className="w-full justify-start rounded-full"
                  onClick={() => setSelectedCategory(null)}
                >
                  All Categories
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className="w-full justify-start rounded-full"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTag === tag ? "default" : "outline"}
                      className="cursor-pointer rounded-full"
                      onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-2 rounded-full">
                <TabsTrigger value="all" className="rounded-full">
                  All Articles
                </TabsTrigger>
                <TabsTrigger value="featured" className="rounded-full">
                  Featured
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {displayedPosts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No articles found</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
                <Button
                  variant="outline"
                  className="mt-4 rounded-full"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory(null)
                    setSelectedTag(null)
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {displayedPosts.map((post) => (
                  <Card key={post.id} className="flex flex-col card-hover">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="rounded-full">
                          {post.category}
                        </Badge>
                        {post.featured && (
                          <Badge variant="default" className="rounded-full">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl">{post.title}</CardTitle>
                      <CardDescription className="flex items-center gap-4 text-xs">
                        <span className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          {post.date}
                        </span>
                        <span className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {post.readTime}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-muted-foreground">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs rounded-full">
                            <Tag className="mr-1 h-3 w-3" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full rounded-full">
                        <Link href={`/blogs/${post.id}`}>
                          Read Article
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

