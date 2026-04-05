import { formatCurrency } from '../../utils/finance'

export function MetricsCards({ overview }) {
  const metricItems = [
    { label: 'Balance', value: formatCurrency(overview.balance), accent: 'border-l-blue-600' },
    { label: 'Income', value: formatCurrency(overview.income), accent: 'border-l-emerald-600' },
    { label: 'Expenses', value: formatCurrency(overview.expenses), accent: 'border-l-rose-600' },
    { label: 'Savings Rate', value: `${overview.savingsRate.toFixed(1)}%`, accent: 'border-l-cyan-600' },
  ]

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {metricItems.map((item) => (
        <article
          key={item.label}
          className={`grid gap-1 rounded-xl border border-slate-200 border-l-4 bg-white p-3 transition hover:-translate-y-0.5 hover:shadow-md ${item.accent}`}
        >
          <span className="text-xs font-semibold text-slate-600">{item.label}</span>
          <strong className="text-xl tracking-tight text-slate-900">{item.value}</strong>
        </article>
      ))}
    </div>
  )
}
