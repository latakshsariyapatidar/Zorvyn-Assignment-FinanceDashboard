import { InsightHighlights } from '../components/common/InsightHighlights'
import { SimpleTable } from '../components/common/SimpleTable'
import { formatCurrency } from '../utils/finance'

const SPENDING_HEADERS = ['Category', 'Amount']
const MONTHLY_HEADERS = ['Month', 'Income', 'Expenses', 'Net']

export function InsightsPage({ breakdown, monthlyComparison, insightSummary }) {
  const breakdownRows = breakdown.map((item) => (
    <tr key={item.category} className="bg-white/80 even:bg-slate-100/70">
      <td className="border-b border-slate-300/60 px-3 py-2 text-sm text-slate-700">{item.category}</td>
      <td className="border-b border-slate-300/60 px-3 py-2 text-sm text-slate-700">{formatCurrency(item.amount)}</td>
    </tr>
  ))

  const monthlyRows = monthlyComparison.map((month) => (
    <tr key={month.month} className="bg-white/80 even:bg-slate-100/70">
      <td className="border-b border-slate-300/60 px-3 py-2 text-sm text-slate-700">{month.label}</td>
      <td className="border-b border-slate-300/60 px-3 py-2 text-sm text-slate-700">{formatCurrency(month.income)}</td>
      <td className="border-b border-slate-300/60 px-3 py-2 text-sm text-slate-700">{formatCurrency(month.expenses)}</td>
      <td className="border-b border-slate-300/60 px-3 py-2 text-sm text-slate-700">{formatCurrency(month.net)}</td>
    </tr>
  ))

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-md lg:col-span-2">
        <h2 className="mb-3 text-lg font-semibold tracking-tight text-slate-900">Highlights</h2>
        <InsightHighlights insightSummary={insightSummary} />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-md">
        <h2 className="mb-3 text-lg font-semibold tracking-tight text-slate-900">Spending by Category</h2>
        <SimpleTable
          headers={SPENDING_HEADERS}
          rows={breakdownRows}
          emptyText="No expense transactions available."
          emptyColSpan={2}
        />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-md">
        <h2 className="mb-3 text-lg font-semibold tracking-tight text-slate-900">Monthly Comparison</h2>
        <SimpleTable
          headers={MONTHLY_HEADERS}
          rows={monthlyRows}
          emptyText="No month-level data available yet."
          emptyColSpan={4}
        />
      </div>
    </section>
  )
}
