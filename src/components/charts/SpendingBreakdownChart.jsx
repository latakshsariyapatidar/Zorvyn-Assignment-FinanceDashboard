import { formatCurrency } from '../../utils/finance'

export function SpendingBreakdownChart({ data }) {
  const total = data.reduce((sum, item) => sum + item.amount, 0)

  if (!data.length || total <= 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white/70 p-4 text-sm text-slate-600">
        <p>No expense data yet to show category breakdown.</p>
      </div>
    )
  }

  const topCategories = data.slice(0, 6)

  return (
    <div className="grid gap-2.5">
      {topCategories.map((item) => {
        const ratio = (item.amount / total) * 100

        return (
          <div key={item.category} className="grid gap-1.5">
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-semibold text-slate-800">{item.category}</span>
              <small className="text-xs text-slate-600">{formatCurrency(item.amount)} ({ratio.toFixed(1)}%)</small>
            </div>
            <div
              className="h-2.5 w-full overflow-hidden rounded-full bg-slate-300/50"
              role="img"
              aria-label={`${item.category} spending share ${ratio.toFixed(1)} percent`}
            >
              <div className="h-full rounded-full bg-blue-600" style={{ width: `${Math.max(ratio, 1)}%` }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
