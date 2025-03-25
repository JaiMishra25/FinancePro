"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, ChevronRight } from "lucide-react"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

// Glossary terms data (simplified version)
const glossaryTerms = {
  "401k": {
    term: "401(k)",
    shortDefinition: "A tax-advantaged retirement savings plan offered by employers.",
  },
  "compound-interest": {
    term: "Compound Interest",
    shortDefinition: "Interest calculated on the initial principal and accumulated interest.",
  },
  diversification: {
    term: "Diversification",
    shortDefinition: "Spreading investments across various assets to reduce risk.",
  },
  etf: {
    term: "ETF",
    shortDefinition: "Exchange-Traded Fund - a type of investment fund traded on stock exchanges.",
  },
  "mutual-fund": {
    term: "Mutual Fund",
    shortDefinition: "An investment vehicle made up of a pool of funds from many investors.",
  },
  stock: {
    term: "Stock",
    shortDefinition: "A type of security that represents ownership in a corporation.",
  },
  bond: {
    term: "Bond",
    shortDefinition: "A debt investment where an investor loans money to an entity for a defined period.",
  },
  portfolio: {
    term: "Portfolio",
    shortDefinition: "A collection of financial investments like stocks, bonds, and cash.",
  },
}

interface GlossaryTermTooltipProps {
  termId: string
  children: React.ReactNode
}

export function GlossaryTermTooltip({ termId, children }: GlossaryTermTooltipProps) {
  const [open, setOpen] = useState(false)
  const termData = glossaryTerms[termId as keyof typeof glossaryTerms]

  if (!termData) {
    return <>{children}</>
  }

  return (
    <TooltipProvider>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <span className="border-b border-dotted border-primary/50 cursor-help">{children}</span>
        </TooltipTrigger>
        <TooltipContent className="max-w-sm p-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <h4 className="font-medium">{termData.term}</h4>
            </div>
            <p className="text-sm text-muted-foreground">{termData.shortDefinition}</p>
            <Button variant="link" size="sm" className="p-0 h-auto" asChild onClick={() => setOpen(false)}>
              <Link href={`/glossary/${termId}`} className="flex items-center">
                Learn more
                <ChevronRight className="h-3 w-3 ml-1" />
              </Link>
            </Button>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

