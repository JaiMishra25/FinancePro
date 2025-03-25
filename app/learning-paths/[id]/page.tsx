"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronRight,
  Clock,
  Target,
  Calculator,
  LineChart,
  Wallet,
  PieChart,
  FileText,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Separator } from "@/components/ui/separator"
import {
  AreaChart,
  BarChart,
  LineChart as RechartsLineChart,
  PieChart as RechartsPieChart,
  Pie,
  Area,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Mock learning path data
const learningPaths = {
  "investing-basics": {
    title: "Investing Fundamentals",
    description: "Learn the core principles of investing and build a solid foundation",
    level: "Easy",
    readTime: "15 min",
    icon: BookOpen,
    color: "from-blue-500/20 to-blue-600/20",
    iconColor: "text-blue-500",
    topics: ["What is investing?", "Types of investments", "Risk and return", "Getting started"],
    content: [
      {
        title: "What is Investing?",
        content: `
          <p>Investing is the act of allocating resources, usually money, with the expectation of generating income or profit over time. Unlike saving, which involves setting money aside for future use with minimal risk, investing involves putting your money to work with some level of risk in the hopes of growing your wealth.</p>
          
          <p>The primary goal of investing is to build wealth over time. By investing your money, you're making it work for you rather than simply saving it. This is important because inflation erodes the purchasing power of money over time. A well-planned investment strategy can help your money grow faster than inflation, preserving and increasing your wealth.</p>
          
          <h3>Key Investment Principles</h3>
          <ul>
            <li><strong>Risk and Return:</strong> Generally, higher potential returns come with higher risk.</li>
            <li><strong>Diversification:</strong> Spreading investments across different assets to reduce risk.</li>
            <li><strong>Compounding:</strong> Earning returns on your initial investment plus any accumulated returns.</li>
            <li><strong>Time Horizon:</strong> The length of time you plan to hold an investment before needing the money.</li>
          </ul>
        `,
        chart: {
          type: "bar",
          title: "Average Annual Returns by Asset Class (1926-2022)",
          data: [
            { name: "Cash", return: 3.3 },
            { name: "Bonds", return: 5.0 },
            { name: "Stocks", return: 10.1 },
            { name: "Real Estate", return: 8.7 },
          ],
          xKey: "name",
          yKey: "return",
          tooltip: "Average annual return: {return}%",
        },
      },
      {
        title: "Types of Investments",
        content: `
          <p>There are many different types of investments available, each with its own characteristics, risk levels, and potential returns. Understanding the different types can help you build a diversified portfolio that aligns with your financial goals.</p>
          
          <h3>Common Investment Types</h3>
          
          <h4>Stocks (Equities)</h4>
          <p>When you buy a stock, you're purchasing a share of ownership in a company. As the company grows and becomes more valuable, the value of your shares may increase. Some stocks also pay dividends, which are regular payments to shareholders from the company's profits.</p>
          
          <h4>Bonds (Fixed Income)</h4>
          <p>Bonds are essentially loans that you make to a government or corporation. In return, they promise to pay you interest over a set period and return your principal when the bond matures. Bonds are generally considered less risky than stocks but offer lower potential returns.</p>
          
          <h4>Mutual Funds and ETFs</h4>
          <p>These are investment vehicles that pool money from many investors to buy a diversified portfolio of stocks, bonds, or other securities. They offer instant diversification and professional management.</p>
          
          <h4>Real Estate</h4>
          <p>Investing in property, either directly by buying physical real estate or indirectly through Real Estate Investment Trusts (REITs).</p>
          
          <h4>Cash and Cash Equivalents</h4>
          <p>These include savings accounts, certificates of deposit (CDs), money market accounts, and Treasury bills. They are the safest investments but typically offer the lowest returns.</p>
        `,
        chart: {
          type: "pie",
          title: "Sample Investment Portfolio Allocation",
          data: [
            { name: "Stocks", value: 60 },
            { name: "Bonds", value: 25 },
            { name: "Real Estate", value: 10 },
            { name: "Cash", value: 5 },
          ],
          dataKey: "value",
          nameKey: "name",
          tooltip: "{name}: {value}%",
        },
      },
      {
        title: "Risk and Return",
        content: `
          <p>Understanding the relationship between risk and return is fundamental to investing. Generally, investments with higher potential returns come with higher risks, while safer investments typically offer lower returns.</p>
          
          <h3>Types of Investment Risk</h3>
          
          <h4>Market Risk</h4>
          <p>The risk that the entire market or asset class will decline, affecting the value of your investments. This is also known as systematic risk and cannot be eliminated through diversification.</p>
          
          <h4>Inflation Risk</h4>
          <p>The risk that the purchasing power of your investment returns won't keep pace with inflation, effectively reducing your real returns.</p>
          
          <h4>Liquidity Risk</h4>
          <p>The risk that you won't be able to sell an investment quickly without a significant loss in value.</p>
          
          <h4>Concentration Risk</h4>
          <p>The risk of having too much of your portfolio in a single investment, sector, or asset class.</p>
          
          <h3>Managing Risk</h3>
          
          <p>While you can't eliminate investment risk entirely, you can manage it through:</p>
          
          <ul>
            <li><strong>Diversification:</strong> Spreading your investments across different asset classes, sectors, and geographic regions.</li>
            <li><strong>Asset Allocation:</strong> Determining the right mix of stocks, bonds, and other assets based on your risk tolerance and time horizon.</li>
            <li><strong>Regular Rebalancing:</strong> Periodically adjusting your portfolio to maintain your target asset allocation.</li>
            <li><strong>Dollar-Cost Averaging:</strong> Investing a fixed amount regularly, regardless of market conditions, to reduce the impact of market volatility.</li>
          </ul>
        `,
        chart: {
          type: "line",
          title: "Risk vs. Return Relationship",
          data: [
            { name: "Cash", risk: 1, return: 3 },
            { name: "Bonds", risk: 3, return: 5 },
            { name: "Balanced", risk: 5, return: 7 },
            { name: "Stocks", risk: 8, return: 10 },
          ],
          xKey: "risk",
          yKey: "return",
          tooltip: "{name}: Risk {risk}, Return {return}%",
        },
      },
      {
        title: "Getting Started",
        content: `
          <p>Starting your investment journey can seem daunting, but breaking it down into manageable steps can make it more approachable.</p>
          
          <h3>Steps to Start Investing</h3>
          
          <h4>1. Set Clear Financial Goals</h4>
          <p>Define what you're investing for (retirement, home purchase, education) and your time horizon. Different goals may require different investment strategies.</p>
          
          <h4>2. Assess Your Risk Tolerance</h4>
          <p>Be honest about how much risk you're comfortable taking. Consider factors like your age, income stability, and how you've reacted to financial stress in the past.</p>
          
          <h4>3. Create a Budget and Emergency Fund</h4>
          <p>Before investing, ensure you have a solid budget and an emergency fund covering 3-6 months of expenses in a readily accessible account.</p>
          
          <h4>4. Pay Off High-Interest Debt</h4>
          <p>If you have high-interest debt (like credit cards), consider paying it off before investing, as the interest you're paying likely exceeds potential investment returns.</p>
          
          <h4>5. Understand Tax-Advantaged Accounts</h4>
          <p>Maximize contributions to tax-advantaged accounts like 401(k)s and IRAs before investing in taxable accounts.</p>
          
          <h4>6. Start Simple</h4>
          <p>Consider starting with low-cost index funds or ETFs that provide broad market exposure and built-in diversification.</p>
          
          <h4>7. Keep Learning</h4>
          <p>Investing is a lifelong journey. Continue educating yourself about different investment strategies and opportunities.</p>
          
          <h3>Common Mistakes to Avoid</h3>
          
          <ul>
            <li><strong>Trying to Time the Market:</strong> Even professional investors struggle to consistently predict market movements.</li>
            <li><strong>Chasing Past Performance:</strong> Just because an investment performed well in the past doesn't mean it will continue to do so.</li>
            <li><strong>Letting Emotions Drive Decisions:</strong> Fear and greed can lead to buying high and selling low.</li>
            <li><strong>Neglecting Fees:</strong> High fees can significantly erode your returns over time.</li>
            <li><strong>Failing to Diversify:</strong> Putting all your eggs in one basket increases your risk.</li>
          </ul>
        `,
        chart: {
          type: "area",
          title: "Growth of $10,000 Over 30 Years",
          data: [
            { year: 0, savings: 10000, investing: 10000 },
            { year: 5, savings: 10500, investing: 14000 },
            { year: 10, savings: 11025, investing: 19600 },
            { year: 15, savings: 11576, investing: 27440 },
            { year: 20, savings: 12155, investing: 38416 },
            { year: 25, savings: 12763, investing: 53782 },
            { year: 30, savings: 13401, investing: 75295 },
          ],
          xKey: "year",
          areaKeys: ["savings", "investing"],
          tooltip: "Year {year}: Savings ${savings}, Investing ${investing}",
        },
      },
    ],
  },
  "retirement-planning": {
    title: "Retirement Planning",
    description: "Create a comprehensive retirement strategy tailored to your goals",
    level: "Medium",
    readTime: "20 min",
    icon: Target,
    color: "from-amber-500/20 to-amber-600/20",
    iconColor: "text-amber-500",
    topics: ["Retirement goals", "Savings strategies", "Investment allocation", "Withdrawal plans"],
    content: [
      {
        title: "Setting Retirement Goals",
        content: `
        <p>Retirement planning begins with defining clear goals for your retirement years. Without specific goals, it's difficult to create an effective strategy or measure your progress.</p>
        
        <h3>Key Considerations for Retirement Goals</h3>
        
        <h4>Retirement Age</h4>
        <p>When do you plan to retire? This decision significantly impacts how much you need to save and your investment strategy. Early retirement requires more aggressive saving, while delaying retirement can allow your investments more time to grow.</p>
        
        <h4>Lifestyle Expectations</h4>
        <p>What kind of lifestyle do you envision in retirement? Do you plan to travel extensively, pursue expensive hobbies, or live modestly? Your lifestyle choices directly affect your retirement budget.</p>
        
        <h4>Housing Plans</h4>
        <p>Will you stay in your current home, downsize, relocate to a less expensive area, or move to a retirement community? Housing costs are typically the largest expense in retirement.</p>
        
        <h4>Healthcare Needs</h4>
        <p>Healthcare costs tend to increase with age. Consider potential long-term care needs and insurance options to cover these expenses.</p>
        
        <h3>Quantifying Your Retirement Needs</h3>
        
        <p>Once you've outlined your retirement goals, you need to translate them into financial terms:</p>
        
        <ul>
          <li><strong>Replacement Rate:</strong> Many financial advisors suggest aiming to replace 70-80% of your pre-retirement income. However, this varies based on your planned lifestyle.</li>
          <li><strong>Retirement Duration:</strong> Plan for a retirement that could last 30+ years, considering increasing life expectancies.</li>
          <li><strong>Inflation Impact:</strong> Remember that inflation will reduce your purchasing power over time. A 3% annual inflation rate means prices double approximately every 24 years.</li>
        </ul>
      `,
        chart: {
          type: "bar",
          title: "Retirement Income Needs by Lifestyle",
          data: [
            { lifestyle: "Basic", percentage: 60 },
            { lifestyle: "Comfortable", percentage: 75 },
            { lifestyle: "Luxurious", percentage: 90 },
          ],
          xKey: "lifestyle",
          yKey: "percentage",
          tooltip: "Income replacement: {percentage}% of pre-retirement income",
        },
      },
      {
        title: "Retirement Savings Strategies",
        content: `
        <p>Developing effective savings strategies is crucial for building the nest egg you'll need in retirement. The earlier you start, the more you benefit from compound growth.</p>
        
        <h3>Tax-Advantaged Retirement Accounts</h3>
        
        <h4>401(k) and 403(b) Plans</h4>
        <p>Employer-sponsored retirement plans that allow pre-tax contributions, reducing your current taxable income. Many employers offer matching contributions, which is essentially free money for your retirement.</p>
        
        <h4>Traditional IRA</h4>
        <p>Individual Retirement Accounts that may offer tax-deductible contributions, depending on your income and whether you have access to an employer plan. Earnings grow tax-deferred until withdrawal.</p>
        
        <h4>Roth IRA and Roth 401(k)</h4>
        <p>These accounts are funded with after-tax dollars, but qualified withdrawals in retirement are completely tax-free. This can be particularly advantageous if you expect to be in a higher tax bracket in retirement.</p>
        
        <h4>Health Savings Account (HSA)</h4>
        <p>If you have a high-deductible health plan, an HSA offers triple tax advantages: tax-deductible contributions, tax-free growth, and tax-free withdrawals for qualified medical expenses. After age 65, you can withdraw funds for non-medical expenses without penalty (though regular income tax applies).</p>
        
        <h3>Savings Strategies</h3>
        
        <ul>
          <li><strong>Maximize Employer Match:</strong> Always contribute at least enough to your employer-sponsored plan to get the full matching contribution.</li>
          <li><strong>Automate Savings:</strong> Set up automatic transfers to your retirement accounts to ensure consistent saving.</li>
          <li><strong>Increase Contributions Gradually:</strong> Boost your contribution percentage whenever you receive a raise or pay off a debt.</li>
          <li><strong>Catch-Up Contributions:</strong> If you're 50 or older, take advantage of catch-up contributions to accelerate your savings.</li>
          <li><strong>Diversify Tax Treatment:</strong> Consider having a mix of pre-tax (traditional) and after-tax (Roth) accounts to provide tax flexibility in retirement.</li>
        </ul>
      `,
        chart: {
          type: "area",
          title: "Growth of $500 Monthly Investment Over Time",
          data: [
            { year: 0, value: 0 },
            { year: 5, value: 34000 },
            { year: 10, value: 78000 },
            { year: 15, value: 138000 },
            { year: 20, value: 220000 },
            { year: 25, value: 330000 },
            { year: 30, value: 475000 },
          ],
          xKey: "year",
          areaKeys: ["value"],
          tooltip: "After {year} years: ${value}",
        },
      },
      {
        title: "Investment Allocation for Retirement",
        content: `
        <p>Your investment allocation—how you divide your portfolio among different asset classes—is a critical factor in your retirement planning success. The right allocation balances growth potential with risk management.</p>
        
        <h3>Asset Allocation Principles</h3>
        
        <h4>Age-Based Allocation</h4>
        <p>A traditional approach suggests subtracting your age from 110 or 120 to determine your stock allocation percentage. For example, a 40-year-old might have 70-80% in stocks and the remainder in bonds and cash.</p>
        
        <h4>Time Horizon Considerations</h4>
        <p>The longer your time horizon, the more risk you can generally afford to take. As you approach retirement, gradually shifting to more conservative investments helps protect your accumulated wealth.</p>
        
        <h4>Risk Tolerance</h4>
        <p>Your personal comfort with market volatility should influence your allocation. Even with a long time horizon, an allocation that causes you significant stress during market downturns may not be sustainable.</p>
        
        <h3>Retirement Portfolio Components</h3>
        
        <h4>Growth Component</h4>
        <p>Typically stocks or stock funds, providing long-term growth potential to combat inflation and extend the longevity of your portfolio.</p>
        
        <h4>Income Component</h4>
        <p>Bonds, dividend-paying stocks, and other income-generating investments that provide stability and regular income.</p>
        
        <h4>Preservation Component</h4>
        <p>Cash and cash equivalents that offer capital preservation and liquidity for near-term expenses or emergency needs.</p>
        
        <h3>Allocation Strategies for Different Life Stages</h3>
        
        <h4>Early Career (20s-30s)</h4>
        <p>With decades until retirement, a growth-oriented portfolio heavily weighted toward stocks can maximize long-term returns despite short-term volatility.</p>
        
        <h4>Mid-Career (40s-50s)</h4>
        <p>A more balanced approach with a substantial stock allocation but increasing bond exposure to moderate risk as retirement approaches.</p>
        
        <h4>Pre-Retirement (5-10 years before retirement)</h4>
        <p>Begin shifting to a more conservative allocation to protect against sequence of returns risk, where market downturns early in retirement can significantly impact portfolio longevity.</p>
        
        <h4>Retirement Phase</h4>
        <p>A diversified portfolio that balances the need for continued growth with income generation and capital preservation.</p>
      `,
        chart: {
          type: "pie",
          title: "Sample Retirement Portfolio Allocation by Age",
          data: [
            { name: "Age 30", stocks: 80, bonds: 15, cash: 5 },
            { name: "Age 50", stocks: 65, bonds: 30, cash: 5 },
            { name: "Age 70", stocks: 40, bonds: 50, cash: 10 },
          ],
          dataKey: "stocks",
          nameKey: "name",
          tooltip: "{name}: Stocks {stocks}%, Bonds {bonds}%, Cash {cash}%",
        },
      },
      {
        title: "Retirement Withdrawal Strategies",
        content: `
        <p>How you withdraw from your retirement accounts is just as important as how you save and invest. A thoughtful withdrawal strategy can help maximize your retirement income and minimize taxes.</p>
        
        <h3>Sustainable Withdrawal Rates</h3>
        
        <h4>The 4% Rule</h4>
        <p>A widely cited guideline suggesting that withdrawing 4% of your portfolio in the first year of retirement, then adjusting that amount annually for inflation, provides a high probability of portfolio survival for a 30-year retirement. However, this rule has limitations and may need adjustment based on market conditions and personal circumstances.</p>
        
        <h4>Dynamic Withdrawal Strategies</h4>
        <p>More flexible approaches that adjust withdrawal rates based on market performance, potentially allowing higher withdrawals in strong markets and reduced withdrawals during downturns.</p>
        
        <h3>Tax-Efficient Withdrawal Sequencing</h3>
        
        <p>The order in which you withdraw from different account types can significantly impact your tax liability:</p>
        
        <ol>
          <li><strong>Taxable Accounts First:</strong> Generally, it's advantageous to withdraw from taxable accounts first, allowing tax-advantaged accounts to continue growing tax-deferred or tax-free.</li>
          <li><strong>Tax-Deferred Accounts Second:</strong> Traditional IRAs and 401(k)s, which are subject to required minimum distributions (RMDs) beginning at age 72.</li>
          <li><strong>Tax-Free Accounts Last:</strong> Roth IRAs, which have no RMDs and provide tax-free withdrawals, can be preserved for later retirement years or legacy planning.</li>
        </ol>
        
        <p>However, this sequence may be modified to manage your tax bracket each year, potentially drawing from multiple account types to optimize your tax situation.</p>
        
        <h3>Income Sources in Retirement</h3>
        
        <h4>Social Security Optimization</h4>
        <p>Deciding when to claim Social Security benefits is a crucial retirement planning decision. Delaying benefits beyond full retirement age increases your monthly benefit amount by 8% per year up to age 70.</p>
        
        <h4>Pension Options</h4>
        <p>If you have a pension, you'll need to choose between various payout options, such as single life, joint and survivor, or lump sum distributions.</p>
        
        <h4>Annuities</h4>
        <p>Consider whether annuitizing a portion of your portfolio to create guaranteed lifetime income makes sense for your situation.</p>
        
        <h3>Legacy and Estate Planning</h3>
        
        <p>Your withdrawal strategy should also consider your estate planning goals:</p>
        
        <ul>
          <li><strong>Beneficiary Designations:</strong> Ensure all retirement accounts have updated beneficiary designations.</li>
          <li><strong>Roth Conversions:</strong> Converting traditional IRA assets to Roth can reduce future RMDs and provide tax-free inheritance for beneficiaries.</li>
          <li><strong>Charitable Giving:</strong> Qualified Charitable Distributions (QCDs) from IRAs can satisfy RMDs while supporting charitable causes tax-efficiently.</li>
        </ul>
      `,
        chart: {
          type: "line",
          title: "Portfolio Survival Rates with Different Withdrawal Strategies",
          data: [
            { year: 0, conservative: 100, moderate: 100, aggressive: 100 },
            { year: 5, conservative: 99, moderate: 98, aggressive: 95 },
            { year: 10, conservative: 97, moderate: 94, aggressive: 85 },
            { year: 15, conservative: 94, moderate: 88, aggressive: 72 },
            { year: 20, conservative: 90, moderate: 80, aggressive: 58 },
            { year: 25, conservative: 85, moderate: 70, aggressive: 42 },
            { year: 30, conservative: 80, moderate: 60, aggressive: 30 },
          ],
          xKey: "year",
          yKey: "moderate",
          tooltip: "Year {year}: {moderate}% success rate",
        },
      },
    ],
  },
  "stock-market": {
    title: "Stock Market Basics",
    description: "Understand how to analyze and invest in stocks with confidence",
    category: "investing",
    level: "Medium",
    readTime: "25 min",
    icon: LineChart,
    color: "from-green-500/20 to-green-600/20",
    iconColor: "text-green-500",
    topics: ["Stock fundamentals", "Market analysis", "Trading basics", "Building a portfolio"],
    content: [
      {
        title: "Stock Market Fundamentals",
        content: `
        <p>The stock market is a marketplace where investors buy and sell shares of publicly traded companies. Understanding how it works is essential for anyone looking to invest in stocks.</p>
        
        <h3>What is a Stock?</h3>
        <p>A stock (also called a share) represents partial ownership in a company. When you buy a stock, you're purchasing a small piece of that company, which entitles you to a portion of its assets and earnings.</p>
        
        <h3>How the Stock Market Works</h3>
        
        <h4>Stock Exchanges</h4>
        <p>Stocks are bought and sold on stock exchanges like the New York Stock Exchange (NYSE) or the Nasdaq. These exchanges provide the infrastructure for trading and ensure transactions occur in a regulated, transparent environment.</p>
        
        <h4>Market Participants</h4>
        <p>Various participants interact in the stock market:</p>
        <ul>
          <li><strong>Individual Investors:</strong> People investing their personal funds</li>
          <li><strong>Institutional Investors:</strong> Organizations like pension funds, mutual funds, and insurance companies</li>
          <li><strong>Market Makers:</strong> Firms that facilitate trading by buying and selling stocks</li>
          <li><strong>Brokers:</strong> Intermediaries who execute trades on behalf of investors</li>
        </ul>
        
        <h4>Market Indexes</h4>
        <p>Stock market indexes track the performance of a specific group of stocks, providing a snapshot of market performance. Common indexes include:</p>
        <ul>
          <li><strong>S&P 500:</strong> Tracks 500 of the largest U.S. companies</li>
          <li><strong>Dow Jones Industrial Average:</strong> Tracks 30 large, publicly-owned U.S. companies</li>
          <li><strong>Nasdaq Composite:</strong> Includes all companies listed on the Nasdaq exchange, with a heavy concentration of technology stocks</li>
        </ul>
        
        <h3>Stock Market Cycles</h3>
        <p>The stock market typically moves through cycles of expansion (bull markets) and contraction (bear markets):</p>
        <ul>
          <li><strong>Bull Market:</strong> A period of rising stock prices, typically accompanied by economic growth and investor optimism</li>
          <li><strong>Bear Market:</strong> A period of falling stock prices, often associated with economic downturns and investor pessimism</li>
        </ul>
        <p>Understanding these cycles can help investors make more informed decisions about when to buy or sell stocks.</p>
      `,
        chart: {
          type: "line",
          title: "Historical Stock Market Cycles (S&P 500)",
          data: [
            { year: 1990, value: 100 },
            { year: 1995, value: 185 },
            { year: 2000, value: 340 },
            { year: 2002, value: 220 },
            { year: 2007, value: 380 },
            { year: 2009, value: 200 },
            { year: 2014, value: 400 },
            { year: 2020, value: 480 },
            { year: 2021, value: 580 },
          ],
          xKey: "year",
          yKey: "value",
          tooltip: "Year {year}: Index value {value}",
        },
      },
      {
        title: "Stock Analysis Methods",
        content: `
        <p>Investors use various methods to analyze stocks and make investment decisions. The two primary approaches are fundamental analysis and technical analysis.</p>
        
        <h3>Fundamental Analysis</h3>
        <p>Fundamental analysis evaluates a company's financial health, competitive position, and growth prospects to determine its intrinsic value. This approach assumes that a stock's price will eventually reflect its true value.</p>
        
        <h4>Key Financial Metrics</h4>
        <ul>
          <li><strong>Earnings Per Share (EPS):</strong> A company's profit divided by its outstanding shares</li>
          <li><strong>Price-to-Earnings Ratio (P/E):</strong> Stock price divided by EPS, indicating how much investors are willing to pay for each dollar of earnings</li>
          <li><strong>Price-to-Book Ratio (P/B):</strong> Stock price divided by book value per share, comparing market value to accounting value</li>
          <li><strong>Debt-to-Equity Ratio:</strong> Total liabilities divided by shareholder equity, measuring financial leverage</li>
          <li><strong>Return on Equity (ROE):</strong> Net income divided by shareholder equity, showing how efficiently a company uses its equity to generate profits</li>
        </ul>
        
        <h4>Qualitative Factors</h4>
        <p>Beyond numbers, fundamental analysis considers:</p>
        <ul>
          <li><strong>Business Model:</strong> How the company makes money</li>
          <li><strong>Competitive Advantage:</strong> What gives the company an edge over competitors</li>
          <li><strong>Management Quality:</strong> The experience and track record of the leadership team</li>
          <li><strong>Industry Trends:</strong> How changes in the industry might affect the company</li>
        </ul>
        
        <h3>Technical Analysis</h3>
        <p>Technical analysis studies price movements and trading volume to identify patterns and trends. This approach assumes that historical price patterns tend to repeat and can predict future movements.</p>
        
        <h4>Common Technical Indicators</h4>
        <ul>
          <li><strong>Moving Averages:</strong> Average price over a specific time period, smoothing out price fluctuations</li>
          <li><strong>Relative Strength Index (RSI):</strong> Measures the speed and change of price movements, indicating overbought or oversold conditions</li>
          <li><strong>MACD (Moving Average Convergence Divergence):</strong> Shows the relationship between two moving averages, helping identify momentum shifts</li>
          <li><strong>Support and Resistance Levels:</strong> Price points where stocks historically stop falling or rising</li>
        </ul>
        
        <h3>Combining Approaches</h3>
        <p>Many successful investors use both fundamental and technical analysis:</p>
        <ul>
          <li>Use fundamental analysis to identify quality companies worth investing in</li>
          <li>Use technical analysis to determine optimal entry and exit points</li>
        </ul>
        <p>This combined approach leverages the strengths of both methodologies while mitigating their individual weaknesses.</p>
      `,
        chart: {
          type: "bar",
          title: "P/E Ratios by Sector",
          data: [
            { sector: "Technology", pe: 28 },
            { sector: "Healthcare", pe: 22 },
            { sector: "Consumer", pe: 25 },
            { sector: "Financial", pe: 15 },
            { sector: "Energy", pe: 18 },
            { sector: "Utilities", pe: 20 },
          ],
          xKey: "sector",
          yKey: "pe",
          tooltip: "{sector}: P/E Ratio {pe}",
        },
      },
      {
        title: "Stock Trading Basics",
        content: `
        <p>Understanding how to execute trades and the different types of orders available is essential for anyone investing in the stock market.</p>
        
        <h3>Types of Stock Orders</h3>
        
        <h4>Market Orders</h4>
        <p>A market order is an instruction to buy or sell a stock immediately at the best available current price. These orders guarantee execution but not price.</p>
        <p><strong>When to use:</strong> When immediate execution is more important than getting a specific price, typically for highly liquid stocks.</p>
        
        <h4>Limit Orders</h4>
        <p>A limit order is an instruction to buy or sell a stock at a specified price or better. These orders guarantee price but not execution.</p>
        <p><strong>When to use:</strong> When you have a specific price target and are willing to wait for it to be reached.</p>
        
        <h4>Stop Orders</h4>
        <p>A stop order (or stop-loss order) becomes a market order when a specified price is reached. It's primarily used to limit losses or protect profits.</p>
        <p><strong>When to use:</strong> To automatically sell a stock if it falls to a certain price, limiting potential losses.</p>
        
        <h4>Stop-Limit Orders</h4>
        <p>A stop-limit order combines features of stop and limit orders. When the stop price is reached, it becomes a limit order rather than a market order.</p>
        <p><strong>When to use:</strong> When you want to sell if a stock drops to a certain price, but only if you can get a specific price or better.</p>
        
        <h3>Trading Costs</h3>
        
        <p>While many brokerages now offer commission-free trading, other costs can impact your returns:</p>
        
        <ul>
          <li><strong>Bid-Ask Spread:</strong> The difference between the highest price a buyer is willing to pay (bid) and the lowest price a seller is willing to accept (ask)</li>
          <li><strong>Slippage:</strong> The difference between the expected price of a trade and the actual executed price, particularly relevant for large orders or illiquid stocks</li>
          <li><strong>Taxes:</strong> Capital gains taxes on profitable trades, with different rates for short-term (held less than one year) and long-term gains</li>
        </ul>
        
        <h3>Trading Strategies</h3>
        
        <h4>Buy and Hold</h4>
        <p>Purchasing stocks with the intention of holding them for a long period, typically years or decades. This strategy focuses on long-term growth and minimizes trading costs and taxes.</p>
        
        <h4>Dollar-Cost Averaging</h4>
        <p>Investing a fixed amount regularly, regardless of market conditions. This approach reduces the impact of volatility and eliminates the need to time the market.</p>
        
        <h4>Dividend Investing</h4>
        <p>Focusing on stocks that pay regular dividends, providing income in addition to potential price appreciation.</p>
        
        <h4>Value Investing</h4>
        <p>Seeking stocks that appear undervalued based on fundamental analysis, with the expectation that the market will eventually recognize their true value.</p>
        
        <h4>Growth Investing</h4>
        <p>Targeting companies with above-average growth potential, often willing to pay premium prices for stocks with strong growth prospects.</p>
      `,
        chart: {
          type: "pie",
          title: "Trading Strategies by Investor Type",
          data: [
            { name: "Buy and Hold", value: 45 },
            { name: "Value Investing", value: 20 },
            { name: "Growth Investing", value: 15 },
            { name: "Dividend Investing", value: 12 },
            { name: "Active Trading", value: 8 },
          ],
          dataKey: "value",
          nameKey: "name",
          tooltip: "{name}: {value}%",
        },
      },
      {
        title: "Building a Stock Portfolio",
        content: `
        <p>Creating a well-structured stock portfolio involves more than just picking individual stocks. It requires thoughtful consideration of diversification, risk management, and alignment with your financial goals.</p>
        
        <h3>Portfolio Diversification</h3>
        
        <p>Diversification is the practice of spreading your investments across various assets to reduce risk. A well-diversified stock portfolio might include:</p>
        
        <ul>
          <li><strong>Sector Diversification:</strong> Investing across different industries (technology, healthcare, finance, consumer goods, etc.) to reduce sector-specific risks</li>
          <li><strong>Geographic Diversification:</strong> Including both domestic and international stocks to mitigate country-specific risks</li>
          <li><strong>Company Size Diversification:</strong> Balancing large-cap, mid-cap, and small-cap stocks, which tend to perform differently in various market conditions</li>
          <li><strong>Style Diversification:</strong> Combining growth and value stocks to benefit from different market cycles</li>
        </ul>
        
        <h3>Portfolio Construction Approaches</h3>
        
        <h4>Core-Satellite Approach</h4>
        <p>This strategy involves building a portfolio with a "core" of broad market index funds or ETFs (typically 60-80% of the portfolio), supplemented by "satellite" positions in individual stocks or specialized funds that you believe will outperform.</p>
        
        <h4>Factor-Based Investing</h4>
        <p>This approach focuses on characteristics (factors) that have historically delivered superior risk-adjusted returns, such as value, size, momentum, quality, and low volatility.</p>
        
        <h4>Thematic Investing</h4>
        <p>Building portions of your portfolio around specific themes or trends you believe will shape the future, such as renewable energy, artificial intelligence, or aging demographics.</p>
        
        <h3>Risk Management Strategies</h3>
        
        <h4>Position Sizing</h4>
        <p>Determining how much of your portfolio to allocate to each stock. A common guideline is to limit individual stock positions to 5% or less of your total portfolio.</p>
        
        <h4>Rebalancing</h4>
        <p>Periodically adjusting your portfolio back to your target allocation. This disciplined approach forces you to "buy low and sell high" as you trim positions that have grown and add to those that have underperformed.</p>
        
        <h4>Stop-Loss Orders</h4>
        <p>Using stop-loss orders to automatically sell positions that decline by a predetermined percentage, limiting potential losses on individual stocks.</p>
        
        <h3>Portfolio Monitoring and Adjustment</h3>
        
        <p>A stock portfolio isn't a "set it and forget it" investment. Regular monitoring and periodic adjustments are essential:</p>
        
        <ul>
          <li><strong>Regular Reviews:</strong> Assess your portfolio's performance quarterly or annually against appropriate benchmarks</li>
          <li><strong>Fundamental Changes:</strong> Re-evaluate holdings when companies experience significant changes (management turnover, acquisitions, competitive threats)</li>
          <li><strong>Life Changes:</strong> Adjust your portfolio as your financial goals, time horizon, or risk tolerance evolve</li>
        </ul>
        
        <p>Remember that the goal isn't to avoid all losses—which is impossible—but to build a portfolio that can weather market volatility while providing the growth potential needed to achieve your financial objectives.</p>
      `,
        chart: {
          type: "bar",
          title: "Sample Portfolio Allocation by Sector",
          data: [
            { sector: "Technology", percentage: 25 },
            { sector: "Healthcare", percentage: 15 },
            { sector: "Financial", percentage: 15 },
            { sector: "Consumer", percentage: 12 },
            { sector: "Industrial", percentage: 10 },
            { sector: "Energy", percentage: 8 },
            { sector: "Utilities", percentage: 5 },
            { sector: "Real Estate", percentage: 5 },
            { sector: "Materials", percentage: 5 },
          ],
          xKey: "sector",
          yKey: "percentage",
          tooltip: "{sector}: {percentage}%",
        },
      },
    ],
  },
  "tax-optimization": {
    title: "Tax Optimization Strategies",
    description: "Learn legal ways to minimize your tax burden and maximize returns",
    category: "planning",
    level: "Hard",
    readTime: "30 min",
    icon: Wallet,
    color: "from-purple-500/20 to-purple-600/20",
    iconColor: "text-purple-500",
    topics: ["Tax-advantaged accounts", "Capital gains strategies", "Tax-loss harvesting", "Estate planning"],
    content: [
      {
        title: "Tax-Advantaged Investment Accounts",
        content: `
        <p>One of the most effective ways to optimize your tax situation is by strategically using tax-advantaged investment accounts. These accounts offer various tax benefits that can significantly enhance your after-tax returns over time.</p>
        
        <h3>Retirement Accounts</h3>
        
        <h4>Traditional 401(k) and IRA</h4>
        <p>These accounts offer tax-deferred growth and immediate tax benefits:</p>
        <ul>
          <li><strong>Contributions are tax-deductible</strong>, reducing your current taxable income</li>
          <li><strong>Investments grow tax-deferred</strong>, meaning you don't pay taxes on dividends, interest, or capital gains while the money remains in the account</li>
          <li><strong>Withdrawals in retirement are taxed as ordinary income</strong></li>
          <li><strong>Required Minimum Distributions (RMDs)</strong> generally begin at age 72</li>
        </ul>
        
        <h4>Roth 401(k) and Roth IRA</h4>
        <p>These accounts offer tax-free growth and future tax benefits:</p>
        <ul>
          <li><strong>Contributions are made with after-tax dollars</strong> (no immediate tax deduction)</li>
          <li><strong>Investments grow tax-free</strong></li>
          <li><strong>Qualified withdrawals in retirement are completely tax-free</strong></li>
          <li><strong>Roth IRAs have no RMDs</strong> during the owner's lifetime</li>
          <li><strong>Income limits may restrict direct Roth IRA contributions</strong>, though "backdoor" Roth conversions are an option for high-income earners</li>
        </ul>
        
        <h3>Health Savings Accounts (HSAs)</h3>
        <p>HSAs offer triple tax advantages for those with qualifying high-deductible health plans:</p>
        <ul>
          <li><strong>Tax-deductible contributions</strong></li>
          <li><strong>Tax-free growth</strong></li>
          <li><strong>Tax-free withdrawals</strong> for qualified medical expenses</li>
        </ul>
        <p>After age 65, HSA funds can be withdrawn for non-medical purposes without penalty (though regular income tax would apply), effectively making them function like a Traditional IRA with the added benefit of tax-free medical withdrawals.</p>
        
        <h3>529 Education Savings Plans</h3>
        <p>These state-sponsored plans help families save for education expenses:</p>
        <ul>
          <li><strong>Contributions may be state tax-deductible</strong> (varies by state)</li>
          <li><strong>Investments grow tax-free</strong></li>
          <li><strong>Withdrawals are tax-free</strong> when used for qualified education expenses</li>
          <li>Recent legislation expanded qualified expenses to include K-12 tuition (up to $10,000 annually) and student loan repayments (lifetime limit of $10,000)</li>
        </ul>
        
        <h3>Strategic Account Usage</h3>
        <p>To maximize tax efficiency, consider these strategies:</p>
        <ul>
          <li><strong>Prioritize employer-matched contributions</strong> to capture "free money"</li>
          <li><strong>Maximize HSA contributions</strong> if eligible, using it as a long-term investment vehicle rather than for current medical expenses when possible</li>
          <li><strong>Balance Traditional and Roth accounts</strong> to provide tax diversification in retirement</li>
          <li><strong>Consider your current vs. expected future tax bracket</strong> when choosing between Traditional and Roth options</li>
        </ul>
      `,
        chart: {
          type: "bar",
          title: "Tax Savings Comparison: $6,000 Annual Investment Over 30 Years",
          data: [
            { account: "Taxable Account", value: 395000 },
            { account: "Traditional IRA", value: 505000 },
            { account: "Roth IRA", value: 530000 },
          ],
          xKey: "account",
          yKey: "value",
          tooltip: "{account}: ${value}",
        },
      },
      {
        title: "Capital Gains Tax Strategies",
        content: `
        <p>Understanding and strategically managing capital gains taxes can significantly impact your investment returns. Different holding periods and thoughtful timing of sales can help minimize your tax burden.</p>
        
        <h3>Capital Gains Tax Basics</h3>
        
        <h4>Short-Term vs. Long-Term Capital Gains</h4>
        <p>The tax rate on investment profits depends on how long you hold the asset:</p>
        <ul>
          <li><strong>Short-term capital gains</strong> (assets held for one year or less) are taxed at your ordinary income tax rate, which can be as high as 37%</li>
          <li><strong>Long-term capital gains</strong> (assets held for more than one year) are taxed at preferential rates: 0%, 15%, or 20%, depending on your income</li>
        </ul>
        
        <h4>Capital Gains Tax Rates (2023)</h4>
        <table>
          <tr>
            <th>Filing Status</th>
            <th>0% Rate</th>
            <th>15% Rate</th>
            <th>20% Rate</th>
          </tr>
          <tr>
            <td>Single</td>
            <td>Up to $44,625</td>
            <td>$44,626 - $492,300</td>
            <td>Over $492,300</td>
          </tr>
          <tr>
            <td>Married Filing Jointly</td>
            <td>Up to $89,250</td>
            <td>$89,251 - $553,850</td>
            <td>Over $553,850</td>
          </tr>
        </table>
        
        <h3>Tax-Efficient Investing Strategies</h3>
        
        <h4>Hold Investments for Long-Term Gains</h4>
        <p>Whenever possible, hold investments for more than one year to qualify for lower long-term capital gains rates. This simple strategy can reduce your tax rate by 10-20 percentage points.</p>
        
        <h4>Strategic Timing of Gains and Losses</h4>
        <p>Consider realizing capital gains in years when:</p>
        <ul>
          <li>Your income is unusually low, potentially qualifying for the 0% long-term capital gains rate</li>
          <li>You have capital losses that can offset the gains</li>
          <li>You're planning charitable donations that can offset the tax impact</li>
        </ul>
        
        <h4>Tax-Gain Harvesting</h4>
        <p>If your income is low enough to qualify for the 0% long-term capital gains rate, consider selling appreciated assets and immediately repurchasing them. This resets your cost basis higher without triggering any tax, potentially reducing future tax liability.</p>
        
        <h4>Asset Location Strategy</h4>
        <p>Place investments in accounts that maximize their after-tax returns:</p>
        <ul>
          <li><strong>Tax-advantaged accounts</strong> (IRAs, 401(k)s): Hold tax-inefficient investments like bonds, REITs, and actively managed funds that generate regular income or short-term capital gains</li>
          <li><strong>Taxable accounts</strong>: Hold tax-efficient investments like index funds, ETFs, municipal bonds, and stocks you plan to hold long-term</li>
        </ul>
        
        <h3>Special Considerations</h3>
        
        <h4>Net Investment Income Tax (NIIT)</h4>
        <p>An additional 3.8% tax applies to investment income for taxpayers with modified adjusted gross income above certain thresholds ($200,000 for single filers, $250,000 for married filing jointly).</p>
        
        <h4>Qualified Dividends</h4>
        <p>Dividends from U.S. corporations and qualified foreign corporations are taxed at the same preferential rates as long-term capital gains if you've held the stock for more than 60 days.</p>
        
        <h4>State Taxes</h4>
        <p>Remember that many states also tax capital gains, often at ordinary income rates. Consider state tax implications when implementing capital gains strategies.</p>
      `,
        chart: {
          type: "bar",
          title: "Tax Impact on $10,000 Gain by Holding Period",
          data: [
            { period: "6 Months (37% Tax)", afterTax: 6300 },
            { period: "13 Months (15% Tax)", afterTax: 8500 },
            { period: "13 Months (0% Tax Bracket)", afterTax: 10000 },
          ],
          xKey: "period",
          yKey: "afterTax",
          tooltip: "{period}: ${afterTax} after tax",
        },
      },
      {
        title: "Tax-Loss Harvesting",
        content: `
        <p>Tax-loss harvesting is a powerful strategy that involves selling investments that have declined in value to offset capital gains and potentially reduce your tax liability.</p>
        
        <h3>How Tax-Loss Harvesting Works</h3>
        
        <p>The basic process involves:</p>
        <ol>
          <li>Identifying investments in your taxable accounts that have declined in value</li>
          <li>Selling those investments to realize the loss</li>
          <li>Using the loss to offset capital gains and up to $3,000 of ordinary income per year</li>
          <li>Reinvesting the proceeds in a similar (but not "substantially identical") investment to maintain your market exposure</li>
        </ol>
        
        <h3>Tax Benefits</h3>
        
        <h4>Offsetting Capital Gains</h4>
        <p>Capital losses first offset capital gains of the same type (short-term losses against short-term gains, long-term losses against long-term gains). Any remaining losses can then offset the other type of gain.</p>
        
        <h4>Reducing Ordinary Income</h4>
        <p>If your capital losses exceed your capital gains, you can use up to $3,000 of the excess loss to offset ordinary income each year.</p>
        
        <h4>Carrying Forward Losses</h4>
        <p>Any unused capital losses can be carried forward indefinitely to future tax years, providing tax benefits for years to come.</p>
        
        <h3>Implementation Strategies</h3>
        
        <h4>Year-End Tax-Loss Harvesting</h4>
        <p>Many investors review their portfolios in November or December to harvest losses before the tax year ends. However, market opportunities for tax-loss harvesting can arise throughout the year, especially during market corrections.</p>
        
        <h4>Wash Sale Rule Considerations</h4>
        <p>The IRS "wash sale rule" disallows the tax loss if you purchase a "substantially identical" security within 30 days before or after selling at a loss. To maintain market exposure while complying with this rule:</p>
        <ul>
          <li>Replace the sold investment with a similar but not identical investment (e.g., sell one S&P 500 index fund and buy a different S&P 500 index fund from another provider)</li>
          <li>Replace individual stocks with ETFs that track the relevant sector</li>
          <li>Wait 31 days and then repurchase the original investment</li>
        </ul>
        
        <h4>Tax-Loss Harvesting with ETFs</h4>
        <p>Exchange-traded funds (ETFs) are particularly useful for tax-loss harvesting because:</p>
        <ul>
          <li>Many similar ETFs track different indexes (e.g., S&P 500 vs. Russell 1000), making them not "substantially identical"</li>
          <li>ETFs from different providers tracking the same index may be considered different enough to avoid wash sale issues</li>
          <li>The wide variety of ETFs makes it easier to find suitable replacements</li>
        </ul>
        
        <h3>Advanced Considerations</h3>
        
        <h4>Tax-Rate Arbitrage</h4>
        <p>Since short-term losses first offset short-term gains (taxed at higher ordinary income rates), prioritize harvesting short-term losses when possible to maximize tax savings.</p>
        
        <h4>Cost Basis Methods</h4>
        <p>Different cost basis methods (FIFO, specific identification, etc.) can significantly impact the size of your realized loss. The specific identification method gives you the most control, allowing you to sell the highest-cost shares to maximize losses.</p>
        
        <h4>Automated Tax-Loss Harvesting</h4>
        <p>Many robo-advisors and some brokerage platforms offer automated tax-loss harvesting services that continuously monitor your portfolio for harvesting opportunities.</p>
        
        <h4>Potential Limitations</h4>
        <p>While valuable, tax-loss harvesting has some limitations:</p>
        <ul>
          <li>It only defers taxes rather than eliminating them (by reducing your cost basis in the replacement investment)</li>
          <li>Its value is reduced in tax-advantaged accounts (where capital gains aren't taxed)</li>
          <li>The strategy may be less beneficial if future tax rates are higher than current rates</li>
        </ul>
      `,
        chart: {
          type: "line",
          title: "Cumulative Value of Tax-Loss Harvesting Over Time",
          data: [
            { year: 1, withHarvesting: 105000, withoutHarvesting: 103000 },
            { year: 5, withHarvesting: 128000, withoutHarvesting: 120000 },
            { year: 10, withHarvesting: 165000, withoutHarvesting: 150000 },
            { year: 15, withHarvesting: 210000, withoutHarvesting: 185000 },
            { year: 20, withHarvesting: 270000, withoutHarvesting: 230000 },
          ],
          xKey: "year",
          yKey: "withHarvesting",
          tooltip: "Year {year}: ${withHarvesting} with harvesting, ${withoutHarvesting} without",
        },
      },
      {
        title: "Estate Planning and Tax Efficiency",
        content: `
        <p>Effective estate planning can help minimize taxes on wealth transfers to heirs and charitable organizations. Understanding the tax implications of different estate planning strategies is crucial for preserving wealth across generations.</p>
        
        <h3>Estate and Gift Tax Fundamentals</h3>
        
        <h4>Federal Estate Tax Exemption</h4>
        <p>As of 2023, the federal estate tax exemption is $12.92 million per individual ($25.84 million per married couple). Estates valued below these thresholds aren't subject to federal estate tax. However, this exemption is scheduled to revert to approximately half this amount in 2026 unless Congress acts to extend it.</p>
        
        <h4>Gift Tax Annual Exclusion</h4>
        <p>You can give up to $17,000 (2023 limit) per recipient per year without using any of your lifetime gift and estate tax exemption. Married couples can combine their annual exclusions to give up to $34,000 per recipient annually.</p>
        
        <h4>State Estate and Inheritance Taxes</h4>
        <p>Some states impose their own estate or inheritance taxes, often with lower exemption thresholds than the federal government. Consider state tax implications when developing your estate plan, especially if you own property in multiple states.</p>
        
        <h3>Tax-Efficient Wealth Transfer Strategies</h3>
        
        <h4>Lifetime Gifting</h4>
        <p>Making gifts during your lifetime can be more tax-efficient than transferring assets at death:</p>
        <ul>
          <li>Annual exclusion gifts remove assets and their future appreciation from your taxable estate</li>
          <li>Direct payments for medical expenses or educational tuition are exempt from gift tax (when paid directly to the provider)</li>
          <li>Gifting appreciated assets allows you to transfer the tax liability on future gains to recipients who may be in lower tax brackets</li>
        </ul>
        
        <h4>Step-Up in Basis at Death</h4>
        <p>Assets inherited at death receive a "step-up" in cost basis to their fair market value at the date of death. This eliminates any built-in capital gains, allowing heirs to sell inherited assets immediately with minimal or no capital gains tax.</p>
        <p>Strategic considerations:</p>
        <ul>
          <li>Consider holding highly appreciated assets until death to take advantage of the step-up</li>
          <li>Consider gifting assets with minimal appreciation or at a loss during your lifetime</li>
        </ul>
        
        <h4>Trusts for Tax Efficiency</h4>
        <p>Various trust structures can help minimize estate taxes:</p>
        <ul>
          <li><strong>Irrevocable Life Insurance Trust (ILIT):</strong> Keeps life insurance proceeds outside your taxable estate</li>
          <li><strong>Grantor Retained Annuity Trust (GRAT):</strong> Transfers appreciation on assets above a specified rate of return to beneficiaries with minimal gift tax</li>
          <li><strong>Charitable Remainder Trust (CRT):</strong> Provides income to you during your lifetime, with the remainder going to charity, generating an immediate partial tax deduction</li>
          <li><strong>Qualified Personal Residence Trust (QPRT):</strong> Transfers your home to beneficiaries at a reduced gift tax value while allowing you to continue living there</li>
        </ul>
        
        <h3>Retirement Accounts and Estate Planning</h3>
        
        <h4>Beneficiary Designations</h4>
        <p>Retirement accounts pass to named beneficiaries outside of your will. Strategic beneficiary designations can maximize tax efficiency:</p>
        <ul>
          <li>Consider naming younger beneficiaries for traditional IRAs to extend the distribution period</li>
          <li>Consider Roth conversions to provide tax-free inheritance to beneficiaries</li>
          <li>Review and update beneficiary designations regularly, especially after major life events</li>
        </ul>
        
        <h4>SECURE Act Considerations</h4>
        <p>The SECURE Act of 2019 eliminated the "stretch IRA" for most non-spouse beneficiaries, requiring them to withdraw inherited retirement accounts within 10 years. This change makes Roth conversions and alternative estate planning strategies more important for large IRAs.</p>
        
        <h3>Charitable Giving Strategies</h3>
        
        <h4>Qualified Charitable Distributions (QCDs)</h4>
        <p>Individuals age 70½ or older can make tax-free distributions directly from IRAs to qualified charities (up to $100,000 annually). QCDs can satisfy required minimum distributions without increasing taxable income.</p>
        
        <h4>Donor-Advised Funds</h4>
        <p>These funds allow you to make a charitable contribution, receive an immediate tax deduction, and recommend grants to charities over time. They're particularly useful for "bunching" multiple years of charitable contributions into a single tax year to exceed the standard deduction threshold.</p>
        
        <h4>Charitable Remainder Trusts</h4>
        <p>These split-interest trusts provide income to you or your beneficiaries for a specified period, with the remainder going to charity. They offer an immediate partial tax deduction and can be an effective way to convert appreciated assets into an income stream while avoiding capital gains tax.</p>
      `,
        chart: {
          type: "bar",
          title: "Estate Tax Liability Comparison: Different Planning Strategies",
          data: [
            { strategy: "No Planning", taxLiability: 4000000 },
            { strategy: "Basic Will", taxLiability: 3200000 },
            { strategy: "Lifetime Gifting", taxLiability: 2100000 },
            { strategy: "Advanced Trusts", taxLiability: 1200000 },
            { strategy: "Comprehensive Plan", taxLiability: 500000 },
          ],
          xKey: "strategy",
          yKey: "taxLiability",
          tooltip: "{strategy}: ${taxLiability} tax liability",
        },
      },
    ],
  },
  "mutual-funds": {
    title: "Mutual Fund Investing",
    description: "Master the art of selecting and investing in mutual funds",
    category: "investing",
    level: "Easy",
    readTime: "20 min",
    icon: PieChart,
    color: "from-cyan-500/20 to-cyan-600/20",
    iconColor: "text-cyan-500",
    topics: ["Fund types", "Expense ratios", "Performance metrics", "Selection criteria"],
    content: [
      {
        title: "Understanding Mutual Funds",
        content: `
        <p>Mutual funds are investment vehicles that pool money from many investors to purchase a diversified portfolio of stocks, bonds, or other securities. They offer an accessible way for individual investors to gain diversification and professional management.</p>
        
        <h3>How Mutual Funds Work</h3>
        
        <p>When you invest in a mutual fund, you're buying shares of the fund, which represent partial ownership of the fund's total portfolio. The value of your investment changes based on the performance of the underlying securities in the fund.</p>
        
        <h4>Net Asset Value (NAV)</h4>
        <p>Mutual fund shares are priced once per day at the net asset value (NAV), calculated by dividing the total value of all the securities in the fund, minus liabilities, by the number of outstanding shares. Unlike stocks, mutual funds don't trade throughout the day; all buy and sell orders are executed at the next calculated NAV.</p>
        
        <h4>Professional Management</h4>
        <p>Mutual funds are managed by investment professionals who make decisions about which securities to buy and sell based on the fund's stated objectives. This provides expertise that most individual investors don't have.</p>
        
        <h4>Diversification</h4>
        <p>Even with a relatively small investment, mutual funds provide instant diversification across many different securities. This helps reduce risk compared to owning individual stocks or bonds.</p>
        
        <h3>Key Mutual Fund Characteristics</h3>
        
        <h4>Open-End vs. Closed-End Funds</h4>
        <ul>
          <li><strong>Open-End Funds:</strong> Most common type of mutual fund. The fund issues new shares when investors buy in and redeems shares when investors sell. The number of shares fluctuates based on demand.</li>
          <li><strong>Closed-End Funds:</strong> Issue a fixed number of shares through an initial public offering (IPO). After the IPO, shares trade on an exchange like stocks, often at prices above or below their NAV.</li>
        </ul>
        
        <h4>Load vs. No-Load Funds</h4>
        <ul>
          <li><strong>Load Funds:</strong> Charge a sales commission (load) when you buy (front-end load) or sell (back-end load) shares. These fees typically range from 3% to 8.5% and compensate the broker or financial advisor who sells the fund.</li>
          <li><strong>No-Load Funds:</strong> Sold directly by the fund company without a sales charge. These have become increasingly popular as investors seek to minimize costs.</li>
        </ul>
        
        <h4>Minimum Investments</h4>
        <p>Most mutual funds require a minimum initial investment, typically ranging from $500 to $3,000 for regular accounts, though some may be higher. Minimums for subsequent investments are usually lower.</p>
        
        <h3>Mutual Fund Distributions</h3>
        
        <h4>Dividends and Interest</h4>
        <p>Income generated by the securities in the fund's portfolio is passed through to shareholders as dividend distributions, typically quarterly or annually.</p>
        
        <h4>Capital Gains Distributions</h4>
        <p>When the fund sells securities at a profit, it distributes these capital gains to shareholders, usually annually. These distributions are taxable even if you reinvest them in additional fund shares.</p>
        
        <h4>Reinvestment Options</h4>
        <p>Most funds offer automatic reinvestment of distributions, allowing you to purchase additional shares without paying a sales charge (if applicable).</p>
      `,
        chart: {
          type: "pie",
          title: "U.S. Mutual Fund Assets by Category",
          data: [
            { name: "Equity Funds", value: 55 },
            { name: "Bond Funds", value: 22 },
            { name: "Money Market Funds", value: 15 },
            { name: "Hybrid Funds", value: 8 },
          ],
          dataKey: "value",
          nameKey: "name",
          tooltip: "{name}: {value}%",
        },
      },
      {
        title: "Types of Mutual Funds",
        content: `
        <p>Mutual funds come in many varieties, each designed to meet different investment objectives. Understanding the various types can help you select funds that align with your financial goals and risk tolerance.</p>
        
        <h3>Equity (Stock) Funds</h3>
        <p>These funds invest primarily in stocks and are typically categorized by the size, style, and geographic focus of their investments.</p>
        
        <h4>By Company Size (Market Capitalization)</h4>
        <ul>
          <li><strong>Large-Cap Funds:</strong> Invest in companies with market capitalizations typically above $10 billion. These tend to be more stable but may offer lower growth potential.</li>
          <li><strong>Mid-Cap Funds:</strong> Focus on companies with market caps between $2 billion and $10 billion, offering a balance of growth potential and stability.</li>
          <li><strong>Small-Cap Funds:</strong> Invest in smaller companies (under $2 billion market cap) with higher growth potential but also higher volatility.</li>
        </ul>
        
        <h4>By Investment Style</h4>
        <ul>
          <li><strong>Growth Funds:</strong> Invest in companies expected to grow earnings at an above-average rate. These funds typically have higher P/E ratios and may not pay dividends.</li>
          <li><strong>Value Funds:</strong> Seek companies believed to be undervalued by the market. These often have lower P/E ratios and may pay dividends.</li>
          <li><strong>Blend Funds:</strong> Combine growth and value strategies, providing a more balanced approach.</li>
        </ul>
        
        <h4>By Geographic Focus</h4>
        <ul>
          <li><strong>Domestic Funds:</strong> Invest primarily in U.S. companies.</li>
          <li><strong>International Funds:</strong> Focus on investments outside the U.S., typically in developed markets.</li>
          <li><strong>Emerging Market Funds:</strong> Invest in developing economies like Brazil, Russia, India, and China, offering higher growth potential with higher risk.</li>
          <li><strong>Global Funds:</strong> Invest worldwide, including both U.S. and international markets.</li>
        </ul>
        
        <h3>Fixed Income (Bond) Funds</h3>
        <p>These funds invest in bonds and other debt securities, providing income and typically less volatility than stock funds.</p>
        
        <h4>By Issuer</h4>
        <ul>
          <li><strong>Government Bond Funds:</strong> Invest in U.S. Treasury securities and other government-backed bonds, offering high safety but lower yields.</li>
          <li><strong>Municipal Bond Funds:</strong> Focus on bonds issued by state and local governments, providing income that's often exempt from federal taxes and sometimes state taxes.</li>
          <li><strong>Corporate Bond Funds:</strong> Invest in debt issued by corporations, offering higher yields but with greater risk than government bonds.</li>
        </ul>
        
        <h4>By Credit Quality</h4>
        <ul>
          <li><strong>Investment-Grade Bond Funds:</strong> Focus on higher-quality bonds (rated BBB or higher) with lower default risk.</li>
          <li><strong>High-Yield (Junk) Bond Funds:</strong> Invest in lower-rated bonds offering higher yields but with greater default risk.</li>
        </ul>
        
        <h4>By Maturity</h4>
        <ul>
          <li><strong>Short-Term Bond Funds:</strong> Invest in bonds maturing in 1-3 years, offering lower interest rate risk but typically lower yields.</li>
          <li><strong>Intermediate-Term Bond Funds:</strong> Focus on bonds with 3-10 year maturities, balancing yield and interest rate risk.</li>
          <li><strong>Long-Term Bond Funds:</strong> Invest in bonds maturing in 10+ years, offering higher yields but with greater interest rate risk.</li>
        </ul>
        
        <h3>Money Market Funds</h3>
        <p>These invest in high-quality, short-term debt instruments like Treasury bills and commercial paper. They aim to maintain a stable $1 per share value and provide liquidity with modest returns, slightly higher than traditional savings accounts.</p>
        
        <h3>Hybrid Funds</h3>
        
        <h4>Balanced Funds</h4>
        <p>Maintain a relatively fixed mix of stocks and bonds, typically around 60% stocks and 40% bonds, providing a one-fund portfolio solution.</p>
        
        <h4>Target-Date Funds</h4>
        <p>Automatically adjust their asset allocation to become more conservative as they approach a target date, typically aligned with the investor's expected retirement year.</p>
        
        <h3>Specialty Funds</h3>
        
        <h4>Sector Funds</h4>
        <p>Focus on specific industries like technology, healthcare, or energy, offering targeted exposure but less diversification.</p>
        
        <h4>Real Estate Funds</h4>
        <p>Invest in real estate investment trusts (REITs) and other real estate-related securities, providing exposure to the real estate market without directly owning property.</p>
        
        <h4>Socially Responsible Funds</h4>
        <p>Select investments based on environmental, social, and governance (ESG) criteria, allowing investors to align their portfolios with their values.</p>
      `,
        chart: {
          type: "bar",
          title: "Risk-Return Profile by Fund Type",
          data: [
            { type: "Money Market", risk: 1, return: 2 },
            { type: "Short-Term Bond", risk: 2, return: 3 },
            { type: "Balanced", risk: 5, return: 6 },
            { type: "Large-Cap Stock", risk: 7, return: 8 },
            { type: "Small-Cap Stock", risk: 9, return: 10 },
            { type: "Emerging Markets", risk: 10, return: 11 },
          ],
          xKey: "type",
          yKey: "return",
          tooltip: "{type}: Risk {risk}/10, Expected Return {return}/10",
        },
      },
      {
        title: "Understanding Fund Expenses",
        content: `
        <p>Mutual fund expenses can significantly impact your investment returns over time. Understanding these costs is crucial for making informed investment decisions and maximizing your long-term results.</p>
        
        <h3>Types of Fund Expenses</h3>
        
        <h4>Expense Ratio</h4>
        <p>The expense ratio represents the annual cost of operating the fund, expressed as a percentage of assets. It includes:</p>
        <ul>
          <li><strong>Management Fees:</strong> Paid to the fund manager for making investment decisions</li>
          <li><strong>Administrative Costs:</strong> Covering record-keeping, customer service, and reporting</li>
          <li><strong>12b-1 Fees:</strong> Marketing and distribution expenses (not all funds charge these)</li>
          <li><strong>Other Operating Expenses:</strong> Legal, accounting, and custodial services</li>
        </ul>
        <p>Expense ratios vary widely depending on the fund type:</p>
        <ul>
          <li>Index funds typically have the lowest expense ratios (0.03% to 0.20%)</li>
          <li>Actively managed domestic stock funds average around 0.50% to 1.00%</li>
          <li>Specialty and international funds often have higher expenses (1.00% to 1.50% or more)</li>
        </ul>
        
        <h4>Sales Loads</h4>
        <p>These are commissions paid to brokers or financial advisors who sell the fund:</p>
        <ul>
          <li><strong>Front-End Loads:</strong> Charged when you purchase shares, reducing your initial investment</li>
          <li><strong>Back-End Loads:</strong> Charged when you sell shares, often decreasing the longer you hold the fund</li>
          <li><strong>Level Loads:</strong> Ongoing annual charges (typically 0.25%) that continue as long as you own the fund</li>
        </ul>
        
        <h4>Transaction Costs</h4>
        <p>These are costs incurred when the fund buys and sells securities:</p>
        <ul>
          <li><strong>Trading Commissions:</strong> Fees paid to brokers for executing trades</li>
          <li><strong>Bid-Ask Spreads:</strong> The difference between buying and selling prices</li>
          <li><strong>Market Impact Costs:</strong> Price movements caused by the fund's own trading activity</li>
        </ul>
        <p>Transaction costs aren't included in the expense ratio but can significantly impact returns, especially for funds with high turnover rates.</p>
        
        <h3>The Impact of Expenses on Returns</h3>
        
        <p>Even small differences in expense ratios can substantially impact long-term returns due to compounding. For example, a 1% difference in annual expenses on a $10,000 investment growing at 7% annually would reduce your returns by approximately $20,000 over 30 years.</p>
        
        <h4>Active vs. Passive Management Costs</h4>
        <p>Actively managed funds typically have higher expense ratios as they employ research teams and portfolio managers attempting to outperform the market. Passively managed index funds simply track a market index, resulting in lower costs.</p>
        <p>Research consistently shows that, after accounting for expenses, the majority of actively managed funds underperform their benchmark indexes over long periods. This cost difference is a primary reason for the growing popularity of index funds.</p>
        
        <h3>Evaluating Fund Expenses</h3>
        
        <h4>Expense Ratio Benchmarks</h4>
        <p>Compare a fund's expense ratio to others in the same category. Morningstar and other fund research providers typically show category averages for comparison.</p>
        
        <h4>Expense Ratio Trends</h4>
        <p>Fund expenses have generally trended downward over time due to competition and increased awareness of their impact. A fund with expenses significantly above category averages should deliver correspondingly better performance to justify the higher costs.</p>
        
        <h4>Share Classes</h4>
        <p>Many mutual funds offer multiple share classes with different fee structures:</p>
        <ul>
          <li><strong>Class A:</strong> Front-end load with lower annual expenses</li>
          <li><strong>Class B:</strong> Back-end load that decreases over time, with higher annual expenses</li>
          <li><strong>Class C:</strong> Level load with higher annual expenses</li>
          <li><strong>Institutional/Admiral/Premium:</strong> Lower expense ratios for larger investments</li>
        </ul>
        <p>Choose the share class that makes the most sense for your investment amount and time horizon.</p>
      `,
        chart: {
          type: "area",
          title: "Impact of Expenses on $10,000 Investment Over 30 Years (7% Return)",
          data: [
            { year: 0, low: 10000, high: 10000 },
            { year: 5, low: 13500, high: 13000 },
            { year: 10, low: 18500, high: 17000 },
            { year: 15, low: 25500, high: 22000 },
            { year: 20, low: 35000, high: 28500 },
            { year: 25, low: 48000, high: 37000 },
            { year: 30, low: 66000, high: 47500 },
          ],
          xKey: "year",
          areaKeys: ["low", "high"],
          tooltip: "Year {year}: ${low} (0.25% expense), ${high} (1.25% expense)",
        },
      },
      {
        title: "Selecting the Right Mutual Funds",
        content: `
        <p>Choosing the right mutual funds for your portfolio involves more than just looking at past performance. A systematic approach considering multiple factors will help you make more informed investment decisions.</p>
        
        <h3>Define Your Investment Goals</h3>
        
        <p>Before selecting funds, clarify your objectives:</p>
        <ul>
          <li><strong>Time Horizon:</strong> How long until you need the money? Longer time horizons generally allow for more aggressive investments.</li>
          <li><strong>Risk Tolerance:</strong> How comfortable are you with market fluctuations? This helps determine the appropriate balance between stock and bond funds.</li>
          <li><strong>Income Needs:</strong> Do you need current income or are you focused on long-term growth?</li>
          <li><strong>Tax Considerations:</strong> Are you investing in a tax-advantaged account (like an IRA) or a taxable account?</li>
        </ul>
        
        <h3>Asset Allocation</h3>
        
        <p>Determine how to divide your investments among different asset classes:</p>
        <ul>
          <li>Stock funds for long-term growth</li>
          <li>Bond funds for income and stability</li>
          <li>Cash or money market funds for liquidity</li>
        </ul>
        <p>Your asset allocation should reflect your time horizon and risk tolerance. A common starting point is subtracting your age from 110 to determine your stock allocation percentage, with the remainder in bonds and cash.</p>
        
        <h3>Key Selection Criteria</h3>
        
        <h4>Fund Expenses</h4>
        <p>Lower expenses directly translate to higher returns over time. Compare expense ratios to category averages and favor funds with below-average costs.</p>
        
        <h4>Fund Manager Tenure</h4>
        <p>For actively managed funds, consider how long the current manager has been in charge. A long tenure allows you to evaluate the manager's performance through different market conditions.</p>
        
        <h4>Investment Style Consistency</h4>
        <p>"Style drift" occurs when a fund deviates from its stated investment approach. Look for funds that consistently maintain their investment style, as this helps maintain your planned asset allocation.</p>
        
        <h4>Fund Size</h4>
        <p>Very large funds may struggle to maintain their strategy as assets grow, particularly for small-cap and specialty funds. Conversely, very small funds may have higher expense ratios or liquidity concerns.</p>
        
        <h4>Tax Efficiency</h4>
        <p>For taxable accounts, consider a fund's tax efficiency, which can be evaluated through:</p>
        <ul>
          <li>Tax-cost ratio: The percentage of return lost to taxes</li>
          <li>Turnover ratio: Higher turnover typically results in more taxable distributions</li>
          <li>Distribution history: Frequency and size of capital gains distributions</li>
        </ul>
        
        <h3>Performance Evaluation</h3>
        
        <h4>Appropriate Benchmarks</h4>
        <p>Compare a fund's performance to the relevant index (e.g., S&P 500 for large-cap U.S. stock funds) and to peer funds in the same category.</p>
        
        <h4>Long-Term Focus</h4>
        <p>Evaluate performance over complete market cycles (typically 5-10 years) rather than focusing on short-term results. Consistency of returns is often more important than occasional spectacular years.</p>
        
        <h4>Risk-Adjusted Returns</h4>
        <p>Consider metrics that account for risk taken to achieve returns:</p>
        <ul>
          <li><strong>Sharpe Ratio:</strong> Measures excess return per unit of risk</li>
          <li><strong>Standard Deviation:</strong> Indicates volatility of returns</li>
          <li><strong>Beta:</strong> Shows sensitivity to market movements</li>
          <li><strong>Alpha:</strong> Represents performance relative to risk-adjusted expectations</li>
        </ul>
        
        <h3>Building a Mutual Fund Portfolio</h3>
        
        <h4>Core and Satellite Approach</h4>
        <p>A popular strategy involves:</p>
        <ul>
          <li><strong>Core Holdings (70-80%):</strong> Low-cost index funds covering major asset classes</li>
          <li><strong>Satellite Holdings (20-30%):</strong> Specialized or actively managed funds in areas where active management may add value</li>
        </ul>
        
        <h4>Avoiding Overlap</h4>
        <p>Multiple funds may hold many of the same securities, reducing your actual diversification. Review top holdings across your funds to ensure you're not unintentionally concentrated in certain stocks or sectors.</p>
        
        <h4>Regular Rebalancing</h4>
        <p>Periodically adjust your portfolio back to your target allocation (typically annually). This disciplined approach helps you "buy low and sell high" by trimming positions that have grown and adding to those that have underperformed.</p>
        
        <h3>Resources for Fund Research</h3>
        
        <ul>
          <li><strong>Morningstar:</strong> Comprehensive fund data, ratings, and analysis</li>
          <li><strong>Fund Company Websites:</strong> Detailed information on specific funds</li>
          <li><strong>Financial Industry Regulatory Authority (FINRA):</strong> Fund Analyzer tool for comparing costs</li>
          <li><strong>SEC's EDGAR Database:</strong> Access to fund prospectuses and reports</li>
        </ul>
      `,
        chart: {
          type: "bar",
          title: "Key Factors in Mutual Fund Selection",
          data: [
            { factor: "Expense Ratio", importance: 9 },
            { factor: "Asset Allocation", importance: 8 },
            { factor: "Fund Consistency", importance: 7 },
            { factor: "Risk-Adjusted Returns", importance: 6 },
            { factor: "Manager Tenure", importance: 5 },
            { factor: "Tax Efficiency", importance: 4 },
          ],
          xKey: "factor",
          yKey: "importance",
          tooltip: "{factor}: Importance {importance}/10",
        },
      },
    ],
  },
  "debt-management": {
    title: "Debt Management",
    description: "Strategies to manage, reduce, and eliminate debt effectively",
    category: "planning",
    level: "Easy",
    readTime: "15 min",
    icon: FileText,
    color: "from-rose-500/20 to-rose-600/20",
    iconColor: "text-rose-500",
    topics: ["Debt prioritization", "Repayment strategies", "Interest management", "Building credit"],
    content: [
      {
        title: "Understanding Your Debt",
        content: `
        <p>Before you can effectively manage your debt, you need to understand what you owe, to whom, and under what terms. This comprehensive overview will help you develop a strategic approach to debt management.</p>
        
        <h3>Types of Debt</h3>
        
        <h4>Secured Debt</h4>
        <p>Secured by collateral that the lender can claim if you default:</p>
        <ul>
          <li><strong>Mortgage:</strong> Secured by your home, typically with lower interest rates and tax-deductible interest</li>
          <li><strong>Auto Loan:</strong> Secured by your vehicle, usually with moderate interest rates</li>
          <li><strong>Home Equity Loan/Line of Credit:</strong> Secured by your home equity, often with favorable rates</li>
        </ul>
        
        <h4>Unsecured Debt</h4>
        <p>Not backed by collateral, based primarily on your creditworthiness:</p>
        <ul>
          <li><strong>Credit Cards:</strong> Revolving debt with typically high interest rates (15-25%)</li>
          <li><strong>Personal Loans:</strong> Fixed-term loans with varying rates based on credit score</li>
          <li><strong>Medical Debt:</strong> Often with flexible payment terms but can damage credit if unpaid</li>
          <li><strong>Student Loans:</strong> Education debt with special provisions (deferment, income-based repayment)</li>
        </ul>
        
        <h3>Key Debt Terms and Concepts</h3>
        
        <h4>Interest Rate</h4>
        <p>The cost of borrowing money, expressed as a percentage of the principal:</p>
        <ul>
          <li><strong>Fixed Rate:</strong> Remains constant throughout the loan term</li>
          <li><strong>Variable Rate:</strong> Fluctuates based on a reference rate (e.g., prime rate)</li>
          <li><strong>Annual Percentage Rate (APR):</strong> Includes interest rate plus fees, providing a more comprehensive cost measure</li>
        </ul>
        
        <h4>Minimum Payment</h4>
        <p>The smallest amount you must pay monthly to keep the account in good standing. Paying only the minimum:</p>
        <ul>
          <li>Extends the repayment period significantly</li>
          <li>Increases the total interest paid substantially</li>
          <li>Makes little progress toward reducing the principal balance</li>
        </ul>
        
        <h4>Term</h4>
        <p>The length of time to repay the loan in full. Longer terms mean lower monthly payments but higher total interest costs.</p>
        
        <h3>Creating Your Debt Inventory</h3>
        
        <p>Compile a comprehensive list of all your debts, including:</p>
        <ul>
          <li>Creditor name and contact information</li>
          <li>Current balance</li>
          <li>Interest rate</li>
          <li>Minimum monthly payment</li>
          <li>Payment due date</li>
          <li>Loan term or estimated payoff date</li>
        </ul>
        
        <h4>Debt-to-Income Ratio</h4>
        <p>Calculate your debt-to-income (DTI) ratio by dividing your total monthly debt payments by your gross monthly income. This ratio is a key indicator of financial health:</p>
        <ul>
          <li><strong>Under 30%:</strong> Generally considered healthy</li>
          <li><strong>30-40%:</strong> Manageable but concerning</li>
          <li><strong>Over 40%:</strong> Financial stress likely; may face difficulty qualifying for new credit</li>
        </ul>
        
        <h3>Understanding the Impact of Debt</h3>
        
        <h4>Financial Impact</h4>
        <ul>
          <li>Reduces disposable income available for savings and investments</li>
          <li>Increases vulnerability to financial emergencies</li>
          <li>May limit ability to qualify for mortgages or other important loans</li>
        </ul>
        
        <h4>Credit Score Impact</h4>
        <ul>
          <li><strong>Payment History (35% of FICO score):</strong> Late payments severely damage your score</li>
          <li><strong>Amounts Owed (30%):</strong> High credit utilization (balances relative to limits) lowers your score</li>
          <li><strong>Length of Credit History (15%):</strong> Older accounts positively impact your score</li>
          <li><strong>Credit Mix (10%):</strong> Having different types of credit can slightly improve your score</li>
          <li><strong>New Credit (10%):</strong> Multiple recent applications can temporarily lower your score</li>
        </ul>
      `,
        chart: {
          type: "pie",
          title: "Average American Household Debt Composition",
          data: [
            { name: "Mortgage", value: 68 },
            { name: "Student Loans", value: 11 },
            { name: "Auto Loans", value: 9 },
            { name: "Credit Cards", value: 6 },
            { name: "Other", value: 6 },
          ],
          dataKey: "value",
          nameKey: "name",
          tooltip: "{name}: {value}%",
        },
      },
      {
        title: "Debt Repayment Strategies",
        content: `
        <p>Once you understand your debt situation, you can implement strategic approaches to eliminate it efficiently. Different strategies work better for different people, depending on their financial situation and personality.</p>
        
        <h3>Debt Avalanche Method</h3>
        
        <p>This mathematically optimal approach focuses on interest rates:</p>
        <ol>
          <li>Make minimum payments on all debts</li>
          <li>Direct extra payments toward the debt with the highest interest rate</li>
          <li>Once the highest-rate debt is paid off, redirect that payment to the debt with the next highest rate</li>
          <li>Continue until all debts are paid</li>
        </ol>
        
        <h4>Advantages</h4>
        <ul>
          <li>Minimizes total interest paid</li>
          <li>Results in the fastest debt payoff mathematically</li>
          <li>Works well for analytical personalities focused on optimization</li>
        </ul>
        
        <h4>Disadvantages</h4>
        <ul>
          <li>May take longer to experience the psychological win of eliminating a debt</li>
          <li>Can be discouraging if high-interest debts have large balances</li>
        </ul>
        
        <h3>Debt Snowball Method</h3>
        
        <p>This psychologically motivating approach focuses on quick wins:</p>
        <ol>
          <li>Make minimum payments on all debts</li>
          <li>Direct extra payments toward the debt with the smallest balance</li>
          <li>Once the smallest debt is paid off, redirect that payment to the next smallest balance</li>
          <li>Continue until all debts are paid</li>
        </ol>
        
        <h4>Advantages</h4>
        <ul>
          <li>Provides quick psychological wins to maintain motivation</li>
          <li>Reduces the number of monthly payments faster</li>
          <li>Works well for those motivated by visible progress</li>
        </ul>
        
        <h4>Disadvantages</h4>
        <ul>
          <li>May result in paying more total interest compared to the avalanche method</li>
          <li>Could extend the overall payoff timeline</li>
        </ul>
        
        <h3>Debt Consolidation</h3>
        
        <p>This approach combines multiple debts into a single loan with a lower interest rate:</p>
        
        <h4>Consolidation Options</h4>
        <ul>
          <li><strong>Personal Consolidation Loan:</strong> Fixed-rate loan used to pay off multiple debts</li>
          <li><strong>Balance Transfer Credit Card:</strong> Offers 0% or low introductory APR for a limited period (typically 12-21 months)</li>
          <li><strong>Home Equity Loan/Line of Credit:</strong> Uses home equity to secure a lower rate (but puts your home at risk)</li>
          <li><strong>401(k) Loan:</strong> Borrowing from your retirement (generally not recommended due to opportunity cost and potential tax consequences)</li>
        </ul>
        
        <h4>Advantages</h4>
        <ul>
          <li>Simplifies payments (one payment instead of many)</li>
          <li>May lower overall interest rate</li>
          <li>Can provide a fixed payoff date</li>
        </ul>
        
        <h4>Disadvantages</h4>
        <ul>
          <li>May extend repayment period, increasing total interest</li>
          <li>Often requires good credit to qualify for favorable terms</li>
          <li>Doesn't address underlying spending habits</li>
          <li>Some options (like home equity loans) increase risk by converting unsecured debt to secured debt</li>
        </ul>
        
        <h3>Debt Management Plans</h3>
        
        <p>Structured programs typically arranged through nonprofit credit counseling agencies:</p>
        <ul>
          <li>The agency negotiates with creditors for lower interest rates and fees</li>
          <li>You make one monthly payment to the agency, which distributes payments to creditors</li>
          <li>Typically lasts 3-5 years</li>
        </ul>
        
        <h4>Advantages</h4>
        <ul>
          <li>May reduce interest rates and eliminate fees</li>
          <li>Provides structured repayment plan</li>
          <li>Includes financial education and counseling</li>
        </ul>
        
        <h4>Disadvantages</h4>
        <ul>
          <li>May require closing credit accounts</li>
          <li>Monthly administrative fee (though typically modest)</li>
          <li>Can appear on credit report (though less damaging than settlements or bankruptcy)</li>
        </ul>
        
        <h3>Accelerating Your Debt Payoff</h3>
        
        <h4>Finding Extra Money</h4>
        <ul>
          <li><strong>Reduce Expenses:</strong> Cut discretionary spending and redirect savings to debt</li>
          <li><strong>Increase Income:</strong> Consider part-time work, overtime, or side hustles</li>
          <li><strong>Sell Unused Items:</strong> Convert unneeded possessions into debt payments</li>
          <li><strong>Use Windfalls:</strong> Apply tax refunds, bonuses, and gifts to debt reduction</li>
        </ul>
        
        <h4>Automation</h4>
        <p>Set up automatic payments above the minimum to ensure consistent progress and prevent missed payments.</p>
        
        <h4>Biweekly Payments</h4>
        <p>Making half your monthly payment every two weeks results in 26 half-payments (13 full payments) per year, accelerating your debt payoff.</p>
      `,
        chart: {
          type: "line",
          title: "Debt Payoff Comparison: $20,000 at 18% Interest",
          data: [
            { month: 0, minimum: 20000, avalanche: 20000, snowball: 20000 },
            { month: 6, minimum: 19400, avalanche: 17000, snowball: 17200 },
            { month: 12, minimum: 18700, avalanche: 13800, snowball: 14200 },
            { month: 18, minimum: 18000, avalanche: 10400, snowball: 11000 },
            { month: 24, minimum: 17200, avalanche: 6800, snowball: 7600 },
            { month: 30, minimum: 16400, avalanche: 3000, snowball: 4000 },
            { month: 36, minimum: 15500, avalanche: 0, snowball: 0 },
          ],
          xKey: "month",
          yKey: "avalanche",
          tooltip: "Month {month}: ${avalanche} (Avalanche), ${snowball} (Snowball), ${minimum} (Minimum Payments)",
        },
      },
      {
        title: "Managing Interest and Negotiating with Creditors",
        content: `
        <p>Effectively managing interest costs and knowing how to negotiate with creditors can significantly reduce the total cost of your debt and accelerate your path to financial freedom.</p>
        
        <h3>Understanding How Interest Works</h3>
        
        <h4>Simple vs. Compound Interest</h4>
        <ul>
          <li><strong>Simple Interest:</strong> Calculated only on the principal amount</li>
          <li><strong>Compound Interest:</strong> Calculated on both the principal and accumulated interest</li>
        </ul>
        <p>Most consumer debt uses compound interest, which can cause balances to grow exponentially if not managed properly.</p>
        
        <h4>How Credit Card Interest Is Calculated</h4>
        <p>Credit card interest typically compounds daily:</p>
        <ol>
          <li>Divide the annual rate (APR) by 365 to get the daily rate</li>
          <li>Multiply the daily rate by your average daily balance</li>
          <li>Multiply by the number of days in the billing cycle</li>
        </ol>
        <p>This daily compounding makes credit card debt particularly expensive and difficult to eliminate when making only minimum payments.</p>
        
        <h3>Strategies to Reduce Interest Costs</h3>
        
        <h4>Rate Reduction Requests</h4>
        <p>Simply asking your current creditors for a lower rate can be surprisingly effective:</p>
        <ul>
          <li>Call the customer service number on your card or loan statement</li>
          <li>Mention your good payment history and length of customer relationship</li>
          <li>Reference competitive offers you've received</li>
          <li>Be polite but persistent, and don't accept the first "no"</li>
          <li>If speaking with a representative doesn't work, ask to speak with a supervisor</li>
        </ul>
        
        <h4>Balance Transfers</h4>
        <p>Moving high-interest debt to a card with a 0% introductory offer:</p>
        <ul>
          <li>Look for offers with no transfer fee or a low fee (typically 3-5% of the transferred amount)</li>
          <li>Create a plan to pay off the balance before the promotional period ends</li>
          <li>Avoid making new purchases on the balance transfer card</li>
          <li>Set up automatic payments to ensure you never miss a payment (which could terminate the promotional rate)</li>
        </ul>
        
        <h4>Refinancing</h4>
        <p>Replacing existing loans with new loans that have better terms:</p>
        <ul>
          <li><strong>Mortgage Refinancing:</strong> Can save thousands over the life of the loan, especially when rates drop significantly</li>
          <li><strong>Student Loan Refinancing:</strong> May lower rates substantially for those with good credit and stable income</li>
          <li><strong>Auto Loan Refinancing:</strong> Often overlooked but can provide meaningful savings, especially if your credit has improved</li>
        </ul>
        <p>When considering refinancing, calculate the break-even point (how long it takes for interest savings to exceed closing costs) to ensure it makes financial sense.</p>
        
        <h3>Negotiating with Creditors</h3>
        
        <h4>Hardship Programs</h4>
        <p>Many creditors offer temporary hardship programs if you're experiencing financial difficulties:</p>
        <ul>
          <li>Reduced interest rates</li>
          <li>Waived fees</li>
          <li>Lower minimum payments</li>
          <li>Payment deferment</li>
        </ul>
        <p>These programs typically last 6-12 months and require you to explain your hardship (job loss, medical issues, etc.).</p>
        
        <h4>Debt Settlement</h4>
        <p>Negotiating to pay less than the full balance to resolve the debt:</p>
        <ul>
          <li>Typically only an option for accounts that are already delinquent or in collections</li>
          <li>May be able to settle for 40-60% of the original balance</li>
          <li>Requires having a lump sum available to pay the settled amount</li>
          <li>Has significant negative impact on credit scores</li>
          <li>Forgiven debt over $600 is typically reported as income for tax purposes</li>
        </ul>
        <p>Consider working with a nonprofit credit counseling agency before attempting debt settlement, as there are many predatory companies in this space.</p>
        
        <h4>Statute of Limitations</h4>
        <p>Legal time limit for creditors to sue you for unpaid debt:</p>
        <ul>
          <li>Varies by state, typically 3-6 years from the date of last activity</li>
          <li>Making even a small payment restarts the clock</li>
          <li>Debt can still appear on your credit report and collectors can still contact you after the statute expires</li>
        </ul>
        <p>Understanding the statute of limitations can be important when dealing with very old debts or collection agencies.</p>
        
        <h3>When to Seek Professional Help</h3>
        
        <h4>Credit Counseling</h4>
        <p>Nonprofit agencies that provide:</p>
        <ul>
          <li>Free or low-cost financial education</li>
          <li>Budget counseling</li>
          <li>Debt management plans</li>
        </ul>
        <p>Look for agencies accredited by the National Foundation for Credit Counseling (NFCC) or the Financial Counseling Association of America (FCAA).</p>
        
        <h4>Bankruptcy</h4>
        <p>A legal process that can eliminate or restructure debt when other options aren't viable:</p>
        <ul>
          <li><strong>Chapter 7:</strong> Liquidates non-exempt assets to pay creditors; remaining eligible debts are discharged</li>
          <li><strong>Chapter 13:</strong> Establishes a 3-5 year repayment plan based on your income</li>
        </ul>
        <p>Bankruptcy should generally be considered a last resort due to its long-term impact on your credit (7-10 years) and potential effect on employment and housing opportunities.</p>
      `,
        chart: {
          type: "bar",
          title: "Interest Paid on $10,000 Debt at Different Rates (3-Year Term)",
          data: [
            { rate: "5%", interest: 789 },
            { rate: "10%", interest: 1616 },
            { rate: "15%", interest: 2480 },
            { rate: "20%", interest: 3378 },
            { rate: "25%", interest: 4308 },
          ],
          xKey: "rate",
          yKey: "interest",
          tooltip: "{rate} Interest Rate: ${interest} total interest",
        },
      },
      {
        title: "Building and Maintaining Good Credit",
        content: `
        <p>While managing and eliminating debt is crucial, building and maintaining good credit is equally important for your long-term financial health. A strong credit profile can save you thousands of dollars through better interest rates and terms.</p>
        
        <h3>Understanding Credit Scores</h3>
        
        <h4>FICO Score Components</h4>
        <ul>
          <li><strong>Payment History (35%):</strong> Record of on-time payments</li>
          <li><strong>Amounts Owed (30%):</strong> Credit utilization and overall debt burden</li>
          <li><strong>Length of Credit History (15%):</strong> Age of accounts and frequency of use</li>
          <li><strong>Credit Mix (10%):</strong> Variety of credit types (revolving, installment, etc.)</li>
          <li><strong>New Credit (10%):</strong> Recent applications and new accounts</li>
        </ul>
        
        <h4>Credit Score Ranges</h4>
        <ul>
          <li><strong>Excellent:</strong> 800-850</li>
          <li><strong>Very Good:</strong> 740-799</li>
          <li><strong>Good:</strong> 670-739</li>
          <li><strong>Fair:</strong> 580-669</li>
          <li><strong>Poor:</strong> Below 580</li>
        </ul>
        
        <h3>Strategies to Build Credit</h3>
        
        <h4>For Those with Limited or No Credit</h4>
        <ul>
          <li><strong>Secured Credit Cards:</strong> Require a security deposit that typically becomes your credit limit</li>
          <li><strong>Credit Builder Loans:</strong> Small loans where payments are reported to credit bureaus, but you don't receive the funds until the loan is paid off</li>
          <li><strong>Becoming an Authorized User:</strong> Being added to someone else's credit card account can help build your credit history</li>
          <li><strong>Retail or Store Cards:</strong> Often easier to qualify for than traditional credit cards, though they typically have higher interest rates</li>
          <li><strong>Rent and Utility Reporting:</strong> Services that report your rent and utility payments to credit bureaus</li>
        </ul>
        
        <h4>For Those Rebuilding Credit</h4>
        <ul>
          <li><strong>Pay All Bills On Time:</strong> Payment history is the most influential factor in your credit score</li>
          <li><strong>Reduce Credit Utilization:</strong> Aim to use less than 30% of your available credit (ideally less than 10%)</li>
          <li><strong>Dispute Inaccuracies:</strong> Review your credit reports and challenge any errors</li>
          <li><strong>Ask for Goodwill Adjustments:</strong> If you have an otherwise good history, creditors may remove isolated late payments</li>
          <li><strong>Keep Old Accounts Open:</strong> Length of credit history matters, so maintain your oldest accounts</li>
        </ul>
        
        <h3>Managing Credit Cards Responsibly</h3>
        
        <h4>Best Practices</h4>
        <ul>
          <li><strong>Pay in Full Monthly:</strong> Avoid interest charges by paying your balance completely each month</li>
          <li><strong>Set Up Automatic Payments:</strong> Ensure you never miss a payment due date</li>
          <li><strong>Keep Utilization Low:</strong> Even if you pay in full, high utilization reported to credit bureaus can lower your score</li>
          <li><strong>Monitor Accounts Regularly:</strong> Check for unauthorized charges and errors</li>
          <li><strong>Be Strategic with Credit Limits:</strong> Accept credit limit increases to lower utilization, but don't use the additional credit</li>
        </ul>
        
        <h4>Avoiding Common Pitfalls</h4>
        <ul>
          <li><strong>Closing Old Cards:</strong> Can shorten your credit history and increase utilization</li>
          <li><strong>Applying for Multiple Cards:</strong> Too many inquiries in a short period can lower your score</li>
          <li><strong>Cash Advances:</strong> Typically have higher interest rates and no grace period</li>
          <li><strong>Minimum Payments:</strong> Paying only the minimum extends debt repayment and increases interest costs</li>
          <li><strong>Balance Chasing:</strong> Repeatedly transferring balances without addressing the underlying debt</li>
        </ul>
        
        <h3>Monitoring Your Credit</h3>
        
        <h4>Free Credit Reports</h4>
        <p>You're entitled to one free credit report annually from each of the three major bureaus (Equifax, Experian, and TransUnion) through AnnualCreditReport.com. During the COVID-19 pandemic, weekly free reports have been made available.</p>
        
        <h4>Credit Monitoring Services</h4>
        <ul>
          <li><strong>Free Services:</strong> Many credit card issuers and financial websites offer free credit score monitoring</li>
          <li><strong>Paid Services:</strong> Offer more comprehensive monitoring, identity theft protection, and insurance</li>
        </ul>
        
        <h4>Identity Theft Protection</h4>
        <ul>
          <li><strong>Credit Freezes:</strong> Prevent new accounts from being opened in your name (free at all three bureaus)</li>
          <li><strong>Fraud Alerts:</strong> Require businesses to verify your identity before issuing credit</li>
          <li><strong>Regular Monitoring:</strong> Check your credit reports and financial statements frequently</li>
        </ul>
        
        <h3>The Path Forward</h3>
        
        <p>Building excellent credit is a marathon, not a sprint. Consistent responsible behavior over time will gradually improve your credit profile. Remember that your credit score is just one aspect of your financial health—maintaining an emergency fund, saving for retirement, and living within your means are equally important components of financial wellness.</p>
      `,
        chart: {
          type: "line",
          title: "Impact of Credit Score on Mortgage Interest Rates",
          data: [
            { score: "580-619", rate: 5.5 },
            { score: "620-639", rate: 5.0 },
            { score: "640-659", rate: 4.6 },
            { score: "660-679", rate: 4.3 },
            { score: "680-699", rate: 4.0 },
            { score: "700-759", rate: 3.7 },
            { score: "760+", rate: 3.5 },
          ],
          xKey: "score",
          yKey: "rate",
          tooltip: "Credit Score {score}: {rate}% interest rate",
        },
      },
    ],
  },
  // Other learning paths would be defined similarly
}

export default function LearningPathPage() {
  const params = useParams()
  const pathId = params.id as string
  const path = learningPaths[pathId as keyof typeof learningPaths]

  const [activeSection, setActiveSection] = useState(0)

  if (!path) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 container py-10">
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl font-bold mb-4">Learning Path Not Found</h1>
            <p className="text-muted-foreground mb-6">The learning path you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/learning-paths">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Learning Paths
              </Link>
            </Button>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  const currentSection = path.content[activeSection]
  const totalSections = path.content.length

  // Update progress when changing sections
  const handleNextSection = () => {
    if (activeSection < totalSections - 1) {
      setActiveSection(activeSection + 1)
      // Scroll to top of content
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handlePrevSection = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1)
      // Scroll to top of content
      window.scrollTo({ top: 0, behavior: "smooth" })
      // Scroll to top of content
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // Render chart based on type
  const renderChart = (chartData) => {
    if (!chartData) return null

    switch (chartData.type) {
      case "bar":
        return (
          <div className="h-80 w-full mt-6">
            <h3 className="text-lg font-medium mb-2">{chartData.title}</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={chartData.xKey} />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, "Return"]} />
                <Legend />
                <Bar dataKey={chartData.yKey} fill="#3b82f6" name="Annual Return %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )
      case "pie":
        return (
          <div className="h-80 w-full mt-6">
            <h3 className="text-lg font-medium mb-2">{chartData.title}</h3>
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={chartData.data}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey={chartData.dataKey}
                  nameKey={chartData.nameKey}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.data.map((entry, index) => {
                    const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]
                    return <Pie key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  })}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Allocation"]} />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        )
      case "line":
        return (
          <div className="h-80 w-full mt-6">
            <h3 className="text-lg font-medium mb-2">{chartData.title}</h3>
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={chartData.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={chartData.xKey} label={{ value: "Risk Level", position: "insideBottom", offset: -5 }} />
                <YAxis label={{ value: "Expected Return (%)", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey={chartData.yKey}
                  stroke="#3b82f6"
                  activeDot={{ r: 8 }}
                  name="Expected Return"
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        )
      case "area":
        return (
          <div className="h-80 w-full mt-6">
            <h3 className="text-lg font-medium mb-2">{chartData.title}</h3>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={chartData.xKey} label={{ value: "Years", position: "insideBottom", offset: -5 }} />
                <YAxis label={{ value: "Value ($)", angle: -90, position: "insideLeft" }} />
                <Tooltip formatter={(value) => [`$${value}`, "Value"]} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="savings"
                  stackId="1"
                  stroke="#8884d8"
                  fill="#8884d8"
                  name="Savings Account"
                />
                <Area
                  type="monotone"
                  dataKey="investing"
                  stackId="2"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  name="Investment Portfolio"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="bg-muted/40">
          <div className="container py-8">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/learning-paths">
                      <ArrowLeft className="mr-1 h-4 w-4" />
                      Back
                    </Link>
                  </Button>
                  <Badge variant="secondary">{path.level}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {path.readTime} read
                  </div>
                </div>
                <h1 className="text-3xl font-bold mb-2">{path.title}</h1>
                <p className="text-muted-foreground max-w-2xl">{path.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="sticky top-20">
                <h2 className="text-xl font-bold mb-4">Topics</h2>
                <div className="space-y-1">
                  {path.content.map((section, index) => (
                    <Button
                      key={index}
                      variant={activeSection === index ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveSection(index)}
                    >
                      <div className="flex items-center">
                        {index < activeSection ? (
                          <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center mr-2">
                            <ChevronRight className="h-3 w-3 text-green-500" />
                          </div>
                        ) : activeSection === index ? (
                          <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                            <ChevronRight className="h-3 w-3 text-primary" />
                          </div>
                        ) : (
                          <div className="h-5 w-5 mr-2" />
                        )}
                        <span className="text-sm">{section.title}</span>
                      </div>
                    </Button>
                  ))}
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h3 className="font-medium">Topics</h3>
                  <div className="flex justify-between text-sm mb-3">
                    <span>Completed</span>
                    <span>
                      {Math.min(activeSection + 1, totalSections)}/{totalSections}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="md:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{currentSection.title}</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: currentSection.content }} />

                  {/* Render chart if available */}
                  {currentSection.chart && renderChart(currentSection.chart)}

                  <div className="flex justify-between mt-8 pt-4 border-t">
                    <Button variant="outline" onClick={handlePrevSection} disabled={activeSection === 0}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Previous Topic
                    </Button>

                    <Button onClick={handleNextSection} disabled={activeSection === totalSections - 1}>
                      Next Topic
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Related content */}
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Related Resources</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Calculator className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">Investment Calculator</h3>
                        <p className="text-sm text-muted-foreground">Calculate potential returns on your investments</p>
                        <Button variant="link" className="p-0 h-auto mt-1" asChild>
                          <Link href="/calculators/sip">Try Calculator</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">Glossary</h3>
                        <p className="text-sm text-muted-foreground">Look up financial terms mentioned in this guide</p>
                        <Button variant="link" className="p-0 h-auto mt-1" asChild>
                          <Link href="/glossary">View Glossary</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

