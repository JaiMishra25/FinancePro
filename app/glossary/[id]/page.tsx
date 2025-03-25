"use client"

import { Badge } from "@/components/ui/badge"

import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import {
  BarChart,
  LineChart,
  PieChart,
  Pie,
  Cell,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Mock glossary term data
const glossaryTermsData = {
  "401k": {
    term: "401(k)",
    category: "retirement",
    definition:
      "A 401(k) is a tax-advantaged retirement savings plan offered by employers to their employees. It's named after the section of the U.S. Internal Revenue Code that established it.",
    content: `
      <p>A 401(k) plan allows employees to contribute a portion of their wages to individual accounts. Employers may also contribute to employees' accounts, often by matching a certain percentage of the employee's contributions.</p>
      
      <h3>Key Features of 401(k) Plans</h3>
      
      <h4>Tax Advantages</h4>
      <p>Traditional 401(k) contributions are made with pre-tax dollars, reducing your taxable income for the year. The money grows tax-deferred until withdrawal in retirement, at which point it's taxed as ordinary income. Roth 401(k) contributions are made with after-tax dollars, but qualified withdrawals in retirement are completely tax-free.</p>
      
      <h4>Contribution Limits</h4>
      <p>The IRS sets annual contribution limits for 401(k) plans. For 2023, employees can contribute up to $22,500, with an additional $7,500 "catch-up" contribution allowed for those age 50 and older.</p>
      
      <h4>Employer Matching</h4>
      <p>Many employers match a portion of employee contributions, effectively providing "free money" toward your retirement. Common matching formulas include 50% of employee contributions up to 6% of salary, or 100% up to 3% of salary.</p>
      
      <h4>Vesting</h4>
      <p>While your own contributions to a 401(k) are always 100% vested (meaning the money is yours), employer contributions may be subject to a vesting schedule. This means you must work for the employer for a certain period before you're entitled to the full employer contribution.</p>
      
      <h3>Advantages of 401(k) Plans</h3>
      
      <ul>
        <li><strong>Tax Benefits:</strong> Contributions reduce current taxable income (traditional) or provide tax-free growth and withdrawals (Roth).</li>
        <li><strong>Employer Matching:</strong> Free money that boosts your retirement savings.</li>
        <li><strong>Automatic Contributions:</strong> Money is deducted directly from your paycheck, making saving easier.</li>
        <li><strong>High Contribution Limits:</strong> Allows for significant retirement savings.</li>
        <li><strong>Portability:</strong> When you leave a job, you can roll over your 401(k) to a new employer's plan or an IRA.</li>
      </ul>
      
      <h3>Considerations and Limitations</h3>
      
      <ul>
        <li><strong>Early Withdrawal Penalties:</strong> Withdrawals before age 59½ typically incur a 10% penalty in addition to income tax (with some exceptions).</li>
        <li><strong>Required Minimum Distributions (RMDs):</strong> Traditional 401(k) plans require you to start taking distributions at age 73 (as of 2023).</li>
        <li><strong>Limited Investment Options:</strong> You're restricted to the investment options offered by your employer's plan.</li>
        <li><strong>Fees:</strong> 401(k) plans may have administrative fees and investment expenses that can reduce returns over time.</li>
      </ul>
    `,
    relatedTerms: ["ira", "roth-ira", "retirement-planning", "tax-deferred"],
    chart: {
      type: "bar",
      title: "Growth of $100,000 in a 401(k) vs. Taxable Account",
      data: [
        { year: 5, "401(k)": 150000, "Taxable Account": 135000 },
        { year: 10, "401(k)": 220000, "Taxable Account": 180000 },
        { year: 15, "401(k)": 320000, "Taxable Account": 240000 },
        { year: 20, "401(k)": 480000, "Taxable Account": 320000 },
        { year: 25, "401(k)": 700000, "Taxable Account": 430000 },
        { year: 30, "401(k)": 1050000, "Taxable Account": 580000 },
      ],
    },
  },
  annuity: {
    term: "Annuity",
    category: "insurance",
    definition:
      "An annuity is a financial product that provides regular payments in exchange for an initial lump sum investment or series of payments.",
    content: `
      <p>Annuities are primarily sold by insurance companies and are designed to provide a steady income stream, often during retirement. They can be an important tool for managing longevity risk—the risk of outliving your savings.</p>
      
      <h3>Types of Annuities</h3>
      
      <h4>Fixed Annuities</h4>
      <p>Fixed annuities provide guaranteed payments of a specific amount. The insurance company assumes the investment risk and promises a minimum rate of return. These are the simplest and most predictable type of annuity.</p>
      
      <h4>Variable Annuities</h4>
      <p>Variable annuities allow you to invest your funds in various sub-accounts, similar to mutual funds. Your payments will vary based on the performance of these investments. While they offer growth potential, they also come with investment risk.</p>
      
      <h4>Indexed Annuities</h4>
      <p>Indexed annuities offer returns based on a specific market index (like the S&P 500), typically with some downside protection and capped upside potential. They provide a middle ground between fixed and variable annuities.</p>
      
      <h3>Annuity Payment Structures</h3>
      
      <h4>Immediate Annuities</h4>
      <p>Payments begin shortly after making a lump-sum investment, usually within one year. These are often purchased near or during retirement.</p>
      
      <h4>Deferred Annuities</h4>
      <p>The investment grows tax-deferred until you begin taking withdrawals, usually years or decades in the future. This allows for accumulation before the distribution phase.</p>
      
      <h3>Payout Options</h3>
      
      <ul>
        <li><strong>Life Only:</strong> Provides the highest payment amount for a single life but stops at death with no payments to beneficiaries.</li>
        <li><strong>Life with Period Certain:</strong> Guarantees payments for life but also ensures payments continue to beneficiaries for a certain period if you die early.</li>
        <li><strong>Joint and Survivor:</strong> Continues payments until both you and a designated beneficiary (typically a spouse) have died.</li>
        <li><strong>Period Certain:</strong> Provides payments for a specific number of years, regardless of how long you live.</li>
      </ul>
      
      <h3>Advantages of Annuities</h3>
      
      <ul>
        <li><strong>Guaranteed Income:</strong> Can provide income you can't outlive (with lifetime payment options).</li>
        <li><strong>Tax-Deferred Growth:</strong> Investment gains aren't taxed until withdrawn.</li>
        <li><strong>Customizable Options:</strong> Various riders and features can be added to meet specific needs.</li>
        <li><strong>No Contribution Limits:</strong> Unlike 401(k)s and IRAs, there's no cap on how much you can invest.</li>
      </ul>
      
      <h3>Disadvantages of Annuities</h3>
      
      <ul>
        <li><strong>High Fees:</strong> Often include mortality and expense charges, administrative fees, investment management fees, and rider costs.</li>
        <li><strong>Surrender Charges:</strong> Early withdrawals may incur significant penalties, typically decreasing over a surrender period of 7-10 years.</li>
        <li><strong>Complexity:</strong> Some annuities, especially variable ones, can be difficult to understand.</li>
        <li><strong>Less Liquidity:</strong> Your money may be tied up for years or decades.</li>
        <li><strong>Tax Treatment:</strong> Withdrawals are taxed as ordinary income rather than lower capital gains rates.</li>
      </ul>
    `,
    relatedTerms: ["retirement-planning", "fixed-income", "longevity-risk", "insurance"],
    chart: {
      type: "bar",
      title: "Monthly Income from $500,000 Annuity by Age",
      data: [
        { age: 60, "Monthly Income": 2100 },
        { age: 65, "Monthly Income": 2450 },
        { age: 70, "Monthly Income": 2900 },
        { age: 75, "Monthly Income": 3500 },
        { age: 80, "Monthly Income": 4300 },
      ],
    },
  },
  "asset-allocation": {
    term: "Asset Allocation",
    category: "investing",
    definition:
      "Asset allocation is the strategy of dividing investments among different asset categories such as stocks, bonds, cash, real estate, and alternatives to balance risk and reward according to an investor's goals, risk tolerance, and time horizon.",
    content: `
      <p>Asset allocation is often considered the most important decision an investor makes, potentially having a greater impact on overall returns than individual security selection. It provides a framework for systematic investing that helps manage risk while pursuing returns.</p>
      
      <h3>Key Asset Classes</h3>
      
      <h4>Stocks (Equities)</h4>
      <p>Shares of ownership in companies that offer growth potential but come with higher volatility. Stocks have historically provided the highest long-term returns but with greater short-term risk.</p>
      
      <h4>Bonds (Fixed Income)</h4>
      <p>Debt securities that typically provide regular interest payments and return of principal at maturity. Bonds generally offer lower returns than stocks but with less volatility, providing stability to a portfolio.</p>
      
      <h4>Cash and Cash Equivalents</h4>
      <p>Includes money market funds, short-term CDs, Treasury bills, and savings accounts. These provide high liquidity and capital preservation but typically offer the lowest returns, often below inflation.</p>
      
      <h4>Alternative Investments</h4>
      <p>Includes real estate, commodities, private equity, hedge funds, and cryptocurrencies. Alternatives can provide diversification benefits as they often have low correlation with traditional assets.</p>
      
      <h3>Factors Influencing Asset Allocation</h3>
      
      <h4>Time Horizon</h4>
      <p>Longer time horizons typically allow for higher allocations to growth-oriented investments like stocks, as there's more time to recover from market downturns. Shorter horizons generally call for more conservative allocations.</p>
      
      <h4>Risk Tolerance</h4>
      <p>An investor's psychological and financial ability to endure market volatility and potential losses. Those with higher risk tolerance can generally allocate more to volatile assets like stocks.</p>
      
      <h4>Financial Goals</h4>
      <p>Different goals (retirement, education, home purchase) may require different allocation strategies based on time horizon, required return, and importance.</p>
      
      <h4>Age and Life Stage</h4>
      <p>Asset allocation typically becomes more conservative as investors age and approach retirement, though this is not a universal rule.</p>
      
      <h3>Common Asset Allocation Strategies</h3>
      
      <h4>Strategic Asset Allocation</h4>
      <p>Establishing and maintaining a long-term target asset mix based on expected returns for different asset classes, risk tolerance, and time horizon. The portfolio is periodically rebalanced to the target allocation.</p>
      
      <h4>Tactical Asset Allocation</h4>
      <p>Making short-term adjustments to asset weights based on predictions about the near-term performance of different asset classes. This approach attempts to add value by overweighting asset classes expected to outperform.</p>
      
      <h4>Dynamic Asset Allocation</h4>
      <p>Adjusting the mix of assets as markets rise and fall, or as the investor's objectives change. This often involves reducing exposure to assets that have become riskier.</p>
      
      <h4>Age-Based Allocation</h4>
      <p>Following the guideline that stock allocation should equal "100 minus your age" (or variations of this rule), gradually decreasing equity exposure as you age.</p>
      
      <h3>Rebalancing</h3>
      
      <p>Over time, different investments will grow at different rates, causing your portfolio to drift from its target allocation. Rebalancing involves periodically buying and selling portions of your portfolio to restore it to the desired asset mix. This practice can help maintain your desired risk level and potentially enhance returns by systematically "buying low and selling high."</p>
      
      <h3>The Importance of Diversification Within Asset Classes</h3>
      
      <p>In addition to allocating between asset classes, it's important to diversify within each asset class:</p>
      <ul>
        <li><strong>Stocks:</strong> Diversify across market capitalizations, sectors, industries, geographic regions, and investment styles.</li>
        <li><strong>Bonds:</strong> Vary maturities, credit qualities, issuers, and bond types.</li>
        <li><strong>Alternatives:</strong> Include different types of alternative investments that respond differently to economic conditions.</li>
      </ul>
    `,
    relatedTerms: ["diversification", "portfolio", "risk-management", "rebalancing", "stocks", "bonds"],
    chart: {
      type: "pie",
      title: "Common Asset Allocation Models",
      data: [
        { name: "Conservative", value: 20 },
        { name: "Moderate", value: 40 },
        { name: "Balanced", value: 60 },
        { name: "Growth", value: 80 },
        { name: "Aggressive", value: 90 },
      ],
    },
  },
  "bear-market": {
    term: "Bear Market",
    category: "investing",
    definition:
      "A bear market is a condition in which securities prices fall 20% or more from recent highs amid widespread pessimism and negative investor sentiment.",
    content: `
      <p>Bear markets are characterized by pessimism, fear, and investors' lack of confidence in the market. During a bear market, the economy often slows down and unemployment rises as companies begin laying off workers.</p>
      
      <h3>Characteristics of Bear Markets</h3>
      
      <h4>Prolonged Price Declines</h4>
      <p>To be officially considered a bear market, the market must fall 20% or more from its peak. This decline typically happens over a period of at least two months, though it can occur more rapidly during crises.</p>
      
      <h4>Widespread Pessimism</h4>
      <p>Investor sentiment turns negative, with widespread pessimism and fear. This can lead to panic selling, which further drives prices down in a self-reinforcing cycle.</p>
      
      <h4>Economic Contraction</h4>
      <p>Bear markets often coincide with economic recessions, though they can sometimes occur independently. Typical economic signs include rising unemployment, decreasing business profits, and lower consumer spending.</p>
      
      <h4>Increased Volatility</h4>
      <p>Market volatility typically increases during bear markets, with larger daily price swings becoming more common.</p>
      
      <h3>Phases of a Bear Market</h3>
      
      <ol>
        <li><strong>Recognition:</strong> Investors begin to realize that economic conditions and sentiment have changed.</li>
        <li><strong>Panic:</strong> Investors rush to sell, causing sharp declines in security prices.</li>
        <li><strong>Capitulation:</strong> The final phase of selling, where investors give up hope of a recovery and sell regardless of losses.</li>
        <li><strong>Rebuilding:</strong> Bargain hunters begin to enter the market, seeing value in depressed prices.</li>
      </ol>
      
      <h3>Historical Bear Markets</h3>
      
      <p>Some notable bear markets in U.S. history include:</p>
      <ul>
        <li><strong>The Great Depression (1929-1932):</strong> The stock market lost approximately 89% of its value.</li>
        <li><strong>The Oil Crisis (1973-1974):</strong> The market declined about 48% due to oil shortages and stagflation.</li>
        <li><strong>The Dot-Com Crash (2000-2002):</strong> Technology-heavy Nasdaq lost 78% of its value as the internet bubble burst.</li>
        <li><strong>The Financial Crisis (2007-2009):</strong> The S&P 500 fell 57% due to the collapse of the housing market and subsequent financial crisis.</li>
        <li><strong>The COVID-19 Pandemic (2020):</strong> A brief but sharp decline of 34% as the global economy shut down.</li>
      </ul>
      
      <h3>Investing Strategies During Bear Markets</h3>
      
      <h4>Defensive Investing</h4>
      <p>Moving to defensive assets like consumer staples, utilities, healthcare, high-quality bonds, and cash, which tend to outperform during economic downturns.</p>
      
      <h4>Dollar-Cost Averaging</h4>
      <p>Continuing to invest fixed amounts at regular intervals, regardless of market prices. This strategy allows investors to purchase more shares when prices are lower.</p>
      
      <h4>Diversification</h4>
      <p>Maintaining a well-diversified portfolio across asset classes to reduce overall volatility and risk.</p>
      
      <h4>Value Investing</h4>
      <p>Looking for quality companies trading at discounted prices due to the overall market decline rather than fundamental problems.</p>
      
      <h4>Hedging</h4>
      <p>Using strategies like put options, inverse ETFs, or short-selling to profit from or protect against market declines.</p>
      
      <h3>Psychological Aspects of Bear Markets</h3>
      
      <p>Bear markets can be emotionally taxing for investors. Common psychological responses include:</p>
      <ul>
        <li><strong>Fear:</strong> Concern about further losses can lead to irrational decision-making.</li>
        <li><strong>Loss Aversion:</strong> The tendency to feel the pain of losses more acutely than the pleasure of gains.</li>
        <li><strong>Recency Bias:</strong> Overemphasizing recent market declines and projecting them indefinitely into the future.</li>
        <li><strong>Herd Mentality:</strong> Following the crowd by selling when everyone else is selling.</li>
      </ul>
      
      <p>Successful bear market investing often requires emotional discipline and a long-term perspective.</p>
    `,
    relatedTerms: ["bull-market", "market-correction", "recession", "volatility", "market-cycles"],
    chart: {
      type: "line",
      title: "Recovery After Historical Bear Markets",
      data: [
        {
          months: 0,
          "1929 Crash": 100,
          "1973-74 Oil Crisis": 100,
          "2000 Dot-Com": 100,
          "2008 Financial Crisis": 100,
          "2020 COVID-19": 100,
        },
        {
          months: 6,
          "1929 Crash": 70,
          "1973-74 Oil Crisis": 80,
          "2000 Dot-Com": 75,
          "2008 Financial Crisis": 65,
          "2020 COVID-19": 95,
        },
        {
          months: 12,
          "1929 Crash": 65,
          "1973-74 Oil Crisis": 85,
          "2000 Dot-Com": 70,
          "2008 Financial Crisis": 80,
          "2020 COVID-19": 110,
        },
        {
          months: 18,
          "1929 Crash": 60,
          "1973-74 Oil Crisis": 90,
          "2000 Dot-Com": 65,
          "2008 Financial Crisis": 90,
          "2020 COVID-19": 120,
        },
        {
          months: 24,
          "1929 Crash": 45,
          "1973-74 Oil Crisis": 95,
          "2000 Dot-Com": 60,
          "2008 Financial Crisis": 95,
          "2020 COVID-19": 130,
        },
        {
          months: 36,
          "1929 Crash": 35,
          "1973-74 Oil Crisis": 105,
          "2000 Dot-Com": 70,
          "2008 Financial Crisis": 115,
          "2020 COVID-19": 150,
        },
      ],
    },
  },
  bond: {
    term: "Bond",
    category: "investing",
    definition:
      "A bond is a debt security in which an investor loans money to an entity (typically a corporation or government) for a defined period at a fixed or variable interest rate.",
    content: `
      <p>Bonds are essentially IOUs that are issued by borrowers to raise money from investors willing to lend them money for a period of time. When you buy a bond, you're lending to the issuer in exchange for a promise of regular interest payments and the return of the bond's face value when it matures.</p>
      
      <h3>Key Components of Bonds</h3>
      
      <h4>Face Value (Par Value)</h4>
      <p>The amount the bond will be worth at maturity, typically $1,000 per bond. This is the amount that will be returned to the bondholder when the bond matures.</p>
      
      <h4>Coupon Rate</h4>
      <p>The annual interest rate paid on the bond, expressed as a percentage of the face value. For example, a $1,000 bond with a 5% coupon rate would pay $50 in interest each year.</p>
      
      <h4>Maturity Date</h4>
      <p>The date when the bond expires and the issuer repays the face value to the bondholder. Bond maturities can range from a few months to 30 years or more.</p>
      
      <h4>Yield</h4>
      <p>The actual return an investor receives on a bond, which may differ from the coupon rate depending on whether the bond was purchased at a discount or premium to its face value.</p>
      
      <h3>Types of Bonds</h3>
      
      <h4>Government Bonds</h4>
      <p>Issued by national governments. In the U.S., these include Treasury Bills (maturities of 1 year or less), Treasury Notes (1-10 years), and Treasury Bonds (10-30 years). They're considered among the safest investments but typically offer lower yields.</p>
      
      <h4>Municipal Bonds ("Munis")</h4>
      <p>Issued by states, cities, counties, and other government entities. Interest income is often exempt from federal income tax and sometimes from state and local taxes as well, making them attractive for tax-sensitive investors.</p>
      
      <h4>Corporate Bonds</h4>
      <p>Issued by companies to raise capital. They typically offer higher yields than government bonds to compensate for higher default risk. Quality ranges from investment-grade (lower risk) to high-yield or "junk" bonds (higher risk).</p>
      
      <h4>Agency Bonds</h4>
      <p>Issued by government-sponsored enterprises (GSEs) or federal agencies. Examples include bonds from Fannie Mae, Freddie Mac, and the Federal Home Loan Bank.</p>
      
      <h4>International Bonds</h4>
      <p>Issued by foreign governments or corporations, these can provide geographic diversification but may carry additional risks including currency risk.</p>
      
      <h3>Bond Ratings</h3>
      
      <p>Bonds are rated by agencies like Standard & Poor's, Moody's, and Fitch to help investors assess credit risk. Ratings range from AAA (highest quality) to D (in default). Bonds rated BBB- or higher are considered "investment grade," while those below are called "high yield" or "junk bonds."</p>
      
      <h3>Price and Interest Rate Relationship</h3>
      
      <p>Bond prices and interest rates have an inverse relationship:</p>
      <ul>
        <li>When interest rates rise, bond prices fall</li>
        <li>When interest rates fall, bond prices rise</li>
      </ul>
      
      <p>This happens because when new bonds are issued with higher interest rates, older bonds with lower rates become less attractive, causing their prices to fall. The opposite occurs when rates decline.</p>
      
      <h3>Bond Risks</h3>
      
      <h4>Interest Rate Risk</h4>
      <p>The risk that rising interest rates will cause a bond's price to fall. Longer-term bonds have greater interest rate risk than shorter-term bonds.</p>
      
      <h4>Credit Risk (Default Risk)</h4>
      <p>The risk that the issuer will fail to make interest or principal payments as scheduled. Higher credit risk typically leads to higher yields.</p>
      
      <h4>Inflation Risk</h4>
      <p>The risk that inflation will erode the real value of a bond's fixed interest payments and principal.</p>
      
      <h4>Liquidity Risk</h4>
      <p>The risk that an investor may not be able to sell a bond quickly at a fair price.</p>
      
      <h4>Call Risk</h4>
      <p>The risk that an issuer will redeem a bond before maturity, typically when interest rates fall, potentially leaving the investor to reinvest at lower rates.</p>
      
      <h3>Role of Bonds in a Portfolio</h3>
      
      <p>Bonds typically serve several functions in an investment portfolio:</p>
      <ul>
        <li>Income generation through regular interest payments</li>
        <li>Capital preservation, as bonds typically have lower volatility than stocks</li>
        <li>Diversification, as bonds often (but not always) move differently than stocks</li>
        <li>Risk reduction, helping to reduce overall portfolio volatility</li>
      </ul>
    `,
    relatedTerms: ["yield", "interest-rate", "fixed-income", "credit-rating", "duration"],
    chart: {
      type: "line",
      title: "Bond Price vs. Interest Rate Relationship",
      data: [
        { rate: 1, price: 150 },
        { rate: 2, price: 130 },
        { rate: 3, price: 115 },
        { rate: 4, price: 100 },
        { rate: 5, price: 88 },
        { rate: 6, price: 78 },
        { rate: 7, price: 70 },
      ],
    },
  },
  "capital-gain": {
    term: "Capital Gain",
    category: "taxes",
    definition:
      "A capital gain is a profit that results from selling an asset for a higher price than the original purchase price.",
    content: `
      <p>Capital gains occur when you sell an investment or asset for more than you paid for it. The gain is the difference between the purchase price (or "basis") and the selling price. Capital gains can apply to investments like stocks, bonds, mutual funds, and real estate, as well as personal property like collectibles or artwork.</p>
      
      <h3>Types of Capital Gains</h3>
      
      <h4>Short-Term Capital Gains</h4>
      <p>Profits from assets held for one year or less before being sold. Short-term capital gains are taxed as ordinary income at your regular income tax rate, which can be as high as 37% depending on your income bracket.</p>
      
      <h4>Long-Term Capital Gains</h4>
      <p>Profits from assets held for more than one year before being sold. Long-term capital gains receive preferential tax treatment with lower tax rates: 0%, 15%, or 20%, depending on your income level. Some high-income taxpayers may also pay an additional 3.8% Net Investment Income Tax.</p>
      
      <h3>Capital Gains Tax Rates (as of 2023)</h3>
      
      <h4>Long-Term Capital Gains Tax Rates</h4>
      <table border="1" cellpadding="5">
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
        <tr>
          <td>Head of Household</td>
          <td>Up to $59,750</td>
          <td>$59,751 - $523,050</td>
          <td>Over $523,050</td>
        </tr>
      </table>
      
      <p>Special types of capital gains may be taxed differently:</p>
      <ul>
        <li><strong>Collectibles:</strong> Gains on items like art, antiques, coins, stamps, and precious metals are taxed at a maximum rate of 28%.</li>
        <li><strong>Real Estate:</strong> Special rules may apply, including the Section 121 exclusion for primary residences ($250,000 for single filers, $500,000 for married filing jointly).</li>
      </ul>
      
      <h3>Calculating Capital Gains</h3>
      
      <p>To calculate a capital gain, you subtract the asset's cost basis from its selling price:</p>
      <p><strong>Capital Gain = Selling Price - Cost Basis</strong></p>
      
      <p>The cost basis includes:</p>
      <ul>
        <li>The original purchase price</li>
        <li>Transaction costs (commissions, fees)</li>
        <li>Capital improvements (for real estate)</li>
        <li>Reinvested dividends (for investments)</li>
      </ul>
      
      <h3>Capital Losses and Tax-Loss Harvesting</h3>
      
      <p>When you sell an asset for less than its cost basis, you incur a capital loss. Capital losses can offset capital gains, reducing your tax liability. If your total capital losses exceed your total capital gains, you can deduct up to $3,000 ($1,500 if married filing separately) of the excess loss against other income. Any remaining loss can be carried forward to future tax years.</p>
      
      <p>Tax-loss harvesting is the strategic selling of investments at a loss to offset capital gains. This technique can help reduce your tax bill while maintaining your overall investment strategy.</p>
      
      <h3>Strategies to Manage Capital Gains Taxes</h3>
      
      <h4>Hold Investments Longer</h4>
      <p>By holding investments for more than a year, you qualify for the lower long-term capital gains tax rates.</p>
      
      <h4>Tax-Loss Harvesting</h4>
      <p>Selling investments that have declined in value to offset capital gains from other investments, thus reducing your tax liability.</p>
      
      <h4>Use Tax-Advantaged Accounts</h4>
      <p>Investments in retirement accounts like 401(k)s, IRAs, and Roth IRAs grow without generating taxable capital gains. Roth accounts can even provide tax-free withdrawals in retirement.</p>
      
      <h4>Gifting Appreciated Assets</h4>
      <p>Gifting appreciated assets to family members in lower tax brackets or to charitable organizations can reduce capital gains tax exposure.</p>
      
      <h4>Estate Planning</h4>
      <p>Assets that are inherited receive a "step-up" in basis to their fair market value at the time of the owner's death, potentially eliminating capital gains that accrued during the deceased's lifetime.</p>
      
      <h3>Reporting Capital Gains</h3>
      
      <p>Capital gains and losses are reported on Schedule D of Form 1040. Your financial institutions will typically provide Form 1099-B showing your investment sales, which helps in calculating and reporting your gains or losses.</p>
      
      <h3>Special Considerations</h3>
      
      <h4>Wash Sale Rule</h4>
      <p>The IRS prohibits claiming a loss on a security if you buy the same or a "substantially identical" security within 30 days before or after the sale.</p>
      
      <h4>Capital Gains in Mutual Funds</h4>
      <p>Mutual funds distribute capital gains to shareholders when they sell securities at a profit, even if you haven't sold your fund shares. These distributions are taxable unless held in a tax-advantaged account.</p>
    `,
    relatedTerms: ["cost-basis", "tax-loss-harvesting", "realized-gain", "unrealized-gain", "step-up-basis"],
    chart: {
      type: "bar",
      title: "Tax Rates Comparison: Ordinary Income vs. Long-Term Capital Gains",
      data: [
        { bracket: "10% Income", "Ordinary Income": 10, "Long-Term Capital Gains": 0 },
        { bracket: "12% Income", "Ordinary Income": 12, "Long-Term Capital Gains": 0 },
        { bracket: "22% Income", "Ordinary Income": 22, "Long-Term Capital Gains": 15 },
        { bracket: "24% Income", "Ordinary Income": 24, "Long-Term Capital Gains": 15 },
        { bracket: "32% Income", "Ordinary Income": 32, "Long-Term Capital Gains": 15 },
        { bracket: "35% Income", "Ordinary Income": 35, "Long-Term Capital Gains": 15 },
        { bracket: "37% Income", "Ordinary Income": 37, "Long-Term Capital Gains": 20 },
      ],
    },
  },
  "compound-interest": {
    term: "Compound Interest",
    category: "basics",
    definition:
      "Compound interest is the interest on a loan or deposit calculated based on both the initial principal and the accumulated interest from previous periods.",
    content: `
      <p>Compound interest is often described as "interest on interest" because it includes interest earned on the initial principal as well as all interest accumulated over time. This compounding effect can significantly increase your savings or investments over the long term.</p>
      
      <h3>How Compound Interest Works</h3>
      
      <p>When interest compounds, you earn interest on:</p>
      <ul>
        <li>Your initial deposit or principal</li>
        <li>Any interest already earned</li>
      </ul>
      
      <p>The formula for compound interest is:</p>
      <p><strong>A = P(1 + r/n)^(nt)</strong></p>
      <p>Where:</p>
      <ul>
        <li>A = Final amount</li>
        <li>P = Principal (initial investment)</li>
        <li>r = Annual interest rate (in decimal form)</li>
        <li>n = Number of times interest compounds per year</li>
        <li>t = Time (in years)</li>
      </ul>
      
      <h3>The Power of Compound Interest</h3>
      
      <p>Compound interest becomes more powerful over time. The longer your money compounds, the faster it grows. This is why starting to save and invest early is so important for building wealth.</p>
      
      <h4>Compounding Frequency</h4>
      <p>Interest can compound at different frequencies: daily, monthly, quarterly, or annually. The more frequently interest compounds, the more your money will grow, though the difference is often small.</p>
      
      <h4>The Rule of 72</h4>
      <p>A simple way to estimate how long it will take for your money to double is the "Rule of 72." Divide 72 by the annual interest rate to approximate the number of years required for your investment to double.</p>
      <p>For example, at a 6% annual return, your money would double in approximately 72 ÷ 6 = 12 years.</p>
      
      <h3>Compound Interest in Different Financial Contexts</h3>
      
      <h4>Savings Accounts</h4>
      <p>Banks typically compound interest daily or monthly on savings accounts, though the interest rates are often low.</p>
      
      <h4>Investments</h4>
      <p>Investments like stocks, bonds, and mutual funds can generate compound returns through price appreciation and reinvested dividends or interest.</p>
      
      <h4>Retirement Accounts</h4>
      <p>The long-term nature of retirement accounts makes them perfect for harnessing the power of compound interest, especially when contributions are made regularly over decades.</p>
      
      <h4>Debt</h4>
      <p>Compound interest also applies to debt, particularly credit cards. When you don't pay your balance in full, interest compounds on both the principal and previously accrued interest, potentially leading to a debt spiral.</p>
      
      <h3>Factors That Affect Compound Interest</h3>
      
      <ul>
        <li><strong>Interest Rate:</strong> Higher rates lead to faster growth.</li>
        <li><strong>Time:</strong> Longer investment periods allow for more compounding cycles.</li>
        <li><strong>Initial Investment:</strong> Larger initial amounts generate more interest.</li>
        <li><strong>Additional Contributions:</strong> Regular additions to your principal accelerate growth.</li>
        <li><strong>Compounding Frequency:</strong> More frequent compounding slightly increases returns.</li>
      </ul>
    `,
    relatedTerms: ["interest-rate", "apr", "apy", "rule-of-72", "time-value-of-money"],
    chart: {
      type: "line",
      title: "Compound Interest Growth Over Time",
      data: [
        { year: 0, "Simple Interest": 10000, "Compound Interest": 10000 },
        { year: 5, "Simple Interest": 15000, "Compound Interest": 16105 },
        { year: 10, "Simple Interest": 20000, "Compound Interest": 25937 },
        { year: 15, "Simple Interest": 25000, "Compound Interest": 41772 },
        { year: 20, "Simple Interest": 30000, "Compound Interest": 67275 },
        { year: 25, "Simple Interest": 35000, "Compound Interest": 108347 },
        { year: 30, "Simple Interest": 40000, "Compound Interest": 174494 },
      ],
    },
  },
  diversification: {
    term: "Diversification",
    category: "investing",
    definition:
      "Diversification is a risk management strategy that mixes a wide variety of investments within a portfolio to reduce exposure to any single asset or risk.",
    content: `
      <p>Diversification is one of the most fundamental concepts in investing. The basic idea is to spread your investments across various asset classes, industries, geographic regions, and investment styles to reduce the impact of any single investment's performance on your overall portfolio.</p>
      
      <h3>How Diversification Works</h3>
      
      <p>Diversification works because different assets often respond differently to the same economic event. When one asset or asset class is performing poorly, another may be performing well. This can help smooth out your portfolio's returns and reduce overall risk.</p>
      
      <h4>Types of Diversification</h4>
      
      <ul>
        <li><strong>Asset Class Diversification:</strong> Spreading investments across stocks, bonds, real estate, commodities, and cash.</li>
        <li><strong>Sector/Industry Diversification:</strong> Investing in companies across different industries (technology, healthcare, finance, etc.).</li>
        <li><strong>Geographic Diversification:</strong> Investing in different countries and regions around the world.</li>
        <li><strong>Investment Style Diversification:</strong> Mixing growth and value investments, or large-cap and small-cap stocks.</li>
        <li><strong>Time Diversification:</strong> Investing regularly over time rather than all at once (dollar-cost averaging).</li>
      </ul>
      
      <h3>Benefits of Diversification</h3>
      
      <ul>
        <li><strong>Reduced Risk:</strong> Limits exposure to any single investment's poor performance.</li>
        <li><strong>Preserved Capital:</strong> Helps protect against significant losses.</li>
        <li><strong>More Stable Returns:</strong> Smooths out portfolio performance over time.</li>
        <li><strong>Exposure to Opportunities:</strong> Allows participation in various market segments that may outperform at different times.</li>
      </ul>
      
      <h3>Limitations of Diversification</h3>
      
      <ul>
        <li><strong>Doesn't Eliminate All Risk:</strong> Market-wide downturns can affect most investments simultaneously.</li>
        <li><strong>May Limit Upside Potential:</strong> Diversification may reduce the impact of a single high-performing investment.</li>
        <li><strong>Can Lead to Over-Diversification:</strong> Too many investments can make a portfolio difficult to manage and may dilute returns.</li>
        <li><strong>Requires Monitoring:</strong> A diversified portfolio still needs regular review and rebalancing.</li>
      </ul>
      
      <h3>Implementing Diversification</h3>
      
      <h4>For Beginning Investors</h4>
      <p>Simple diversification can be achieved through:</p>
      <ul>
        <li>Broad-market index funds or ETFs</li>
        <li>Target-date funds</li>
        <li>Balanced funds that include both stocks and bonds</li>
      </ul>
      
      <h4>For More Experienced Investors</h4>
      <p>More sophisticated diversification might include:</p>
      <ul>
        <li>Individual stocks across various sectors</li>
        <li>Bonds of different types (government, corporate, municipal) and durations</li>
        <li>International investments in both developed and emerging markets</li>
        <li>Alternative investments like real estate, commodities, or private equity</li>
      </ul>
      
      <h3>Correlation and Diversification</h3>
      
      <p>The effectiveness of diversification depends largely on the correlation between assets. Correlation measures how investments move in relation to each other:</p>
      <ul>
        <li><strong>Positive Correlation (close to +1):</strong> Assets tend to move in the same direction.</li>
        <li><strong>Negative Correlation (close to -1):</strong> Assets tend to move in opposite directions.</li>
        <li><strong>No Correlation (close to 0):</strong> Assets move independently of each other.</li>
      </ul>
      
      <p>For optimal diversification, investors should seek assets with low or negative correlations to each other.</p>
    `,
    relatedTerms: ["asset-allocation", "portfolio", "risk-management", "correlation", "modern-portfolio-theory"],
    chart: {
      type: "pie",
      title: "Sample Diversified Portfolio",
      data: [
        { name: "US Stocks", value: 40 },
        { name: "International Stocks", value: 20 },
        { name: "Bonds", value: 25 },
        { name: "Real Estate", value: 10 },
        { name: "Cash", value: 5 },
      ],
    },
  },
  etf: {
    term: "ETF (Exchange-Traded Fund)",
    category: "investing",
    definition:
      "An exchange-traded fund (ETF) is a type of investment fund and exchange-traded product that tracks an index, sector, commodity, or other asset but can be purchased or sold on a stock exchange just like a regular stock.",
    content: `
      <p>ETFs combine features of mutual funds and individual stocks. Like mutual funds, they represent a basket of securities, providing instant diversification in a single investment. Like stocks, they trade on exchanges throughout the trading day at market-determined prices.</p>
      
      <h3>Key Features of ETFs</h3>
      
      <h4>Intraday Trading</h4>
      <p>Unlike mutual funds that trade only once per day after market close, ETFs can be bought and sold throughout the trading day at current market prices.</p>
      
      <h4>Transparency</h4>
      <p>Most ETFs disclose their holdings daily, allowing investors to know exactly what they own. This contrasts with mutual funds, which typically disclose holdings quarterly.</p>
      
      <h4>Passive Management</h4>
      <p>Most ETFs are passively managed, tracking an underlying index or asset by holding the same securities in the same proportions. This approach typically results in lower expense ratios compared to actively managed funds.</p>
      
      <h4>Tax Efficiency</h4>
      <p>ETFs generally generate fewer capital gains distributions than mutual funds due to their creation/redemption process and passive management style, potentially resulting in lower tax liability for investors.</p>
      
      <h4>Lower Investment Minimums</h4>
      <p>Investors can purchase as little as one share of an ETF, making them accessible to investors with limited capital. Many brokerages now even offer fractional share investing.</p>
      
      <h3>Types of ETFs</h3>
      
      <h4>Index ETFs</h4>
      <p>Track specific market indexes like the S&P 500, Russell 2000, or MSCI EAFE. These provide broad market exposure at low cost.</p>
      
      <h4>Sector ETFs</h4>
      <p>Focus on specific industries or sectors such as technology, healthcare, energy, or financial services. These allow for targeted investments in particular areas of the economy.</p>
      
      <h4>Bond ETFs</h4>
      <p>Invest in fixed-income securities, including government bonds, corporate bonds, municipal bonds, or high-yield bonds. These provide steady income and can be more liquid than individual bonds.</p>
      
      <h4>Commodity ETFs</h4>
      <p>Track commodities like gold, silver, oil, or agricultural products. These provide exposure to raw materials without the complexities of futures contracts or physical storage.</p>
      
      <h4>International ETFs</h4>
      <p>Invest in foreign markets, either broadly (e.g., emerging markets, developed international) or in specific countries (e.g., Japan, Brazil, or Germany).</p>
      
      <h4>Specialty ETFs</h4>
      <p>Include thematic ETFs (focusing on trends like clean energy or cybersecurity), inverse ETFs (designed to profit from market declines), leveraged ETFs (amplify market returns), and ESG ETFs (focusing on environmental, social, and governance criteria).</p>
      
      <h3>How ETFs Work</h3>
      
      <h4>Creation and Redemption Process</h4>
      <p>ETFs have a unique creation/redemption mechanism involving authorized participants (typically large financial institutions) who create or redeem ETF shares in large blocks called "creation units." This process helps keep an ETF's trading price close to its net asset value.</p>
      
      <h4>ETF Pricing</h4>
      <p>ETFs have two prices: the net asset value (NAV) of the underlying securities and the market price determined by supply and demand. The difference between these prices is called the "premium" or "discount."</p>
      
      <h3>Advantages of ETFs</h3>
      
      <ul>
        <li><strong>Diversification:</strong> Gain exposure to multiple securities in a single transaction.</li>
        <li><strong>Cost-Effectiveness:</strong> Generally have lower expense ratios than mutual funds.</li>
        <li><strong>Liquidity:</strong> Can be bought and sold throughout the trading day.</li>
        <li><strong>Tax Efficiency:</strong> Typically generate fewer capital gains distributions.</li>
        <li><strong>Transparency:</strong> Holdings are usually disclosed daily.</li>
        <li><strong>Flexibility:</strong> Can be used with various trading strategies, including limit orders, stop-loss orders, margin trading, and options.</li>
      </ul>
      
      <h3>Disadvantages of ETFs</h3>
      
      <ul>
        <li><strong>Trading Costs:</strong> Commission fees may apply for each transaction (though many brokerages now offer commission-free ETF trading).</li>
        <li><strong>Bid-Ask Spreads:</strong> The difference between buying and selling prices can add to costs, especially for less liquid ETFs.</li>
        <li><strong>Potential Tracking Error:</strong> ETFs may not perfectly mirror their underlying indexes due to fees, trading costs, and management decisions.</li>
        <li><strong>Premium/Discount Risk:</strong> ETFs can sometimes trade at prices above or below their net asset value.</li>
        <li><strong>Limited Active Management:</strong> Most ETFs are passively managed, potentially missing opportunities that active managers might capture.</li>
      </ul>
      
      <h3>ETFs vs. Mutual Funds</h3>
      
      <table border="1" cellpadding="5">
        <tr>
          <th>Feature</th>
          <th>ETFs</th>
          <th>Mutual Funds</th>
        </tr>
        <tr>
          <td>Trading</td>
          <td>Throughout trading day</td>
          <td>Once per day after market close</td>
        </tr>
        <tr>
          <td>Minimum Investment</td>
          <td>Price of one share (or less with fractional shares)</td>
          <td>Often $1,000 or more</td>
        </tr>
        <tr>
          <td>Expense Ratios</td>
          <td>Generally lower</td>
          <td>Generally higher</td>
        </tr>
        <tr>
          <td>Tax Efficiency</td>
          <td>More tax-efficient</td>
          <td>Less tax-efficient</td>
        </tr>
        <tr>
          <td>Transparency</td>
          <td>Holdings typically disclosed daily</td>
          <td>Holdings typically disclosed quarterly</td>
        </tr>
      </table>
    `,
    relatedTerms: ["index-fund", "mutual-fund", "passive-investing", "tracking-error", "expense-ratio"],
    chart: {
      type: "line",
      title: "Growth of ETF Assets Under Management (in Trillions)",
      data: [
        { year: 2005, aum: 0.4 },
        { year: 2010, aum: 1.3 },
        { year: 2015, aum: 2.9 },
        { year: 2020, aum: 7.7 },
        { year: 2023, aum: 10.5 },
      ],
    },
  },
  fiduciary: {
    term: "Fiduciary",
    category: "basics",
    definition:
      "A fiduciary is a person or organization that acts on behalf of another person or persons, putting their clients' interests ahead of their own, with a duty to preserve good faith and trust.",
    content: `
      <p>In finance, a fiduciary is legally obligated to act in the best interest of their client, maintaining a relationship of trust and confidence. This is the highest standard of care under the law and is particularly important in financial relationships where significant assets are managed.</p>
      
      <h3>The Fiduciary Relationship</h3>
      
      <h4>Fiduciary Duty</h4>
      <p>A fiduciary duty is an ethical and legal obligation to act in the best interest of another party. In financial contexts, this typically involves:</p>
      <ul>
        <li><strong>Duty of Care:</strong> Making informed, prudent decisions based on appropriate research and information.</li>
        <li><strong>Duty of Loyalty:</strong> Placing the client's interests above the fiduciary's own, avoiding conflicts of interest.</li>
        <li><strong>Duty of Good Faith:</strong> Acting honestly and with integrity in all client dealings.</li>
        <li><strong>Duty of Confidentiality:</strong> Protecting private client information.</li>
        <li><strong>Duty of Prudence:</strong> Managing assets with care, skill, and caution.</li>
        <li><strong>Duty to Disclose:</strong> Providing all relevant information to clients, including potential conflicts of interest.</li>
      </ul>
      
      <h3>Common Financial Fiduciaries</h3>
      
      <h4>Investment Advisors</h4>
      <p>Registered Investment Advisors (RIAs) are regulated by the SEC or state securities regulators and have a fiduciary responsibility to their clients. They must provide investment advice that's in the client's best interest.</p>
      
      <h4>ERISA Fiduciaries</h4>
      <p>Under the Employee Retirement Income Security Act (ERISA), those who manage retirement plans like 401(k)s must act as fiduciaries, ensuring that plan decisions benefit participants and beneficiaries.</p>
      
      <h4>Trustees</h4>
      <p>Trustees manage assets held in a trust for beneficiaries. They have a fiduciary duty to manage the trust according to its terms and in the best interest of the beneficiaries.</p>
      
      <h4>Executors</h4>
      <p>Executors of wills have a fiduciary duty to carry out the wishes of the deceased as specified in their will, acting in the best interest of the estate and its beneficiaries.</p>
      
      <h3>Fiduciary vs. Non-Fiduciary Financial Professionals</h3>
      
      <p>Not all financial professionals are fiduciaries. Understanding the distinction is crucial for investors:</p>
      
      <h4>Fiduciary Standard</h4>
      <p>Professionals bound by the fiduciary standard must:</p>
      <ul>
        <li>Act in the client's best interest</li>
        <li>Avoid conflicts of interest</li>
        <li>Provide full disclosure and transparency</li>
        <li>Not use client assets for personal gain</li>
      </ul>
      
      <h4>Suitability Standard</h4>
      <p>Some financial professionals, like brokers or insurance agents, often operate under the less stringent "suitability standard," which requires only that their recommendations be "suitable" for the client's needs and objectives, even if not the best or most cost-effective option.</p>
      
      <table border="1" cellpadding="5">
        <tr>
          <th>Fiduciary Standard</th>
          <th>Suitability Standard</th>
        </tr>
        <tr>
          <td>Must act in client's best interest</td>
          <td>Must recommend "suitable" investments</td>
        </tr>
        <tr>
          <td>Must avoid conflicts of interest</td>
          <td>May have conflicts of interest</td>
        </tr>
        <tr>
          <td>Must disclose all material facts</td>
          <td>Less rigorous disclosure requirements</td>
        </tr>
        <tr>
          <td>Fee-based compensation common</td>
          <td>Commission-based compensation common</td>
        </tr>
      </table>
      
      <h3>The Importance of Working with a Fiduciary</h3>
      
      <p>Working with a financial professional who has a fiduciary duty provides several benefits:</p>
      <ul>
        <li><strong>Alignment of Interests:</strong> A fiduciary's interests are aligned with yours, reducing potential conflicts.</li>
        <li><strong>Transparency:</strong> Fiduciaries must disclose all material facts, including fees and potential conflicts.</li>
        <li><strong>Higher Standard of Care:</strong> The fiduciary standard is the highest standard of care under the law.</li>
        <li><strong>Reduced Risk of Conflicts:</strong> Fiduciaries must avoid conflicts of interest or fully disclose them.</li>
      </ul>
      
      <h3>How to Verify Fiduciary Status</h3>
      
      <p>To determine if a financial professional is a fiduciary:</p>
      <ul>
        <li>Ask directly: "Do you have a fiduciary duty to me in all aspects of our relationship?"</li>
        <li>Request a written fiduciary pledge</li>
        <li>Check credentials (CFP® professionals are required to adhere to fiduciary standards)</li>
        <li>Review their Form ADV (for registered investment advisors)</li>
        <li>Understand how they're compensated (fee-only advisors generally have fewer conflicts of interest)</li>
      </ul>
    `,
    relatedTerms: [
      "financial-advisor",
      "registered-investment-advisor",
      "trustee",
      "duty-of-care",
      "conflict-of-interest",
    ],
    chart: {
      type: "pie",
      title: "Financial Advisor Compensation Models",
      data: [
        { name: "Fee-Only", value: 38 },
        { name: "Commission-Based", value: 27 },
        { name: "Fee-Based (Hybrid)", value: 35 },
      ],
    },
  },
  inflation: {
    term: "Inflation",
    category: "economics",
    definition:
      "Inflation is the rate at which the general level of prices for goods and services rises, resulting in a decrease in purchasing power over time.",
    content: `
      <p>Inflation is a fundamental economic concept that affects everyone in the economy. When inflation occurs, each unit of currency buys fewer goods and services than it did previously, effectively reducing consumers' purchasing power.</p>
      
      <h3>Measuring Inflation</h3>
      
      <h4>Consumer Price Index (CPI)</h4>
      <p>The most commonly cited inflation measure in the U.S., the CPI tracks the average change in prices paid by urban consumers for a market basket of consumer goods and services. It includes food, housing, apparel, transportation, medical care, recreation, education, and other goods and services.</p>
      
      <h4>Personal Consumption Expenditures (PCE)</h4>
      <p>The PCE price index is the Federal Reserve's preferred inflation measure. It captures a broader range of consumer expenses and adjusts for changing consumer behavior. The PCE typically shows a lower inflation rate than the CPI.</p>
      
      <h4>Producer Price Index (PPI)</h4>
      <p>The PPI measures average changes in selling prices received by domestic producers for their output. It can be an early indicator of CPI inflation, as producer cost increases are often passed on to consumers.</p>
      
      <h3>Types of Inflation</h3>
      
      <h4>Demand-Pull Inflation</h4>
      <p>Occurs when aggregate demand exceeds aggregate supply, causing prices to rise. This can happen when consumer spending increases due to factors like low unemployment, wage growth, or easy access to credit.</p>
      
      <h4>Cost-Push Inflation</h4>
      <p>Results from increases in production costs, such as raw materials or wages, which suppliers pass on to consumers through higher prices. Oil price shocks are a classic example of a cost-push inflationary force.</p>
      
      <h4>Built-In Inflation</h4>
      <p>Also called wage-price spiral, this occurs when workers demand higher wages to keep up with rising costs of living, and businesses raise prices to cover higher wage costs, creating a self-reinforcing cycle.</p>
      
      <h3>Inflation Severity</h3>
      
      <h4>Moderate Inflation (2-3%)</h4>
      <p>Generally considered healthy for a growing economy. Central banks in developed countries typically target inflation around 2%.</p>
      
      <h4>High Inflation (>10%)</h4>
      <p>Erodes purchasing power significantly and creates economic uncertainty. It can lead to higher interest rates, reduced business investment, and decreased standards of living.</p>
      
      <h4>Hyperinflation (>50% per month)</h4>
      <p>Extreme inflation that can destabilize economies and destroy savings. Historical examples include Germany in the 1920s, Zimbabwe in the 2000s, and Venezuela in recent years.</p>
      
      <h4>Deflation</h4>
      <p>The opposite of inflation, deflation is a decrease in the general price level. While lower prices may seem beneficial, deflation can lead to reduced spending, lower wages, increased debt burden, and economic contraction.</p>
      
      <h3>Causes of Inflation</h3>
      
      <ul>
        <li><strong>Expansionary Monetary Policy:</strong> When central banks increase the money supply or keep interest rates low for extended periods.</li>
        <li><strong>Fiscal Stimulus:</strong> Government spending that exceeds tax revenues, especially during periods of full employment.</li>
        <li><strong>Supply Chain Disruptions:</strong> Events like natural disasters, pandemics, or geopolitical conflicts that restrict the flow of goods.</li>
        <li><strong>Currency Devaluation:</strong> A weaker currency makes imports more expensive, raising prices domestically.</li>
        <li><strong>Wage Growth:</strong> Rising wages that exceed productivity improvements can lead to higher prices.</li>
        <li><strong>Commodity Price Increases:</strong> Higher costs for basic inputs like energy or food can spread throughout the economy.</li>
      </ul>
      
      <h3>Effects of Inflation on Personal Finances</h3>
      
      <h4>Cash and Savings</h4>
      <p>Inflation erodes the value of cash and savings held in low-interest accounts. If your savings account pays 1% interest during a period of 3% inflation, your money is losing purchasing power at a rate of 2% annually.</p>
      
      <h4>Fixed-Income Investments</h4>
      <p>Bondholders and those relying on fixed payments suffer during inflation because the future payments become worth less in real terms.</p>
      
      <h4>Debt</h4>
      <p>Inflation can benefit borrowers with fixed-rate loans, as they repay their debt with money that's worth less than when they borrowed it. However, inflation often leads to higher interest rates for new loans.</p>
      
      <h4>Real Assets</h4>
      <p>Assets like real estate, commodities, and certain stocks can serve as inflation hedges because their values tend to rise with inflation.</p>
      
      <h3>Protecting Against Inflation</h3>
      
      <h4>Inflation-Protected Securities</h4>
      <p>Treasury Inflation-Protected Securities (TIPS) and I Bonds adjust in value or interest rate based on inflation measures, directly protecting against inflation.</p>
      
      <h4>Real Assets</h4>
      <p>Investments in real estate, commodities, and infrastructure can provide inflation protection as their values typically increase with rising prices.</p>
      
      <h4>Equities</h4>
      <p>Stocks, particularly of companies that can pass on higher costs to customers, have historically outpaced inflation over long periods.</p>
      
      <h4>Adjustable-Rate Income</h4>
      <p>Investments that adjust their payments with inflation or interest rates, such as floating-rate bonds or dividend-growing stocks, can help maintain purchasing power.</p>
    `,
    relatedTerms: ["cpi", "purchasing-power", "monetary-policy", "deflation", "tips", "i-bonds"],
    chart: {
      type: "line",
      title: "U.S. Annual Inflation Rate (CPI)",
      data: [
        { year: 1980, rate: 13.5 },
        { year: 1990, rate: 5.4 },
        { year: 2000, rate: 3.4 },
        { year: 2010, rate: 1.6 },
        { year: 2015, rate: 0.1 },
        { year: 2020, rate: 1.4 },
        { year: 2022, rate: 8.0 },
        { year: 2023, rate: 3.7 },
      ],
    },
  },
  liquidity: {
    term: "Liquidity",
    category: "investing",
    definition:
      "Liquidity refers to the ease with which an asset can be converted into cash without significantly affecting its market price.",
    content: `
      <p>Liquidity is a crucial concept in financial markets and personal finance. It measures how quickly and easily an asset can be bought or sold without causing a significant price change. Cash is the most liquid asset, while assets like real estate or private business interests are typically less liquid.</p>
      
      <h3>Levels of Liquidity</h3>
      
      <h4>Cash and Cash Equivalents</h4>
      <p>The most liquid assets include physical currency, checking accounts, savings accounts, money market accounts, and Treasury bills. These can be accessed or converted to cash immediately with no or minimal loss of value.</p>
      
      <h4>Marketable Securities</h4>
      <p>Publicly traded stocks, bonds, ETFs, and mutual funds are generally considered highly liquid, though slightly less so than cash. They can typically be sold within days, and the most actively traded securities can be sold almost instantly during market hours.</p>
      
      <h4>Less Liquid Assets</h4>
      <p>Assets such as real estate, private company shares, alternative investments, collectibles, and certain types of bonds may take weeks, months, or even longer to sell at fair market value.</p>
      
      <h4>Illiquid Assets</h4>
      <p>Some assets, like highly specialized equipment, interests in private partnerships, or investments with lockup periods, may be extremely difficult to sell quickly without substantial price concessions.</p>
      
      <h3>Importance of Liquidity</h3>
      
      <h4>Personal Finance</h4>
      <p>Maintaining adequate liquidity is essential for financial security. Having liquid assets allows you to:</p>
      <ul>
        <li>Cover emergency expenses</li>
        <li>Take advantage of investment opportunities</li>
        <li>Meet short-term financial obligations</li>
        <li>Navigate financial challenges like job loss or unexpected expenses</li>
      </ul>
      
      <h4>Business Finance</h4>
      <p>Businesses need sufficient liquidity to:</p>
      <ul>
        <li>Pay employees, vendors, and other operational expenses</li>
        <li>Service debt obligations</li>
        <li>Invest in growth opportunities</li>
        <li>Weather economic downturns or seasonal fluctuations</li>
      </ul>
      
      <h4>Market Liquidity</h4>
      <p>In financial markets, liquidity refers to the ability to execute large transactions without causing significant price movements. Liquid markets feature:</p>
      <ul>
        <li>Narrow bid-ask spreads</li>
        <li>High trading volumes</li>
        <li>Depth (ability to absorb large orders)</li>
        <li>Resilience (quick recovery from temporary imbalances)</li>
      </ul>
      
      <h3>Measuring Liquidity</h3>
      
      <h4>Personal and Business Liquidity Ratios</h4>
      <ul>
        <li><strong>Current Ratio:</strong> Current Assets ÷ Current Liabilities (above 1.0 indicates good short-term liquidity)</li>
        <li><strong>Quick Ratio (Acid-Test):</strong> (Current Assets - Inventory) ÷ Current Liabilities (more stringent measure of immediate liquidity)</li>
        <li><strong>Cash Ratio:</strong> Cash and Cash Equivalents ÷ Current Liabilities (strictest liquidity measure)</li>
      </ul>
      
      <h4>Market Liquidity Measures</h4>
      <ul>
        <li><strong>Bid-Ask Spread:</strong> The difference between the highest price a buyer is willing to pay and the lowest price a seller is willing to accept. Narrower spreads indicate higher liquidity.</li>
        <li><strong>Market Depth:</strong> The volume of orders at various price levels. Greater depth indicates higher liquidity.</li>
        <li><strong>Trading Volume:</strong> The number of shares or contracts traded. Higher volume generally indicates greater liquidity.</li>
        <li><strong>Turnover Ratio:</strong> The total trading volume divided by outstanding shares. Higher turnover suggests better liquidity.</li>
      </ul>
      
      <h3>Balancing Liquidity and Returns</h3>
      
      <p>There is typically a trade-off between liquidity and potential returns. Highly liquid assets (like cash) generally offer lower returns, while less liquid investments often provide opportunities for higher returns as compensation for the liquidity risk.</p>
      
      <h4>The Liquidity Premium</h4>
      <p>Investors often demand higher expected returns for less liquid investments to compensate for the risk of not being able to sell quickly. This additional return is called the "liquidity premium."</p>
      
      <h3>Liquidity Management Strategies</h3>
      
      <h4>For Individuals</h4>
      <ul>
        <li><strong>Emergency Fund:</strong> Maintaining 3-6 months of expenses in highly liquid assets</li>
        <li><strong>Liquidity Tiers:</strong> Structuring assets in tiers from most liquid (for immediate needs) to least liquid (for long-term goals)</li>
        <li><strong>Ladder Strategy:</strong> Staggering maturity dates of CDs or bonds to provide periodic liquidity</li>
        <li><strong>Lines of Credit:</strong> Establishing credit lines before they're needed as a backup liquidity source</li>
      </ul>
      
      <h4>For Businesses</h4>
      <ul>
        <li><strong>Cash Flow Forecasting:</strong> Projecting future cash needs to anticipate liquidity requirements</li>
        <li><strong>Working Capital Management:</strong> Optimizing inventory, accounts receivable, and accounts payable cycles</li>
        <li><strong>Credit Facilities:</strong> Maintaining revolving credit lines for operational flexibility</li>
        <li><strong>Diversified Funding Sources:</strong> Avoiding reliance on a single source of capital</li>
      </ul>
      
      <h3>Liquidity Crises</h3>
      
      <p>Liquidity crises occur when assets cannot be sold quickly enough at fair prices to meet obligations. These can affect individuals, businesses, or entire markets. Examples include:</p>
      <ul>
        <li>Bank runs, when depositors simultaneously withdraw funds</li>
        <li>Credit crunches, when lending seizes up</li>
        <li>Market liquidity events, like the 2008 financial crisis or the March 2020 pandemic-induced market stress</li>
      </ul>
      
      <p>Central banks often act as "lenders of last resort" during system-wide liquidity crises, providing emergency funding to prevent financial system collapse.</p>
    `,
    relatedTerms: ["bid-ask-spread", "market-depth", "cash-flow", "emergency-fund", "liquid-assets"],
    chart: {
      type: "bar",
      title: "Liquidity Spectrum: From Most to Least Liquid",
      data: [
        { asset: "Cash", liquidity: 100 },
        { asset: "Treasury Bills", liquidity: 95 },
        { asset: "Blue Chip Stocks", liquidity: 90 },
        { asset: "Corporate Bonds", liquidity: 75 },
        { asset: "Small-Cap Stocks", liquidity: 65 },
        { asset: "Mutual Funds", liquidity: 85 },
        { asset: "REITs", liquidity: 60 },
        { asset: "Real Estate", liquidity: 30 },
        { asset: "Private Equity", liquidity: 15 },
      ],
    },
  },
  "mutual-fund": {
    term: "Mutual Fund",
    category: "investing",
    definition:
      "A mutual fund is an investment vehicle made up of a pool of money collected from many investors to invest in securities such as stocks, bonds, money market instruments, and other assets.",
    content: `
      <p>Mutual funds pool money from many investors to create a diversified portfolio managed by professional investment managers. They offer a way for individual investors to gain exposure to a broad range of securities with relatively small amounts of money.</p>
      
      <h3>How Mutual Funds Work</h3>
      
      <h4>Fund Structure</h4>
      <p>Mutual funds are structured as companies that own the underlying assets and sell shares to investors. When you invest in a mutual fund, you're buying shares of the fund, not the underlying assets directly. The fund's per-share value, called Net Asset Value (NAV), is calculated daily by dividing the total value of all securities in the portfolio by the number of outstanding shares.</p>
      
      <h4>Professional Management</h4>
      <p>Mutual funds are run by fund managers or management teams who make investment decisions according to the fund's objectives. These professionals research investment opportunities, select securities, and monitor portfolio performance.</p>
      
      <h4>Trading Mechanics</h4>
      <p>Unlike stocks or ETFs, mutual funds trade only once per day after market close. When you place an order to buy or sell, the transaction occurs at the next calculated NAV, which is determined after the markets close.</p>
      
      <h3>Types of Mutual Funds</h3>
      
      <h4>Based on Asset Class</h4>
      <ul>
        <li><strong>Equity (Stock) Funds:</strong> Invest primarily in stocks, seeking capital appreciation and sometimes dividend income.</li>
        <li><strong>Fixed Income (Bond) Funds:</strong> Invest in bonds and other debt securities, focusing on income generation.</li>
        <li><strong>Money Market Funds:</strong> Invest in high-quality, short-term debt instruments, providing liquidity and capital preservation.</li>
        <li><strong>Balanced/Hybrid Funds:</strong> Invest in a mix of stocks, bonds, and sometimes other assets, providing a balance of growth and income.</li>
      </ul>
      
      <h4>Based on Investment Strategy</h4>
      <ul>
        <li><strong>Index Funds:</strong> Passively track a specific market index, like the S&P 500, aiming to match its performance.</li>
        <li><strong>Actively Managed Funds:</strong> Try to outperform a benchmark index through security selection and market timing.</li>
        <li><strong>Target-Date Funds:</strong> Automatically adjust asset allocation over time, becoming more conservative as a target date (typically retirement) approaches.</li>
        <li><strong>Asset Allocation Funds:</strong> Maintain specific allocations across asset classes, often rebalancing periodically.</li>
      </ul>
      
      <h4>Based on Investment Style (for Equity Funds)</h4>
      <ul>
        <li><strong>Growth Funds:</strong> Focus on companies with above-average growth potential, often with higher valuations.</li>
        <li><strong>Value Funds:</strong> Look for undervalued companies trading below their intrinsic value.</li>
        <li><strong>Blend Funds:</strong> Combine growth and value approaches.</li>
        <li><strong>Income Funds:</strong> Emphasize stocks with strong dividend payouts.</li>
      </ul>
      
      <h4>Based on Company Size</h4>
      <ul>
        <li><strong>Large-Cap Funds:</strong> Invest in large, well-established companies with market capitalizations of $10 billion or more.</li>
        <li><strong>Mid-Cap Funds:</strong> Focus on mid-sized companies with market caps between $2 billion and $10 billion.</li>
        <li><strong>Small-Cap Funds:</strong> Invest in smaller companies with market caps below $2 billion, offering higher growth potential but also greater volatility.</li>
      </ul>
      
      <h3>Advantages of Mutual Funds</h3>
      
      <ul>
        <li><strong>Diversification:</strong> Gain exposure to a wide range of securities in a single investment.</li>
        <li><strong>Professional Management:</strong> Benefit from the expertise of professional fund managers.</li>
        <li><strong>Accessibility:</strong> Invest with relatively small amounts of money.</li>
        <li><strong>Liquidity:</strong> Easily buy or sell shares (though transactions occur only once per day).</li>
        <li><strong>Convenience:</strong> Simplify investment management with automatic reinvestment and systematic withdrawal options.</li>
      </ul>
      
      <h3>Disadvantages of Mutual Funds</h3>
      
      <ul>
        <li><strong>Fees and Expenses:</strong> Pay management fees, operating expenses, and potentially sales loads (commissions).</li>
        <li><strong>Lack of Control:</strong> Have limited control over investment decisions.</li>
        <li><strong>Market Risk:</strong> Subject to market fluctuations and potential losses.</li>
        <li><strong>Tax Inefficiency:</strong> May generate taxable capital gains distributions even if you haven't sold your shares.</li>
        <li><strong>Trading Limitations:</strong> Can only buy or sell shares once per day at the NAV.</li>
      </ul>
      
      <h3>Fees and Expenses</h3>
      
      <h4>Expense Ratio</h4>
      <p>The annual cost of owning a mutual fund, expressed as a percentage of the fund's assets. It includes management fees, administrative costs, and other operating expenses. Lower expense ratios are generally better.</p>
      
      <h4>Sales Loads (Commissions)</h4>
      <ul>
        <li><strong>Front-End Load:</strong> A commission paid when you purchase shares (e.g., Class A shares).</li>
        <li><strong>Back-End Load (Contingent Deferred Sales Charge):</strong> A commission paid when you sell shares, typically decreasing over time (e.g., Class B shares).</li>
        <li><strong>Level Load:</strong> A small ongoing fee (e.g., Class C shares).</li>
      </ul>
      
      <h4>12b-1 Fees</h4>
      <p>Annual fees used to cover marketing and distribution expenses. These fees can increase the overall cost of owning a fund.</p>
      
      <h3>Choosing a Mutual Fund</h3>
      
      <ul>
        <li><strong>Define Your Investment Goals:</strong> Determine your objectives, risk tolerance, and time horizon.</li>
        <li><strong>Research Fund Performance:</strong> Review historical returns, but remember that past performance is not indicative of future results.</li>
        <li><strong>Evaluate Fees and Expenses:</strong> Compare expense ratios and sales loads.</li>
        <li><strong>Understand the Fund's Strategy:</strong> Ensure the fund's investment approach aligns with your goals.</li>
        <li><strong>Consider the Fund Manager:</strong> Research the manager's experience and track record.</li>
        <li><strong>Read the Prospectus:</strong> Review the fund's objectives, strategies, risks, and fees.</li>
      </ul>
      
      <h3>Mutual Funds vs. ETFs</h3>
      
      <table border="1" cellpadding="5">
        <tr>
          <th>Feature</th>
          <th>Mutual Funds</th>
          <th>ETFs</th>
        </tr>
        <tr>
          <td>Trading</td>
          <td>Once per day after market close</td>
          <td>Throughout trading day</td>
        </tr>
        <tr>
          <td>Pricing</td>
          <td>Net Asset Value (NAV)</td>
          <td>Market price</td>
        </tr>
        <tr>
          <td>Expense Ratios</td>
          <td>Vary, can be higher</td>
          <td>Generally lower</td>
        </tr>
        <tr>
          <td>Tax Efficiency</td>
          <td>Less tax-efficient</td>
          <td>More tax-efficient</td>
        </tr>
        <tr>
          <td>Minimum Investment</td>
          <td>Often $1,000 or more</td>
          <td>Price of one share (or less with fractional shares)</td>
        </tr>
      </table>
    `,
    relatedTerms: ["etf", "index-fund", "expense-ratio", "prospectus", "net-asset-value"],
    chart: {
      type: "bar",
      title: "Mutual Fund Asset Allocation (Trillions of USD)",
      data: [
        { category: "Equity Funds", assets: 17.5 },
        { category: "Bond Funds", assets: 5.2 },
        { category: "Hybrid Funds", assets: 3.1 },
        { category: "Money Market Funds", assets: 6.0 },
      ],
    },
  },
  portfolio: {
    term: "Portfolio",
    category: "investing",
    definition:
      "A portfolio is a collection of investments owned by an individual or organization. It can include a variety of asset classes such as stocks, bonds, mutual funds, ETFs, real estate, and cash.",
    content: `
      <p>A well-constructed portfolio is designed to meet specific investment goals, risk tolerance, and time horizon. Portfolio management involves selecting and allocating assets to achieve the desired balance between risk and return.</p>
      
      <h3>Key Components of a Portfolio</h3>
      
      <h4>Asset Allocation</h4>
      <p>The process of dividing investments among different asset classes, such as stocks, bonds, and cash. Asset allocation is a primary driver of portfolio performance and should be aligned with the investor's goals and risk tolerance.</p>
      
      <h4>Diversification</h4>
      <p>Spreading investments across a variety of securities, sectors, industries, and geographic regions to reduce risk. Diversification helps mitigate the impact of any single investment's performance on the overall portfolio.</p>
      
      <h4>Security Selection</h4>
      <p>Choosing individual securities within each asset class. This involves analyzing companies, industries, and economic factors to identify attractive investment opportunities.</p>
      
      <h4>Rebalancing</h4>
      <p>Periodically adjusting the asset allocation to maintain the desired mix. Rebalancing involves selling assets that have increased in value and buying assets that have decreased in value, helping to control risk and potentially enhance returns.</p>
      
      <h3>Types of Portfolios</h3>
      
      <h4>Growth Portfolio</h4>
      <p>Focuses on capital appreciation, typically with a higher allocation to stocks and other growth-oriented assets. Suitable for investors with a long time horizon and a higher risk tolerance.</p>
      
      <h4>Income Portfolio</h4>
      <p>Emphasizes current income, with a higher allocation to bonds, dividend-paying stocks, and other income-generating assets. Suitable for investors seeking a steady stream of income, such as retirees.</p>
      
      <h4>Balanced Portfolio</h4>
      <p>Seeks a balance between growth and income, with a mix of stocks, bonds, and other assets. Suitable for investors with a moderate risk tolerance and a medium-term time horizon.</p>
      
      <h4>Conservative Portfolio</h4>
      <p>Prioritizes capital preservation, with a higher allocation to low-risk assets such as bonds and cash. Suitable for investors with a low risk tolerance and a short time horizon.</p>
      
      <h3>Factors Influencing Portfolio Construction</h3>
      
      <h4>Investment Goals</h4>
      <p>The specific objectives the investor is trying to achieve, such as retirement, education funding, or wealth accumulation. Different goals may require different portfolio strategies.</p>
      
      <h4>Risk Tolerance</h4>
      <p>The investor's ability and willingness to withstand market fluctuations and potential losses. Investors with a higher risk tolerance can typically allocate more to volatile assets like stocks.</p>
      
      <h4>Time Horizon</h4>
      <p>The length of time the investor has to achieve their goals. Investors with a longer time horizon can typically allocate more to growth-oriented assets, as they have more time to recover from market downturns.</p>
      
      <h4>Financial Situation</h4>
      <p>The investor's current income, expenses, assets, and liabilities. This information helps determine the appropriate level of risk and the amount of capital available for investment.</p>
      
      <h4>Tax Considerations</h4>
      <p>The impact of taxes on investment returns. Tax-efficient portfolio strategies can help minimize tax liabilities and maximize after-tax returns.</p>
      
      <h3>Portfolio Management Strategies</h3>
      
      <h4>Active Management</h4>
      <p>Involves actively selecting securities and making investment decisions to outperform a benchmark index. Active managers conduct research, analyze market trends, and make tactical adjustments to the portfolio.</p>
      
      <h4>Passive Management</h4>
      <p>Involves tracking a benchmark index, such as the S&P 500, and replicating its performance. Passive managers typically invest in index funds or ETFs with low expense ratios.</p>
      
      <h4>Strategic Asset Allocation</h4>
      <p>Establishing a long-term target asset allocation based on the investor's goals, risk tolerance, and time horizon. The portfolio is periodically rebalanced to maintain the target allocation.</p>
      
      <h4>Tactical Asset Allocation</h4>
      <p>Making short-term adjustments to the asset allocation based on market conditions and economic forecasts. Tactical asset allocation aims to capitalize on short-term opportunities and reduce risk.</p>
      
      <h3>Tools for Portfolio Analysis</h3>
      
      <h4>Portfolio Management Software</h4>
      <p>Applications that help investors track their investments, monitor performance, and analyze risk.</p>
      
      <h4>Risk Management Tools</h4>
      <p>Techniques and strategies used to measure and manage portfolio risk, such as value at risk (VaR) and stress testing.</p>
      
      <h4>Performance Attribution Analysis</h4>
      <p>A process of identifying the factors that contributed to a portfolio's performance, such as asset allocation, security selection, and market timing.</p>
      
      <h3>Common Portfolio Mistakes</h3>
      
      <ul>
        <li><strong>Lack of Diversification:</strong> Concentrating investments in a few securities or sectors.</li>
        <li><strong>Emotional Decision-Making:</strong> Making investment decisions based on fear or greed.</li>
        <li><strong>Chasing Performance:</strong> Buying high and selling low.</li>
        <li><strong>Ignoring Fees:</strong> Failing to consider the impact of fees and expenses on portfolio returns.</li>
        <li><strong>Neglecting Rebalancing:</strong> Allowing the asset allocation to drift from the target mix.</li>
      </ul>
    `,
    relatedTerms: ["asset-allocation", "diversification", "risk-management", "rebalancing", "security-selection"],
    chart: {
      type: "pie",
      title: "Sample Portfolio Allocation",
      data: [
        { name: "Stocks", value: 60 },
        { name: "Bonds", value: 30 },
        { name: "Real Estate", value: 5 },
        { name: "Cash", value: 5 },
      ],
    },
  },
  "purchasing-power": {
    term: "Purchasing Power",
    category: "economics",
    definition:
      "Purchasing power refers to the value of a currency expressed in terms of the amount of goods or services that one unit of it can buy. It is inversely related to inflation.",
    content: `
      <p>Purchasing power is a fundamental concept in economics that reflects the real value of money. It indicates how much a unit of currency can buy in terms of goods and services. When purchasing power declines, it means that each unit of currency buys fewer goods and services than it did previously.</p>
      
      <h3>Factors Affecting Purchasing Power</h3>
      
      <h4>Inflation</h4>
      <p>Inflation is the primary factor that erodes purchasing power. As prices rise, the same amount of money buys fewer goods and services. High inflation rates can significantly reduce purchasing power over time.</p>
      
      <h4>Deflation</h4>
      <p>Deflation, the opposite of inflation, can increase purchasing power in the short term. As prices fall, the same amount of money buys more goods and services. However, deflation can also lead to economic stagnation and reduced spending.</p>
      
      <h4>Interest Rates</h4>
      <p>Interest rates can influence purchasing power by affecting borrowing costs and savings returns. Higher interest rates can reduce borrowing and increase savings, potentially dampening inflation and preserving purchasing power.</p>
      
      <h4>Exchange Rates</h4>
      <p>Exchange rates affect the purchasing power of a currency in international markets. A stronger currency increases purchasing power for imports, while a weaker currency reduces it.</p>
      
      <h4>Economic Growth</h4>
      <p>Economic growth can increase purchasing power by boosting incomes and creating more job opportunities. Higher incomes allow consumers to buy more goods and services.</p>
      
      <h3>Measuring Purchasing Power</h3>
      
      <h4>Consumer Price Index (CPI)</h4>
      <p>The CPI is a widely used measure of inflation that tracks the average change in prices paid by urban consumers for a basket of goods and services. It can be used to calculate the real value of money and assess changes in purchasing power.</p>
      
      <h4>Inflation Rate</h4>
      <p>The inflation rate measures the percentage change in prices over a specific period. It provides a direct indication of how quickly purchasing power is being eroded.</p>
      
      <h4>Real Income</h4>
      <p>Real income is nominal income adjusted for inflation. It reflects the actual purchasing power of income after accounting for price changes.</p>
      
      <h3>Impact of Reduced Purchasing Power</h3>
      
      <h4>Reduced Standard of Living</h4>
      <p>As purchasing power declines, consumers can afford fewer goods and services, leading to a reduced standard of living. This can affect access to essential items such as food, housing, and healthcare.</p>
      
      <h4>Decreased Savings</h4>
      <p>Inflation erodes the real value of savings, making it more difficult to accumulate wealth over time. Savings accounts with low interest rates may not keep pace with inflation, resulting in a loss of purchasing power.</p>
      
      <h4>Increased Debt Burden</h4>
      <p>Inflation can increase the real burden of debt, particularly for fixed-rate loans. As prices rise, the real value of the debt remains constant, making it more difficult to repay.</p>
      
      <h4>Economic Instability</h4>
      <p>High inflation and reduced purchasing power can lead to economic instability, as consumers lose confidence in the currency and reduce spending. This can result in lower economic growth and increased unemployment.</p>
      
      <h3>Strategies to Protect Purchasing Power</h3>
      
      <h4>Invest in Inflation-Protected Assets</h4>
      <p>Assets such as Treasury Inflation-Protected Securities (TIPS), real estate, and commodities can provide a hedge against inflation and preserve purchasing power.</p>
      
      <h4>Diversify Investments</h4>
      <p>Diversifying investments across different asset classes can help mitigate the impact of inflation on overall portfolio returns.</p>
      
      <h4>Increase Income</h4>
      <p>Increasing income through wage growth, promotions, or additional sources of revenue can help offset the effects of inflation and maintain purchasing power.</p>
      
      <h4>Reduce Debt</h4>
      <p>Reducing debt can free up more income for savings and investments, helping to preserve purchasing power over time.</p>
      
      <h4>Budgeting and Financial Planning</h4>
      <p>Creating a budget and financial plan can help track expenses, identify areas for savings, and make informed financial decisions to protect purchasing power.</p>
      
      <h3>Examples of Purchasing Power Erosion</h3>
      
      <h4>Hyperinflation in Zimbabwe</h4>
      <p>In the late 2000s, Zimbabwe experienced hyperinflation, with prices doubling every day. This led to a complete collapse of purchasing power, as people could no longer afford basic goods and services.</p>
      
      <h4>Inflation in Venezuela</h4>
      <p>Venezuela has experienced high inflation rates in recent years, leading to a significant erosion of purchasing power. Many Venezuelans struggle to afford food, medicine, and other essential items.</p>
      
      <h4>Historical Examples</h4>
      <p>Throughout history, many countries have experienced periods of high inflation and reduced purchasing power, often due to war, economic mismanagement, or other factors.</p>
    `,
    relatedTerms: ["inflation", "cpi", "deflation", "real-income", "monetary-policy", "economic-growth"],
    chart: {
      type: "line",
      title: "Decline in Purchasing Power Over Time (Illustrative)",
      data: [
        { year: 2000, value: 1.0 },
        { year: 2005, value: 0.85 },
        { year: 2010, value: 0.7 },
        { year: 2015, value: 0.6 },
        { year: 2020, value: 0.5 },
        { year: 2023, value: 0.45 },
      ],
    },
  },
  "realized-gain": {
    term: "Realized Gain",
    category: "taxes",
    definition:
      "A realized gain is the profit an investor makes when selling an asset for more than its purchase price (cost basis). It is a taxable event.",
    content: `
      <p>A realized gain occurs when an investor sells an asset, such as a stock, bond, or real estate, for a profit. The gain is the difference between the selling price and the asset's cost basis (the original purchase price plus any associated costs). Realized gains are subject to capital gains taxes, which are typically lower than ordinary income tax rates.</p>
      
      <h3>Key Concepts</h3>
      
      <h4>Cost Basis</h4>
      <p>The original purchase price of an asset, plus any associated costs such as commissions, fees, and improvements. The cost basis is used to calculate the realized gain or loss when the asset is sold.</p>
      
      <h4>Selling Price</h4>
      <p>The price at which an asset is sold. The selling price is used to calculate the realized gain or loss when compared to the cost basis.</p>
      
      <h4>Capital Gains Tax</h4>
      <p>A tax on the profit from the sale of an asset. Capital gains taxes are typically lower than ordinary income tax rates and vary depending on the holding period (short-term vs. long-term).</p>
      
      <h3>Calculating Realized Gain</h3>
      
      <p>The formula for calculating a realized gain is:</p>
      <p><strong>Realized Gain = Selling Price - Cost Basis</strong></p>
      
      <p>For example, if an investor buys a stock for $100 and sells it for $150, the realized gain is $50.</p>
      
      <h3>Types of Realized Gains</h3>
      
      <h4>Short-Term Capital Gains</h4>
      <p>Profits from assets held for one year or less. Short-term capital gains are taxed as ordinary income at the investor's regular income tax rate.</p>
      
      <h4>Long-Term Capital Gains</h4>
      <p>Profits from assets held for more than one year. Long-term capital gains are taxed at preferential rates, which are typically lower than ordinary income tax rates.</p>
      
      <h3>Tax Implications</h3>
      
      <h4>Tax Rates</h4>
      <p>Capital gains tax rates vary depending on the investor's income level and the holding period of the asset. Long-term capital gains rates are typically 0%, 15%, or 20%, while short-term capital gains are taxed as ordinary income.</p>
      
      <h4>Tax-Loss Harvesting</h4>
      <p>A strategy of selling investments at a loss to offset capital gains. Tax-loss harvesting can help reduce an investor's tax liability.</p>
      
      <h4>Wash Sale Rule</h4>
      <p>A rule that prevents investors from claiming a loss on a security if they buy the same or a "substantially identical" security within 30 days before or after the sale.</p>
      
      <h3>Examples of Realized Gains</h3>
      
      <h4>Stock Sale</h4>
      <p>An investor buys 100 shares of a stock for $50 per share and sells them for $75 per share. The realized gain is $25 per share, or $2,500 in total.</p>
      
      <h4>Bond Sale</h4>
      <p>An investor buys a bond for $1,000 and sells it for $1,100. The realized gain is $100.</p>
      
      <h4>Real Estate Sale</h4>
      <p>An investor buys a property for $200,000 and sells it for $300,000. The realized gain is $100,000.</p>
      
      <h3>Strategies to Manage Realized Gains</h3>
      
      <h4>Hold Assets Longer</h4>
      <p>Holding assets for more than one year qualifies the gains for long-term capital gains tax rates, which are typically lower than short-term rates.</p>
      
      <h4>Use Tax-Advantaged Accounts</h4>
      <p>Investing in tax-advantaged accounts such as 401(k)s, IRAs, and Roth IRAs can help defer or eliminate capital gains taxes.</p>
      
      <h4>Tax-Loss Harvesting</h4>
      <p>Selling investments at a loss to offset capital gains can help reduce tax liability.</p>
      
      <h4>Gifting Assets</h4>
      <p>Gifting appreciated assets to family members in lower tax brackets can help reduce the overall tax burden.</p>
      
      <h3>Distinction from Unrealized Gains</h3>
      
      <h4>Unrealized Gain</h4>
      <p>The profit an investor would make if they sold an asset at its current market price, but have not yet sold it. Unrealized gains are not taxable until the asset is sold and the gain is realized.</p>
      
      <h4>Key Difference</h4>
      <p>The key difference between a realized gain and an unrealized gain is that a realized gain is a taxable event, while an unrealized gain is not.</p>
    `,
    relatedTerms: ["cost-basis", "capital-gains", "tax-loss-harvesting", "unrealized-gain", "wash-sale-rule"],
    chart: {
      type: "bar",
      title: "Capital Gains Tax Rates (Illustrative)",
      data: [
        { type: "Short-Term", rate: 37 },
        { type: "Long-Term", rate: 15 },
      ],
    },
  },
  rebalancing: {
    term: "Rebalancing",
    category: "investing",
    definition:
      "Rebalancing is the process of realigning the asset allocation of an investment portfolio to its original or desired state. It involves periodically buying or selling assets to maintain the target asset mix.",
    content: `
      <p>Rebalancing is a crucial aspect of portfolio management that helps investors maintain their desired risk level and potentially enhance returns. Over time, different asset classes will grow at different rates, causing the portfolio to drift from its target allocation. Rebalancing involves periodically buying and selling assets to restore the portfolio to its original or desired asset mix.</p>
      
      <h3>Why Rebalance?</h3>
      
      <h4>Maintain Risk Level</h4>
      <p>Rebalancing helps maintain the portfolio's desired risk level. As asset classes grow at different rates, the portfolio's risk profile can change. Rebalancing ensures that the portfolio remains aligned with the investor's risk tolerance.</p>
      
      <h4>Enhance Returns</h4>
      <p>Rebalancing can potentially enhance returns by systematically "buying low and selling high." By selling assets that have increased in value and buying assets that have decreased in value, investors can capitalize on market fluctuations.</p>
      
      <h4>Stay Disciplined</h4>
      <p>Rebalancing helps investors stay disciplined and avoid emotional decision-making. It provides a structured approach to portfolio management that is based on a long-term strategy rather than short-term market trends.</p>
      
      <h3>How to Rebalance</h3>
      
      <h4>Determine Target Allocation</h4>
      <p>The first step in rebalancing is to determine the target asset allocation. This should be based on the investor's goals, risk tolerance, and time horizon.</p>
      
      <h4>Monitor Portfolio Allocation</h4>
      <p>Periodically monitor the portfolio's actual asset allocation to identify any deviations from the target allocation.</p>
      
      <h4>Calculate Rebalancing Trades</h4>
      <p>Calculate the trades needed to restore the portfolio to its target allocation. This involves selling assets that are overweighted and buying assets that are underweighted.</p>
      
      <h4>Execute Rebalancing Trades</h4>
      <p>Execute the rebalancing trades in a tax-efficient manner. This may involve selling assets in taxable accounts and buying assets in tax-advantaged accounts.</p>
      
      <h3>Rebalancing Strategies</h3>
      
      <h4>Calendar-Based Rebalancing</h4>
      <p>Rebalancing the portfolio on a fixed schedule, such as quarterly, semi-annually, or annually. This is a simple and straightforward approach.</p>
      
      <h4>Threshold-Based Rebalancing</h4>
      <p>Rebalancing the portfolio when the asset allocation deviates from the target allocation by a certain percentage. This approach is more flexible and responsive to market fluctuations.</p>
      
      <h4>Combination Rebalancing</h4>
      <p>Combining calendar-based and threshold-based rebalancing. This approach provides a balance between simplicity and flexibility.</p>
      
      <h3>Tax Implications</h3>
      
      <h4>Taxable Accounts</h4>
      <p>Rebalancing in taxable accounts can trigger capital gains taxes. It is important to consider the tax implications before executing rebalancing trades.</p>
      
      <h4>Tax-Advantaged Accounts</h4>
      <p>Rebalancing in tax-advantaged accounts such as 401(k)s, IRAs, and Roth IRAs does not trigger capital gains taxes. This makes tax-advantaged accounts ideal for rebalancing.</p>
      
      <h3>Example of Rebalancing</h3>
      
      <p>Suppose an investor has a portfolio with a target allocation of 60% stocks and 40% bonds. Over time, the stock allocation grows to 70% and the bond allocation shrinks to 30%. To rebalance the portfolio, the investor would sell some stocks and buy some bonds to restore the portfolio to its target allocation of 60% stocks and 40% bonds.</p>
      
      <h3>Benefits of Rebalancing</h3>
      
      <ul>
        <li>Maintain desired risk level</li>
        <li>Potentially enhance returns</li>
        <li>Stay disciplined</li>
        <li>Reduce emotional decision-making</li>
        <li>Systematically buy low and sell high</li>
      </ul>
      
      <h3>Risks of Rebalancing</h3>
      
      <ul>
        <li>Transaction costs</li>
        <li>Tax implications</li>
        <li>Potential for missed opportunities</li>
      </ul>
    `,
    relatedTerms: ["asset-allocation", "diversification", "risk-management", "portfolio", "tax-loss-harvesting"],
    chart: {
      type: "bar",
      title: "Impact of Rebalancing on Portfolio Returns (Illustrative)",
      data: [
        { strategy: "Rebalanced", return: 8.5 },
        { strategy: "Unrebalanced", return: 7.5 },
      ],
    },
  },
  "registered-investment-advisor": {
    term: "Registered Investment Advisor (RIA)",
    category: "basics",
    definition:
      "A Registered Investment Advisor (RIA) is a firm or individual that provides investment advice to clients for a fee. RIAs are registered with the Securities and Exchange Commission (SEC) or state securities regulators and have a fiduciary duty to act in their clients' best interests.",
    content: `
      <p>Registered Investment Advisors (RIAs) are financial professionals who provide investment advice to clients for a fee. They are registered with the Securities and Exchange Commission (SEC) or state securities regulators and are subject to certain regulations and requirements. RIAs have a fiduciary duty to act in their clients' best interests, which means they must put their clients' needs ahead of their own.</p>
      
      <h3>Key Characteristics of RIAs</h3>
      
      <h4>Fiduciary Duty</h4>
      <p>RIAs have a fiduciary duty to act in their clients' best interests. This means they must provide investment advice that is suitable for their clients' needs and objectives, and they must avoid conflicts of interest.</p>
      
      <h4>Fee-Based Compensation</h4>
      <p>RIAs are typically compensated on a fee-basis, which means they charge a percentage of assets under management (AUM) or an hourly fee for their services. This aligns their interests with their clients, as they are incentivized to grow their clients' portfolios.</p>
      
      <h4>Registration Requirements</h4>
      <p>RIAs are required to register with the Securities and Exchange Commission (SEC) or state securities regulators, depending on their AUM and other factors. Registration involves providing detailed information about the RIA's business, including its investment strategies, fees, and conflicts of interest.</p>
      
      <h4>Regulatory Oversight</h4>
      <p>RIAs are subject to regulatory oversight by the SEC or state securities regulators. This includes periodic examinations to ensure compliance with regulations and requirements.</p>
      
      <h3>Services Provided by RIAs</h3>
      
      <h4>Investment Advice</h4>
      <p>RIAs provide investment advice to clients based on their individual needs and objectives. This may include advice on asset allocation, security selection, and portfolio management.</p>
      
      <h4>Financial Planning</h4>
      <p>RIAs may also provide financial planning services, such as retirement planning, estate planning, and tax planning.</p>
      
      <h4>Portfolio Management</h4>
      <p>RIAs manage investment portfolios for clients, making investment decisions on their behalf. This may involve buying and selling securities, rebalancing the portfolio, and monitoring performance.</p>
      
      <h3>Choosing an RIA</h3>
      
      <h4>Check Registration</h4>
      <p>Verify that the RIA is registered with the SEC or state securities regulators. This information can be found on the SEC's Investment Advisor Public Disclosure (IAPD) website or the website of the state securities regulator.</p>
      
      <h4>Review Form ADV</h4>
      <p>Review the RIA's Form ADV, which provides detailed information about the RIA's business, including its investment strategies, fees, and conflicts of interest.</p>
      
      <h4>Ask Questions</h4>
      <p>Ask the RIA questions about their experience, qualifications, and investment philosophy. Make sure you understand how they are compensated and how they will act in your best interests.</p>
      
      <h4>Get References</h4>
      <p>Ask the RIA for references from other clients. Contact the references to get their feedback on the RIA's services.</p>
      
      <h3>Benefits of Working with an RIA</h3>
      
      <ul>
        <li>Fiduciary duty</li>
        <li>Fee-based compensation</li>
        <li>Personalized advice</li>
        <li>Comprehensive services</li>
        <li>Regulatory oversight</li>
      </ul>
      
      <h3>Risks of Working with an RIA</h3>
      
      <ul>
        <li>Fees</li>
        <li>Potential conflicts of interest</li>
        <li>No guarantee of performance</li>
      </ul>
    `,
    relatedTerms: [
      "financial-advisor",
      "fiduciary",
      "investment-advice",
      "form-adv",
      "sec",
      "state-securities-regulator",
    ],
    chart: {
      type: "line",
      title: "Growth of Assets Under Management by RIAs (Trillions of USD)",
      data: [
        { year: 2010, aum: 3.5 },
        { year: 2015, aum: 7.0 },
        { year: 2020, aum: 11.5 },
        { year: 2023, aum: 15.0 },
      ],
    },
  },
  "retirement-planning": {
    term: "Retirement Planning",
    category: "basics",
    definition:
      "Retirement planning is the process of determining retirement income goals and the actions and decisions necessary to achieve those goals. It involves estimating future expenses, identifying sources of income, and developing a savings and investment strategy.",
    content: `
      <p>Retirement planning is a crucial aspect of financial planning that helps individuals prepare for their financial future after they stop working. It involves estimating future expenses, identifying sources of income, and developing a savings and investment strategy to ensure a comfortable and secure retirement.</p>
      
      <h3>Key Components of Retirement Planning</h3>
      
      <h4>Estimating Retirement Expenses</h4>
      <p>The first step in retirement planning is to estimate future expenses. This involves considering factors such as housing, food, healthcare, transportation, and leisure activities. It is important to account for inflation and potential unexpected expenses.</p>
      
      <h4>Identifying Sources of Income</h4>
      <p>The next step is to identify sources of income during retirement. This may include Social Security benefits, pension income, investment income, and part-time work.</p>
      
      <h4>Developing a Savings and Investment Strategy</h4>
      <p>The third step is to develop a savings and investment strategy to accumulate sufficient funds for retirement. This involves determining how much to save each year, what types of investments to make, and how to manage risk.</p>
      
      <h4>Choosing Retirement Accounts</h4>
      <p>Selecting the appropriate retirement accounts is crucial for maximizing savings and minimizing taxes. Common retirement accounts include 401(k)s, IRAs, and Roth IRAs.</p>
      
      <h4>Managing Risk</h4>
      <p>Managing risk is an important aspect of retirement planning. This involves diversifying investments, rebalancing the portfolio, and adjusting the asset allocation as retirement approaches.</p>
      
      <h3>Retirement Planning Tools</h3>
      
      <h4>Retirement Calculators</h4>
      <p>Online tools that help estimate retirement income needs and project future savings.</p>
      
      <h4>Financial Planning Software</h4>
      <p>Software applications that provide comprehensive financial planning services, including retirement planning.</p>
      
      <h4>Financial Advisors</h4>
      <p>Financial professionals who provide personalized retirement planning advice and services.</p>
      
      <h3>Common Retirement Planning Mistakes</h3>
      
      <ul>
        <li>Starting too late</li>
        <li>Saving too little</li>
        <li>Investing too conservatively</li>
        <li>Underestimating expenses</li>
        <li>Ignoring inflation</li>
        <li>Failing to plan for healthcare costs</li>
      </ul>
      
      <h3>Retirement Account Options</h3>
      
      <h4>401(k)</h4>
      <p>A retirement savings plan sponsored by an employer. Contributions are typically made on a pre-tax basis, and earnings grow tax-deferred until withdrawal.</p>
      
      <h4>IRA (Individual Retirement Account)</h4>
      <p>A retirement savings account that individuals can open on their own. Contributions may be tax-deductible, and earnings grow tax-deferred until withdrawal.</p>
      
      <h4>Roth IRA</h4>
      <p>A retirement savings account that offers tax-free withdrawals in retirement. Contributions are made on an after-tax basis, and earnings grow tax-free.</p>
      
      <h4>Pension</h4>
      <p>A retirement plan that provides a guaranteed income stream to retirees. Pensions are typically sponsored by employers or labor unions.</p>
      
      <h4>Social Security</h4>
      <p>A government-sponsored retirement program that provides benefits to eligible retirees. Benefits are based on earnings history and are adjusted for inflation.</p>
      
      <h3>Strategies for a Successful Retirement</h3>
      
      <h4>Start Early</h4>
      <p>The earlier you start saving for retirement, the more time your money has to grow.</p>
      
      <h4>Save Consistently</h4>
      <p>Make regular contributions to your retirement accounts, even if it's a small amount.</p>
      
      <h4>Take Advantage of Employer Matching</h4>
      <p>If your employer offers a 401(k) match, be sure to take advantage of it. This is essentially free money.</p>
      
      <h4>Diversify Investments</h4>
      <p>Diversify your investments to reduce risk and potentially enhance returns.</p>
      
      <h4>Rebalance Your Portfolio</h4>
      <p>Rebalance your portfolio periodically to maintain your desired asset allocation.</p>
      
      <h4>Plan for Healthcare Costs</h4>
      <p>Healthcare costs are a significant expense in retirement. Be sure to plan for these costs by saving in a health savings account (HSA) or purchasing long-term care insurance.</p>
      
      <h4>Consider Working Part-Time</h4>
      <p>Working part-time in retirement can provide additional income and help you stay active and engaged.</p>
      
      <h3>The Importance of Professional Advice</h3>
      
      <p>Retirement planning can be complex, and it may be beneficial to seek professional advice from a financial advisor. A financial advisor can help you assess your retirement needs, develop a savings and investment strategy, and manage your portfolio.</p>
      
      <h3>Conclusion</h3>
      
      <p>Retirement planning is an essential process that helps individuals prepare for their financial future after they stop working. By estimating future expenses, identifying sources of income, and developing a savings and investment strategy, individuals can ensure a comfortable and secure retirement.</p>
    `,
    relatedTerms: ["401k", "ira", "roth-ira", "social-security", "pension", "annuity"],
    chart: {
      type: "line",
      title: "Projected Retirement Savings Over Time (Illustrative)",
      data: [
        { year: 0, savings: 0 },
        { year: 10, savings: 100000 },
        { year: 20, savings: 300000 },
        { year: 30, savings: 700000 },
        { year: 40, savings: 1500000 },
      ],
    },
  },
  "risk-management": {
    term: "Risk Management",
    category: "investing",
    definition:
      "Risk management is the process of identifying, assessing, and controlling risks. In investing, it involves understanding the potential risks associated with different investments and taking steps to mitigate those risks.",
    content: `
      <p>Risk management is a crucial aspect of investing that helps investors protect their capital and achieve their financial goals. It involves understanding the potential risks associated with different investments and taking steps to mitigate those risks.</p>
      
      <h3>Key Steps in Risk Management</h3>
      
      <h4>Identify Risks</h4>
      <p>The first step in risk management is to identify the potential risks associated with different investments. This may include market risk, credit risk, liquidity risk, and inflation risk.</p>
      
      <h4>Assess Risks</h4>
      <p>The next step is to assess the likelihood and potential impact of each risk. This involves considering factors such as market volatility, economic conditions, and company-specific factors.</p>
      
      <h4>Control Risks</h4>
      <p>The third step is to take steps to control the risks. This may involve diversifying investments, hedging positions, and setting stop-loss orders.</p>
      
      <h4>Monitor Risks</h4>
      <p>The fourth step is to monitor the risks on an ongoing basis. This involves tracking market conditions, economic indicators, and company-specific factors to identify any changes in the risk profile.</p>
      
      <h3>Types of Investment Risks</h3>
      
      <h4>Market Risk</h4>
      <p>The risk that the value of an investment will decline due to market factors such as economic conditions, interest rates, and investor sentiment.</p>
      
      <h4>Credit Risk</h4>
      <p>The risk that a borrower will default on its debt obligations. This is a particular concern for bond investors.</p>
      
      <h4>Liquidity Risk</h4>
      <p>The risk that an investment cannot be easily sold without a significant loss in value. This is a particular concern for illiquid assets such as real estate and private equity.</p>
      
      <h4>Inflation Risk</h4>
      <p>The risk that inflation will erode the real value of an investment. This is a particular concern for fixed-income investments.</p>
      
      <h4>Interest Rate Risk</h4>
      <p>The risk that changes in interest rates will affect the value of an investment. This is a particular concern for bond investors.</p>
      
      <h4>Currency Risk</h4>
      <p>The risk that changes in exchange rates will affect the value of an investment. This is a particular concern for international investors.</p>
      
      <h3>Risk Management Strategies</h3>
      
      <h4>Diversification</h4>
      <p>Spreading investments across a variety of asset classes, sectors, industries, and geographic regions to reduce risk.</p>
      
      <h4>Hedging</h4>
      <p>Using financial instruments such as options and futures to protect against potential losses.</p>
      
      <h4>Stop-Loss Orders</h4>
      <p>Setting a price at which an investment will be automatically sold to limit potential losses.</p>
      
      <h4>Asset Allocation</h4>
      <p>Allocating investments among different asset classes based on the investor's risk tolerance and time horizon.</p>
      
      <h4>Rebalancing</h4>
      <p>Periodically adjusting the asset allocation to maintain the desired mix.</p>
      
      <h3>Risk Tolerance</h3>
      
      <p>Risk tolerance is the degree of variability in investment returns that an investor is willing to withstand. Investors with a high risk tolerance are typically willing to accept more risk in exchange for the potential for higher returns, while investors with a low risk tolerance prefer to invest in lower-risk assets.</p>
      
      <h3>Risk Management Tools</h3>
      
      <h4>Portfolio Management Software</h4>
      <p>Applications that help investors track their investments, monitor performance, and analyze risk.</p>
      
      <h4>Risk Assessment Questionnaires</h4>
      <p>Questionnaires that help investors assess their risk tolerance.</p>
      
      <h4>Financial Advisors</h4>
      <p>Financial professionals who provide personalized risk management advice and services.</p>
      
      <h3>The Importance of Risk Management</h3>
      
      <p>Risk management is an essential aspect of investing that helps investors protect their capital and achieve their financial goals. By understanding the potential risks associated with different investments and taking steps to mitigate those risks, investors can increase their chances of success.</p>
    `,
    relatedTerms: ["diversification", "asset-allocation", "hedging", "stop-loss-order", "risk-tolerance", "portfolio"],
    chart: {
      type: "bar",
      title: "Risk vs. Return for Different Asset Classes (Illustrative)",
      data: [
        { asset: "Cash", risk: 1, return: 2 },
        { asset: "Bonds", risk: 3, return: 5 },
        { asset: "Stocks", risk: 7, return: 10 },
        { asset: "Real Estate", risk: 5, return: 8 },
      ],
    },
  },
  "roth-ira": {
    term: "Roth IRA",
    category: "retirement",
    definition:
      "A Roth IRA is an individual retirement account that offers tax-free withdrawals in retirement. Contributions are made on an after-tax basis, and earnings grow tax-free.",
    content: `
      <p>A Roth IRA is a popular retirement savings account that offers tax advantages to individuals who meet certain income requirements. Contributions are made on an after-tax basis, and earnings grow tax-free. Qualified withdrawals in retirement are also tax-free, making it an attractive option for those who anticipate being in a higher tax bracket in retirement.</p>
      
      <h3>Key Features of a Roth IRA</h3>
      
      <h4>Tax-Free Withdrawals</h4>
      <p>Qualified withdrawals in retirement are tax-free. This means that you will not have to pay any taxes on the money you withdraw from your Roth IRA, as long as you meet certain requirements.</p>
      
      <h4>After-Tax Contributions</h4>
      <p>Contributions are made on an after-tax basis. This means that you will not receive a tax deduction for your contributions, but your earnings will grow tax-free.</p>
      
      <h4>Tax-Free Growth</h4>
      <p>Earnings grow tax-free. This means that you will not have to pay any taxes on the earnings in your Roth IRA, as long as you leave the money in the account.</p>
      
      <h4>Contribution Limits</h4>
      <p>There are annual contribution limits to Roth IRAs. For 2023, the contribution limit is $6,500, with an additional $1,000 catch-up contribution allowed for those age 50 and older.</p>
      
      <h4>Income Limits</h4>
      <p>There are income limits to contributing to a Roth IRA. For 2023, the income limits are $153,000 for single filers and $228,000 for married filing jointly.</p>
      
      <h4>Early Withdrawal Rules</h4>
      <p>Contributions can be withdrawn at any time without penalty or tax. However, earnings withdrawn before age 59½ are subject to a 10% penalty and income tax, with some exceptions.</p>
      
      <h4>No Required Minimum Distributions (RMDs)</h4>
      <p>Unlike traditional IRAs, Roth IRAs do not have required minimum distributions (RMDs). This means that you can leave the money in the account for as long as you want, and you will not be required to take any withdrawals.</p>
      
      <h3>Benefits of a Roth IRA</h3>
      
      <ul>
        <li>Tax-free withdrawals in retirement</li>
        <li>Tax-free growth</li>
        <li>Flexibility to withdraw contributions at any time</li>
        <li>No required minimum distributions (RMDs)</li>
        <li>Potential for higher returns due to tax-free growth</li>
      </ul>
      
      <h3>Drawbacks of a Roth IRA</h3>
      
      <ul>
        <li>No tax deduction for contributions</li>
        <li>Income limits</li>
        <li>Contribution limits</li>
        <li>Potential for penalties on early withdrawals of earnings</li>
      </ul>
      
      <h3>Who Should Consider a Roth IRA?</h3>
      
      <p>A Roth IRA may be a good option for individuals who:</p>
      <ul>
        <li>Anticipate being in a higher tax bracket in retirement</li>
        <li>Want tax-free withdrawals in retirement</li>
        <li>Want flexibility to withdraw contributions at any time</li>
        <li>Do not need a tax deduction for contributions</li>
        <li>Meet the income requirements</li>
      </ul>
      
      <h3>Roth IRA vs. Traditional IRA</h3>
      
      <table border="1" cellpadding="5">
        <tr>
          <th>Feature</th>
          <th>Roth IRA</th>
          <th>Traditional IRA</th>
        </tr>
        <tr>
          <td>Tax Treatment of Contributions</td>
          <td>After-tax</td>
          <td>Pre-tax (may be deductible)</td>
        </tr>
        <tr>
          <td>Tax Treatment of Withdrawals</td>
          <td>Tax-free (qualified)</td>
          <td>Taxable</td>
        </tr>
        <tr>
          <td>Income Limits</td>
          <td>Yes</td>
          <td>No</td>
        </tr>
        <tr>
          <td>Required Minimum Distributions (RMDs)</td>
          <td>No</td>
          <td>Yes</td>
        </tr>
      </table>
    `,
    relatedTerms: ["ira", "401k", "retirement-planning", "tax-deferred", "tax-free"],
    chart: {
      type: "pie",
      title: "Roth IRA vs. Traditional IRA Assets (Illustrative)",
      data: [
        { type: "Roth IRA", assets: 40 },
        { type: "Traditional IRA", assets: 60 },
      ],
    },
  },
  "rule-of-72": {
    term: "Rule of 72",
    category: "basics",
    definition:
      "The Rule of 72 is a simple formula that estimates how long it will take for an investment to double in value, given a fixed annual rate of return.",
    content: `
      <p>The Rule of 72 is a quick and easy way to estimate how long it will take for an investment to double in value, assuming a fixed annual rate of return. It is a useful tool for financial planning and can help investors understand the power of compounding.</p>
      
      <h3>The Formula</h3>
      
      <p>The formula for the Rule of 72 is:</p>
      <p><strong>Years to Double = 72 / Annual Rate of Return</strong></p>
      
      <p>For example, if an investment has an annual rate of return of 8%, it will take approximately 9 years to double in value (72 / 8 = 9).</p>
      
      <h3>How to Use the Rule of 72</h3>
      
      <h4>Estimate Doubling Time</h4>
      <p>The Rule of 72 can be used to estimate how long it will take for an investment to double in value, given a fixed annual rate of return.</p>
      
      <h4>Determine Required Rate of Return</h4>
      <p>The Rule of 72 can also be used to determine the required rate of return to double an investment in a specific time period.</p>
      
      <h3>Limitations of the Rule of 72</h3>
      
      <h4>Approximation</h4>
      <p>The Rule of 72 is an approximation and is most accurate for rates of return between 6% and 10%. For rates of return outside of this range, the Rule of 72 may not be as accurate.</p>
      
      <h4>Fixed Rate of Return</h4>
      <p>The Rule of 72 assumes a fixed annual rate of return. In reality, investment returns can fluctuate, which can affect the actual doubling time.</p>
      
      <h4>Taxes and Fees</h4>
      <p>The Rule of 72 does not account for taxes and fees, which can reduce the actual rate of return and increase the doubling time.</p>
      
      <h3>Examples of the Rule of 72</h3>
      
      <h4>Example 1</h4>
      <p>An investment has an annual rate of return of 6%. Using the Rule of 72, it will take approximately 12 years to double in value (72 / 6 = 12).</p>
      
      <h4>Example 2</h4>
      <p>An investor wants to double their investment in 10 years. Using the Rule of 72, they would need an annual rate of return of approximately 7.2% (72 / 10 = 7.2).</p>
      
      <h3>Alternatives to the Rule of 72</h3>
      
      <h4>Compound Interest Calculator</h4>
      <p>A compound interest calculator can provide a more accurate estimate of doubling time by accounting for variable rates of return, taxes, and fees.</p>
      
      <h4>Financial Advisor</h4>
      <p>A financial advisor can provide personalized advice on investment strategies and help you estimate doubling time based on your specific circumstances.</p>
      
      <h3>The Value of Understanding Compounding</h3>
      
      <p>The Rule of 72 highlights the power of compounding, which is the ability of an investment to generate earnings that are then reinvested to generate further earnings. Understanding compounding is essential for long-term financial planning and can help investors achieve their financial goals.</p>
    `,
    relatedTerms: ["compound-interest", "time-value-of-money", "apr", "apy", "investment-growth"],
    chart: {
      type: "bar",
      title: "Years to Double Investment at Different Rates of Return (Rule of 72)",
      data: [
        { rate: 4, years: 18 },
        { rate: 6, years: 12 },
        { rate: 8, years: 9 },
        { rate: 10, years: 7.2 },
        { rate: 12, years: 6 },
      ],
    },
  },
  "security-selection": {
    term: "Security Selection",
    category: "investing",
    definition:
      "Security selection is the process of choosing individual investments (securities) within a portfolio. It involves analyzing companies, industries, and economic factors to identify attractive investment opportunities.",
    content: `
      <p>Security selection is a crucial aspect of portfolio management that involves choosing individual investments (securities) within a portfolio. It requires a thorough analysis of companies, industries, and economic factors to identify attractive investment opportunities that align with the investor's goals and risk tolerance.</p>
      
      <h3>Key Steps in Security Selection</h3>
      
      <h4>Fundamental Analysis</h4>
      <p>Analyzing a company's financial statements, management team, competitive position, and industry dynamics to assess its intrinsic value.</p>
      
      <h4>Technical Analysis</h4>
      <p>Analyzing historical price and volume data to identify patterns and trends that may indicate future price movements.</p>
      
      <h4>Quantitative Analysis</h4>
      <p>Using mathematical and statistical models to evaluate investment opportunities and identify securities with attractive characteristics.</p>
      
      <h4>Economic Analysis</h4>
      <p>Analyzing macroeconomic factors such as economic growth, inflation, interest rates, and government policies to assess their impact on investment opportunities.</p>
      
      <h3>Factors to Consider in Security Selection</h3>
      
      <h4>Financial Performance</h4>
      <p>Evaluating a company's revenue growth, profitability, cash flow, and debt levels to assess its financial health and stability.</p>
      
      <h4>Management Team</h4>
      <p>Assessing the experience, expertise, and track record of a company's management team.</p>
      
      <h4>Competitive Position</h4>
      <p>Evaluating a company's competitive advantages, market share, and industry dynamics.</p>
      
      <h4>Valuation</h4>
      <p>Determining whether a security is undervalued or overvalued based on its intrinsic value and market price.</p>
      
      <h4>Risk Factors</h4>
      <p>Identifying and assessing the potential risks associated with an investment, such as market risk, credit risk, and company-specific risks.</p>
      
      <h3>Security Selection Strategies</h3>
      
      <h4>Value Investing</h4>
      <p>Identifying undervalued securities that are trading below their intrinsic value.</p>
      
      <h4>Growth Investing</h4>
      <p>Identifying companies with high growth potential and investing in their securities.</p>
      
      <h4>Income Investing</h4>
      <p>Investing in securities that generate a steady stream of income, such as bonds and dividend-paying stocks.</p>
      
      <h4>Momentum Investing</h4>
      <p>Investing in securities that have been performing well and are expected to continue to perform well.</p>
      
      <h3>Security Selection Tools</h3>
      
      <h4>Financial News and Data Providers</h4>
      <p>Services that provide financial news, data, and analysis, such as Bloomberg, Reuters, and FactSet.</p>
      
      <h4>Investment Research Reports</h4>
      <p>Reports that provide in-depth analysis of companies, industries, and economic factors.</p>
      
      <h4>Financial Ratios and Metrics</h4>
      <p>Tools that help investors evaluate a company's financial performance, such as price-to-earnings ratio, debt-to-equity ratio, and return on equity.</p>
      
      <h3>The Importance of Security Selection</h3>
      
      <p>Security selection is a crucial aspect of portfolio management that can significantly impact investment returns. By carefully analyzing companies, industries, and economic factors, investors can identify attractive investment opportunities and build a portfolio that aligns with their goals and risk tolerance.</p>
    `,
    relatedTerms: [
      "fundamental-analysis",
      "technical-analysis",
      "quantitative-analysis",
      "value-investing",
      "growth-investing",
      "income-investing",
    ],
    chart: {
      type: "bar",
      title: "Factors Influencing Security Selection (Illustrative)",
      data: [
        { factor: "Financial Performance", weight: 30 },
        { factor: "Management Team", weight: 20 },
        { factor: "Competitive Position", weight: 20 },
        { factor: "Valuation", weight: 15 },
        { factor: "Risk Factors", weight: 15 },
      ],
    },
  },
  "social-security": {
    term: "Social Security",
    category: "retirement",
    definition:
      "Social Security is a U.S. government program that provides retirement, disability, and survivor benefits to eligible workers and their families.",
    content: `
      <p>Social Security is a cornerstone of retirement planning in the United States, providing a safety net for millions of Americans. It is a government program that provides retirement, disability, and survivor benefits to eligible workers and their families.</p>
      
      <h3>Key Features of Social Security</h3>
      
      <h4>Eligibility</h4>
      <p>To be eligible for Social Security benefits, workers must earn a certain number of credits by paying Social Security taxes on their earnings. The number of credits required depends on the worker's age and the type of benefit they are applying for.</p>
      
      <h4>Benefits</h4>
      <p>Social Security provides retirement, disability, and survivor benefits. Retirement benefits are available to workers who have reached retirement age. Disability benefits are available to workers who are unable to work due to a disability. Survivor benefits are available to the families of deceased workers.</p>
      
      <h4>Funding</h4>
      <p>Social Security is funded by a payroll tax on workers' earnings. The current payroll tax rate is 6.2% for employees and 6.2% for employers, for a total of 12.4%.</p>
      
      <h4>Benefit Calculation</h4>
      <p>Social Security benefits are based on a worker's earnings history. The Social Security Administration (SSA) uses a formula to calculate a worker's average indexed monthly earnings (AIME), which is then used to determine their primary insurance amount (PIA). The PIA is the amount a worker will receive at their full retirement age.</p>
      
      <h4>Full Retirement Age</h4>
      <p>The full retirement age (FRA) is the age at which a worker can receive their full Social Security benefit. The FRA depends on the worker's year of birth. For those born between 1943 and 1954, the FRA is 66. For those born between 1955 and 1959, the FRA gradually increases to 67. For those born in 1960 or later, the FRA is 67.</p>
      
      <h4>Early Retirement</h4>
      <p>Workers can choose to retire as early as age 62, but their benefits will be reduced. The amount of the reduction depends on the worker's age at retirement and their FRA.</p>
      
      <h4>Delayed Retirement</h4>
      <p>Workers can choose to delay retirement past their FRA, and their benefits will increase. The amount of the increase depends on the worker's age at retirement and their FRA.</p>
      
      <h3>Social Security Benefits</h3>
      
      <h4>Retirement Benefits</h4>
      <p>Retirement benefits are available to workers who have reached retirement age. The amount of the benefit depends on the worker's earnings history and their age at retirement.</p>
      
      <h4>Disability Benefits</h4>
      <p>Disability benefits are available to workers who are unable to work due to a disability. The amount of the benefit depends on the worker's earnings history and the severity of their disability.</p>
      
      <h4>Survivor Benefits</h4>
      <p>Survivor benefits are available to the families of deceased workers. The amount of the benefit depends on the worker's earnings history and their relationship to the deceased worker.</p>
      
      <h3>Social Security Planning</h3>
      
      <h4>Estimate Your Benefits</h4>
      <p>Use the SSA's online calculator to estimate your future Social Security benefits.</p>
      
      <h4>Consider Your Retirement Age</h4>
      <p>Decide when you want to retire and how that will affect your benefits.</p>
      
      <h4>Coordinate with Other Retirement Savings</h4>
      <p>Coordinate your Social Security benefits with your other retirement savings, such as 401(k)s and IRAs.</p>
      
      <h4>Consider Spousal Benefits</h4>
      <p>If you are married, consider how your spousal benefits will affect your retirement income.</p>
      
      <h3>The Future of Social Security</h3>
      
      <p>Social Security faces long-term funding challenges due to demographic trends such as an aging population and declining birth rates. Congress may need to take action to address these challenges, such as raising the payroll tax rate, reducing benefits, or increasing the retirement age.</p>
    `,
    relatedTerms: ["retirement-planning", "medicare", "pension", "401k", "ira", "social-security-administration"],
    chart: {
      type: "line",
      title: "Social Security Beneficiaries Over Time (Millions)",
      data: [
        { year: 1970, beneficiaries: 25 },
        { year: 1980, beneficiaries: 35 },
        { year: 1990, beneficiaries: 45 },
        { year: 2000, beneficiaries: 50 },
        { year: 2010, beneficiaries: 55 },
        { year: 2020, beneficiaries: 65 },
      ],
    },
  },
  stocks: {
    term: "Stocks",
    category: "investing",
    definition:
      "Stocks are a type of security that represents ownership in a corporation. They are also known as equities and are a fundamental building block of many investment portfolios.",
    content: `
      <p>Stocks represent ownership in a corporation and are a fundamental building block of many investment portfolios. When you buy stock in a company, you are buying a small piece of that company. As a shareholder, you have the potential to profit from the company's success, but you also bear the risk of the company's failure.</p>
      
      <h3>Key Features of Stocks</h3>
      
      <h4>Ownership</h4>
      <p>Stocks represent ownership in a corporation. As a shareholder, you have certain rights, such as the right to vote on important company matters and the right to receive dividends.</p>
      
      <h4>Potential for Growth</h4>
      <p>Stocks have the potential to grow in value over time. If a company is successful, its stock price may increase, allowing shareholders to profit from the company's success.</p>
      
      <h4>Risk</h4>
      <p>Stocks are subject to market risk, which is the risk that the value of an investment will decline due to market factors such as economic conditions, interest rates, and investor sentiment. Stocks are also subject to company-specific risks, such as poor management, competition, and regulatory changes.</p>
      
      <h4>Dividends</h4>
      <p>Some companies pay dividends to their shareholders. Dividends are a portion of the company's profits that are distributed to shareholders. Dividends can provide a steady stream of income for investors.</p>
      
      <h4>Liquidity</h4>
      <p>Stocks are generally liquid investments, meaning they can be easily bought and sold on stock exchanges. This makes it easy for investors to access their capital when they need it.</p>
      
      <h3>Types of Stocks</h3>
      
      <h4>Common Stock</h4>
      <p>Common stock is the most common type of stock. Common shareholders have the right to vote on important company matters and the right to receive dividends, but they are also the last to be paid in the event of bankruptcy.</p>
      
      <h4>Preferred Stock</h4>
      <p>Preferred stock is a type of stock that has certain preferences over common stock. Preferred shareholders have the right to receive dividends before common shareholders, and they have a higher claim on assets in the event of bankruptcy.</p>
      
      <h4>Large-Cap Stocks</h4>
      <p>Large-cap stocks are stocks of companies with a large market capitalization (typically $10 billion or more). Large-cap stocks are generally considered to be less risky than small-cap stocks.</p>
      
      <h4>Mid-Cap Stocks</h4>
      <p>Mid-cap stocks are stocks of companies with a medium market capitalization (typically between $2 billion and $10 billion). Mid-cap stocks are generally considered to be more risky than large-cap stocks, but they also have the potential for higher growth.</p>
      
      <h4>Small-Cap Stocks</h4>
      <p>Small-cap stocks are stocks of companies with a small market capitalization (typically less than $2 billion). Small-cap stocks are generally considered to be the most risky type of stock, but they also have the potential for the highest growth.</p>
      
      <h3>Investing in Stocks</h3>
      
      <h4>Research</h4>
      <p>Before investing in stocks, it is important to do your research. This includes analyzing the company's financial statements, management team, competitive position, and industry dynamics.</p>
      
      <h4>Diversification</h4>
      <p>Diversify your stock portfolio by investing in a variety of stocks across different sectors and industries. This will help reduce your risk.</p>
      
      <h4>Long-Term Perspective</h4>
      <p>Stocks are a long-term investment. Be prepared to hold your stocks for several years, or even decades, to allow them to grow in value.</p>
      
      <h4>Risk Tolerance</h4>
      <p>Consider your risk tolerance before investing in stocks. If you are risk-averse, you may want to invest in lower-risk stocks, such as large-cap stocks or dividend-paying stocks.</p>
      
      <h3>The Role of Stocks in a Portfolio</h3>
      
      <p>Stocks are an important component of many investment portfolios. They provide the potential for growth and can help investors achieve their long-term financial goals. However, stocks are also subject to market risk, so it is important to diversify your portfolio and consider your risk tolerance before investing in stocks.</p>
    `,
    relatedTerms: ["equities", "dividends", "market-capitalization", "large-cap", "mid-cap", "small-cap"],
    chart: {
      type: "bar",
      title: "Historical Stock Market Returns (S&P 500)",
      data: [
        { period: "1 Year", return: 10 },
        { period: "5 Years", return: 8 },
        { period: "10 Years", return: 12 },
        { period: "20 Years", return: 9 },
      ],
    },
  },
  "tax-deferred": {
    term: "Tax-Deferred",
    category: "taxes",
    definition:
      "Tax-deferred refers to investments or accounts where taxes on the earnings or gains are not paid until a later date, typically when the funds are withdrawn.",
    content: `
      <p>Tax-deferred refers to investments or accounts where taxes on the earnings or gains are not paid until a later date, typically when the funds are withdrawn. This can be a significant advantage for investors, as it allows their investments to grow faster since they are not paying taxes on the earnings each year.</p>
      
      <h3>Key Features of Tax-Deferred Investments</h3>
      
      <h4>Delayed Taxation</h4>
      <p>Taxes on the earnings or gains are not paid until a later date, typically when the funds are withdrawn.</p>
      
      <h4>Tax-Free Growth</h4>
      <p>Earnings and gains grow tax-free, allowing investments to compound faster.</p>
      
      <h4>Potential for Higher Returns</h4>
      <p>The potential for higher returns due to tax-free growth and delayed taxation.</p>
      
      <h3>Types of Tax-Deferred Investments</h3>
      
      <h4>401(k)</h4>
      <p>A retirement savings plan sponsored by an employer. Contributions are typically made on a pre-tax basis, and earnings grow tax-deferred until withdrawal.</p>
      
      <h4>IRA (Individual Retirement Account)</h4>
      <p>A retirement savings account that individuals can open on their own. Contributions may be tax-deductible, and earnings grow tax-deferred until withdrawal.</p>
      
      <h4>Annuity</h4>
      <p>A financial product that provides regular payments in exchange for an initial lump sum investment or series of payments. Earnings grow tax-deferred until withdrawal.</p>
      
      <h4>529 Plan</h4>
      <p>A savings plan for education expenses. Earnings grow tax-deferred, and withdrawals are tax-free if used for qualified education expenses.</p>
      
      <h3>Benefits of Tax-Deferred Investments</h3>
      
      <ul>
        <li>Tax-free growth</li>
        <li>Potential for higher returns</li>
        <li>Tax deduction for contributions (in some cases)</li>
        <li>Flexibility to choose when to pay taxes</li>
      </ul>
      
      <h3>Drawbacks of Tax-Deferred Investments</h3>
      
      <ul>
        <li>Taxes must be paid eventually</li>
        <li>Potential for higher tax rates in the future</li>
        <li>Withdrawals may be subject to penalties</li>
        <li>Limited access to funds before retirement (in some cases)</li>
      </ul>
      
      <h3>Who Should Consider Tax-Deferred Investments?</h3>
      
      <p>Tax-deferred investments may be a good option for individuals who:</p>
      <ul>
        <li>Want to save for retirement</li>
        <li>Want to reduce their current tax liability</li>
        <li>Anticipate being in a lower tax bracket in retirement</li>
        <li>Are willing to defer taxes until a later date</li>
      </ul>
      
      <h3>Tax-Deferred vs. Tax-Advantaged</h3>
      
      <table border="1" cellpadding="5">
        <tr>
          <th>Feature</th>
          <th>Tax-Deferred</th>
          <th>Tax-Advantaged</th>
        </tr>
        <tr>
          <td>Tax Treatment of Contributions</td>
          <td>Pre-tax or after-tax</td>
          <td>Pre-tax or after-tax</td>
        </tr>
        <tr>
          <td>Tax Treatment of Earnings</td>
          <td>Tax-deferred</td>
          <td>Tax-free or tax-deferred</td>
        </tr>
        <tr>
          <td>Tax Treatment of Withdrawals</td>
          <td>Taxable</td>
          <td>Tax-free or taxable</td>
        </tr>
      </table>
    `,
    relatedTerms: ["401k", "ira", "annuity", "529-plan", "tax-free", "taxable"],
    chart: {
      type: "line",
      title: "Growth of Tax-Deferred vs. Taxable Investments (Illustrative)",
      data: [
        { year: 0, taxDeferred: 10000, taxable: 10000 },
        { year: 10, taxDeferred: 20000, taxable: 18000 },
        { year: 20, taxDeferred: 40000, taxable: 32000 },
        { year: 30, taxDeferred: 80000, taxable: 56000 },
      ],
    },
  },
  taxable: {
    term: "Taxable",
    category: "taxes",
    definition:
      "Taxable refers to income, investments, or accounts that are subject to taxation by federal, state, or local governments.",
    content: `
      <p>Taxable refers to income, investments, or accounts that are subject to taxation by federal, state, or local governments. This means that the earnings or gains generated from these sources are subject to income tax, capital gains tax, or other types of taxes.</p>
      
      <h3>Key Features of Taxable Income and Investments</h3>
      
      <h4>Subject to Taxation</h4>
      <p>Earnings and gains are subject to taxation by federal, state, or local governments.</p>
      
      <h4>Tax Reporting Requirements</h4>
      <p>Taxpayers are required to report taxable income and investments on their tax returns.</p>
      
      <h4>Potential for Tax Liability</h4>
      <p>Taxpayers may owe taxes on the earnings and gains generated from taxable sources.</p>
      
      <h3>Types of Taxable Income</h3>
      
      <h4>Wages and Salaries</h4>
      <p>Income earned from employment is subject to income tax.</p>
      
      <h4>Interest Income</h4>
      <p>Income earned from savings accounts, bonds, and other interest-bearing investments is subject to income tax.</p>
      
      <h4>Dividend Income</h4>
      <p>Income earned from dividends paid by stocks is subject to income tax.</p>
      
      <h4>Capital Gains</h4>
      <p>Profits earned from the sale of assets, such as stocks, bonds, and real estate, are subject to capital gains tax.</p>
      
      <h4>Rental Income</h4>
      <p>Income earned from renting out property is subject to income tax.</p>
      
      <h3>Types of Taxable Investments</h3>
      
      <h4>Brokerage Accounts</h4>
      <p>Investment accounts that are not tax-advantaged, such as 401(k)s or IRAs. Earnings and gains in brokerage accounts are subject to taxation.</p>
      
      <h4>Savings Accounts</h4>
      <p>Savings accounts that earn interest are subject to income tax.</p>
      
      <h3>Tax Planning Strategies for Taxable Income and Investments</h3>
      
      <h4>Tax-Loss Harvesting</h4>
      <p>Selling investments at a loss to offset capital gains. This can help reduce your tax liability.</p>
      
      <h4>Asset Location</h4>
      <p>Strategically placing assets in different types of accounts to minimize taxes. For example, placing high-growth assets in tax-advantaged accounts and low-growth assets in taxable accounts.</p>
      
      <h4>Tax-Efficient Investing</h4>
      <p>Choosing investments that generate less taxable income, such as municipal bonds or index funds.</p>
      
      <h4>Deductions and Credits</h4>
      <p>Taking advantage of available deductions and credits to reduce your taxable income.</p>
      
      <h3>The Importance of Understanding Taxable Income and Investments</h3>
      
      <p>Understanding taxable income and investments is essential for effective financial planning. By understanding the tax implications of different financial decisions, you can minimize your tax liability and maximize your wealth.</p>
    `,
    relatedTerms: [
      "income-tax",
      "capital-gains",
      "tax-deduction",
      "tax-credit",
      "tax-loss-harvesting",
      "tax-efficient-investing",
    ],
    chart: {
      type: "bar",
      title: "Tax Rates on Different Types of Income (Illustrative)",
      data: [
        { type: "Wages", rate: 25 },
        { type: "Interest", rate: 25 },
        { type: "Dividends", rate: 15 },
        { type: "Capital Gains", rate: 15 },
      ],
    },
  },
  "tax-loss-harvesting": {
    term: "Tax-Loss Harvesting",
    category: "taxes",
    definition:
      "Tax-loss harvesting is a tax-management strategy that involves selling investments at a loss to offset capital gains. This can help reduce an investor's tax liability.",
    content: `
      <p>Tax-loss harvesting is a tax-management strategy that involves selling investments at a loss to offset capital gains. This can help reduce an investor's tax liability and improve their overall investment returns.</p>
      
      <h3>Key Concepts of Tax-Loss Harvesting</h3>
      
      <h4>Capital Gains</h4>
      <p>Profits earned from the sale of assets, such as stocks, bonds, and real estate.</p>
      
      <h4>Capital Losses</h4>
      <p>Losses incurred from the sale of assets, such as stocks, bonds, and real estate.</p>
      
      <h4>Offsetting Gains and Losses</h4>
      <p>Capital losses can be used to offset capital gains, reducing an investor's tax liability.</p>
      
      <h4>Wash Sale Rule</h4>
      <p>The IRS prohibits claiming a loss on a security if you buy the same or a "substantially identical" security within 30 days before or after the sale.</p>
      
      <h3>How Tax-Loss Harvesting Works</h3>
      
      <h4>Identify Investments at a Loss</h4>
      <p>Identify investments in your portfolio that have declined in value.</p>
      
      <h4>Sell the Investments</h4>
      <p>Sell the investments at a loss.</p>
      
      <h4>Offset Capital Gains</h4>
      <p>Use the capital losses to offset capital gains, reducing your tax liability.</p>
      
      <h4>Reinvest the Proceeds</h4>
      <p>Reinvest the proceeds from the sale into similar, but not "substantially identical," investments.</p>
      
      <h3>Benefits of Tax-Loss Harvesting</h3>
      
      <ul>
        <li>Reduced Tax Liability</li>
        <li>Improved Investment Returns</li>
        <li>Opportunity to Rebalance Portfolio</li>
      </ul>
      
      <h3>Limitations of Tax-Loss Harvesting</h3>
      
      <ul>
        <li>Transaction Costs</li>
        <li>Wash Sale Rule</li>
        <li>Limited Availability of Losses</li>
      </ul>
      
      <h3>Example of Tax-Loss Harvesting</h3>
      
      <p>Suppose an investor has $10,000 in capital gains and $5,000 in capital losses. By using tax-loss harvesting, the investor can offset the $10,000 in capital gains with the $5,000 in capital losses, reducing their tax liability.</p>
      
      <h3>Who Should Consider Tax-Loss Harvesting?</h3>
      
      <p>Tax-loss harvesting may be a good option for individuals who:</p>
      <ul>
        <li>Have taxable investment accounts</li>
        <li>Have capital gains</li>
        <li>Are comfortable with selling investments at a loss</li>
        <li>Understand the wash sale rule</li>
      </ul>
      
      <h3>Tax-Loss Harvesting and the Wash Sale Rule</h3>
      
      <p>The wash sale rule is an important consideration when implementing a tax-loss harvesting strategy. The wash sale rule prohibits claiming a loss on a security if you buy the same or a "substantially identical" security within 30 days before or after the sale. To avoid violating the wash sale rule, investors can reinvest the proceeds from the sale into similar, but not "substantially identical," investments.</p>
    `,
    relatedTerms: [
      "capital-gains",
      "capital-losses",
      "wash-sale-rule",
      "taxable-account",
      "tax-efficient-investing",
      "tax-management",
    ],
    chart: {
      type: "bar",
      title: "Tax Savings from Tax-Loss Harvesting (Illustrative)",
      data: [
        { scenario: "Without Tax-Loss Harvesting", taxLiability: 1500 },
        { scenario: "With Tax-Loss Harvesting", taxLiability: 500 },
      ],
    },
  },
  "time-value-of-money": {
    term: "Time Value of Money (TVM)",
    category: "basics",
    definition:
      "The time value of money (TVM) is the concept that money available at the present time is worth more than the same sum in the future due to its potential earning capacity. This core principle of finance holds that, provided money can earn interest, any amount of money is worth more the sooner it is received.",
    content: `
      <p>The time value of money (TVM) is a fundamental concept in finance that states that money available at the present time is worth more than the same sum in the future due to its potential earning capacity. This core principle holds that, provided money can earn interest, any amount of money is worth more the sooner it is received.</p>
      
      <h3>Key Concepts of Time Value of Money</h3>
      
      <h4>Present Value (PV)</h4>
      <p>The current worth of a future sum of money or stream of cash flows, given a specified rate of return.</p>
      
      <h4>Future Value (FV)</h4>
      <p>The value of an asset or investment at a specified date in the future, based on an assumed rate of growth.</p>
      
      <h4>Interest Rate (r)</h4>
      <p>The rate of return used to discount future cash flows back to their present value or to compound present values to their future value.</p>
      
      <h4>Time Period (n)</h4>
      <p>The number of periods over which the money is invested or borrowed.</p>
      
      <h3>Formulas for Time Value of Money</h3>
      
      <h4>Present Value (PV)</h4>
      <p>PV = FV / (1 + r)^n</p>
      
      <h4>Future Value (FV)</h4>
      <p>FV = PV * (1 + r)^n</p>
      
      <h3>Applications of Time Value of Money</h3>
      
      <h4>Investment Decisions</h4>
      <p>TVM is used to evaluate investment opportunities and determine whether they are worth pursuing.</p>
      
      <h4>Capital Budgeting</h4>
      <p>TVM is used to evaluate capital projects and determine whether they are financially viable.</p>
      
      <h4>Loan Analysis</h4>
      <p>TVM is used to calculate loan payments and determine the total cost of borrowing.</p>
      
      <h4>Retirement Planning</h4>
      <p>TVM is used to estimate future retirement income needs and determine how much to save each year.</p>
      
      <h3>Examples of Time Value of Money</h3>
      
      <h4>Example 1</h4>
      <p>What is the present value of $1,000 to be received in 5 years, assuming an interest rate of 5%?</p>
      <p>PV = $1,000 / (1 + 0.05)^5 = $783.53</p>
      
      <h4>Example 2</h4>
      <p>What is the future value of $1,000 invested today for 10 years, assuming an interest rate of 8%?</p>
      <p>FV = $1,000 * (1 + 0.08)^10 = $2,158.92</p>
      
      <h3>The Importance of Understanding Time Value of Money</h3>
      
      <p>Understanding the time value of money is essential for making sound financial decisions. By considering the time value of money, investors can make informed choices about how to allocate their capital and achieve their financial goals.</p>
    `,
    relatedTerms: ["present-value", "future-value", "discount-rate", "compounding", "discounting", "annuity"],
    chart: {
      type: "line",
      title: "Growth of $1,000 Over Time at Different Interest Rates (Illustrative)",
      data: [
        { year: 0, rate5: 1000, rate10: 1000 },
        { year: 5, rate5: 1276, rate10: 1611 },
        { year: 10, rate5: 1629, rate10: 2594 },
        { year: 15, rate5: 2079, rate10: 4177 },
        { year: 20, rate5: 2653, rate10: 6728 },
      ],
    },
  },
  tips: {
    term: "TIPS (Treasury Inflation-Protected Securities)",
    category: "investing",
    definition:
      "Treasury Inflation-Protected Securities (TIPS) are a type of U.S. Treasury bond that is indexed to inflation. This means that the principal value of the bond is adjusted to reflect changes in the Consumer Price Index (CPI).",
    content: `
      <p>Treasury Inflation-Protected Securities (TIPS) are a type of U.S. Treasury bond that is indexed to inflation. This means that the principal value of the bond is adjusted to reflect changes in the Consumer Price Index (CPI). TIPS are designed to protect investors from inflation risk.</p>
      
      <h3>Key Features of TIPS</h3>
      
      <h4>Inflation Protection</h4>
      <p>The principal value of TIPS is adjusted to reflect changes in the Consumer Price Index (CPI). This protects investors from inflation risk.</p>
      
      <h4>Fixed Interest Rate</h4>
      <p>TIPS pay a fixed interest rate on the adjusted principal value. This provides investors with a predictable stream of income.</p>
      
      <h4>U.S. Government Guarantee</h4>
      <p>TIPS are backed by the full faith and credit of the U.S. government. This makes them a very safe investment.</p>
      
      <h4>Maturity Dates</h4>
      <p>TIPS are issued with maturity dates of 5, 10, and 30 years.</p>
      
      <h4>Taxation</h4>
      <p>TIPS are subject to federal income tax, but they are exempt from state and local taxes.</p>
      
      <h3>How TIPS Work</h3>
      
      <h4>Principal Adjustment</h4>
      <p>The principal value of TIPS is adjusted twice a year to reflect changes in the CPI. If the CPI increases, the principal value of the TIPS increases. If the CPI decreases, the principal value of the TIPS decreases.</p>
      
      <h4>Interest Payments</h4>
      <p>TIPS pay interest twice a year at a fixed rate on the adjusted principal value. This provides investors with a predictable stream of income that is protected from inflation.</p>
      
      <h4>Maturity Value</h4>
      <p>At maturity, investors receive the adjusted principal value of the TIPS or the original principal value, whichever is greater.</p>
      
      <h3>Benefits of Investing in TIPS</h3>
      
      <ul>
        <li>Inflation Protection</li>
        <li>Predictable Income</li>
        <li>U.S. Government Guarantee</li>
        <li>Diversification</li>
      </ul>
      
      <h3>Risks of Investing in TIPS</h3>
      
      <ul>
        <li>Interest Rate Risk</li>
        <li>Deflation Risk</li>
        <li>Taxation</li>
      </ul>
      
      <h3>Who Should Consider Investing in TIPS?</h3>
      
      <p>TIPS may be a good option for individuals who:</p>
      <ul>
        <li>Are concerned about inflation risk</li>
        <li>Want a predictable stream of income</li>
        <li>Are looking for a safe investment</li>
        <li>Want to diversify their portfolio</li>
      </ul>
      
      <h3>TIPS vs. Nominal Treasury Bonds</h3>
      
      <table border="1" cellpadding="5">
        <tr>
          <th>Feature</th>
          <th>TIPS</th>
          <th>Nominal Treasury Bonds</th>
        </tr>
        <tr>
          <td>Inflation Protection</td>
          <td>Yes</td>
          <td>No</td>
        </tr>
        <tr>
          <td>Principal Adjustment</td>
          <td>Yes</td>
          <td>No</td>
        </tr>
        <tr>
          <td>Interest Rate</td>
          <td>Fixed</td>
          <td>Fixed</td>
        </tr>
        <tr>
          <td>Risk</td>
          <td>Low</td>
          <td>Low</td>
        </tr>
      </table>
    `,
    relatedTerms: [
      "inflation",
      "cpi",
      "treasury-bonds",
      "fixed-income",
      "inflation-protected-securities",
      "interest-rate",
    ],
    chart: {
      type: "line",
      title: "TIPS Yield vs. Inflation Rate (Illustrative)",
      data: [
        { year: 2010, tipsYield: 1.0, inflationRate: 1.6 },
        { year: 2015, tipsYield: 0.1, inflationRate: 0.1 },
        { year: 2020, tipsYield: 0.5, inflationRate: 1.4 },
        { year: 2023, tipsYield: 1.5, inflationRate: 3.7 },
      ],
    },
  },
  trustee: {
    term: "Trustee",
    category: "basics",
    definition:
      "A trustee is a person or institution that holds and manages assets for the benefit of another party, known as the beneficiary. The trustee has a fiduciary duty to act in the best interests of the beneficiary.",
    content: `
      <p>A trustee is a person or institution that holds and manages assets for the benefit of another party, known as the beneficiary. The trustee has a fiduciary duty to act in the best interests of the beneficiary, managing the assets prudently and in accordance with the terms of the trust agreement.</p>
      
      <h3>Key Responsibilities of a Trustee</h3>
      
      <h4>Manage Assets</h4>
      <p>The trustee is responsible for managing the assets held in the trust, which may include stocks, bonds, real estate, and other investments.</p>
      
      <h4>Follow Trust Agreement</h4>
      <p>The trustee must follow the terms of the trust agreement, which outlines how the assets should be managed and distributed.</p>
      
      <h4>Act in Best Interests of Beneficiary</h4>
      <p>The trustee has a fiduciary duty to act in the best interests of the beneficiary, putting their needs ahead of their own.</p>
      
      <h4>Provide Accountings</h4>
      <p>The trustee must provide regular accountings to the beneficiary, showing how the assets have been managed and distributed.</p>
      
      <h4>Pay Taxes</h4>
      <p>The trustee is responsible for paying taxes on the income generated by the trust assets.</p>
      
      <h3>Types of Trustees</h3>
      
      <h4>Individual Trustee</h4>
      <p>An individual who is appointed to serve as trustee.</p>
      
      <h4>Corporate Trustee</h4>
      <p>A bank or trust company that is appointed to serve as trustee.</p>
      
      <h4>Co-Trustees</h4>
      <p>Two or more individuals or institutions that are appointed to serve as trustees.</p>
      
      <h3>Choosing a Trustee</h3>
      
      <h4>Experience and Expertise</h4>
      <p>Choose a trustee who has experience and expertise in managing assets and following trust agreements.</p>
      
      <h4>Integrity and Trustworthiness</h4>
      <p>Choose a trustee who is honest, reliable, and trustworthy.</p>
      
      <h4>Communication Skills</h4>
      <p>Choose a trustee who is able to communicate effectively with the beneficiary.</p>
      
      <h4>Fees</h4>
      <p>Consider the fees charged by the trustee.</p>
      
      <h3>The Role of a Trustee in Estate Planning</h3>
      
      <p>Trustees play an important role in estate planning, helping to ensure that assets are managed and distributed according to the wishes of the grantor (the person who created the trust).</p>
    `,
    relatedTerms: ["trust", "beneficiary", "fiduciary", "estate-planning", "asset-management", "trust-agreement"],
    chart: {
      type: "pie",
      title: "Responsibilities of a Trustee (Illustrative)",
      data: [
        { task: "Manage Assets", percentage: 40 },
        { task: "Follow Trust Agreement", percentage: 25 },
        { task: "Act in Best Interests", percentage: 20 },
        { task: "Provide Accountings", percentage: 10 },
        { task: "Pay Taxes", percentage: 5 },
      ],
    },
  },
  "unrealized-gain": {
    term: "Unrealized Gain",
    category: "taxes",
    definition:
      "An unrealized gain is the increase in the value of an asset that an investor owns, but has not yet sold. It is also known as a paper gain and is not subject to taxation until the asset is sold.",
    content: `
      <p>An unrealized gain is the increase in the value of an asset that an investor owns, but has not yet sold. It is also known as a paper gain and is not subject to taxation until the asset is sold and the gain is realized.</p>
      
      <h3>Key Concepts of Unrealized Gains</h3>
      
      <h4>Asset Appreciation</h4>
      <p>The increase in the value of an asset over time.</p>
      
      <h4>Paper Gain</h4>
      <p>Another term for an unrealized gain, as it exists only on paper until the asset is sold.</p>
      
      <h4>No Taxation</h4>
      <p>Unrealized gains are not subject to taxation until the asset is sold and the gain is realized.</p>
      
      <h3>How Unrealized Gains Work</h3>
      
      <h4>Asset Value Increases</h4>
      <p>The value of an asset, such as a stock, bond, or real estate, increases over time.</p>
      
      <h4>Investor Holds Asset</h4>
      <p>The investor continues to hold the asset, without selling it.</p>
      
      <h4>Gain Remains Unrealized</h4>
      <p>The gain remains unrealized and is not subject to taxation.</p>
      
      <h3>Benefits of Unrealized Gains</h3>
      
      <ul>
        <li>Tax Deferral</li>
        <li>Potential for Further Growth</li>
      </ul>
      
      <h3>Risks of Unrealized Gains</h3>
      
      <ul>
        <li>Market Volatility</li>
        <li>Potential for Losses</li>
      </ul>
      
      <h3>Example of Unrealized Gain</h3>
      
      <p>Suppose an investor buys a stock for $100 per share. Over time, the stock price increases to $150 per share. The investor has an unrealized gain of $50 per share.</p>
      
      <h3>Unrealized Gains vs. Realized Gains</h3>
      
      <table border="1" cellpadding="5">
        <tr>
          <th>Feature</th>
          <th>Unrealized Gain</th>
          <th>Realized Gain</th>
        </tr>
        <tr>
          <td>Asset Sold</td>
          <td>No</td>
          <td>Yes</td>
        </tr>
        <tr>
          <td>Taxation</td>
          <td>No</td>
          <td>Yes</td>
        </tr>
        <tr>
          <td>Liquidity</td>
          <td>Illiquid</td>
          <td>Liquid</td>
        </tr>
      </table>
    `,
    relatedTerms: [
      "realized-gain",
      "capital-gains",
      "asset-appreciation",
      "tax-deferral",
      "market-volatility",
      "investment-returns",
    ],
    chart: {
      type: "line",
      title: "Growth of Unrealized Gain Over Time (Illustrative)",
      data: [
        { year: 0, gain: 0 },
        { year: 1, gain: 10 },
        { year: 2, gain: 25 },
        { year: 3, gain: 50 },
        { year: 4, gain: 75 },
        { year: 5, gain: 100 },
      ],
    },
  },
  volatility: {
    term: "Volatility",
    category: "investing",
    definition:
      "Volatility is a statistical measure of the dispersion of returns for a given security or market index. It represents the degree of variation in a trading price series over time.",
    content: `
      <p>Volatility is a statistical measure of the dispersion of returns for a given security or market index. It represents the degree of variation in a trading price series over time. Higher volatility indicates that a security's value can potentially be spread out over a larger range of values. This means that the price of the security can change dramatically over a short time period in either direction.</p>
      
      <h3>Key Concepts of Volatility</h3>
      
      <h4>Standard Deviation</h4>
      <p>A statistical measure of the dispersion of a set of data points around their mean value. In finance, standard deviation is often used to measure the volatility of an investment.</p>
      
      <h4>Beta</h4>
      <p>A measure of a security's volatility relative to the overall market. A beta of 1 indicates that the security's price will move in the same direction and magnitude as the market. A beta greater than 1 indicates that the security is more volatile than the market, while a beta less than 1 indicates that the security is less volatile than the market.</p>
      
      <h4>Volatility Index (VIX)</h4>
      <p>A real-time index that represents the market's expectation of 30-day volatility. It is a popular measure of market risk and is often referred to as the "fear gauge."</p>
      
      <h3>Factors Affecting Volatility</h3>
      
      <h4>Economic News</h4>
      <p>Economic news releases, such as GDP growth, inflation data, and employment figures, can affect market volatility.</p>
      
      <h4>Company-Specific News</h4>
      <p>Company-specific news, such as earnings announcements, product launches, and management changes, can affect the volatility of a company's stock.</p>
      
      <h4>Geopolitical Events</h4>
      <p>Geopolitical events, such as wars, political instability, and trade disputes, can affect market volatility.</p>
      
      <h4>Investor Sentiment</h4>
      <p>Investor sentiment, such as fear and greed, can affect market volatility.</p>
      
      <h3>Impact of Volatility on Investments</h3>
      
      <h4>Higher Risk</h4>
      <p>Higher volatility indicates that an investment is more risky, as its price can change dramatically over a short time period.</p>
      
      <h4>Potential for Higher Returns</h4>
      <p>Higher volatility also indicates that an investment has the potential for higher returns, as its price can increase dramatically over a short time period.</p>
      
      <h4>Emotional Stress</h4>
      <p>High volatility can cause emotional stress for investors, as they may be tempted to make impulsive decisions based on short-term market movements.</p>
      
      <h3>Managing Volatility</h3>
      
      <h4>Diversification</h4>
      <p>Diversifying your portfolio by investing in a variety of asset classes, sectors, and industries can help reduce volatility.</p>
      
      <h4>Long-Term Perspective</h4>
      <p>Taking a long-term perspective and avoiding short-term market timing can help you weather periods of high volatility.</p>
      
      <h4>Risk Tolerance</h4>
      <p>Understanding your risk tolerance and investing accordingly can help you manage your emotions during periods of high volatility.</p>
      
      <h3>Volatility and Investment Strategy</h3>
      
      <p>Volatility plays a significant role in shaping investment strategies. Investors with a higher risk tolerance may be more comfortable investing in volatile assets, while those with a lower risk tolerance may prefer less volatile investments. Understanding volatility and its potential impact on your portfolio is crucial for making informed investment decisions.</p>
    `,
    relatedTerms: ["standard-deviation", "beta", "vix", "risk-management", "market-risk", "investment-returns"],
    chart: {
      type: "line",
      title: "Historical Volatility (VIX Index)",
      data: [
        { year: 2010, vix: 22 },
        { year: 2015, vix: 16 },
        { year: 2020, vix: 30 },
        { year: 2023, vix: 18 },
      ],
    },
  },
  yield: {
    term: "Yield",
    category: "investing",
    definition:
      "Yield is the income return on an investment. It is usually expressed as a percentage of the investment's current market value or face value, also known as the current yield.",
    content: `
      <p>Yield is the income return on an investment. It is usually expressed as a percentage of the investment's current market value or face value, also known as the current yield. Yield is a key metric for investors seeking income from their investments.</p>
      
      <h3>Key Concepts of Yield</h3>
      
      <h4>Current Yield</h4>
      <p>The annual income generated by an investment divided by its current market value, expressed as a percentage.</p>
      
      <h4>Yield to Maturity (YTM)</h4>
      <p>The total return an investor can expect to receive if they hold a bond until it matures. YTM takes into account the bond's current market price, par value, coupon interest rate, and time to maturity.</p>
      
      <h4>Dividend Yield</h4>
      <p>The annual dividend payment per share divided by the stock's current market price, expressed as a percentage.</p>
      
      <h3>Types of Yield</h3>
      
      <h4>Bond Yield</h4>
      <p>The income return on a bond, which may be expressed as current yield or yield to maturity.</p>
      
      <h4>Dividend Yield</h4>
      <p>The income return on a stock, which is calculated by dividing the annual dividend payment per share by the stock's current market price.</p>
      
      <h4>Real Estate Yield</h4>
      <p>The income return on a real estate investment, which is calculated by dividing the annual rental income by the property's purchase price.</p>
      
      <h3>Factors Affecting Yield</h3>
      
      <h4>Interest Rates</h4>
      <p>Changes in interest rates can affect the yield on fixed-income investments, such as bonds.</p>
      
      <h4>Market Conditions</h4>
      <p>Market conditions, such as economic growth and inflation, can affect the yield on various investments.</p>
      
      <h4>Company Performance</h4>
      <p>Company performance can affect the dividend yield on a stock.</p>
      
      <h3>The Importance of Yield</h3>
      
      <p>Yield is an important metric for investors seeking income from their investments. It provides a measure of the income return on an investment and can help investors compare different investment opportunities.</p>
    `,
    relatedTerms: [
      "current-yield",
      "yield-to-maturity",
      "dividend-yield",
      "interest-rate",
      "fixed-income",
      "investment-returns",
    ],
    chart: {
      type: "bar",
      title: "Yields on Different Asset Classes (Illustrative)",
      data: [
        { asset: "Treasury Bonds", yieldValue: 3.5 },
        { asset: "Corporate Bonds", yieldValue: 4.5 },
        { asset: "Dividend Stocks", yieldValue: 2.5 },
        { asset: "Real Estate", yieldValue: 6.0 },
      ],
    },
  },
}

export default function GlossaryTermPage() {
  const params = useParams()
  const termId = params.id as string
  const glossaryTerm = glossaryTermsData[termId]

  if (!glossaryTerm) {
    return <div>Term not found</div>
  }

  const chartColors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

  return (
    <>
      <SiteHeader />
      <div className="container relative py-6 lg:gap-10 lg:py-10">
        <div className="mx-auto w-full max-w-none lg:mx-0">
          <div className="mb-4 flex justify-between space-x-2">
            <Link href="/glossary" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Glossary</span>
            </Link>
            <Badge variant="secondary">{glossaryTerm.category}</Badge>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>{glossaryTerm.term}</CardTitle>
              <CardDescription>{glossaryTerm.definition}</CardDescription>
            </CardHeader>
            <CardContent>
              <div dangerouslySetInnerHTML={{ __html: glossaryTerm.content }} />

              {glossaryTerm.chart && (
                <div className="mt-8">
                  <h3>{glossaryTerm.chart.title}</h3>
                  <ResponsiveContainer width="100%" height={400}>
                    {glossaryTerm.chart.type === "bar" && (
                      <BarChart data={glossaryTerm.chart.data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {Object.keys(glossaryTerm.chart.data[0])
                          .filter(
                            (key) =>
                              key !== "name" &&
                              key !== "year" &&
                              key !== "age" &&
                              key !== "rate" &&
                              key !== "months" &&
                              key !== "category" &&
                              key !== "asset" &&
                              key !== "type" &&
                              key !== "strategy" &&
                              key !== "factor" &&
                              key !== "scenario" &&
                              key !== "asset" &&
                              key !== "type",
                          )
                          .map((key, index) => (
                            <Bar key={key} dataKey={key} fill={chartColors[index % chartColors.length]} />
                          ))}
                      </BarChart>
                    )}
                    {glossaryTerm.chart.type === "line" && (
                      <LineChart data={glossaryTerm.chart.data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {Object.keys(glossaryTerm.chart.data[0])
                          .filter(
                            (key) =>
                              key !== "year" &&
                              key !== "name" &&
                              key !== "age" &&
                              key !== "rate" &&
                              key !== "months" &&
                              key !== "category" &&
                              key !== "asset" &&
                              key !== "type" &&
                              key !== "strategy" &&
                              key !== "factor" &&
                              key !== "scenario" &&
                              key !== "asset" &&
                              key !== "type",
                          )
                          .map((key, index) => (
                            <Line
                              key={key}
                              type="monotone"
                              dataKey={key}
                              stroke={chartColors[index % chartColors.length]}
                            />
                          ))}
                      </LineChart>
                    )}
                    {glossaryTerm.chart.type === "pie" && (
                      <PieChart>
                        <Pie
                          dataKey="value"
                          isAnimationActive={false}
                          data={glossaryTerm.chart.data}
                          cx="50%"
                          cy="50%"
                          outerRadius={150}
                          fill="#8884d8"
                          label
                        >
                          {glossaryTerm.chart.data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    )}
                  </ResponsiveContainer>
                </div>
              )}

              {glossaryTerm.relatedTerms && (
                <div className="mt-8">
                  <h3>Related Terms</h3>
                  <div className="flex flex-wrap gap-2">
                    {glossaryTerm.relatedTerms.map((relatedTerm) => (
                      <Link key={relatedTerm} href={`/glossary/${relatedTerm}`}>
                        <Button variant="outline" size="sm">
                          {relatedTerm}
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <SiteFooter />
    </>
  )
}

