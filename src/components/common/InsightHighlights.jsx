import { formatCurrency } from '../../utils/finance'
import { createMonthlyDeltaText } from '../../helpers/transactions'

export function InsightHighlights({ insightSummary }) {
  const highlightItems = [
    {
      title: 'Highest Spending Category',
      primary: insightSummary.topCategory ? insightSummary.topCategory.category : 'N/A',
      secondary: insightSummary.topCategory ? formatCurrency(insightSummary.topCategory.amount) : 'No expense data yet',
    },
    {
      title: 'Most Expensive Month',
      primary: insightSummary.topMonth ? insightSummary.topMonth.label : 'N/A',
      secondary: insightSummary.topMonth
        ? formatCurrency(insightSummary.topMonth.expenses)
        : 'Need at least one month of data',
    },
    {
      title: 'Observation',
      primary: `${insightSummary.savingsRate.toFixed(1)}% Savings Rate`,
      secondary: createMonthlyDeltaText(insightSummary.monthlyDelta, formatCurrency),
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
      {highlightItems.map((item) => (
        <article key={item.title} className="grid gap-1 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <span className="text-xs text-slate-600">{item.title}</span>
          <strong className="text-base text-slate-900">{item.primary}</strong>
          <small className="text-xs text-slate-600">{item.secondary}</small>
        </article>
      ))}
    </div>
  )
}
